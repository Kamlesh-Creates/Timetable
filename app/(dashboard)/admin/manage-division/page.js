"use client";

import Link from "next/link";

export default function ManageDivisionPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Manage divisions / sections
          </h1>
          <p className="text-sm text-slate-600">
            Configure academic divisions or sections and link them to
            classrooms.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/manage/divisions/new"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Add division
          </Link>
          <Link
            href="/manage/divisions"
            className="rounded-md border border-[#CBD5E1] bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
          >
            Open divisions list
          </Link>
        </div>
      </header>

      <section className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
        <p className="mb-2 font-medium text-slate-900">
          Division management overview
        </p>
        <p className="mb-3">
          Divisions or sections represent groups of students who share a
          timetable. Ensure each division has the correct year/semester and an
          appropriate default classroom.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use clear, consistent names like &quot;SE Comp Div A&quot;.</li>
          <li>
            Link divisions to a default classroom to simplify room allocation.
          </li>
          <li>
            Keep the size (roll strength) updated to respect room capacities.
          </li>
        </ul>
      </section>
    </main>
  );
}
