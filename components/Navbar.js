import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-[#E5E7EB] bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm text-slate-700">
        <Link href="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1A4C8B] text-xs font-semibold text-white">
            ST
          </div>
          <span className="font-semibold text-slate-900">
            Smart Timetable
          </span>
        </Link>
        <span className="text-xs text-slate-500">
          Institute admin portal
        </span>
      </nav>
    </header>
  );
}
