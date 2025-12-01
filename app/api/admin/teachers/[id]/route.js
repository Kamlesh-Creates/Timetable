import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Teacher from "../../../../../models/Teacher";

export async function GET(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const teacher = await Teacher.findById(id).populate("subjects");
  if (!teacher) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }
  return NextResponse.json({ teacher }, { status: 200 });
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const body = await request.json();
  const {
    name,
    email,
    phone,
    subjects,
    availability,
    maxHoursPerDay,
    maxHoursPerWeek,
    unavailableDates,
  } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  try {
    const updated = await Teacher.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        subjects: Array.isArray(subjects) ? subjects : [],
        availability: Array.isArray(availability) ? availability : [],
        maxHoursPerDay,
        maxHoursPerWeek,
        unavailableDates: Array.isArray(unavailableDates)
          ? unavailableDates.map((d) => new Date(d))
          : [],
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json({ teacher: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update teacher" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const deleted = await Teacher.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}


