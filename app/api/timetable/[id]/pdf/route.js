import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Timetable from "../../../../../models/Timetable";
import Setting from "../../../../../models/Setting";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams || {};
  const searchParams = new URL(request.url).searchParams;
  const division = searchParams.get("division");

  if (!id) {
    return NextResponse.json(
      { message: "Timetable id is required" },
      { status: 400 }
    );
  }

  if (!division) {
    return NextResponse.json(
      { message: "Query parameter 'division' is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const [timetableDoc, settings] = await Promise.all([
      Timetable.findById(id),
      Setting.findOne(),
    ]);

    if (!timetableDoc) {
      return NextResponse.json(
        { message: "Timetable not found" },
        { status: 404 }
      );
    }

    if (!settings) {
      return NextResponse.json(
        { message: "Settings not configured" },
        { status: 400 }
      );
    }

    const rawPayload =
      timetableDoc.result && Object.keys(timetableDoc.result).length > 0
        ? timetableDoc.result
        : timetableDoc.data || {};

    const timetablePayload =
      rawPayload.timetable && typeof rawPayload.timetable === "object"
        ? rawPayload.timetable
        : rawPayload;

    const trimmedDivision = division.trim();
    const keys = Object.keys(timetablePayload || {});

    // Try to match requested division; if not found, fall back to first available
    const matchedKey =
      keys.find(
        (key) => key.trim().toLowerCase() === trimmedDivision.toLowerCase()
      ) || keys[0];

    // Filter timetable to only include the requested division
    const filteredTimetable = {
      [matchedKey]: timetablePayload[matchedKey]
    };

    // Send timetable data and settings to Python API for PDF generation
    const pythonResponse = await fetch(`${PYTHON_API_URL}/generate-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timetable: filteredTimetable,
        settings: {
          days: settings.days,
          start_hour: settings.start_hour,
          end_hour: settings.end_hour,
          lunch_start_hour: settings.lunch_start_hour,
        },
      }),
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      console.error("[PDF] Python API error:", errorText);
      return NextResponse.json(
        {
          message: `Python PDF server returned an error: ${pythonResponse.status}`,
          details: errorText,
        },
        { status: 502 }
      );
    }

    // Get PDF buffer from Python API
    const pdfBuffer = await pythonResponse.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="timetable-${division}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[Timetable PDF] generation failed:", error);
    return NextResponse.json(
      { message: "Failed to generate PDF", error: error.message },
      { status: 500 }
    );
  }
}

