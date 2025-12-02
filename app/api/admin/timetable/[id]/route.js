import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Timetable from "../../../../../models/Timetable";

// GET single timetable by ID
export async function GET(_request, context) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const timetable = await Timetable.findById(id);
    
    if (!timetable) {
      return NextResponse.json(
        { message: "Timetable not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ timetable }, { status: 200 });
  } catch (error) {
    console.error("[Timetable] Failed to fetch timetable:", error);
    return NextResponse.json(
      { message: "Failed to fetch timetable" },
      { status: 500 }
    );
  }
}

// DELETE single timetable by ID
export async function DELETE(_request, context) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const deleted = await Timetable.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { message: "Timetable not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Timetable deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Timetable] Failed to delete timetable:", error);
    return NextResponse.json(
      { message: "Failed to delete timetable" },
      { status: 500 }
    );
  }
}
