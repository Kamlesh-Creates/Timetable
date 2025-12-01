import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Teacher from "../../../../models/Teacher";

export async function GET() {
  await connectToDatabase();
  const teachers = await Teacher.find().populate("subjects").sort({ name: 1 });
  return NextResponse.json({ teachers }, { status: 200 });
}

export async function POST(request) {
  await connectToDatabase();
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
    const teacher = await Teacher.create({
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
    });

    return NextResponse.json({ teacher }, { status: 201 });
  } catch (error) {
    console.error("[Teachers] Failed to create teacher", error);
    return NextResponse.json(
      {
        message:
          error.message || "Failed to create teacher",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

