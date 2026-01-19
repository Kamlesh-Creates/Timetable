module.exports = [
"[project]/app/manage/timetable/generate/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GenerateTimetablePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function GenerateTimetablePage() {
    const [loadingCounts, setLoadingCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [generating, setGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downloadingCurrentPdf, setDownloadingCurrentPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downloadingPdfId, setDownloadingPdfId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timetableData, setTimetableData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [latestTimetableId, setLatestTimetableId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentDivisionForPdf, setCurrentDivisionForPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [timetables, setTimetables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingTimetables, setLoadingTimetables] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [timetableListError, setTimetableListError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedDivisionById, setSelectedDivisionById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Data counts for display
    const [counts, setCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        classrooms: 0,
        divisions: 0,
        subjects: 0,
        teachers: 0,
        settings: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadCounts();
        loadTimetables();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (timetableData) {
            const divisionKeys = Object.keys(timetableData);
            const firstDivision = divisionKeys[0] || "";
            setCurrentDivisionForPdf(firstDivision);
        } else {
            setCurrentDivisionForPdf("");
        }
    }, [
        timetableData
    ]);
    async function loadCounts() {
        setLoadingCounts(true);
        try {
            const [classroomsRes, divisionsRes, subjectsRes, teachersRes, settingsRes] = await Promise.all([
                fetch("/api/admin/classrooms"),
                fetch("/api/admin/divisions"),
                fetch("/api/admin/subjects"),
                fetch("/api/admin/teachers"),
                fetch("/api/admin/settings")
            ]);
            const classrooms = await classroomsRes.json();
            const divisions = await divisionsRes.json();
            const subjects = await subjectsRes.json();
            const teachers = await teachersRes.json();
            const settings = await settingsRes.json();
            setCounts({
                classrooms: classrooms.classrooms?.length || 0,
                divisions: divisions.divisions?.length || 0,
                subjects: subjects.subjects?.length || 0,
                teachers: teachers.teachers?.length || 0,
                settings: !!settings.settings
            });
        } catch (err) {
            console.error("Failed to load counts:", err);
        } finally{
            setLoadingCounts(false);
        }
    }
    async function loadTimetables() {
        setLoadingTimetables(true);
        setTimetableListError("");
        try {
            const res = await fetch("/api/admin/timetable");
            const data = await res.json();
            if (!res.ok) {
                setTimetableListError(data.message || "Failed to load timetables");
                setTimetables([]);
                return;
            }
            const list = (data.timetables || []).map((tt)=>({
                    ...tt,
                    result: tt.result || tt.data || {}
                }));
            setTimetables(list);
            setSelectedDivisionById((prev)=>{
                const next = {
                    ...prev
                };
                list.forEach((t)=>{
                    if (!next[t._id]) {
                        next[t._id] = t.divisions?.[0] || "";
                    }
                });
                return next;
            });
        } catch (err) {
            console.error("Failed to load timetables:", err);
            setTimetableListError("Something went wrong while loading timetables.");
        } finally{
            setLoadingTimetables(false);
        }
    }
    async function handleGenerate() {
        setError("");
        setSuccess(false);
        setTimetableData(null);
        setGenerating(true);
        try {
            const res = await fetch("/api/timetable/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to generate timetable");
                setGenerating(false);
                return;
            }
            setTimetableData(data.timetable);
            setLatestTimetableId(data.timetableId || "");
            setSuccess(true);
            setGenerating(false);
            loadTimetables();
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setGenerating(false);
        }
    }
    async function handleDownloadCurrentPdf() {
        if (!latestTimetableId || !currentDivisionForPdf) {
            alert("Select a division before downloading the PDF.");
            return;
        }
        setDownloadingCurrentPdf(true);
        try {
            const res = await fetch(`/api/timetable/${latestTimetableId}/pdf?division=${encodeURIComponent(currentDivisionForPdf)}`);
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to generate PDF");
                setDownloadingCurrentPdf(false);
                return;
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `timetable-${currentDivisionForPdf}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert("Failed to generate PDF. Please try again.");
        } finally{
            setDownloadingCurrentPdf(false);
        }
    }
    async function handleDownloadPastPdf(timetableId, division) {
        if (!division) {
            alert("Select a division to download the PDF.");
            return;
        }
        setDownloadingPdfId(timetableId);
        try {
            const res = await fetch(`/api/timetable/${timetableId}/pdf?division=${encodeURIComponent(division)}`);
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to generate PDF");
                setDownloadingPdfId("");
                return;
            }
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `timetable-${division}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert("Failed to generate PDF. Please try again.");
        } finally{
            setDownloadingPdfId("");
        }
    }
    const canGenerate = counts.classrooms > 0 && counts.divisions > 0 && counts.subjects > 0 && counts.teachers > 0 && counts.settings;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto max-w-6xl px-4 py-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-slate-900",
                        children: "Generate Timetable"
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-600",
                        children: "Collect data from all sections and generate the optimal timetable using the Python algorithm."
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/manage/timetable/generate/page.js",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mb-6 grid gap-4 md:grid-cols-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg border p-4 shadow-sm ${counts.classrooms > 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-600",
                                children: "Classrooms"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-slate-900",
                                children: counts.classrooms
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            counts.classrooms === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/manage/classrooms/new",
                                className: "mt-2 block text-xs text-red-700 hover:underline",
                                children: "Add classrooms →"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg border p-4 shadow-sm ${counts.divisions > 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-600",
                                children: "Divisions"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-slate-900",
                                children: counts.divisions
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            counts.divisions === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/manage/divisions/new",
                                className: "mt-2 block text-xs text-red-700 hover:underline",
                                children: "Add divisions →"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg border p-4 shadow-sm ${counts.subjects > 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-600",
                                children: "Subjects"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-slate-900",
                                children: counts.subjects
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            counts.subjects === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/manage/subjects/new",
                                className: "mt-2 block text-xs text-red-700 hover:underline",
                                children: "Add subjects →"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg border p-4 shadow-sm ${counts.teachers > 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-600",
                                children: "Faculty"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-2xl font-semibold text-slate-900",
                                children: counts.teachers
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this),
                            counts.teachers === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/manage/faculty/new",
                                className: "mt-2 block text-xs text-red-700 hover:underline",
                                children: "Add faculty →"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `rounded-lg border p-4 shadow-sm ${counts.settings ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold uppercase tracking-wide text-slate-600",
                                children: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm font-semibold text-slate-900",
                                children: counts.settings ? "✓ Configured" : "✗ Missing"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this),
                            !counts.settings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/manage/settings",
                                className: "mt-2 block text-xs text-red-700 hover:underline",
                                children: "Configure →"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/manage/timetable/generate/page.js",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "Generate Timetable"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 344,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-600",
                                children: "This will collect all data from the sections above and send it to the Python algorithm server to generate an optimal timetable."
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 343,
                        columnNumber: 9
                    }, this),
                    !canGenerate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: "Please configure all required sections before generating the timetable."
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 355,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "mt-2 list-inside list-disc space-y-1 text-xs",
                                children: [
                                    counts.classrooms === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Add at least one classroom"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 360,
                                        columnNumber: 43
                                    }, this),
                                    counts.divisions === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Add at least one division"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 361,
                                        columnNumber: 42
                                    }, this),
                                    counts.subjects === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Add at least one subject"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 362,
                                        columnNumber: 41
                                    }, this),
                                    counts.teachers === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Add at least one faculty member"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 363,
                                        columnNumber: 41
                                    }, this),
                                    !counts.settings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Configure timetable settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 364,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 354,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: "Error"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 370,
                        columnNumber: 11
                    }, this),
                    success && timetableData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: "Timetable generated successfully!"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 378,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs",
                                children: "The timetable has been generated and is displayed below."
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleGenerate,
                        disabled: !canGenerate || generating,
                        className: "rounded-md bg-[#1A4C8B] px-6 py-3 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50",
                        children: generating ? "Generating timetable..." : canGenerate ? "Generate Timetable" : "Configure all sections first"
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 385,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/manage/timetable/generate/page.js",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            timetableData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold text-slate-900",
                                        children: "Generated Timetable"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 404,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-600 mt-1",
                                        children: "Preview the timetable by division. Rows are days, columns are time slots; each cell shows all batches."
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 407,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 403,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: currentDivisionForPdf,
                                        onChange: (e)=>{
                                            const nextDivision = e.target.value;
                                            setCurrentDivisionForPdf(nextDivision);
                                        },
                                        className: "rounded-md border border-[#CBD5E1] bg-white px-2 py-2 text-xs text-slate-700",
                                        children: Object.keys(timetableData).map((divisionKey)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: divisionKey,
                                                children: divisionKey
                                            }, divisionKey, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 421,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleDownloadCurrentPdf,
                                        disabled: downloadingCurrentPdf,
                                        className: "rounded-md bg-[#1A4C8B] px-3 py-2 text-xs font-medium text-white hover:bg-blue-800 disabled:opacity-50",
                                        children: downloadingCurrentPdf ? "Generating PDF..." : "Download PDF"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: async ()=>{
                                            if (!latestTimetableId) {
                                                alert("Generate a timetable first.");
                                                return;
                                            }
                                            const divisions = Object.keys(timetableData || {});
                                            if (!divisions.length) {
                                                alert("No divisions found in timetable.");
                                                return;
                                            }
                                            // Sequentially download PDFs for each division
                                            for (const div of divisions){
                                                try {
                                                    const res = await fetch(`/api/timetable/${latestTimetableId}/pdf?division=${encodeURIComponent(div)}`);
                                                    if (!res.ok) {
                                                        // Skip this division on error but continue others
                                                        // eslint-disable-next-line no-console
                                                        console.error("Failed to generate PDF for", div);
                                                        continue;
                                                    }
                                                    const blob = await res.blob();
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement("a");
                                                    a.href = url;
                                                    a.download = `timetable-${div}.pdf`;
                                                    a.click();
                                                    URL.revokeObjectURL(url);
                                                } catch (e) {
                                                    // eslint-disable-next-line no-console
                                                    console.error("Error downloading PDF for", div, e);
                                                }
                                            }
                                        },
                                        className: "rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50",
                                        children: "Download all division PDFs"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            const blob = new Blob([
                                                JSON.stringify(timetableData, null, 2)
                                            ], {
                                                type: "application/json"
                                            });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement("a");
                                            a.href = url;
                                            a.download = "timetable.json";
                                            a.click();
                                            URL.revokeObjectURL(url);
                                        },
                                        className: "rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50",
                                        children: "Download JSON"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 477,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 411,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 overflow-x-auto rounded-md border border-[#E5E7EB] bg-white",
                        children: currentDivisionForPdf ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full border-collapse text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-[#F1F5F9] text-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center w-24",
                                                children: "Day"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 502,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "9:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 505,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "10:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 508,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "11:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 511,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "12:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 514,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-1 py-2 text-center align-middle",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-block text-[11px] font-semibold",
                                                    style: {
                                                        writingMode: "vertical-rl",
                                                        transform: "rotate(180deg)"
                                                    },
                                                    children: "LUNCH BREAK"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                    lineNumber: 518,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 517,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "1:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 525,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "2:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 528,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "3:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 531,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border border-[#CBD5E1] px-3 py-2 text-center",
                                                children: "4:00"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 534,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 501,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                    lineNumber: 500,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "text-slate-800",
                                    children: (()=>{
                                        const divisionData = timetableData[currentDivisionForPdf] || {};
                                        const batchKeys = Object.keys(divisionData);
                                        if (!batchKeys.length) return null;
                                        const firstBatchSchedule = divisionData[batchKeys[0]] || {};
                                        const dayKeys = Object.keys(firstBatchSchedule);
                                        const columns = [
                                            {
                                                label: "9:00",
                                                periodIndex: 0
                                            },
                                            {
                                                label: "10:00",
                                                periodIndex: 1
                                            },
                                            {
                                                label: "11:00",
                                                periodIndex: 2
                                            },
                                            {
                                                label: "12:00",
                                                periodIndex: 3
                                            },
                                            {
                                                label: "LUNCH BREAK",
                                                periodIndex: null,
                                                isLunchColumn: true
                                            },
                                            {
                                                label: "1:00",
                                                periodIndex: 4
                                            },
                                            {
                                                label: "2:00",
                                                periodIndex: 5
                                            },
                                            {
                                                label: "3:00",
                                                periodIndex: 6
                                            },
                                            {
                                                label: "4:00",
                                                periodIndex: 7
                                            }
                                        ];
                                        return dayKeys.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "border border-[#CBD5E1] px-3 py-2 font-semibold bg-[#F8FAFC] text-center",
                                                        children: day
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                        lineNumber: 562,
                                                        columnNumber: 25
                                                    }, this),
                                                    (()=>{
                                                        const tds = [];
                                                        for(let colIndex = 0; colIndex < columns.length; colIndex++){
                                                            const col = columns[colIndex];
                                                            if (col.isLunchColumn) {
                                                                tds.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-[#CBD5E1] px-1 py-2 bg-amber-50"
                                                                }, `lunch-${colIndex}`, false, {
                                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                    lineNumber: 572,
                                                                    columnNumber: 33
                                                                }, this));
                                                                continue;
                                                            }
                                                            const idx = col.periodIndex;
                                                            const slotsForColumn = batchKeys.map((batchKey)=>{
                                                                const batchSchedule = divisionData[batchKey] || {};
                                                                const slotsForDay = Array.isArray(batchSchedule[day]) ? batchSchedule[day] : [];
                                                                const slot = Array.isArray(slotsForDay) && idx != null ? slotsForDay[idx] : null;
                                                                return {
                                                                    batchKey,
                                                                    slot
                                                                };
                                                            });
                                                            const normalized = slotsForColumn.map(({ batchKey, slot })=>{
                                                                if (!slot || typeof slot !== "object") {
                                                                    return {
                                                                        batchKey,
                                                                        slot: null,
                                                                        type: "",
                                                                        cls: ""
                                                                    };
                                                                }
                                                                const type = slot.type ? String(slot.type).toUpperCase() : "";
                                                                const cls = slot.class ? String(slot.class).toUpperCase() : "";
                                                                return {
                                                                    batchKey,
                                                                    slot,
                                                                    type,
                                                                    cls
                                                                };
                                                            });
                                                            const hasLunch = normalized.some(({ cls })=>cls === "LUNCH");
                                                            const allFreeOrEmpty = normalized.every(({ slot, type })=>{
                                                                if (!slot || !Object.keys(slot).length) return true;
                                                                return type === "FREE";
                                                            });
                                                            // LUNCH overrides everything
                                                            if (hasLunch) {
                                                                tds.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-[#CBD5E1] px-2 py-2 align-middle text-center bg-amber-50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-semibold text-amber-700",
                                                                        children: "LUNCH"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                        lineNumber: 626,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, `col-${colIndex}`, false, {
                                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                    lineNumber: 622,
                                                                    columnNumber: 33
                                                                }, this));
                                                                continue;
                                                            }
                                                            // Try to detect 2-hour LAB block starting at this column
                                                            const nextCol = columns[colIndex + 1];
                                                            let handledSpan = false;
                                                            if (nextCol && !nextCol.isLunchColumn && typeof nextCol.periodIndex === "number" && typeof idx === "number" && nextCol.periodIndex === idx + 1) {
                                                                const idxNext = nextCol.periodIndex;
                                                                const hasSpanningLab = batchKeys.some((batchKey)=>{
                                                                    const batchSchedule = divisionData[batchKey] || {};
                                                                    const slotsForDay = Array.isArray(batchSchedule[day]) ? batchSchedule[day] : [];
                                                                    const curr = Array.isArray(slotsForDay) && idx != null ? slotsForDay[idx] : null;
                                                                    const next = Array.isArray(slotsForDay) && idxNext != null ? slotsForDay[idxNext] : null;
                                                                    if (!curr || !next) return false;
                                                                    if (typeof curr !== "object" || typeof next !== "object") {
                                                                        return false;
                                                                    }
                                                                    const currType = curr.type ? String(curr.type).toUpperCase() : "";
                                                                    const nextType = next.type ? String(next.type).toUpperCase() : "";
                                                                    if (currType !== "LAB" || nextType !== "LAB") return false;
                                                                    const currClass = curr.class || "";
                                                                    const nextClass = next.class || "";
                                                                    const currTeacher = curr.teacher || "";
                                                                    const nextTeacher = next.teacher || "";
                                                                    return currClass === nextClass && currTeacher === nextTeacher;
                                                                });
                                                                if (hasSpanningLab) {
                                                                    const labLines = batchKeys.map((batchKey)=>{
                                                                        const batchSchedule = divisionData[batchKey] || {};
                                                                        const slotsForDay = Array.isArray(batchSchedule[day]) ? batchSchedule[day] : [];
                                                                        const curr = Array.isArray(slotsForDay) && idx != null ? slotsForDay[idx] : null;
                                                                        const next = Array.isArray(slotsForDay) && nextCol.periodIndex != null ? slotsForDay[nextCol.periodIndex] : null;
                                                                        if (!curr || !next) return null;
                                                                        if (typeof curr !== "object" || typeof next !== "object") {
                                                                            return null;
                                                                        }
                                                                        const currType = curr.type ? String(curr.type).toUpperCase() : "";
                                                                        const nextType = next.type ? String(next.type).toUpperCase() : "";
                                                                        if (currType !== "LAB" || nextType !== "LAB") return null;
                                                                        const currClass = curr.class || "";
                                                                        const nextClass = next.class || "";
                                                                        const currTeacher = curr.teacher || "";
                                                                        const nextTeacher = next.teacher || "";
                                                                        if (currClass !== nextClass || currTeacher !== nextTeacher) {
                                                                            return null;
                                                                        }
                                                                        const parts = [];
                                                                        if (curr.teacher) parts.push(String(curr.teacher));
                                                                        if (curr.room) parts.push(String(curr.room));
                                                                        const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";
                                                                        const text = `${batchKey}: ${curr.class || ""}${suffix}`.trim();
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[11px] leading-tight text-green-700",
                                                                            children: text
                                                                        }, batchKey, false, {
                                                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                            lineNumber: 748,
                                                                            columnNumber: 39
                                                                        }, this);
                                                                    }).filter(Boolean);
                                                                    tds.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        colSpan: 2,
                                                                        className: "border border-[#CBD5E1] px-2 py-2 align-top text-center bg-green-50",
                                                                        children: labLines.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-0.5",
                                                                            children: labLines
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                            lineNumber: 765,
                                                                            columnNumber: 39
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-slate-300",
                                                                            children: " "
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                            lineNumber: 767,
                                                                            columnNumber: 39
                                                                        }, this)
                                                                    }, `col-${colIndex}`, false, {
                                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                        lineNumber: 759,
                                                                        columnNumber: 35
                                                                    }, this));
                                                                    handledSpan = true;
                                                                    colIndex++; // skip next column
                                                                }
                                                            }
                                                            if (handledSpan) {
                                                                continue;
                                                            }
                                                            if (allFreeOrEmpty) {
                                                                tds.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "border border-[#CBD5E1] px-2 py-2 align-top text-center",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] text-slate-300",
                                                                        children: " "
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                        lineNumber: 788,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, `col-${colIndex}`, false, {
                                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                    lineNumber: 784,
                                                                    columnNumber: 33
                                                                }, this));
                                                                continue;
                                                            }
                                                            const lectureSlots = normalized.filter(({ slot, type })=>slot && type === "LECTURE" && (slot.class || slot.teacher || slot.room));
                                                            let content = null;
                                                            if (lectureSlots.length > 0) {
                                                                const { slot } = lectureSlots[0];
                                                                const parts = [];
                                                                if (slot.teacher) parts.push(String(slot.teacher));
                                                                if (slot.room) parts.push(String(slot.room));
                                                                const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";
                                                                const text = `${slot.class || ""}${suffix}`.trim();
                                                                content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[11px] leading-tight text-blue-700",
                                                                    children: text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                    lineNumber: 814,
                                                                    columnNumber: 33
                                                                }, this);
                                                            } else {
                                                                const labSlots = normalized.filter(({ slot, type })=>slot && type === "LAB" && (slot.class || slot.teacher || slot.room));
                                                                if (labSlots.length > 0) {
                                                                    content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "space-y-0.5",
                                                                        children: labSlots.map(({ batchKey, slot })=>{
                                                                            const parts = [];
                                                                            if (slot.teacher) parts.push(String(slot.teacher));
                                                                            if (slot.room) parts.push(String(slot.room));
                                                                            const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";
                                                                            const text = `${batchKey}: ${slot.class || ""}${suffix}`.trim();
                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[11px] leading-tight text-green-700",
                                                                                children: text
                                                                            }, batchKey, false, {
                                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                                lineNumber: 840,
                                                                                columnNumber: 41
                                                                            }, this);
                                                                        })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                        lineNumber: 828,
                                                                        columnNumber: 35
                                                                    }, this);
                                                                } else {
                                                                    const nonFree = normalized.filter(({ slot, type })=>slot && type !== "FREE" && (slot.class || slot.teacher || slot.room));
                                                                    if (nonFree.length > 0) {
                                                                        const { slot } = nonFree[0];
                                                                        const parts = [];
                                                                        if (slot.teacher) parts.push(String(slot.teacher));
                                                                        if (slot.room) parts.push(String(slot.room));
                                                                        const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";
                                                                        const text = `${slot.class || ""}${suffix}`.trim();
                                                                        content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-[11px] leading-tight text-blue-700",
                                                                            children: text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                            lineNumber: 867,
                                                                            columnNumber: 37
                                                                        }, this);
                                                                    }
                                                                }
                                                            }
                                                            tds.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "border border-[#CBD5E1] px-2 py-2 align-top text-center",
                                                                children: content || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-slate-300",
                                                                    children: " "
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                    lineNumber: 881,
                                                                    columnNumber: 35
                                                                }, this)
                                                            }, `col-${colIndex}`, false, {
                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                lineNumber: 876,
                                                                columnNumber: 31
                                                            }, this));
                                                        }
                                                        return tds;
                                                    })()
                                                ]
                                            }, day, true, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 561,
                                                columnNumber: 23
                                            }, this));
                                    })()
                                }, void 0, false, {
                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                    lineNumber: 539,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/manage/timetable/generate/page.js",
                            lineNumber: 499,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 text-xs text-slate-500",
                            children: "Select a division to preview the timetable."
                        }, void 0, false, {
                            fileName: "[project]/app/manage/timetable/generate/page.js",
                            lineNumber: 896,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 497,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/manage/timetable/generate/page.js",
                lineNumber: 401,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-8 rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold text-slate-900",
                                        children: "Past Timetables"
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 908,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-600",
                                        children: "Review and download previously generated timetables."
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 909,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 907,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: loadTimetables,
                                className: "rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100",
                                children: "Refresh list"
                            }, void 0, false, {
                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                lineNumber: 913,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 906,
                        columnNumber: 9
                    }, this),
                    timetableListError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700",
                        children: timetableListError
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 923,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full text-left text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "border-b border-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium text-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2",
                                                children: "Generated on"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 932,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2",
                                                children: "Divisions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 933,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-3 py-2",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                lineNumber: 934,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 931,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                    lineNumber: 930,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-[#E5E7EB]",
                                    children: loadingTimetables ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 3,
                                            className: "px-3 py-4 text-center text-sm text-slate-500",
                                            children: "Loading timetables…"
                                        }, void 0, false, {
                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                            lineNumber: 940,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 939,
                                        columnNumber: 17
                                    }, this) : timetables.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 3,
                                            className: "px-3 py-4 text-center text-sm text-slate-500",
                                            children: "No timetables generated yet."
                                        }, void 0, false, {
                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                            lineNumber: 946,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                        lineNumber: 945,
                                        columnNumber: 17
                                    }, this) : timetables.map((tt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-slate-900",
                                                    children: new Date(tt.generatedAt || tt.createdAt).toLocaleString()
                                                }, void 0, false, {
                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                    lineNumber: 953,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-slate-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-1 text-xs",
                                                        children: (tt.divisions || []).map((div)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "rounded-full bg-slate-100 px-2 py-0.5 text-slate-700",
                                                                children: div
                                                            }, div, false, {
                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                lineNumber: 959,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                        lineNumber: 957,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                    lineNumber: 956,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-2 text-xs text-slate-700",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col gap-2 sm:flex-row sm:items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: selectedDivisionById[tt._id] || "",
                                                                onChange: (e)=>setSelectedDivisionById((prev)=>({
                                                                            ...prev,
                                                                            [tt._id]: e.target.value
                                                                        })),
                                                                className: "rounded-md border border-[#CBD5E1] bg-white px-2 py-1 text-xs text-slate-900",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select division"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                        lineNumber: 980,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    (tt.divisions || []).map((div)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: div,
                                                                            children: div
                                                                        }, div, false, {
                                                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                            lineNumber: 982,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                lineNumber: 970,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleDownloadPastPdf(tt._id, selectedDivisionById[tt._id]),
                                                                disabled: downloadingPdfId === tt._id,
                                                                className: "rounded-md bg-[#1A4C8B] px-3 py-1.5 text-white hover:bg-blue-800 disabled:opacity-60",
                                                                children: downloadingPdfId === tt._id ? "Preparing…" : "Download PDF"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                lineNumber: 987,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    const blob = new Blob([
                                                                        JSON.stringify(tt.result || tt.data || {}, null, 2)
                                                                    ], {
                                                                        type: "application/json"
                                                                    });
                                                                    const url = URL.createObjectURL(blob);
                                                                    const a = document.createElement("a");
                                                                    a.href = url;
                                                                    a.download = `timetable-${tt._id}.json`;
                                                                    a.click();
                                                                    URL.revokeObjectURL(url);
                                                                },
                                                                className: "rounded-md border border-[#CBD5E1] bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50",
                                                                children: "Download JSON"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/manage/timetable/generate/page.js",
                                                                lineNumber: 997,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/manage/timetable/generate/page.js",
                                                        lineNumber: 969,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                                    lineNumber: 968,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, tt._id, true, {
                                            fileName: "[project]/app/manage/timetable/generate/page.js",
                                            lineNumber: 952,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/manage/timetable/generate/page.js",
                                    lineNumber: 937,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/manage/timetable/generate/page.js",
                            lineNumber: 929,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/manage/timetable/generate/page.js",
                        lineNumber: 928,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/manage/timetable/generate/page.js",
                lineNumber: 905,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/manage/timetable/generate/page.js",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_manage_timetable_generate_page_8c60b1b3.js.map