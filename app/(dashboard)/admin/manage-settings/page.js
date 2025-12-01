"use client";

import Link from "next/link";

export default function ManageSettingsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Global settings
          </h1>
          <p className="text-sm text-slate-600">
            Configure days, periods, lab types, and timetable options.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/manage/settings/slots"
            className="rounded-md border border-[#CBD5E1] bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
          >
            Edit slots &amp; periods
          </Link>
          <Link
            href="/manage/settings"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Open settings panel
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <div className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
          <p className="mb-2 font-medium text-slate-900">
            Academic days &amp; periods
          </p>
          <p>
            Define the working days, start and end times, period duration, and
            lunch/break slots. This controls the grid on which all timetables
            are generated.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
          <p className="mb-2 font-medium text-slate-900">Lab types</p>
          <p>
            Maintain a list of lab types (Computer Lab, Physics Lab, etc.) used
            by subjects and classrooms, so practical sessions are placed in
            correct rooms.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
          <p className="mb-2 font-medium text-slate-900">
            Timetable generation preferences
          </p>
          <p>
            Adjust default options like maximum hours per day, handling of
            double periods, and respecting teacher availability. These can also
            be overridden on the Constraints page when creating a job.
          </p>
        </div>
      </section>
    </main>
  );
}
