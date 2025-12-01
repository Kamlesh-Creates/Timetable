import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Division from "../../../../../models/Division";

export async function GET(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const division = await Division.findById(id);
  if (!division) {
    return NextResponse.json({ message: "Division not found" }, { status: 404 });
  }
  return NextResponse.json({ division }, { status: 200 });
}

export async function PUT(request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const body = await request.json();
  const { name } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  const updated = await Division.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: "Division not found" }, { status: 404 });
  }

  return NextResponse.json({ division: updated }, { status: 200 });
}

export async function DELETE(_request, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const deleted = await Division.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json({ message: "Division not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}


