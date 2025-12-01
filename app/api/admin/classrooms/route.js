import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Classroom from "../../../../models/Classroom";

export async function GET() {
  await connectToDatabase();
  const classrooms = await Classroom.find().populate("subjects").sort({ name: 1 });
  return NextResponse.json({ classrooms }, { status: 200 });
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { name, subjects } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  const classroom = await Classroom.create({
    name,
    subjects: Array.isArray(subjects) ? subjects : [],
  });

  return NextResponse.json({ classroom }, { status: 201 });
}

