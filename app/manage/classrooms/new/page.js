"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewClassroomPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const res = await fetch("/api/admin/subjects");
        const data = await res.json();
        if (res.ok) {
          setSubjects(data.subjects || []);
        }
      } catch (err) {
        console.error("Failed to load subjects:", err);
      }
    }
    fetchSubjects();
  }, []);

  function handleSubjectToggle(subjectId) {
    setSelectedSubjectIds((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/classrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subjects: selectedSubjectIds,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create classroom");
        setLoading(false);
        return;
      }

      router.push("/manage/classrooms");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Add classroom
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Classroom Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., A-101, Lab-3"
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Subjects that can be taught in this classroom
          </label>
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-md border border-[#CBD5E1] bg-white p-3">
            {subjects.length === 0 ? (
              <p className="text-sm text-slate-500">
                No subjects available. Create subjects first.
              </p>
            ) : (
              subjects.map((subject) => (
                <label
                  key={subject._id}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedSubjectIds.includes(subject._id)}
                    onChange={() => handleSubjectToggle(subject._id)}
                    className="h-4 w-4 rounded border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
                  />
                  <span>{subject.name}</span>
                </label>
              ))
            )}
          </div>
          <p className="text-xs text-slate-500">
            Select which subjects can be taught in this classroom. This helps
            the timetable generator assign appropriate rooms.
          </p>
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-70"
        >
          {loading ? "Saving…" : "Save classroom"}
        </button>
      </form>
    </main>
  );
}


