import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthenticatedAdmin } from "../../../../lib/authMiddleware";

export default async function AdminDashboardPage() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#F1F5F9] text-slate-800">
      {/* Main layout */}
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full space-y-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#E5E7EB] md:w-64">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Navigation
          </p>
          <nav className="space-y-1 text-sm">
            <a
              href="/admin/dashboard"
              className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2 font-medium text-[#1A4C8B]"
            >
              <span>Overview</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                Active
              </span>
            </a>
            <a
              href="/admin/manage-classroom"
              className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Classrooms
            </a>
            <a
              href="/admin/manage-division"
              className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Divisions
            </a>
            <a
              href="/admin/manage-faculty"
              className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Faculty
            </a>
            <a
              href="/admin/manage-subjects"
              className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Subjects
            </a>
            <a
              href="/admin/manage-settings"
              className="block rounded-md px-3 py-2 text-slate-700 transition hover:bg-slate-100"
            >
              Settings
            </a>
            <a
              href="/manage/timetable/generate"
              className="mt-2 block rounded-md bg-[#1A4C8B] px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
            >
              Generate Timetable
            </a>
          </nav>

          <div className="mt-4 rounded-md border border-[#E5E7EB] bg-[#F8FAFC] p-3 text-xs text-slate-700 shadow-sm">
            <p className="font-medium text-slate-900">
              Tip for institutes
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              Configure all classrooms, divisions, faculty and subjects before
              running the timetable generator for best results.
            </p>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 space-y-5 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
          <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Dashboard
              </h1>
              <p className="text-base text-slate-600">
                High-level view of your institute&apos;s timetable setup.
              </p>
            </div>
            <Link
              href="/manage/timetable/generate"
              className="inline-flex items-center justify-center rounded-md bg-[#1A4C8B] px-3.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-blue-800"
            >
              Generate Timetable
            </Link>
          </header>

          {/* Summary cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Setup progress
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                3 / 4
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Core modules configured (classrooms, faculty, subjects,
                divisions).
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-3/4 rounded-full bg-[#1A4C8B]" />
              </div>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Timetable status
              </p>
              <p className="mt-2 text-base font-medium text-[#0F766E]">
                Ready to generate
              </p>
              <p className="mt-1 text-sm text-slate-600">
                All required entities exist. You can run the OR-Tools based
                scheduler from here.
              </p>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Admin
              </p>
              <p className="mt-2 text-base text-slate-800">
                Logged in as{" "}
                <span className="font-semibold text-[#1A4C8B]">
                  {admin.email}
                </span>
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Use the side navigation to manage institute data.
              </p>
            </div>
          </div>

          {/* Timetable preview / activity */}
          <div className="grid gap-4 md:grid-cols-[1.5fr_minmax(0,1fr)]">
            <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Recent activity
                </p>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
                  Demo data
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center justify-between rounded-md bg-[#F8FAFC] px-3 py-2">
                  <span>New classroom added for Block A</span>
                  <span className="text-[11px] text-slate-500">2 min ago</span>
                </li>
                <li className="flex items-center justify-between rounded-md bg-[#F8FAFC] px-3 py-2">
                  <span>Physics subject assigned to Division B</span>
                  <span className="text-[11px] text-slate-500">10 min ago</span>
                </li>
                <li className="flex items-center justify-between rounded-md bg-[#F8FAFC] px-3 py-2">
                  <span>Faculty load updated for Semester 1</span>
                  <span className="text-[11px] text-slate-500">1 hr ago</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 text-xs text-slate-700 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Timetable snapshot
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                Once you generate a timetable, a quick summary of periods,
                conflicts and utilization will appear here to help you review
                the schedule before publishing it for the institute.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

