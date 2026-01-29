import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export async function POST(request) {
  try {
    const { timetableData } = await request.json();

    if (!timetableData) {
      return NextResponse.json(
        { message: "Timetable data is required" },
        { status: 400 }
      );
    }

    let html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1 {
              text-align: center;
              margin-bottom: 30px;
            }
            h2 {
              margin-top: 40px;
              text-align: center;
              page-break-before: always;
            }
            h3 {
              margin-top: 25px;
              text-align: center;
              color: #2c3e50;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 40px;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: center;
              font-size: 11px;
            }
            th {
              background-color: #34495e;
              color: white;
            }
            th.day-header {
              background-color: #2c3e50;
            }
            td.free {
              background-color: #ecf0f1;
              color: #7f8c8d;
              font-style: italic;
            }
            td.lunch {
              background-color: #f39c12;
              color: white;
              font-weight: bold;
            }
            td.lab {
              background-color: #d6eaf8;
            }
            .subject {
              font-weight: bold;
              font-size: 12px;
            }
            .teacher {
              font-size: 10px;
              color: #555;
            }
            .room {
              font-size: 9px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <h1>College Timetable</h1>
    `;

    // Division level
    for (const division in timetableData) {
      html += `<h2>Division: ${division}</h2>`;

      const batches = timetableData[division];

      // Batch level (DIV-A1, DIV-A2...)
      for (const batch in batches) {
        html += `<h3>Batch: ${batch}</h3>`;
        html += `<table>`;

        const days = Object.keys(batches[batch]);
        const slotsCount = batches[batch][days[0]].length;

        // Header
        html += `<tr><th>Slot</th>`;
        for (const day of days) {
          html += `<th class="day-header">${day}</th>`;
        }
        html += `</tr>`;

        // Slots
        for (let slot = 0; slot < slotsCount; slot++) {
          html += `<tr>`;
          html += `<td><strong>${slot + 1}</strong></td>`;

          for (const day of days) {
            const entry = batches[batch][day][slot];
            let cellClass = "";
            let content = "";

            if (!entry || entry.type === "FREE") {
              cellClass = "free";
              content = "FREE";
            } else if (entry.type === "COMMON" && entry.class === "LUNCH") {
              cellClass = "lunch";
              content = "LUNCH";
            } else {
              if (entry.type === "LAB") cellClass = "lab";

              content = `
                <div class="subject">${entry.class}</div>
                ${entry.teacher ? `<div class="teacher">${entry.teacher}</div>` : ""}
                ${entry.room ? `<div class="room">${entry.room}</div>` : ""}
              `;
            }

            html += `<td class="${cellClass}">${content}</td>`;
          }

          html += `</tr>`;
        }

        html += `</table>`;
      }
    }

    html += `</body></html>`;

    // Generate PDF
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
        "Content-Disposition": "attachment; filename=timetable.pdf",
      },
    });
  } catch (error) {
    console.error("[PDF] Generation error:", error);
    return NextResponse.json(
      {
        message: "Failed to generate PDF",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
