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
  divisions: divisions.map(d => d.name),

  lectures: subjects
    .filter(s => s.type === "theory")
    .map(s => s.name),

  labs: subjects
    .filter(s => s.type === "lab")
    .map(s => s.name),

  frequencies: [...subjects].reduce((acc, s) => {
    acc[s.name] = s.frequency || 1;
    return acc;
  }, {}),

  rooms: classrooms.reduce((acc, c) => {
    acc[c.name] = c.subjects.map(s => s.name);
    return acc;
  }, {}),

  teachers: teachers.reduce((acc, t) => {
    acc[t.name] = t.subjects.map(s => s.name);
    return acc;
  }, {}),

  settings: {
    days: settings.days,
    start_hour: settings.start_hour,
    end_hour: settings.end_hour,
    lunch_start_hour: settings.lunch_start_hour,
    batches_per_division: 4
  }
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

    const rawTimetable = await pythonResponse.json();
    // Unwrap if Python returns { timetable: { ... } }
    const timetable =
      rawTimetable && typeof rawTimetable.timetable === "object"
        ? rawTimetable.timetable
        : rawTimetable;

    // Save timetable to MongoDB
    const divisionNames = Object.keys(timetable || {});
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
