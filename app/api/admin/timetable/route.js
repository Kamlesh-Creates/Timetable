import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Timetable from "../../../../models/Timetable";

// GET all timetables
export async function GET() {
  try {
    await connectToDatabase();
    const timetables = await Timetable.find().sort({ createdAt: -1 }).lean();

    const normalized = timetables.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      result: doc.result || doc.data || {},
      data: doc.data || doc.result || {},
    }));

    return NextResponse.json({ timetables: normalized }, { status: 200 });
  } catch (error) {
    console.error("[Timetable] Failed to fetch timetables:", error);
    return NextResponse.json(
      { message: "Failed to fetch timetables" },
      { status: 500 }
    );
  }
}

// DELETE all timetables
export async function DELETE() {
  try {
    await connectToDatabase();
    await Timetable.deleteMany({});
    return NextResponse.json(
      { message: "All timetables deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Timetable] Failed to delete timetables:", error);
    return NextResponse.json(
      { message: "Failed to delete timetables" },
      { status: 500 }
    );
  }
}
