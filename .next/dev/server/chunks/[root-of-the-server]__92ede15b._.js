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
function renderSlotLine(batchKey, slot = {}, mode = "lab") {
    if (!slot || typeof slot !== "object" || Object.keys(slot).length === 0) {
        return "";
    }
    const classRaw = slot.class ? String(slot.class) : "";
    const teacherRaw = slot.teacher ? String(slot.teacher) : "";
    const roomRaw = slot.room ? String(slot.room) : "";
    if (!classRaw && !teacherRaw && !roomRaw) {
        return "";
    }
    const parts = [];
    if (teacherRaw) parts.push(teacherRaw);
    if (roomRaw) parts.push(roomRaw);
    const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";
    // mode === "lecture": single line without batch label
    const lineText = mode === "lecture" ? `${classRaw || ""}${suffix}`.trim() : `${batchKey}: ${classRaw || ""}${suffix}`.trim();
    let color = "#0d47a1"; // lecture → blue
    if (mode === "lab") {
        color = "#1b5e20";
    }
    return `<div style="color:${color};font-size:11px;line-height:1.2;">${lineText}</div>`;
}
function getTimetableHtml(timetableData, divisionName, settings = {}, generatedAt = new Date()) {
    if (!timetableData || !divisionName || !timetableData[divisionName]) {
        return `<p style="font-family:sans-serif;padding:20px;">No timetable data found for division: ${divisionName}</p>`;
    }
    const batchesForDivision = timetableData[divisionName] || {};
    const batchKeys = Object.keys(batchesForDivision);
    if (!batchKeys.length) {
        return `<p style="font-family:sans-serif;padding:20px;">No timetable data found for division: ${divisionName}</p>`;
    }
    const firstBatchSchedule = batchesForDivision[batchKeys[0]] || {};
    const days = settings.days?.length ? settings.days : Object.keys(firstBatchSchedule);
    // Fixed college-style columns with explicit times and a dedicated lunch column.
    // Mapping: 0–7 indices from JSON → 8 teaching periods; lunch column has no index.
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
    const headerHtml = `
    <!-- Top header with logo, institute name, revision/date -->
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:6px;margin-bottom:6px;">
      <div style="width:80px;height:80px;border:1px solid #000;display:flex;align-items:center;justify-content:center;font-size:10px;">
        LOGO
      </div>
      <div style="flex:1;text-align:center;">
        <div style="font-size:20px;font-weight:700;text-transform:uppercase;">Your Institute Name</div>
        <div style="font-size:14px;margin-top:2px;">(Affiliated to XYZ University)</div>
      </div>
      <div style="border:1px solid #000;padding:6px 10px;font-size:11px;min-width:120px;">
        <div><strong>Rev. Date:</strong> ${new Date(generatedAt).toLocaleDateString()}</div>
        <div><strong>Print Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    </div>

    <!-- Title -->
    <div style="text-align:center;margin-bottom:6px;">
      <span style="font-size:16px;font-weight:700;text-transform:uppercase;">Class Time Table</span>
    </div>

    <!-- Metadata row -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:11px;">
      <tr>
        <td style="border:1px solid #000;padding:4px 6px;width:22%;">
          <strong>Department:</strong> Institute of Excellence
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:16%;">
          <strong>Academic Year:</strong> 2024-25
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:14%;">
          <strong>Division:</strong> ${divisionName}
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:12%;">
          <strong>Batch:</strong> ${batchKeys.join(", ")}
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:18%;">
          <strong>Class Teacher:</strong> __________
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:18%;">
          <strong>W.E.F Date:</strong> ${new Date().toLocaleDateString()}
        </td>
      </tr>
    </table>
  `;
    const tableHead = `
    <thead>
      <tr>
        <th style="border:2px solid #000;padding:6px;text-align:center;width:72px;font-size:11px;">Day</th>
        ${columns.map((col)=>{
        if (col.isLunchColumn) {
            return `
                <th style="border:2px solid #000;padding:0 4px;text-align:center;width:40px;vertical-align:middle;">
                  <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;font-weight:700;">
                    LUNCH BREAK
                  </div>
                </th>
              `;
        }
        return `<th style="border:2px solid #000;padding:6px 4px;text-align:center;font-size:11px;">${col.label}</th>`;
    }).join("")}
      </tr>
    </thead>
  `;
    const tableBody = `
    <tbody>
      ${days.map((day)=>{
        return `
            <tr>
              <td style="border:2px solid #000;padding:6px 4px;font-weight:700;background-color:#f5f5f5;text-align:center;font-size:11px;">${day}</td>
              ${(()=>{
            const cells = [];
            for(let colIndex = 0; colIndex < columns.length; colIndex++){
                const col = columns[colIndex];
                if (col.isLunchColumn) {
                    cells.push(`<td style="border:2px solid #000;padding:0;background-color:#fff9c4;"></td>`);
                    continue;
                }
                const idx = col.periodIndex;
                const slotsForColumn = batchKeys.map((batchKey)=>{
                    const batchSchedule = batchesForDivision[batchKey] || {};
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
                    cells.push(`<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:middle;background-color:#fff9c4;font-size:11px;font-weight:700;">
                        LUNCH
                      </td>`);
                    continue;
                }
                // Try to detect 2-hour LAB block starting at this column
                let usedColspan2 = false;
                const nextCol = columns[colIndex + 1];
                if (nextCol && !nextCol.isLunchColumn && typeof nextCol.periodIndex === "number" && typeof idx === "number" && nextCol.periodIndex === idx + 1) {
                    const idxNext = nextCol.periodIndex;
                    const hasSpanningLab = batchKeys.some((batchKey)=>{
                        const batchSchedule = batchesForDivision[batchKey] || {};
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
                        // Build LAB lines using the first period (idx)
                        const labLines = batchKeys.map((batchKey)=>{
                            const batchSchedule = batchesForDivision[batchKey] || {};
                            const slotsForDay = Array.isArray(batchSchedule[day]) ? batchSchedule[day] : [];
                            const curr = Array.isArray(slotsForDay) && idx != null ? slotsForDay[idx] : null;
                            const next = Array.isArray(slotsForDay) && nextCol.periodIndex != null ? slotsForDay[nextCol.periodIndex] : null;
                            if (!curr || !next) return "";
                            if (typeof curr !== "object" || typeof next !== "object") {
                                return "";
                            }
                            const currType = curr.type ? String(curr.type).toUpperCase() : "";
                            const nextType = next.type ? String(next.type).toUpperCase() : "";
                            if (currType !== "LAB" || nextType !== "LAB") return "";
                            const currClass = curr.class || "";
                            const nextClass = next.class || "";
                            const currTeacher = curr.teacher || "";
                            const nextTeacher = next.teacher || "";
                            if (currClass !== nextClass || currTeacher !== nextTeacher) {
                                return "";
                            }
                            return renderSlotLine(batchKey, curr, "lab");
                        }).filter((html)=>html && html.trim().length > 0).join("");
                        cells.push(`<td colspan="2" style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:#dcedc8;font-size:11px;">
                          ${labLines}
                        </td>`);
                        usedColspan2 = true;
                        colIndex++; // skip next column
                        continue;
                    }
                }
                if (allFreeOrEmpty) {
                    cells.push(`<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:#ffffff;font-size:11px;">
                      </td>`);
                    continue;
                }
                const lectureSlots = normalized.filter(({ slot, type })=>slot && type === "LECTURE" && (slot.class || slot.teacher || slot.room));
                let cellHtml = "";
                let bgColor = "#e3f2fd"; // lecture/light blue by default
                if (lectureSlots.length > 0) {
                    // Show only the first lecture, without batch label
                    const { slot } = lectureSlots[0];
                    cellHtml = renderSlotLine("", slot, "lecture");
                    bgColor = "#e3f2fd";
                } else {
                    // Otherwise treat as labs: one line per batch with LAB
                    const labSlots = normalized.filter(({ slot, type })=>slot && type === "LAB" && (slot.class || slot.teacher || slot.room));
                    if (labSlots.length > 0) {
                        bgColor = "#dcedc8"; // light green
                        cellHtml = labSlots.map(({ batchKey, slot })=>renderSlotLine(batchKey, slot, "lab")).join("");
                    } else {
                        // Fallback: non-FREE, non-LAB, non-LECTURE → show first as lecture-style
                        const nonFree = normalized.filter(({ slot, type })=>slot && type !== "FREE" && (slot.class || slot.teacher || slot.room));
                        if (nonFree.length > 0) {
                            const { slot } = nonFree[0];
                            cellHtml = renderSlotLine("", slot, "lecture");
                            bgColor = "#e3f2fd";
                        } else {
                            bgColor = "#ffffff";
                        }
                    }
                }
                cells.push(`<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:${bgColor};font-size:11px;">
                      ${cellHtml}
                    </td>`);
            }
            return cells.join("");
        })()}
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
            font-family: "Times New Roman", Times, serif;
            margin: 24px 20px;
            color: #000000;
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        ${headerHtml}
        <table style="width:100%;border-collapse:collapse;font-size:12px;border:2px solid #000;">
          ${tableHead}
          ${tableBody}
        </table>
      </body>
    </html>
  `;
}
const __TURBOPACK__default__export__ = getTimetableHtml;
}),
"[externals]/puppeteer [external] (puppeteer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("puppeteer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/app/api/timetable/[id]/pdf/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Timetable$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Timetable.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Setting$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Setting.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$timetablePdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/timetablePdf.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$puppeteer__$5b$external$5d$__$28$puppeteer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/puppeteer [external] (puppeteer, esm_import)");
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
        // Generate HTML for the requested division (all batches in one grid)
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$timetablePdf$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(timetablePayload, matchedKey, {
            days: settings.days,
            start_hour: settings.start_hour,
            end_hour: settings.end_hour,
            lunch_start_hour: settings.lunch_start_hour
        }, timetableDoc.generatedAt || new Date());
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
                top: "20px",
                bottom: "20px",
                left: "20px",
                right: "20px"
            }
        });
        await browser.close();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="timetable-${matchedKey}.pdf"`
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

//# sourceMappingURL=%5Broot-of-the-server%5D__92ede15b._.js.map