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
"[project]/models/Setting.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const settingSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    days: [
        {
            type: String,
            trim: true
        }
    ],
    start_hour: {
        type: Number,
        min: 0,
        max: 23
    },
    end_hour: {
        type: Number,
        min: 0,
        max: 23
    },
    lunch_start_hour: {
        type: Number,
        min: 0,
        max: 23
    }
}, {
    timestamps: true
});
const Setting = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Setting || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Setting", settingSchema);
const __TURBOPACK__default__export__ = Setting;
}),
"[project]/lib/timetablePdf.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getTimetableHtml",
    ()=>getTimetableHtml
]);
function pad(value) {
    return value.toString().padStart(2, "0");
}
function formatLabel(hour) {
    const h = hour % 12 || 12;
    const suffix = hour >= 12 ? "PM" : "AM";
    return `${pad(h)}:00 ${suffix}`;
}
function generatePeriods(settings = {}) {
    const start = Number.isFinite(settings.start_hour) ? settings.start_hour : 9;
    const end = Number.isFinite(settings.end_hour) ? settings.end_hour : 17;
    const lunch = Number.isFinite(settings.lunch_start_hour) ? settings.lunch_start_hour : null;
    const periods = [];
    for(let hour = start; hour < end; hour++){
        periods.push({
            label: formatLabel(hour),
            isLunch: lunch !== null && hour === lunch
        });
    }
    return periods;
}
function renderSlot(slot = {}) {
    if (!slot || Object.keys(slot).length === 0) {
        return `<span style="font-size:10px;color:#94a3b8;">Free</span>`;
    }
    const slotClass = typeof slot === "string" ? slot : slot.class;
    if (slot === "-" || slotClass?.toUpperCase() === "FREE" || slotClass?.toUpperCase() === "FREE SLOT") {
        return `<span style="font-size:10px;color:#94a3b8;">Free</span>`;
    }
    if (slotClass?.toUpperCase() === "LUNCH" || slot.type?.toUpperCase() === "LUNCH") {
        return `<strong style="color:#b45309;">Lunch</strong>`;
    }
    const subject = slotClass ? `<strong style="color:#1f2937;">${slotClass}</strong>` : "";
    const teacher = slot.teacher ? `<span style="font-size:10px;color:#475569;">${slot.teacher}</span>` : "";
    const room = slot.room ? `<span style="font-size:10px;color:#475569;">${slot.room}</span>` : "";
    return `${subject}${teacher ? "<br/>" + teacher : ""}${room ? "<br/>" + room : ""}`;
}
function getTimetableHtml(timetableData, divisionName, settings = {}, generatedAt = new Date()) {
    if (!timetableData || !divisionName || !timetableData[divisionName]) {
        return `<p style="font-family:sans-serif;padding:20px;">No timetable data found for division: ${divisionName}</p>`;
    }
    const divisionSchedule = timetableData[divisionName];
    const days = settings.days?.length ? settings.days : [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    ];
    const periods = generatePeriods(settings);
    const headerHtml = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #e5e7eb;">
      <div style="display:flex;align-items:center;">
        <div style="width:32px;height:32px;background-color:#1A4C8B;border-radius:6px;display:flex;justify-content:center;align-items:center;color:white;font-weight:700;font-size:12px;margin-right:12px;">ST</div>
        <div>
          <p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">Smart Timetable</p>
          <p style="margin:0;margin-top:2px;font-size:12px;color:#475569;">Institute Timetable Division</p>
        </div>
      </div>
      <div style="text-align:right;font-size:12px;color:#475569;">
        <p style="margin:0;">Generated: ${new Date(generatedAt).toLocaleString()}</p>
        <p style="margin:0;">Printed: ${new Date().toLocaleString()}</p>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:20px;font-size:12px;color:#475569;">
      <div>
        <p style="margin:0;"><strong>Division:</strong> ${divisionName}</p>
        <p style="margin:0;"><strong>Academic Year:</strong> 2024-25</p>
        <p style="margin:0;"><strong>Department:</strong> Institute of Excellence</p>
      </div>
      <div>
        <p style="margin:0;"><strong>W.E.F. Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p style="margin:0;"><strong>Revision:</strong> ${new Date(generatedAt).toLocaleDateString()}</p>
        <p style="margin:0;"><strong>Prepared by:</strong> Automated Scheduler</p>
      </div>
    </div>
  `;
    const tableHead = `
    <thead>
      <tr style="background-color:#f1f5f9;">
        <th style="border:1px solid #cbd5e1;padding:10px;text-align:left;width:90px;color:#475569;">Day</th>
        ${periods.map((p)=>`<th style="border:1px solid #cbd5e1;padding:10px;text-align:center;color:#475569;">${p.label}</th>`).join("")}
      </tr>
    </thead>
  `;
    const tableBody = `
    <tbody>
      ${days.map((day)=>{
        const slots = Array.isArray(divisionSchedule[day]) ? divisionSchedule[day] : [];
        return `
            <tr>
              <td style="border:1px solid #cbd5e1;padding:10px;font-weight:600;background-color:#f8fafc;color:#1f2937;">${day}</td>
              ${periods.map((period, idx)=>{
            const slot = slots[idx];
            const lunchBg = period.isLunch ? "background-color:#fef3c7;" : "";
            return `
                    <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;vertical-align:top;${lunchBg}">
                      ${renderSlot(slot)}
                    </td>
                  `;
        }).join("")}
            </tr>
          `;
    }).join("")}
    </tbody>
  `;
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Timetable - ${divisionName}</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            margin: 32px;
            color: #0f172a;
          }
        </style>
      </head>
      <body>
        ${headerHtml}
        <table style="width:100%;border-collapse:collapse;font-size:12px;border:1px solid #cbd5e1;">
          ${tableHead}
          ${tableBody}
        </table>
      </body>
    </html>
  `;
}
const __TURBOPACK__default__export__ = getTimetableHtml;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Setting$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Setting.js [app-route] (ecmascript)");
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
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        const [timetableDoc, settings] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Timetable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findById(id),
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Setting$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne()
        ]);
        if (!timetableDoc) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Timetable not found"
            }, {
                status: 404
            });
        }
        if (!settings) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Settings not configured"
            }, {
                status: 400
            });
        }
        const rawPayload = timetableDoc.result && Object.keys(timetableDoc.result).length > 0 ? timetableDoc.result : timetableDoc.data || {};
        const timetablePayload = rawPayload.timetable && typeof rawPayload.timetable === "object" ? rawPayload.timetable : rawPayload;
        const trimmedDivision = division.trim();
        const keys = Object.keys(timetablePayload || {});
        // Try to match requested division; if not found, fall back to first available
        const matchedKey = keys.find((key)=>key.trim().toLowerCase() === trimmedDivision.toLowerCase()) || keys[0];
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$timetablePdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTimetableHtml"])(timetablePayload, matchedKey, settings, timetableDoc.generatedAt);
        const browser = await __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__["default"].launch({
            headless: true,
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
                top: "20mm",
                right: "20mm",
                bottom: "20mm",
                left: "20mm"
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

//# sourceMappingURL=%5Broot-of-the-server%5D__87b0e1fe._.js.map