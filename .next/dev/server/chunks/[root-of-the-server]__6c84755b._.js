module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/puppeteer [external] (puppeteer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("puppeteer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectToDatabase",
    ()=>connectToDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g._mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, {
            dbName: process.env.MONGODB_DB || "timetable"
        }).then((mongooseInstance)=>mongooseInstance);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
}),
"[project]/models/Timetable.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const timetableSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    data: {
        type: Object,
        required: true
    },
    result: {
        type: Object
    },
    generatedAt: {
        type: Date,
        default: Date.now
    },
    divisions: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Timetable) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Timetable;
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Timetable", timetableSchema);
}),
"[project]/lib/timetablePdf.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTimetableHtml",
    ()=>getTimetableHtml
]);
const DEFAULT_DAYS = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
const DEFAULT_PERIOD_LABELS = [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "P7",
    "P8"
];
function formatDateLabel(rawDate) {
    if (!rawDate) {
        return new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }
    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) {
        return rawDate;
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}
function normalizeDivisionData(resultJson, division) {
    const root = (resultJson?.result && typeof resultJson.result === "object" ? resultJson.result : null) || (typeof resultJson?.divisions === "object" && !Array.isArray(resultJson.divisions) ? resultJson.divisions : null) || resultJson;
    const divisionData = root?.[division];
    if (!divisionData || typeof divisionData !== "object") {
        return [];
    }
    return Object.entries(divisionData).map(([day, slots])=>({
            day,
            periods: Array.isArray(slots) ? slots.map((slot)=>({
                    subject: slot?.class || slot?.subject || slot?.name || slot?.course || slot?.title || "",
                    teacher: slot?.teacher || slot?.faculty || slot?.instructor || "",
                    room: slot?.room || slot?.classroom || slot?.location || "",
                    isLunch: (slot?.class || slot?.subject || "").toUpperCase() === "LUNCH",
                    isFree: (slot?.class || slot?.subject || "").toUpperCase() === "FREE"
                })) : []
        }));
}
function inferPeriodLabels(resultJson, normalizedDays) {
    if (Array.isArray(resultJson?.periods) && resultJson.periods.length > 0) {
        return resultJson.periods;
    }
    if (Array.isArray(resultJson?.periodLabels) && resultJson.periodLabels.length > 0) {
        return resultJson.periodLabels;
    }
    const metaPeriods = resultJson?.meta?.periods;
    if (Array.isArray(metaPeriods) && metaPeriods.length > 0) {
        return metaPeriods;
    }
    const maxPeriods = normalizedDays.reduce((max, day)=>Math.max(max, Array.isArray(day.periods) ? day.periods.length : 0), 0);
    if (maxPeriods > 0) {
        return Array.from({
            length: maxPeriods
        }, (_, index)=>`P${index + 1}`);
    }
    return DEFAULT_PERIOD_LABELS;
}
function safeText(value, fallback = "") {
    if (value === null || value === undefined) return fallback;
    return String(value);
}
function renderCell(slot) {
    if (!slot || Object.keys(slot).length === 0) {
        return "";
    }
    if (slot.isLunch) {
        return `<div style="font-weight:600;font-size:12px;color:#b45309;">Lunch</div>`;
    }
    if (slot.isFree) {
        return `<div style="font-weight:600;font-size:12px;color:#94a3b8;">Free</div>`;
    }
    const subject = safeText(slot.subject);
    const teacher = safeText(slot.teacher);
    const room = safeText(slot.room);
    return `
    ${subject ? `<div style="font-weight:600;font-size:12px;color:#0f172a;">${subject}</div>` : ""}
    ${teacher ? `<div style="font-size:10px;color:#334155;margin-top:2px;">${teacher}</div>` : ""}
    ${room ? `<div style="font-size:10px;color:#475569;margin-top:1px;">${room}</div>` : ""}
  `;
}
function getTimetableHtml(resultJson = {}, division) {
    const sourceRoot = (resultJson?.result && typeof resultJson.result === "object" ? resultJson.result : null) || (typeof resultJson?.divisions === "object" && !Array.isArray(resultJson.divisions) ? resultJson.divisions : null) || resultJson;
    const resolvedDivision = division || Object.keys(sourceRoot || {})[0] || "";
    const normalizedDays = normalizeDivisionData(resultJson, resolvedDivision);
    const daysOrder = resultJson?.meta?.days || resultJson?.settings?.days || DEFAULT_DAYS;
    const orderedDays = normalizedDays.sort((a, b)=>{
        const indexA = daysOrder.indexOf(a.day);
        const indexB = daysOrder.indexOf(b.day);
        if (indexA === -1 && indexB === -1) return a.day.localeCompare(b.day);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
    const periodLabels = inferPeriodLabels(resultJson, orderedDays);
    const instituteName = safeText(resultJson?.meta?.instituteName || resultJson?.meta?.institute || resultJson?.settings?.institute || "Smart Timetable Institute");
    const department = safeText(resultJson?.meta?.department || resultJson?.meta?.dept || division || "Department");
    const academicYear = safeText(resultJson?.meta?.academicYear || resultJson?.meta?.year || new Date().getFullYear());
    const className = safeText(resultJson?.meta?.className || resultJson?.meta?.class || division || "Class");
    const teacherName = safeText(resultJson?.meta?.classTeacher || "");
    const wefDate = formatDateLabel(resultJson?.meta?.wef || resultJson?._generatedAt);
    const revision = formatDateLabel(resultJson?.meta?.revision || resultJson?._updatedAt || resultJson?._generatedAt);
    const headerSection = `
    <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div>
        <div style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:4px;">${instituteName}</div>
        <div style="font-size:13px;color:#475569;">Academic Timetable (${division})</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:64px;height:64px;border:1px dashed #94a3b8;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#94a3b8;">
          Logo
        </div>
        <div style="text-align:right;">
          <div style="font-size:12px;color:#475569;">Generated: ${formatDateLabel(resultJson?._generatedAt)}</div>
          <div style="font-size:12px;color:#475569;">Revision: ${revision}</div>
        </div>
      </div>
    </header>
  `;
    const metadataSection = `
    <section style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;font-size:12px;color:#0f172a;margin-bottom:18px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Department</div>
        <div style="font-weight:600;margin-top:4px;">${department}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Academic Year</div>
        <div style="font-weight:600;margin-top:4px;">${academicYear}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Class</div>
        <div style="font-weight:600;margin-top:4px;">${className}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Class Teacher</div>
        <div style="font-weight:600;margin-top:4px;">${teacherName || "-"}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">W.E.F Date</div>
        <div style="font-weight:600;margin-top:4px;">${wefDate}</div>
      </div>
    </section>
  `;
    const tableHeaderCells = periodLabels.map((label)=>`
        <th style="background:#0f172a;color:#e2e8f0;font-size:12px;font-weight:600;padding:10px;border:1px solid #e2e8f0;">
          ${label}
        </th>
      `).join("");
    const tableRows = orderedDays.map(({ day, periods })=>{
        const cells = periodLabels.map((_, idx)=>{
            const slot = periods?.[idx] || null;
            const lunchStyles = slot?.isLunch ? "background:#fef3c7;" : "";
            return `<td style="border:1px solid #e2e8f0;padding:8px;min-width:110px;vertical-align:top;${lunchStyles}">${renderCell(slot)}</td>`;
        });
        return `
        <tr>
          <td style="border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;padding:10px;min-width:90px;">
            ${safeText(day)}
          </td>
          ${cells.join("")}
        </tr>
      `;
    }).join("");
    const timetableTable = `
    <table style="width:100%;border-collapse:collapse;table-layout:fixed;font-family:'Segoe UI', 'Helvetica Neue', sans-serif;">
      <thead>
        <tr>
          <th style="background:#0f172a;color:#e2e8f0;font-size:12px;font-weight:600;padding:10px;border:1px solid #e2e8f0;min-width:90px;">Days</th>
          ${tableHeaderCells}
        </tr>
      </thead>
      <tbody>
        ${tableRows || `<tr><td colspan="${periodLabels.length + 1}" style="text-align:center;padding:24px;border:1px solid #e2e8f0;color:#94a3b8;">No timetable data available for this division.</td></tr>`}
      </tbody>
    </table>
  `;
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${instituteName} - ${division} Timetable</title>
      </head>
      <body style="font-family:'Segoe UI','Helvetica Neue',sans-serif;margin:0;padding:32px;background:#ffffff;color:#0f172a;">
        ${headerSection}
        ${metadataSection}
        ${timetableTable}
        <footer style="margin-top:24px;font-size:10px;color:#94a3b8;text-align:right;">
          Generated via Smart Timetable Scheduler • ${formatDateLabel(resultJson?._generatedAt)}
        </footer>
      </body>
    </html>
  `;
}
}),
"[project]/app/api/timetable/[id]/pdf/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Timetable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Timetable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$timetablePdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/timetablePdf.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function GET(request, { params }) {
    const resolvedParams = await params;
    const { id } = resolvedParams || {};
    const searchParams = new URL(request.url).searchParams;
    const division = searchParams.get("division");
    if (!id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Timetable id is required"
        }, {
            status: 400
        });
    }
    if (!division) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Query parameter 'division' is required"
        }, {
            status: 400
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
    const timetableDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Timetable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id);
    if (!timetableDoc) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Timetable not found"
        }, {
            status: 404
        });
    }
    const timetablePayload = timetableDoc.result && Object.keys(timetableDoc.result).length > 0 ? timetableDoc.result : timetableDoc.data || {};
    const resultJson = {
        ...JSON.parse(JSON.stringify(timetablePayload)),
        _generatedAt: timetableDoc.generatedAt,
        _updatedAt: timetableDoc.updatedAt
    };
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$timetablePdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTimetableHtml"])(resultJson, division);
    let browser;
    try {
        browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__["default"].launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });
        const page = await browser.newPage();
        await page.setContent(html, {
            waitUntil: "networkidle0"
        });
        const pdfBuffer = await page.pdf({
            format: "A4",
            landscape: true,
            printBackground: true,
            margin: {
                top: "12mm",
                right: "12mm",
                bottom: "16mm",
                left: "12mm"
            }
        });
        await browser.close();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="timetable-${division}.pdf"`
            }
        });
    } catch (error) {
        if (browser) {
            await browser.close();
        }
        console.error("[Timetable PDF] generation failed:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Failed to generate PDF",
            error: error.message
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6c84755b._.js.map