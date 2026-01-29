"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSubjectPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState("theory");
  const [frequency, setFrequency] = useState(1);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          frequency: parseInt(frequency),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create subject");
        setSaving(false);
        return;
      }

      router.push("/manage/subjects");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Add subject
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
            Subject Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Mathematics, Physics Lab"
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="type"
                value="theory"
                checked={type === "theory"}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
              />
              <span>Theory</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="type"
                value="lab"
                checked={type === "lab"}
                onChange={(e) => setType(e.target.value)}
                className="h-4 w-4 border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
              />
              <span>Lab</span>
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-slate-700"
          >
            Frequency (times per week)
          </label>
          <input
            id="frequency"
            type="number"
            min="1"
            max="10"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-70"
        >
          {saving ? "Saving…" : "Save subject"}
        </button>
      </form>
    </main>
  );
}
