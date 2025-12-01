import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Subject from "../../../../models/Subject";

export async function GET() {
  await connectToDatabase();
  const subjects = await Subject.find().sort({ name: 1 });
  return NextResponse.json({ subjects }, { status: 200 });
}

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  const { name, type } = body || {};

  if (!name) {
    return NextResponse.json(
      { message: "Name is required" },
      { status: 400 }
    );
  }

  try {
    const subject = await Subject.create({
      name,
      type: type || "theory",
    });

    return NextResponse.json({ subject }, { status: 201 });
  } catch (error) {
    console.error("[Subjects] Failed to create subject", error);

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "Subject with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create subject" },
      { status: 500 }
    );
  }
}

