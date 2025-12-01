"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-stretch bg-[#F8FAFC] text-slate-800">
      {/* Left: simple institutional intro (desktop only) */}
      <section className="hidden flex-1 items-center justify-center bg-[#E2E8F0] px-10 py-10 md:flex">
        <div className="max-w-md space-y-4">
          <p className="text-sm font-semibold text-[#1A4C8B]">
            Smart Timetable for Institutes
          </p>
          <h1 className="text-3xl font-semibold leading-snug text-slate-900">
            Welcome to the Admin Portal
          </h1>
          <p className="text-sm text-slate-700">
            Manage classrooms, divisions, faculty, and subjects in one place,
            then generate clear, conflict-free timetables for teachers and
            students.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Centralized management for your institute</li>
            <li>• Timetables that respect faculty loads and room capacity</li>
            <li>• Easy to share with teachers and administration</li>
          </ul>
        </div>
      </section>

      {/* Right: login form */}
      <section className="flex w-full flex-1 items-center justify-center px-4 py-10 md:px-12">
        <div className="w-full max-w-md rounded-lg border border-[#CBD5E1] bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1A4C8B]">
              Institute admin login
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Use your registered admin email and password to access the
              dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-3 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                placeholder="admin@institute.edu"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <span className="text-xs text-slate-500">
                  Minimum 8 characters
                </span>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-3 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#1A4C8B] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing you in..." : "Login to dashboard"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

