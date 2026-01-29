import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../../lib/db";
import Timetable from "../../../../../models/Timetable";
import Setting from "../../../../../models/Setting";
import getTimetableHtml from "../../../../../lib/timetablePdf";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

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

    // Log for debugging
    console.log("[PDF Debug] Division requested:", division);
    console.log("[PDF Debug] Matched key:", matchedKey);
    console.log("[PDF Debug] Available divisions:", keys);
    console.log("[PDF Debug] Settings:", {
      days: settings.days,
      start_hour: settings.start_hour,
      end_hour: settings.end_hour,
      lunch_start_hour: settings.lunch_start_hour,
    });

    // Generate HTML for the requested division (all batches in one grid)
    const html = getTimetableHtml(
      timetablePayload,
      matchedKey,
      {
        days: settings.days,
        start_hour: settings.start_hour,
        end_hour: settings.end_hour,
        lunch_start_hour: settings.lunch_start_hour,
      },
      timetableDoc.generatedAt || new Date()
    );

    console.log("[PDF Debug] HTML generated successfully");

    // Check if running locally or in production
    const isLocal = process.env.NODE_ENV === "development" || !process.env.VERCEL;
    
    let browser;
    try {
      if (isLocal) {
        // Local development: use local Chromium
        console.log("[PDF Debug] Launching local Chromium");
        const puppeteerFull = await import("puppeteer");
        browser = await puppeteerFull.default.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
      } else {
        // Production (Vercel): use serverless Chromium
        console.log("[PDF Debug] Launching serverless Chromium");
        
        const executablePath = await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar"
        );
        console.log("[PDF Debug] Chromium path:", executablePath);
        
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless,
        });
      }
    } catch (launchError) {
      console.error("[PDF Debug] Browser launch failed:", launchError);
      throw launchError;
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="timetable-${matchedKey}.pdf"`,
      },
    });
  } catch (error) {
    console.error("[Timetable PDF] generation failed:", error);
    console.error("[Timetable PDF] Stack trace:", error.stack);
    return NextResponse.json(
      { 
        message: "Failed to generate PDF", 
        error: error.message,
        stack: error.stack 
      },
      { status: 500 }
    );
  }
}

