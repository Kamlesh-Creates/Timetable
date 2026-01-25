import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Classroom from "../../../../../models/Classroom";
import Subject from "../../../../../models/Subject";

export async function GET(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const classroom = await Classroom.findById(id).populate("subjects");
  if (!classroom) {
    return NextResponse.json({ message: "Classroom not found" }, { status: 404 });
  }
  return NextResponse.json({ classroom }, { status: 200 });
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const body = await request.json();
  const { name, subjects } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  const updated = await Classroom.findByIdAndUpdate(
    id,
    {
      name,
      subjects: Array.isArray(subjects) ? subjects : [],
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Classroom not found" }, { status: 404 });
  }

  return NextResponse.json({ classroom: updated }, { status: 200 });
}

export async function DELETE(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const deleted = await Classroom.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Classroom not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}


