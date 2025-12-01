"use client";

import Link from "next/link";

export default function ManageFacultyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Manage faculty
          </h1>
          <p className="text-sm text-slate-600">
            Maintain teacher profiles, subjects handled, and availability.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/manage/faculty/new"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Add faculty
          </Link>
          <Link
            href="/manage/faculty"
            className="rounded-md border border-[#CBD5E1] bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
          >
            Open faculty list
          </Link>
        </div>
      </header>

      <section className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
        <p className="mb-2 font-medium text-slate-900">
          Faculty management overview
        </p>
        <p className="mb-3">
          For each teacher, capture contact details, subjects they can teach,
          and realistic availability. This allows the generator to respect
          teacher workload and preferences.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep email addresses unique and up to date.</li>
          <li>
            Use availability grids to block out days or periods when a teacher
            is not available.
          </li>
          <li>
            Configure maximum hours per day/week to avoid over-scheduling
            individual teachers.
          </li>
        </ul>
      </section>
    </main>
  );
}
