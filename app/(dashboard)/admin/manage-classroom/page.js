"use client";

import Link from "next/link";

export default function ManageClassroomPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Manage classrooms
          </h1>
          <p className="text-sm text-slate-600">
            View, create, edit, and remove classrooms used in the timetable.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/manage/classrooms/new"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Add classroom
          </Link>
          <Link
            href="/manage/classrooms"
            className="rounded-md border border-[#CBD5E1] bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
          >
            Open classroom list
          </Link>
        </div>
      </header>

      <section className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
        <p className="mb-2 font-medium text-slate-900">
          Classroom management overview
        </p>
        <p className="mb-3">
          Use the classroom list page to maintain all teaching spaces in your
          institute. Make sure capacity, room type, and special resources are
          accurate so the timetable generator can place sessions correctly.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep capacity in sync with actual room strength.</li>
          <li>
            Mark labs and halls correctly so practicals and events are
            scheduled in suitable spaces.
          </li>
          <li>
            Use resources (projector, computers, etc.) to help the generator
            respect equipment needs.
          </li>
        </ul>
      </section>
    </main>
  );
}
