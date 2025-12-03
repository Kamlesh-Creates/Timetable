"use client";

import { useEffect, useState } from "react";

const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [days, setDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [start_hour, setStartHour] = useState(9);
  const [end_hour, setEndHour] = useState(17);
  const [lunch_start_hour, setLunchStartHour] = useState(12);
  const [batches_per_div, setBatchesPerDiv] = useState(1);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        if (res.ok && data.settings) {
          const s = data.settings;
          setDays(Array.isArray(s.days) && s.days.length > 0 ? s.days : ["Mon", "Tue", "Wed", "Thu", "Fri"]);
          setStartHour(s.start_hour != null ? s.start_hour : 9);
          setEndHour(s.end_hour != null ? s.end_hour : 17);
          setLunchStartHour(s.lunch_start_hour != null ? s.lunch_start_hour : 12);
          setBatchesPerDiv(s.batches_per_div != null ? s.batches_per_div : 1);
        }
      } catch (err) {
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  function handleDayToggle(day) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days,
          start_hour,
          end_hour,
          lunch_start_hour,
          batches_per_div,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save settings");
        setSaving(false);
        return;
      }

      setSuccess("Settings saved successfully!");
      setSaving(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-6">
        <p className="text-slate-600">Loading settings...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Timetable Settings
      </h1>
      <p className="mb-6 text-sm text-slate-600">
        Configure days, working hours, and lunch break for your institute timetable.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]"
      >
        {/* Days */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Working Days
          </label>
          <div className="flex flex-wrap gap-2">
            {DAY_OPTIONS.map((day) => (
              <label
                key={day}
                className="flex items-center gap-2 rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <input
                  type="checkbox"
                  checked={days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                  className="h-4 w-4 rounded border-[#CBD5E1] text-[#1A4C8B] focus:ring-[#BFDBFE]"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Select the days when classes are scheduled.
          </p>
        </div>

        {/* Start Hour */}
        <div className="space-y-1.5">
          <label
            htmlFor="start_hour"
            className="block text-sm font-medium text-slate-700"
          >
            Start Hour
          </label>
          <input
            id="start_hour"
            type="number"
            min={0}
            max={23}
            value={start_hour}
            onChange={(e) => setStartHour(Number(e.target.value))}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
          <p className="text-xs text-slate-500">
            Hour when classes start (0-23, e.g., 9 for 9 AM).
          </p>
        </div>

        {/* End Hour */}
        <div className="space-y-1.5">
          <label
            htmlFor="end_hour"
            className="block text-sm font-medium text-slate-700"
          >
            End Hour
          </label>
          <input
            id="end_hour"
            type="number"
            min={0}
            max={23}
            value={end_hour}
            onChange={(e) => setEndHour(Number(e.target.value))}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
          <p className="text-xs text-slate-500">
            Hour when classes end (0-23, e.g., 17 for 5 PM). Must be after start hour.
          </p>
        </div>

        {/* Lunch Start Hour */}
        <div className="space-y-1.5">
          <label
            htmlFor="lunch_start_hour"
            className="block text-sm font-medium text-slate-700"
          >
            Lunch Start Hour
          </label>
          <input
            id="lunch_start_hour"
            type="number"
            min={0}
            max={23}
            value={lunch_start_hour}
            onChange={(e) => setLunchStartHour(Number(e.target.value))}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
          <p className="text-xs text-slate-500">
            Hour when lunch break starts (0-23, e.g., 12 for 12 PM).
          </p>
        </div>

        {/* Batches per Division */}
        <div className="space-y-1.5">
          <label
            htmlFor="batches_per_div"
            className="block text-sm font-medium text-slate-700"
          >
            Batches per Division
          </label>
          <input
            id="batches_per_div"
            type="number"
            min={1}
            max={20}
            value={batches_per_div}
            onChange={(e) => setBatchesPerDiv(Number(e.target.value))}
            required
            className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
          />
          <p className="text-xs text-slate-500">
            Maximum number of batches that can be scheduled for a single
            division (1-20).
          </p>
        </div>

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-70"
        >
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </form>
    </main>
  );
}

