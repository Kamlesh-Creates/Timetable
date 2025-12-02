import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Classroom from "../../../../models/Classroom";
import Division from "../../../../models/Division";
import Subject from "../../../../models/Subject";
import Teacher from "../../../../models/Teacher";
import Setting from "../../../../models/Setting";
import Timetable from "../../../../models/Timetable";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

export async function POST() {
  try {
    await connectToDatabase();

    // Fetch all data from database
    const [classrooms, divisions, subjects, teachers, settings] = await Promise.all([
      Classroom.find().populate("subjects").sort({ name: 1 }),
      Division.find().sort({ name: 1 }),
      Subject.find().sort({ name: 1 }),
      Teacher.find().populate("subjects").sort({ name: 1 }),
      Setting.findOne(),
    ]);

    // Validate required data exists
    if (!classrooms || classrooms.length === 0) {
      return NextResponse.json(
        { message: "No classrooms found. Please add classrooms first." },
        { status: 400 }
      );
    }
    if (!divisions || divisions.length === 0) {
      return NextResponse.json(
        { message: "No divisions found. Please add divisions first." },
        { status: 400 }
      );
    }
    if (!subjects || subjects.length === 0) {
      return NextResponse.json(
        { message: "No subjects found. Please add subjects first." },
        { status: 400 }
      );
    }
    if (!teachers || teachers.length === 0) {
      return NextResponse.json(
        { message: "No faculty found. Please add faculty first." },
        { status: 400 }
      );
    }
    if (!settings) {
      return NextResponse.json(
        { message: "Settings not configured. Please configure settings first." },
        { status: 400 }
      );
    }

    // Format data for Python API (5 files as mentioned)
    const dataToSend = {
      classrooms: classrooms.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    subjects: c.subjects.map((s) => {
      const subjectObj =
        typeof s === "object"
          ? s
          : subjects.find((sub) => sub._id.toString() === s.toString());

      return {
        id: subjectObj._id.toString(),
        name: subjectObj.name,
        type: subjectObj.type || "theory",
        frequency: subjectObj.frequency || 1,
      };
    }),
  })),

      divisions: divisions.map((d) => ({
        id: d._id.toString(),
        name: d.name,
      })),
      subjects: subjects.filter((s) => s.type == "theory").map((s) => ({
        id: s._id.toString(),
        name: s.name,
        type: s.type || "theory",
        frequency: s.frequency || 1,
      })),
      labs: subjects.filter((s) => s.type == "lab").map((s) => ({
        id: s._id.toString(),
        name: s.name,
        type: s.type || "lab",
        frequency: s.frequency || 1,
      })),
      teachers: teachers.map((t) => ({
        id: t._id.toString(),
        name: t.name,
        email: t.email || "",
        phone: t.phone || "",

        subjects: t.subjects.map((s) => {
          const subjectObj =
            typeof s === "object"
              ? s
              : subjects.find((sub) => sub._id.toString() === s.toString());

          return {
            id: subjectObj._id.toString(),
            name: subjectObj.name,
            type: subjectObj.type || "theory",
            frequency: subjectObj.frequency || 1,
          };
        }),

        availability: t.availability || [],
        maxHoursPerDay: t.maxHoursPerDay || null,
        maxHoursPerWeek: t.maxHoursPerWeek || null,
        unavailableDates: t.unavailableDates || [],
      })),

      settings: {
        days: settings.days || [],
        start_hour: settings.start_hour || 9,
        end_hour: settings.end_hour || 17,
        lunch_start_hour: settings.lunch_start_hour || 12,
      },
    };

    console.log(dataToSend);
    console.log()

    // Send to Python API
    const pythonResponse = await fetch(`${PYTHON_API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      console.error("[Timetable] Python API error:", errorText);
      return NextResponse.json(
        {
          message: `Python algorithm server returned an error: ${pythonResponse.status} ${pythonResponse.statusText}`,
          details: errorText,
        },
        { status: 502 }
      );
    }

    const timetable = await pythonResponse.json();

    // Save timetable to MongoDB
    const divisionNames = Object.keys(timetable);
    const savedTimetable = await Timetable.create({
      data: timetable,
      result: timetable,
      generatedAt: new Date(),
      divisions: divisionNames,
    });

    return NextResponse.json(
      {
        message: "Timetable generated successfully",
        timetable,
        timetableId: savedTimetable._id.toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Timetable] Generate error:", error);
    return NextResponse.json(
      {
        message: "Failed to generate timetable",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
