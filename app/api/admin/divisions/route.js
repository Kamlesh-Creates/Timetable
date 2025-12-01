import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Division from "../../../../models/Division";

export async function GET() {
  await connectToDatabase();
  const divisions = await Division.find().sort({ name: 1 });
  return NextResponse.json({ divisions }, { status: 200 });
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { name } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  const division = await Division.create({
    name,
  });

  return NextResponse.json({ division }, { status: 201 });
}

