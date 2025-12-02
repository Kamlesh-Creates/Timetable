"use client";

import Link from "next/link";

export default function ManageSubjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Manage subjects
          </h1>
          <p className="text-sm text-slate-600">
            Maintain subject codes, weekly hours, and lab requirements.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link
            href="/manage/subjects/new"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 font-medium text-white hover:bg-blue-800"
          >
            Add subject
          </Link>
          <Link
            href="/manage/subjects"
            className="rounded-md border border-[#CBD5E1] bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
          >
            Open subjects list
          </Link>
        </div>
      </header>

      <section className="rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
        <p className="mb-2 font-medium text-slate-900">
          Subject management overview
        </p>
        <p className="mb-3">
          Each subject should have a unique name, type (theory or lab), and frequency
          (how many times per week). This helps the generator distribute
          teaching load correctly.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Ensure subject names match your official academic records.</li>
          <li>
            Mark lab subjects appropriately so they use suitable rooms.
          </li>
          <li>
            Set frequency to control how many times per week each subject is scheduled.
          </li>
        </ul>
      </section>
    </main>
  );
}
