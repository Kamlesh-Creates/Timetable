"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenerateTimetablePage() {
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloadingCurrentPdf, setDownloadingCurrentPdf] = useState(false);
  const [downloadingPdfId, setDownloadingPdfId] = useState("");
  const [downloadingFacultyPdf, setDownloadingFacultyPdf] = useState(false);
  const [downloadingFreeSlotsPdf, setDownloadingFreeSlotsPdf] = useState(false);
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
      const divisionKeys = Object.keys(timetableData);
      const firstDivision = divisionKeys[0] || "";
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

  async function handleDownloadFacultyPdf() {
    if (!success || !timetableData) {
      alert("Please generate timetable first before downloading faculty timetable.");
      return;
    }
    setDownloadingFacultyPdf(true);
    try {
      const res = await fetch("/api/timetable/faculty-pdf");
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to generate faculty timetable");
        setDownloadingFacultyPdf(false);
        return;
      }

      // Get the HTML content and open in new window for printing
      const html = await res.text();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(html);
      printWindow.document.close();
      
      // Wait a moment for content to load, then trigger print
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } catch (err) {
      console.error("Faculty PDF error:", err);
      alert("Failed to generate faculty timetable. Please try again.");
    } finally {
      setDownloadingFacultyPdf(false);
    }
  }

  async function handleDownloadFreeSlotsPdf() {
    if (!success || !timetableData) {
      alert("Please generate timetable first before downloading free slots.");
      return;
    }
    setDownloadingFreeSlotsPdf(true);
    try {
      const res = await fetch("/api/timetable/free-slots-pdf");
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to generate free slots");
        setDownloadingFreeSlotsPdf(false);
        return;
      }

      // Get the HTML content and open in new window for printing
      const html = await res.text();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(html);
      printWindow.document.close();
      
      // Wait a moment for content to load, then trigger print
      setTimeout(() => {
        printWindow.print();
      }, 500);
    } catch (err) {
      console.error("Free Slots PDF error:", err);
      alert("Failed to generate free slots. Please try again.");
    } finally {
      setDownloadingFreeSlotsPdf(false);
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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Generated Timetable
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Preview the timetable by division. Rows are days, columns are time slots; each cell shows all batches.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={currentDivisionForPdf}
                onChange={(e) => {
                  const nextDivision = e.target.value;
                  setCurrentDivisionForPdf(nextDivision);
                }}
                className="rounded-md border border-[#CBD5E1] bg-white px-2 py-2 text-xs text-slate-700"
              >
                {Object.keys(timetableData).map((divisionKey) => (
                  <option key={divisionKey} value={divisionKey}>
                    {divisionKey}
                  </option>
                ))}
              </select>
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
                onClick={handleDownloadFacultyPdf}
                disabled={downloadingFacultyPdf}
                className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {downloadingFacultyPdf ? "Generating..." : "Download Faculty Timetable"}
              </button>
              <button
                type="button"
                onClick={handleDownloadFreeSlotsPdf}
                disabled={downloadingFreeSlotsPdf}
                className="rounded-md bg-purple-600 px-3 py-2 text-xs font-medium text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {downloadingFreeSlotsPdf ? "Generating..." : "Download Free Slots"}
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!latestTimetableId) {
                    alert("Generate a timetable first.");
                    return;
                  }
                  const divisions = Object.keys(timetableData || {});
                  if (!divisions.length) {
                    alert("No divisions found in timetable.");
                    return;
                  }
                  // Sequentially download PDFs for each division
                  for (const div of divisions) {
                    try {
                      const res = await fetch(
                        `/api/timetable/${latestTimetableId}/pdf?division=${encodeURIComponent(
                          div
                        )}`
                      );
                      if (!res.ok) {
                        // Skip this division on error but continue others
                        // eslint-disable-next-line no-console
                        console.error("Failed to generate PDF for", div);
                        continue;
                      }
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `timetable-${div}.pdf`;
                      a.click();
                      URL.revokeObjectURL(url);
                    } catch (e) {
                      // eslint-disable-next-line no-console
                      console.error("Error downloading PDF for", div, e);
                    }
                  }
                }}
                className="rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Download all division PDFs
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

          <div className="mt-4 overflow-x-auto rounded-md border border-[#E5E7EB] bg-white">
            {currentDivisionForPdf ? (
              <table className="min-w-full border-collapse text-xs">
                <thead className="bg-[#F1F5F9] text-slate-600">
                  <tr>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center w-24">
                      Day
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      9:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      10:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      11:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      12:00
                    </th>
                    <th className="border border-[#CBD5E1] px-1 py-2 text-center align-middle">
                      <span
                        className="inline-block text-[11px] font-semibold"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        LUNCH BREAK
                      </span>
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      1:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      2:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      3:00
                    </th>
                    <th className="border border-[#CBD5E1] px-3 py-2 text-center">
                      4:00
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  {(() => {
                    const divisionData = timetableData[currentDivisionForPdf] || {};
                    const batchKeys = Object.keys(divisionData);
                    if (!batchKeys.length) return null;

                    const firstBatchSchedule = divisionData[batchKeys[0]] || {};
                    const dayKeys = Object.keys(firstBatchSchedule);

                    const columns = [
                      { label: "9:00", periodIndex: 0 },
                      { label: "10:00", periodIndex: 1 },
                      { label: "11:00", periodIndex: 2 },
                      { label: "12:00", periodIndex: 3 },
                      { label: "LUNCH BREAK", periodIndex: null, isLunchColumn: true },
                      { label: "1:00", periodIndex: 4 },
                      { label: "2:00", periodIndex: 5 },
                      { label: "3:00", periodIndex: 6 },
                      { label: "4:00", periodIndex: 7 },
                    ];

                    return dayKeys.map((day) => (
                      <tr key={day}>
                        <td className="border border-[#CBD5E1] px-3 py-2 font-semibold bg-[#F8FAFC] text-center">
                          {day}
                        </td>
                        {(() => {
                          const tds = [];
                          for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                            const col = columns[colIndex];

                            if (col.isLunchColumn) {
                              tds.push(
                                <td
                                  key={`lunch-${colIndex}`}
                                  className="border border-[#CBD5E1] px-1 py-2 bg-amber-50"
                                />
                              );
                              continue;
                            }

                            const idx = col.periodIndex;

                            const slotsForColumn = batchKeys.map((batchKey) => {
                              const batchSchedule = divisionData[batchKey] || {};
                              const slotsForDay = Array.isArray(batchSchedule[day])
                                ? batchSchedule[day]
                                : [];
                              const slot =
                                Array.isArray(slotsForDay) && idx != null
                                  ? slotsForDay[idx]
                                  : null;
                              return { batchKey, slot };
                            });

                            const normalized = slotsForColumn.map(
                              ({ batchKey, slot }) => {
                                if (!slot || typeof slot !== "object") {
                                  return { batchKey, slot: null, type: "", cls: "" };
                                }
                                const type = slot.type
                                  ? String(slot.type).toUpperCase()
                                  : "";
                                const cls = slot.class
                                  ? String(slot.class).toUpperCase()
                                  : "";
                                return { batchKey, slot, type, cls };
                              }
                            );

                            const hasLunch = normalized.some(
                              ({ cls }) => cls === "LUNCH"
                            );
                            const allFreeOrEmpty = normalized.every(
                              ({ slot, type }) => {
                                if (!slot || !Object.keys(slot).length) return true;
                                return type === "FREE";
                              }
                            );

                            // LUNCH overrides everything
                            if (hasLunch) {
                              tds.push(
                                <td
                                  key={`col-${colIndex}`}
                                  className="border border-[#CBD5E1] px-2 py-2 align-middle text-center bg-amber-50"
                                >
                                  <span className="text-[11px] font-semibold text-amber-700">
                                    LUNCH
                                  </span>
                                </td>
                              );
                              continue;
                            }

                            // Try to detect 2-hour LAB block starting at this column
                            const nextCol = columns[colIndex + 1];
                            let handledSpan = false;
                            if (
                              nextCol &&
                              !nextCol.isLunchColumn &&
                              typeof nextCol.periodIndex === "number" &&
                              typeof idx === "number" &&
                              nextCol.periodIndex === idx + 1
                            ) {
                              const idxNext = nextCol.periodIndex;
                              const hasSpanningLab = batchKeys.some((batchKey) => {
                                const batchSchedule = divisionData[batchKey] || {};
                                const slotsForDay = Array.isArray(batchSchedule[day])
                                  ? batchSchedule[day]
                                  : [];
                                const curr =
                                  Array.isArray(slotsForDay) && idx != null
                                    ? slotsForDay[idx]
                                    : null;
                                const next =
                                  Array.isArray(slotsForDay) && idxNext != null
                                    ? slotsForDay[idxNext]
                                    : null;

                                if (!curr || !next) return false;
                                if (
                                  typeof curr !== "object" ||
                                  typeof next !== "object"
                                ) {
                                  return false;
                                }

                                const currType = curr.type
                                  ? String(curr.type).toUpperCase()
                                  : "";
                                const nextType = next.type
                                  ? String(next.type).toUpperCase()
                                  : "";

                                if (currType !== "LAB" || nextType !== "LAB")
                                  return false;

                                const currClass = curr.class || "";
                                const nextClass = next.class || "";
                                const currTeacher = curr.teacher || "";
                                const nextTeacher = next.teacher || "";

                                return (
                                  currClass === nextClass &&
                                  currTeacher === nextTeacher
                                );
                              });

                              if (hasSpanningLab) {
                                const labLines = batchKeys
                                  .map((batchKey) => {
                                    const batchSchedule =
                                      divisionData[batchKey] || {};
                                    const slotsForDay =
                                      Array.isArray(batchSchedule[day])
                                        ? batchSchedule[day]
                                        : [];
                                    const curr =
                                      Array.isArray(slotsForDay) && idx != null
                                        ? slotsForDay[idx]
                                        : null;
                                    const next =
                                      Array.isArray(slotsForDay) &&
                                      nextCol.periodIndex != null
                                        ? slotsForDay[nextCol.periodIndex]
                                        : null;

                                    if (!curr || !next) return null;
                                    if (
                                      typeof curr !== "object" ||
                                      typeof next !== "object"
                                    ) {
                                      return null;
                                    }

                                    const currType = curr.type
                                      ? String(curr.type).toUpperCase()
                                      : "";
                                    const nextType = next.type
                                      ? String(next.type).toUpperCase()
                                      : "";

                                    if (currType !== "LAB" || nextType !== "LAB")
                                      return null;

                                    const currClass = curr.class || "";
                                    const nextClass = next.class || "";
                                    const currTeacher = curr.teacher || "";
                                    const nextTeacher = next.teacher || "";

                                    if (
                                      currClass !== nextClass ||
                                      currTeacher !== nextTeacher
                                    ) {
                                      return null;
                                    }

                                    const parts = [];
                                    if (curr.teacher)
                                      parts.push(String(curr.teacher));
                                    if (curr.room) parts.push(String(curr.room));
                                    const suffix =
                                      parts.length > 0
                                        ? ` (${parts.join(" ")})`
                                        : "";
                                    const text = `${batchKey}: ${curr.class || ""}${suffix}`.trim();

                                    return (
                                      <div
                                        key={batchKey}
                                        className="text-[11px] leading-tight text-green-700"
                                      >
                                        {text}
                                      </div>
                                    );
                                  })
                                  .filter(Boolean);

                                tds.push(
                                  <td
                                    key={`col-${colIndex}`}
                                    colSpan={2}
                                    className="border border-[#CBD5E1] px-2 py-2 align-top text-center bg-green-50"
                                  >
                                    {labLines.length > 0 ? (
                                      <div className="space-y-0.5">{labLines}</div>
                                    ) : (
                                      <span className="text-[10px] text-slate-300">
                                        &nbsp;
                                      </span>
                                    )}
                                  </td>
                                );
                                handledSpan = true;
                                colIndex++; // skip next column
                              }
                            }

                            if (handledSpan) {
                              continue;
                            }

                            if (allFreeOrEmpty) {
                              tds.push(
                                <td
                                  key={`col-${colIndex}`}
                                  className="border border-[#CBD5E1] px-2 py-2 align-top text-center"
                                >
                                  <span className="text-[10px] text-slate-300">
                                    &nbsp;
                                  </span>
                                </td>
                              );
                              continue;
                            }

                            const lectureSlots = normalized.filter(
                              ({ slot, type }) =>
                                slot &&
                                type === "LECTURE" &&
                                (slot.class || slot.teacher || slot.room)
                            );

                            let content = null;

                            if (lectureSlots.length > 0) {
                              const { slot } = lectureSlots[0];
                              const parts = [];
                              if (slot.teacher) parts.push(String(slot.teacher));
                              if (slot.room) parts.push(String(slot.room));
                              const suffix =
                                parts.length > 0 ? ` (${parts.join(" ")})` : "";
                              const text = `${slot.class || ""}${suffix}`.trim();
                              content = (
                                <div className="text-[11px] leading-tight text-blue-700">
                                  {text}
                                </div>
                              );
                            } else {
                              const labSlots = normalized.filter(
                                ({ slot, type }) =>
                                  slot &&
                                  type === "LAB" &&
                                  (slot.class || slot.teacher || slot.room)
                              );

                              if (labSlots.length > 0) {
                                content = (
                                  <div className="space-y-0.5">
                                    {labSlots.map(({ batchKey, slot }) => {
                                      const parts = [];
                                      if (slot.teacher)
                                        parts.push(String(slot.teacher));
                                      if (slot.room) parts.push(String(slot.room));
                                      const suffix =
                                        parts.length > 0
                                          ? ` (${parts.join(" ")})`
                                          : "";
                                      const text = `${batchKey}: ${slot.class || ""}${suffix}`.trim();
                                      return (
                                        <div
                                          key={batchKey}
                                          className="text-[11px] leading-tight text-green-700"
                                        >
                                          {text}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              } else {
                                const nonFree = normalized.filter(
                                  ({ slot, type }) =>
                                    slot &&
                                    type !== "FREE" &&
                                    (slot.class || slot.teacher || slot.room)
                                );
                                if (nonFree.length > 0) {
                                  const { slot } = nonFree[0];
                                  const parts = [];
                                  if (slot.teacher)
                                    parts.push(String(slot.teacher));
                                  if (slot.room) parts.push(String(slot.room));
                                  const suffix =
                                    parts.length > 0 ? ` (${parts.join(" ")})` : "";
                                  const text = `${slot.class || ""}${suffix}`.trim();
                                  content = (
                                    <div className="text-[11px] leading-tight text-blue-700">
                                      {text}
                                    </div>
                                  );
                                }
                              }
                            }

                            tds.push(
                              <td
                                key={`col-${colIndex}`}
                                className="border border-[#CBD5E1] px-2 py-2 align-top text-center"
                              >
                                {content || (
                                  <span className="text-[10px] text-slate-300">
                                    &nbsp;
                                  </span>
                                )}
                              </td>
                            );
                          }
                          return tds;
                        })()}
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-xs text-slate-500">
                Select a division to preview the timetable.
              </div>
            )}
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

