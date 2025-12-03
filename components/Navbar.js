"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch("/api/auth/admin/me");
        if (res.ok) {
          const data = await res.json();
          setAdmin(data.admin);
        }
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmin();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  const isActive = (path) => pathname?.startsWith(path);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <Link 
          href="/admin/dashboard" 
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1A4C8B] to-blue-700 shadow-md">
            <span className="text-sm font-bold text-white">ST</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-bold text-slate-900">
              Smart Timetable
            </span>
            <p className="text-[10px] text-slate-500">
              Institute Management System
            </p>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        {admin && (
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/admin/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/admin/dashboard")
                  ? "bg-blue-50 text-[#1A4C8B]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/manage/timetable/generate"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/manage/timetable")
                  ? "bg-blue-50 text-[#1A4C8B]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Generate
            </Link>
            <Link
              href="/admin/manage-settings"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive("/admin/manage-settings")
                  ? "bg-blue-50 text-[#1A4C8B]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Settings
            </Link>
          </div>
        )}

        {/* Right Side - User Info */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200"></div>
          ) : admin ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-semibold text-white shadow-sm">
                  {admin.email?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-900">
                    {admin.email?.split("@")[0] || "Admin"}
                  </p>
                  <p className="text-[10px] text-slate-500">Administrator</p>
                </div>
                <svg
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg ring-1 ring-black/5">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">
                      {admin.email}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Administrator Account
                    </p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      href="/manage/timetable/generate"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Generate Timetable
                    </Link>
                    <Link
                      href="/admin/manage-settings"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-all hover:bg-slate-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : pathname !== "/admin/login" && pathname !== "/admin/signup" ? (
            <Link
              href="/admin/login"
              className="rounded-lg bg-[#1A4C8B] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              Sign In
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
