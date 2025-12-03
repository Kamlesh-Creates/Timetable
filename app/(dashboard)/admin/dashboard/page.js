import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthenticatedAdmin } from "../../../../lib/authMiddleware";
import { connectToDatabase } from "../../../../lib/db";
import Timetable from "../../../../models/Timetable";
import Classroom from "../../../../models/Classroom";
import Division from "../../../../models/Division";
import Subject from "../../../../models/Subject";
import Teacher from "../../../../models/Teacher";

function formatTimeAgo(date) {
  if (!date) return "";
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  return new Date(date).toLocaleDateString();
}

async function getRecentActivities() {
  await connectToDatabase();
  
  const activities = [];
  
  // Fetch recent timetables
  const recentTimetables = await Timetable.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  recentTimetables.forEach((tt) => {
    const divisionCount = tt.divisions?.length || 0;
    activities.push({
      text: `Timetable generated for ${divisionCount} division${divisionCount !== 1 ? "s" : ""}`,
      timestamp: tt.createdAt || tt.generatedAt,
      type: "timetable",
    });
  });

  // Fetch recent classrooms
  const recentClassrooms = await Classroom.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  recentClassrooms.forEach((classroom) => {
    activities.push({
      text: `New classroom added: ${classroom.name}`,
      timestamp: classroom.createdAt,
      type: "classroom",
    });
  });

  // Fetch recent divisions
  const recentDivisions = await Division.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  recentDivisions.forEach((division) => {
    activities.push({
      text: `New division added: ${division.name}`,
      timestamp: division.createdAt,
      type: "division",
    });
  });

  // Fetch recent subjects
  const recentSubjects = await Subject.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  recentSubjects.forEach((subject) => {
    activities.push({
      text: `New subject added: ${subject.name}`,
      timestamp: subject.createdAt,
      type: "subject",
    });
  });

  // Fetch recent teachers
  const recentTeachers = await Teacher.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  recentTeachers.forEach((teacher) => {
    activities.push({
      text: `New faculty added: ${teacher.name}`,
      timestamp: teacher.createdAt,
      type: "teacher",
    });
  });

  // Sort by timestamp (most recent first) and limit to 5
  return activities
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
}

async function getTimetableSummary() {
  await connectToDatabase();
  
  const [classrooms, divisions, subjects, teachers, timetables] = await Promise.all([
    Classroom.countDocuments(),
    Division.countDocuments(),
    Subject.countDocuments(),
    Teacher.countDocuments(),
    Timetable.countDocuments(),
  ]);

  return {
    classrooms,
    divisions,
    subjects,
    teachers,
    timetables,
  };
}

export default async function AdminDashboardPage() {
  const admin = await getAuthenticatedAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const recentActivities = await getRecentActivities();
  const summary = await getTimetableSummary();

  // Calculate setup progress
  const setupItems = [
    { name: "Classrooms", count: summary.classrooms, required: true },
    { name: "Divisions", count: summary.divisions, required: true },
    { name: "Faculty", count: summary.teachers, required: true },
    { name: "Subjects", count: summary.subjects, required: true },
  ];
  const completedItems = setupItems.filter((item) => item.count > 0).length;
  const totalItems = setupItems.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 text-slate-800">
      {/* Main layout */}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full space-y-4 rounded-xl bg-white p-5 shadow-lg ring-1 ring-slate-200/60 md:w-72">
          <div className="border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1A4C8B] to-blue-700 shadow-md">
                <span className="text-lg font-bold text-white">ST</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Smart Timetable</p>
                <p className="text-xs text-slate-500">Admin Dashboard</p>
              </div>
            </div>
          </div>
          
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Navigation
            </p>
            <nav className="space-y-1.5 text-sm">
              <a
                href="/admin/dashboard"
                className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2.5 font-medium text-[#1A4C8B] shadow-sm transition-all hover:shadow"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Overview
                </span>
                <span className="rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                  Active
                </span>
              </a>
              <a
                href="/admin/manage-classroom"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-700 transition-all hover:bg-slate-50 hover:text-[#1A4C8B]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Classrooms
              </a>
              <a
                href="/admin/manage-division"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-700 transition-all hover:bg-slate-50 hover:text-[#1A4C8B]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Divisions
              </a>
              <a
                href="/admin/manage-faculty"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-700 transition-all hover:bg-slate-50 hover:text-[#1A4C8B]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Faculty
              </a>
              <a
                href="/admin/manage-subjects"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-700 transition-all hover:bg-slate-50 hover:text-[#1A4C8B]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Subjects
              </a>
              <a
                href="/admin/manage-settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-slate-700 transition-all hover:bg-slate-50 hover:text-[#1A4C8B]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
              <a
                href="/manage/timetable/generate"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1A4C8B] to-blue-700 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Timetable
              </a>
            </nav>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200">
                <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Quick Tip
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                  Configure all classrooms, divisions, faculty and subjects before running the timetable generator for optimal results.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1 space-y-6">
          {/* Header */}
          <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200/60">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Dashboard
                </h1>
                <p className="mt-1.5 text-sm text-slate-600">
                  High-level overview of your institute&apos;s timetable setup and activity
                </p>
              </div>
              <Link
                href="/manage/timetable/generate"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1A4C8B] to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Timetable
              </Link>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {/* Setup Progress Card */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Setup Progress
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {completedItems} / {totalItems}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Core modules configured
                </p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className="h-full rounded-full bg-slate-600 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {setupItems.map((item) => (
                    <span
                      key={item.name}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
                        item.count > 0
                          ? "bg-slate-100 text-slate-700"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {item.count > 0 ? (
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timetable Status Card */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                    <svg className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Timetable Status
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {completedItems === totalItems ? "Ready to Generate" : "Setup Incomplete"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {completedItems === totalItems 
                    ? "All required entities configured. Ready to run the scheduler."
                    : `${totalItems - completedItems} module${totalItems - completedItems !== 1 ? "s" : ""} remaining.`}
                </p>
              </div>
            </div>

            {/* Admin Info Card */}
            <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:shadow-lg">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-purple-100 to-pink-100 opacity-50"></div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Admin Account
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 line-clamp-1">
                      {admin.email}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Manage institute data and generate timetables from the navigation menu.
                </p>
              </div>
            </div>
          </div>

          {/* Timetable preview / activity */}
          <div className="grid gap-5 md:grid-cols-[1.5fr_minmax(0,1fr)]">
            {/* Recent Activity */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    Recent Activity
                  </p>
                </div>
              </div>
              {recentActivities.length > 0 ? (
                <ul className="space-y-2.5">
                  {recentActivities.map((activity, index) => {
                    const getActivityIcon = (type) => {
                      const iconClass = "flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100";
                      const svgClass = "h-4 w-4 text-slate-600";
                      switch (type) {
                        case "timetable":
                          return (
                            <div className={iconClass}>
                              <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                          );
                        case "classroom":
                          return (
                            <div className={iconClass}>
                              <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          );
                        case "division":
                          return (
                            <div className={iconClass}>
                              <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                          );
                        case "subject":
                          return (
                            <div className={iconClass}>
                              <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          );
                        case "teacher":
                          return (
                            <div className={iconClass}>
                              <svg className={svgClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </div>
                          );
                        default:
                          return null;
                      }
                    };

                    return (
                      <li
                        key={`${activity.type}-${index}`}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3 transition-all hover:bg-slate-100"
                      >
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {formatTimeAgo(activity.timestamp)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-900">No recent activity</p>
                  <p className="mt-1 text-xs text-slate-500">Activity will appear here as you manage your timetable</p>
                </div>
              )}
            </div>

            {/* Timetable Snapshot */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                    <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    Statistics Summary
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 transition-all hover:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                      <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">Divisions</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{summary.divisions}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 transition-all hover:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                      <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">Classrooms</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{summary.classrooms}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 transition-all hover:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                      <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">Faculty</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{summary.teachers}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 transition-all hover:bg-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                      <svg className="h-4 w-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">Subjects</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{summary.subjects}</span>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-200">
                        <svg className="h-4 w-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-slate-900">Timetables Generated</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{summary.timetables}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

