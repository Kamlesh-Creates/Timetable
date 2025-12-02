import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { connectToDatabase } from "../../../../../lib/db";
import Timetable from "../../../../../models/Timetable";
import Setting from "../../../../../models/Setting";
import { getTimetableHtml } from "../../../../../lib/timetablePdf";

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

    const html = getTimetableHtml(
      timetablePayload,
      matchedKey,
      settings,
      timetableDoc.generatedAt
    );

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });
    await browser.close();

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

