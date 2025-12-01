"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const PAGE_SIZE = 10;

export default function FacultyListPage() {
  const [teachers, setTeachers] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeachers() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/admin/teachers");
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load faculty");
          return;
        }
        setTeachers(data.teachers || []);
      } catch (err) {
        setError("Something went wrong while loading faculty.");
      } finally {
        setLoading(false);
      }
    }
    loadTeachers();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...teachers]
      .filter((t) => t.name.toLowerCase().includes(q))
      .sort((a, b) => {
        return (a[sortKey] || "").localeCompare(b[sortKey] || "");
      });
  }, [teachers, query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  async function handleDelete(id, name) {
    if (
      !window.confirm(
        `Are you sure you want to delete faculty member "${name}"? This cannot be undone.`
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete faculty member");
        return;
      }
      setTeachers((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Something went wrong while deleting the faculty member.");
    }
  }

  function handleExportCsv() {
    const header = ["Name", "Subjects"];
    const lines = [
      header.join(","),
      ...filtered.map((t) => [
        t.name,
        (t.subjects || []).map((s) => (s.name || s)).join("; "),
      ].join(",")),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Faculty</h1>
          <p className="text-sm text-slate-600">
            Manage teachers and their assigned subjects.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="rounded-md border border-[#CBD5E1] bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Export CSV
          </button>
          <Link
            href="/manage/faculty/new"
            className="rounded-md bg-[#1A4C8B] px-3 py-2 text-xs font-medium text-white hover:bg-blue-800"
          >
            Add faculty
          </Link>
        </div>
      </header>

      <section className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB]">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by faculty name…"
              className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Sort by</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-xs text-slate-900 outline-none focus:border-[#1A4C8B] focus:ring-1 focus:ring-[#BFDBFE]"
            >
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium text-slate-600">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Subjects</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-3 py-4 text-center text-sm text-slate-500"
                  >
                    Loading faculty…
                  </td>
                </tr>
              ) : pageRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-3 py-4 text-center text-sm text-slate-500"
                  >
                    No faculty members found.
                  </td>
                </tr>
              ) : (
                pageRows.map((t) => (
                  <tr key={t._id}>
                    <td className="px-3 py-2 text-slate-900">{t.name}</td>
                    <td className="px-3 py-2 text-slate-700">
                      {t.subjects && t.subjects.length > 0
                        ? t.subjects.map((s) => (s.name || s)).join(", ")
                        : "—"}
                    </td>
                    <td className="px-3 py-2 text-right text-xs">
                      <Link
                        href={`/manage/faculty/${t._id}`}
                        className="mr-2 text-[#1A4C8B] hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(t._id, t.name)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md border border-[#CBD5E1] bg-white px-2 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
