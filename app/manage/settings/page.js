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
  
  // Fixed timeslot constraints
  const [mdmSlots, setMdmSlots] = useState([{ day: "", time: "" }]);
  const [oeDsSlots, setOeDsSlots] = useState([{ day: "", time: "" }]);
  const [oeEsDay, setOeEsDay] = useState("");
  const [oeEsTime, setOeEsTime] = useState("");

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
          
          // Load fixed timeslot constraints
          if (s.MDM_time) {
            if (Array.isArray(s.MDM_time) && s.MDM_time.length > 0) {
              setMdmSlots(s.MDM_time.map(slot => ({ day: slot.day || "", time: slot.time || "" })));
            } else if (typeof s.MDM_time === "object" && s.MDM_time.day) {
              // Support legacy single object format
              setMdmSlots([{ day: s.MDM_time.day, time: s.MDM_time.time || "" }]);
            }
          }
          if (s["OE-DS_time"] && Array.isArray(s["OE-DS_time"]) && s["OE-DS_time"].length > 0) {
            setOeDsSlots(s["OE-DS_time"].map(slot => ({ day: slot.day || "", time: slot.time || "" })));
          }
          if (s["OE-ES_time"]) {
            if (typeof s["OE-ES_time"] === "string" && s["OE-ES_time"].includes("@")) {
              const [day, time] = s["OE-ES_time"].split("@");
              setOeEsDay(day || "");
              setOeEsTime(time || "");
            } else if (typeof s["OE-ES_time"] === "object" && s["OE-ES_time"].day) {
              setOeEsDay(s["OE-ES_time"].day);
              setOeEsTime(s["OE-ES_time"].time || "");
            }
          }
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

  function addMdmSlot() {
    setMdmSlots([...mdmSlots, { day: "", time: "" }]);
  }

  function removeMdmSlot(index) {
    setMdmSlots(mdmSlots.filter((_, i) => i !== index));
  }

  function updateMdmSlot(index, field, value) {
    const updated = [...mdmSlots];
    updated[index] = { ...updated[index], [field]: value };
    setMdmSlots(updated);
  }

  function addOeDsSlot() {
    setOeDsSlots([...oeDsSlots, { day: "", time: "" }]);
  }

  function removeOeDsSlot(index) {
    setOeDsSlots(oeDsSlots.filter((_, i) => i !== index));
  }

  function updateOeDsSlot(index, field, value) {
    const updated = [...oeDsSlots];
    updated[index] = { ...updated[index], [field]: value };
    setOeDsSlots(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    // Build fixed timeslot constraints
    const MDM_time = mdmSlots.filter(slot => slot.day && slot.time).length > 0
      ? mdmSlots.filter(slot => slot.day && slot.time)
      : null;
    const OE_DS_time = oeDsSlots.filter(slot => slot.day && slot.time).length > 0
      ? oeDsSlots.filter(slot => slot.day && slot.time)
      : null;
    const OE_ES_time = oeEsDay && oeEsTime ? `${oeEsDay}@${oeEsTime}` : null;

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days,
          start_hour,
          end_hour,
          lunch_start_hour,
          MDM_time,
          "OE-DS_time": OE_DS_time,
          "OE-ES_time": OE_ES_time,
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

        {/* Fixed Timeslot Constraints */}
        <div className="space-y-4 border-t border-[#E5E7EB] pt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Fixed Timeslot Constraints
          </h2>
          <p className="text-xs text-slate-500">
            Configure fixed timeslots for specific subjects. These constraints will be sent to the algorithm.
          </p>

          {/* MDM */}
          <div className="space-y-2 rounded-md border border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                MDM Fixed Timeslots
              </label>
              <button
                type="button"
                onClick={addMdmSlot}
                className="text-xs text-[#1A4C8B] hover:underline"
              >
                + Add slot
              </button>
            </div>
            {mdmSlots.map((slot, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs text-slate-600 mb-1">Day</label>
                  <select
                    value={slot.day}
                    onChange={(e) => updateMdmSlot(index, "day", e.target.value)}
                    className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                  >
                    <option value="">Select day</option>
                    {DAY_OPTIONS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-slate-600 mb-1">Time (e.g., 1-2)</label>
                  <input
                    type="text"
                    value={slot.time}
                    onChange={(e) => updateMdmSlot(index, "time", e.target.value)}
                    placeholder="1-2"
                    className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                  />
                </div>
                {mdmSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMdmSlot(index)}
                    className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* OE-DS */}
          <div className="space-y-2 rounded-md border border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700">
                OE-DS Fixed Timeslots
              </label>
              <button
                type="button"
                onClick={addOeDsSlot}
                className="text-xs text-[#1A4C8B] hover:underline"
              >
                + Add slot
              </button>
            </div>
            {oeDsSlots.map((slot, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="block text-xs text-slate-600 mb-1">Day</label>
                  <select
                    value={slot.day}
                    onChange={(e) => updateOeDsSlot(index, "day", e.target.value)}
                    className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                  >
                    <option value="">Select day</option>
                    {DAY_OPTIONS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-slate-600 mb-1">Time (e.g., 2-3)</label>
                  <input
                    type="text"
                    value={slot.time}
                    onChange={(e) => updateOeDsSlot(index, "time", e.target.value)}
                    placeholder="2-3"
                    className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                  />
                </div>
                {oeDsSlots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOeDsSlot(index)}
                    className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* OE-ES */}
          <div className="space-y-2 rounded-md border border-[#E5E7EB] p-4">
            <label className="block text-sm font-medium text-slate-700">
              OE-ES Fixed Timeslot
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-slate-600 mb-1">Day</label>
                <select
                  value={oeEsDay}
                  onChange={(e) => setOeEsDay(e.target.value)}
                  className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                >
                  <option value="">Select day</option>
                  {DAY_OPTIONS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-600 mb-1">Time (e.g., 13-14)</label>
                <input
                  type="text"
                  value={oeEsTime}
                  onChange={(e) => setOeEsTime(e.target.value)}
                  placeholder="13-14"
                  className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                />
              </div>
            </div>
          </div>
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

