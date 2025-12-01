"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
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
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-md rounded-lg border border-[#CBD5E1] bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1A4C8B]">
            Create admin account
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Admin signup
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Set up an administrator for your institute&apos;s timetable
            management.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-3 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[#1A4C8B] focus:ring-[#BFDBFE]"
              placeholder="Admin Name"
            />
          </div>

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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
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
            {loading ? "Creating account..." : "Create admin account"}
          </button>
        </form>
      </div>
    </main>
  );
}

