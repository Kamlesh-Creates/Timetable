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
"[project]/models/Classroom.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const classroomSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subjects: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Subject"
        }
    ]
}, {
    timestamps: true
});
const Classroom = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Classroom || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Classroom", classroomSchema);
const __TURBOPACK__default__export__ = Classroom;
}),
"[project]/models/Division.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const divisionSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});
const Division = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Division || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Division", divisionSchema);
const __TURBOPACK__default__export__ = Division;
}),
"[project]/models/Subject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const subjectSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: [
            "theory",
            "lab"
        ],
        default: "theory"
    },
    frequency: {
        type: Number,
        default: 1,
        min: 1
    }
}, {
    timestamps: true
});
if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Subject) {
    delete __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Subject;
}
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Subject", subjectSchema);
}),
"[project]/models/Teacher.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const teacherSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    subjects: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
            ref: "Subject"
        }
    ],
    availability: [
        {
            type: String,
            trim: true
        }
    ],
    maxHoursPerDay: {
        type: Number,
        min: 0
    },
    maxHoursPerWeek: {
        type: Number,
        min: 0
    },
    unavailableDates: [
        {
            type: Date
        }
    ]
}, {
    timestamps: true
});
const Teacher = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Teacher || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model("Teacher", teacherSchema);
const __TURBOPACK__default__export__ = Teacher;
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
"[project]/app/api/timetable/generate/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Classroom$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Classroom.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Division$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Division.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Subject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Subject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Teacher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Teacher.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Setting$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Setting.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";
async function POST() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDatabase"])();
        // Fetch all data from database
        const [classrooms, divisions, subjects, teachers, settings] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Classroom$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find().populate("subjects").sort({
                name: 1
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Division$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find().sort({
                name: 1
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Subject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find().sort({
                name: 1
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Teacher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find().populate("subjects").sort({
                name: 1
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Setting$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne()
        ]);
        // Validate required data exists
        if (!classrooms || classrooms.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No classrooms found. Please add classrooms first."
            }, {
                status: 400
            });
        }
        if (!divisions || divisions.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No divisions found. Please add divisions first."
            }, {
                status: 400
            });
        }
        if (!subjects || subjects.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No subjects found. Please add subjects first."
            }, {
                status: 400
            });
        }
        if (!teachers || teachers.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No faculty found. Please add faculty first."
            }, {
                status: 400
            });
        }
        if (!settings) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Settings not configured. Please configure settings first."
            }, {
                status: 400
            });
        }
        // Format data for Python API (5 files as mentioned)
        const dataToSend = {
            classrooms: classrooms.map((c)=>({
                    id: c._id.toString(),
                    name: c.name,
                    subjects: c.subjects.map((s)=>{
                        const subjectObj = typeof s === "object" ? s : subjects.find((sub)=>sub._id.toString() === s.toString());
                        return {
                            id: subjectObj._id.toString(),
                            name: subjectObj.name,
                            type: subjectObj.type || "theory",
                            frequency: subjectObj.frequency || 1
                        };
                    })
                })),
            divisions: divisions.map((d)=>({
                    id: d._id.toString(),
                    name: d.name
                })),
            subjects: subjects.filter((s)=>s.type == "theory").map((s)=>({
                    id: s._id.toString(),
                    name: s.name,
                    type: s.type || "theory",
                    frequency: s.frequency || 1
                })),
            labs: subjects.filter((s)=>s.type == "lab").map((s)=>({
                    id: s._id.toString(),
                    name: s.name,
                    type: s.type || "lab",
                    frequency: s.frequency || 1
                })),
            teachers: teachers.map((t)=>({
                    id: t._id.toString(),
                    name: t.name,
                    email: t.email || "",
                    phone: t.phone || "",
                    subjects: t.subjects.map((s)=>{
                        const subjectObj = typeof s === "object" ? s : subjects.find((sub)=>sub._id.toString() === s.toString());
                        return {
                            id: subjectObj._id.toString(),
                            name: subjectObj.name,
                            type: subjectObj.type || "theory",
                            frequency: subjectObj.frequency || 1
                        };
                    }),
                    availability: t.availability || [],
                    maxHoursPerDay: t.maxHoursPerDay || null,
                    maxHoursPerWeek: t.maxHoursPerWeek || null,
                    unavailableDates: t.unavailableDates || []
                })),
            settings: {
                days: settings.days || [],
                start_hour: settings.start_hour || 9,
                end_hour: settings.end_hour || 17,
                lunch_start_hour: settings.lunch_start_hour || 12
            }
        };
        console.log(dataToSend);
        console.log();
        // Send to Python API
        const pythonResponse = await fetch(`${PYTHON_API_URL}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        });
        if (!pythonResponse.ok) {
            const errorText = await pythonResponse.text();
            console.error("[Timetable] Python API error:", errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: `Python algorithm server returned an error: ${pythonResponse.status} ${pythonResponse.statusText}`,
                details: errorText
            }, {
                status: 502
            });
        }
        const timetable = await pythonResponse.json();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Timetable generated successfully",
            timetable
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[Timetable] Generate error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Failed to generate timetable",
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__91f460c3._.js.map