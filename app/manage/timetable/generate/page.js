"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenerateTimetablePage() {
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloadingCurrentPdf, setDownloadingCurrentPdf] = useState(false);
  const [downloadingPdfId, setDownloadingPdfId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timetableData, setTimetableData] = useState(null);
  const [latestTimetableId, setLatestTimetableId] = useState("");
  const [currentDivisionForPdf, setCurrentDivisionForPdf] = useState("");
  const [timetables, setTimetables] = useState([]);
  const [loadingTimetables, setLoadingTimetables] = useState(false);
  const [timetableListError, setTimetableListError] = useState("");
  const [selectedDivisionById, setSelectedDivisionById] = useState({});

  // Data counts for display
  const [counts, setCounts] = useState({
    classrooms: 0,
    divisions: 0,
    subjects: 0,
    teachers: 0,
    settings: false,
  });

  useEffect(() => {
    loadCounts();
    loadTimetables();
  }, []);

  useEffect(() => {
    if (timetableData) {
      const firstDivision = Object.keys(timetableData)[0] || "";
      setCurrentDivisionForPdf(firstDivision);
    } else {
      setCurrentDivisionForPdf("");
    }
  }, [timetableData]);

  async function loadCounts() {
    setLoadingCounts(true);
    try {
      const [classroomsRes, divisionsRes, subjectsRes, teachersRes, settingsRes] =
        await Promise.all([
          fetch("/api/admin/classrooms"),
          fetch("/api/admin/divisions"),
          fetch("/api/admin/subjects"),
          fetch("/api/admin/teachers"),
          fetch("/api/admin/settings"),
        ]);

      const classrooms = await classroomsRes.json();
      const divisions = await divisionsRes.json();
      const subjects = await subjectsRes.json();
      const teachers = await teachersRes.json();
      const settings = await settingsRes.json();

      setCounts({
        classrooms: classrooms.classrooms?.length || 0,
        divisions: divisions.divisions?.length || 0,
        subjects: subjects.subjects?.length || 0,
        teachers: teachers.teachers?.length || 0,
        settings: !!settings.settings,
      });
    } catch (err) {
      console.error("Failed to load counts:", err);
    } finally {
      setLoadingCounts(false);
    }
  }

  async function loadTimetables() {
    setLoadingTimetables(true);
    setTimetableListError("");
    try {
      const res = await fetch("/api/admin/timetable");
      const data = await res.json();
      if (!res.ok) {
        setTimetableListError(data.message || "Failed to load timetables");
        setTimetables([]);
        return;
      }
      const list = (data.timetables || []).map((tt) => ({
        ...tt,
        result: tt.result || tt.data || {},
      }));
      setTimetables(list);
      setSelectedDivisionById((prev) => {
        const next = { ...prev };
        list.forEach((t) => {
          if (!next[t._id]) {
            next[t._id] = t.divisions?.[0] || "";
          }
        });
        return next;
      });
    } catch (err) {
      console.error("Failed to load timetables:", err);
      setTimetableListError("Something went wrong while loading timetables.");
    } finally {
      setLoadingTimetables(false);
    }
  }

  async function handleGenerate() {
    setError("");
    setSuccess(false);
    setTimetableData(null);
    setGenerating(true);

    try {
      const res = await fetch("/api/timetable/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to generate timetable");
        setGenerating(false);
        return;
      }

      setTimetableData(data.timetable);
      setLatestTimetableId(data.timetableId || "");
      setSuccess(true);
      setGenerating(false);
      loadTimetables();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setGenerating(false);
    }
  }

  async function handleDownloadCurrentPdf() {
    if (!latestTimetableId || !currentDivisionForPdf) {
      alert("Select a division before downloading the PDF.");
      return;
    }
    setDownloadingCurrentPdf(true);
    try {
      const res = await fetch(
        `/api/timetable/${latestTimetableId}/pdf?division=${encodeURIComponent(
          currentDivisionForPdf
        )}`
      );
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to generate PDF");
        setDownloadingCurrentPdf(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `timetable-${currentDivisionForPdf}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingCurrentPdf(false);
    }
  }

  async function handleDownloadPastPdf(timetableId, division) {
    if (!division) {
      alert("Select a division to download the PDF.");
      return;
    }
    setDownloadingPdfId(timetableId);
    try {
      const res = await fetch(
        `/api/timetable/${timetableId}/pdf?division=${encodeURIComponent(division)}`
      );
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to generate PDF");
        setDownloadingPdfId("");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `timetable-${division}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingPdfId("");
    }
  }

  const canGenerate =
    counts.classrooms > 0 &&
    counts.divisions > 0 &&
    counts.subjects > 0 &&
    counts.teachers > 0 &&
    counts.settings;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Generate Timetable
        </h1>
        <p className="text-sm text-slate-600">
          Collect data from all sections and generate the optimal timetable using
          the Python algorithm.
        </p>
      </header>

      {/* Data Summary Cards */}
      <section className="mb-6 grid gap-4 md:grid-cols-5">
        <div
          className={`rounded-lg border p-4 shadow-sm ${
            counts.classrooms > 0
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Classrooms
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {counts.classrooms}
          </p>
          {counts.classrooms === 0 && (
            <Link
              href="/manage/classrooms/new"
              className="mt-2 block text-xs text-red-700 hover:underline"
            >
              Add classrooms →
            </Link>
          )}
        </div>

        <div
          className={`rounded-lg border p-4 shadow-sm ${
            counts.divisions > 0
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Divisions
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {counts.divisions}
          </p>
          {counts.divisions === 0 && (
            <Link
              href="/manage/divisions/new"
              className="mt-2 block text-xs text-red-700 hover:underline"
            >
              Add divisions →
            </Link>
          )}
        </div>

        <div
          className={`rounded-lg border p-4 shadow-sm ${
            counts.subjects > 0
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Subjects
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {counts.subjects}
          </p>
          {counts.subjects === 0 && (
            <Link
              href="/manage/subjects/new"
              className="mt-2 block text-xs text-red-700 hover:underline"
            >
              Add subjects →
            </Link>
          )}
        </div>

        <div
          className={`rounded-lg border p-4 shadow-sm ${
            counts.teachers > 0
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Faculty
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {counts.teachers}
          </p>
          {counts.teachers === 0 && (
            <Link
              href="/manage/faculty/new"
              className="mt-2 block text-xs text-red-700 hover:underline"
            >
              Add faculty →
            </Link>
          )}
        </div>

        <div
          className={`rounded-lg border p-4 shadow-sm ${
            counts.settings
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Settings
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {counts.settings ? "✓ Configured" : "✗ Missing"}
          </p>
          {!counts.settings && (
            <Link
              href="/manage/settings"
              className="mt-2 block text-xs text-red-700 hover:underline"
            >
              Configure →
            </Link>
          )}
        </div>
      </section>

      {/* Generate Section */}
      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Generate Timetable
          </h2>
          <p className="text-sm text-slate-600">
            This will collect all data from the sections above and send it to the
            Python algorithm server to generate an optimal timetable.
          </p>
        </div>

        {!canGenerate && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <p className="font-medium">
              Please configure all required sections before generating the
              timetable.
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
              {counts.classrooms === 0 && <li>Add at least one classroom</li>}
              {counts.divisions === 0 && <li>Add at least one division</li>}
              {counts.subjects === 0 && <li>Add at least one subject</li>}
              {counts.teachers === 0 && <li>Add at least one faculty member</li>}
              {!counts.settings && <li>Configure timetable settings</li>}
            </ul>
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-medium">Error</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        {success && timetableData && (
          <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <p className="font-medium">Timetable generated successfully!</p>
            <p className="mt-1 text-xs">
              The timetable has been generated and is displayed below.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate || generating}
          className="rounded-md bg-[#1A4C8B] px-6 py-3 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating
            ? "Generating timetable..."
            : canGenerate
              ? "Generate Timetable"
              : "Configure all sections first"}
        </button>
      </section>

      {/* Timetable Results */}
      {timetableData && (
        <section className="mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Generated Timetable
            </h2>
            <div className="flex gap-2">
              {Object.keys(timetableData).length > 1 && (
                <select
                  value={currentDivisionForPdf}
                  onChange={(e) => setCurrentDivisionForPdf(e.target.value)}
                  className="rounded-md border border-[#CBD5E1] bg-white px-2 py-2 text-xs text-slate-700"
                >
                  {Object.keys(timetableData).map((divisionKey) => (
                    <option key={divisionKey} value={divisionKey}>
                      {divisionKey}
                    </option>
                  ))}
                </select>
              )}
              <button
                type="button"
                onClick={handleDownloadCurrentPdf}
                disabled={downloadingCurrentPdf}
                className="rounded-md bg-[#1A4C8B] px-3 py-2 text-xs font-medium text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {downloadingCurrentPdf ? "Generating PDF..." : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(timetableData, null, 2)], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "timetable.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Download JSON
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <pre className="max-h-96 overflow-auto rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-xs">
              {JSON.stringify(timetableData, null, 2)}
            </pre>
          </div>
        </section>
      )}

      {/* Past Timetables */}
      <section className="mt-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Past Timetables</h2>
            <p className="text-sm text-slate-600">
              Review and download previously generated timetables.
            </p>
          </div>
          <button
            type="button"
            onClick={loadTimetables}
            className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Refresh list
          </button>
        </div>

        {timetableListError && (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {timetableListError}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium text-slate-600">
              <tr>
                <th className="px-3 py-2">Generated on</th>
                <th className="px-3 py-2">Divisions</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loadingTimetables ? (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-sm text-slate-500">
                    Loading timetables…
                  </td>
                </tr>
              ) : timetables.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-sm text-slate-500">
                    No timetables generated yet.
                  </td>
                </tr>
              ) : (
                timetables.map((tt) => (
                  <tr key={tt._id}>
                    <td className="px-3 py-2 text-slate-900">
                      {new Date(tt.generatedAt || tt.createdAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-slate-700">
                      <div className="flex flex-wrap gap-1 text-xs">
                        {(tt.divisions || []).map((div) => (
                          <span
                            key={div}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700"
                          >
                            {div}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-700">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <select
                          value={selectedDivisionById[tt._id] || ""}
                          onChange={(e) =>
                            setSelectedDivisionById((prev) => ({
                              ...prev,
                              [tt._id]: e.target.value,
                            }))
                          }
                          className="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-xs text-slate-900"
                        >
                          <option value="">Select division</option>
                          {(tt.divisions || []).map((div) => (
                            <option key={div} value={div}>
                              {div}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            handleDownloadPastPdf(tt._id, selectedDivisionById[tt._id])
                          }
                          disabled={downloadingPdfId === tt._id}
                          className="rounded-md bg-[#1A4C8B] px-3 py-1.5 text-white hover:bg-blue-800 disabled:opacity-60"
                        >
                          {downloadingPdfId === tt._id ? "Preparing…" : "Download PDF"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob(
                              [
                                JSON.stringify(
                                  tt.result || tt.data || {},
                                  null,
                                  2
                                ),
                              ],
                              { type: "application/json" }
                            );
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `timetable-${tt._id}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="rounded-md border border-[#CBD5E1] bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                        >
                          Download JSON
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

