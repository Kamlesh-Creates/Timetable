"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewFacultyPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubjects() {
      setLoadingSubjects(true);
      try {
        const res = await fetch("/api/admin/subjects");
        if (!res.ok) return;
        const data = await res.json();
        setSubjects(data.subjects || []);
      } finally {
        setLoadingSubjects(false);
      }
    }
    loadSubjects();
  }, []);

  function toggleSubject(id) {
    setSelectedSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subjects: selectedSubjectIds,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create faculty member");
        setSubmitting(false);
        return;
      }

      router.push("/manage/faculty");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Add faculty
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Subjects this teacher can handle
          </p>
          {loadingSubjects ? (
            <p className="text-sm text-slate-500">Loading subjects…</p>
          ) : subjects.length === 0 ? (
            <p className="text-sm text-slate-500">
              No subjects found. Add subjects first in the Subjects section.
            </p>
          ) : (
            <div className="max-h-48 space-y-1 overflow-y-auto rounded-md border border-[#CBD5E1] bg-[#F8FAFC] p-2">
              {subjects.map((subject) => (
                <label
                  key={subject._id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={selectedSubjectIds.includes(subject._id)}
                    onChange={() => toggleSubject(subject._id)}
                  />
                  <span>{subject.name}</span>
                </label>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-500">
            These subjects will be used later as constraints for timetable
            generation.
          </p>
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-70"
        >
          {submitting ? "Saving…" : "Save faculty"}
        </button>
      </form>
    </main>
  );
}

