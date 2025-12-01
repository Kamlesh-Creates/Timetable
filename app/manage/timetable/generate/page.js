"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GenerateTimetablePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timetableData, setTimetableData] = useState(null);

  // Data counts for display
  const [counts, setCounts] = useState({
    classrooms: 0,
    divisions: 0,
    subjects: 0,
    teachers: 0,
    settings: false,
  });

  useEffect(() => {
    async function loadCounts() {
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
      }
    }
    loadCounts();
  }, []);

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
      setSuccess(true);
      setGenerating(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setGenerating(false);
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

          <div className="overflow-x-auto">
            <pre className="max-h-96 overflow-auto rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-4 text-xs">
              {JSON.stringify(timetableData, null, 2)}
            </pre>
          </div>
        </section>
      )}
    </main>
  );
}

