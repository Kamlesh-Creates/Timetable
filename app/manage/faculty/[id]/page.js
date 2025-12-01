"use client";

import { useRouter } from "next/navigation";

export default function EditFacultyPage({ params }) {
  const router = useRouter();
  const { id } = params;

  function handlePlaceholder() {
    alert(
      `This page will edit faculty with id ${id} using /api/admin/teachers/${id} once wired to the API.`
    );
    router.back();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">
        Edit faculty
      </h1>
      <div className="space-y-3 rounded-lg bg-white p-6 text-sm text-slate-700 shadow-sm ring-1 ring-[#E5E7EB]">
        <p>
          A detailed edit form for this faculty member will appear here, using
          the existing teacher API.
        </p>
        <button
          type="button"
          onClick={handlePlaceholder}
          className="rounded-md bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          OK
        </button>
      </div>
    </main>
  );
}


