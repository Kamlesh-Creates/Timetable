import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { connectToDatabase } from "../../../../../lib/db";
import Timetable from "../../../../../models/Timetable";
import { getTimetableHtml } from "../../../../../lib/timetablePdf";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams || {};
  const searchParams = new URL(request.url).searchParams;
  const division = searchParams.get("division");

  if (!id) {
    return NextResponse.json({ message: "Timetable id is required" }, { status: 400 });
  }

  if (!division) {
    return NextResponse.json({ message: "Query parameter 'division' is required" }, { status: 400 });
  }

  await connectToDatabase();
  const timetableDoc = await Timetable.findById(id);

  if (!timetableDoc) {
    return NextResponse.json({ message: "Timetable not found" }, { status: 404 });
  }

  const timetablePayload =
    timetableDoc.result && Object.keys(timetableDoc.result).length > 0
      ? timetableDoc.result
      : timetableDoc.data || {};

  const resultJson = {
    ...JSON.parse(JSON.stringify(timetablePayload)),
    _generatedAt: timetableDoc.generatedAt,
    _updatedAt: timetableDoc.updatedAt,
  };

  const html = getTimetableHtml(resultJson, division);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "12mm", right: "12mm", bottom: "16mm", left: "12mm" },
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
    if (browser) {
      await browser.close();
    }
    console.error("[Timetable PDF] generation failed:", error);
    return NextResponse.json(
      { message: "Failed to generate PDF", error: error.message },
      { status: 500 }
    );
  }
}

