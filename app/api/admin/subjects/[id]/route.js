import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Subject from "../../../../../models/Subject";

export async function GET(_request, context) {
  await connectToDatabase();
  const { id } = await context.params;
  const subject = await Subject.findById(id);
  if (!subject) {
    return NextResponse.json({ message: "Subject not found" }, { status: 404 });
  }
  return NextResponse.json({ subject }, { status: 200 });
}

export async function PUT(request, context) {
  await connectToDatabase();
  const { id } = await context.params;
  const body = await request.json();
  const { name, type, frequency } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  try {
    const updated = await Subject.findByIdAndUpdate(
      id,
      {
        name,
        type: type || "theory",
        frequency: frequency || 1,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Subject not found" }, { status: 404 });
    }

    return NextResponse.json({ subject: updated }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update subject" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, context) {
  await connectToDatabase();
  const { id } = await context.params;
  const deleted = await Subject.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Subject not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}


