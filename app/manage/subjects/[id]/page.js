"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditSubjectPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [presetSubject, setPresetSubject] = useState("");
  const [type, setType] = useState("theory");
  const [frequency, setFrequency] = useState(1);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSubject() {
      try {
        const res = await fetch(`/api/admin/subjects/${id}`);
        const data = await res.json();
        if (res.ok && data.subject) {
          const subjectName = data.subject.name || "";
          const normalized = String(subjectName).trim().toUpperCase();
          const preset =
            normalized === "MDM" || normalized === "OE-DS" || normalized === "OE-ES"
              ? normalized
              : "";
          setPresetSubject(preset);
          setName(preset || subjectName);
          setType(data.subject.type || "theory");
          setFrequency(data.subject.frequency || 1);
        } else {
          setError("Subject not found");
        }
      } catch (err) {
        setError("Failed to load subject");
      } finally {
        setLoading(false);
      }
    }
    loadSubject();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/subjects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: presetSubject ? presetSubject : name,
          presetSubject,
          type,
          frequency: parseInt(frequency),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update subject");
        setSaving(false);
        return;
      }

      router.push("/manage/subjects");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-6">
        <p className="text-slate-600">Loading subject...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Edit subject
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]"
      >
        <div className="rounded-md border border-[#CBD5E1] bg-slate-50 px-3 py-2">
          <p className="text-sm font-medium text-slate-700">Fixed-slot subjects</p>
          <p className="text-xs text-slate-500">
            Select to force exact naming (prevents case/typo issues in constraints).
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
            {["MDM", "OE-DS", "OE-ES"].map((code) => (
              <label key={code} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="presetSubject"
                  value={code}
                  checked={presetSubject === code}
                  onChange={(e) => {
                    const next = e.target.value;
                    setPresetSubject(next);
                    setName(next);
                  }}
                  className="h-4 w-4 border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
                />
                <span>{code}</span>
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="presetSubject"
                value=""
                checked={!presetSubject}
                onChange={() => setPresetSubject("")}
                className="h-4 w-4 border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
              />
              <span>Other</span>
            </label>
          </div>
        </div>

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
            disabled={!!presetSubject}
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

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/manage/subjects")}
            className="rounded-md border border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
