import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request) {
  try {
    const { timetableData } = await request.json();

    if (!timetableData) {
      return NextResponse.json(
        { message: "Timetable data is required" },
        { status: 400 }
      );
    }

    // Build HTML string
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
              color: #333;
            }
            h2 { 
              text-align: center; 
              margin-top: 40px;
              margin-bottom: 15px;
              color: #2c3e50;
              page-break-before: always;
            }
            h2:first-of-type {
              page-break-before: auto;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin-bottom: 50px;
            }
            th, td { 
              border: 1px solid #333; 
              padding: 10px; 
              text-align: center; 
              font-size: 11px;
              vertical-align: middle;
            }
            th { 
              background-color: #34495e;
              color: white;
              font-weight: bold;
              font-size: 12px;
            }
            th.day-header {
              background-color: #2c3e50;
            }
            td.free { 
              background-color: #ecf0f1;
              color: #95a5a6;
              font-style: italic;
            }
            td.lunch { 
              background-color: #f39c12;
              color: white;
              font-weight: bold;
            }
            .subject-name {
              font-weight: bold;
              color: #2c3e50;
              font-size: 12px;
              margin-bottom: 4px;
            }
            .teacher-name {
              color: #555;
              font-size: 10px;
              margin-bottom: 2px;
            }
            .room-name {
              color: #777;
              font-size: 9px;
            }
          </style>
        </head>
        <body>
          <h1>College Timetable</h1>
    `;

    // Process each division
    for (const division in timetableData) {
      html += `<h2>Division: ${division}</h2>`;
      html += `<table>`;
      
      // Get days from the division data
      const days = Object.keys(timetableData[division]);
      const numSlots = timetableData[division][days[0]].length;
      
      // Create header row with Time Slot and Days
      html += `<tr><th>Time Slot</th>`;
      for (const day of days) {
        html += `<th class="day-header">${day}</th>`;
      }
      html += `</tr>`;

      // Create rows for each time slot
      for (let slot = 0; slot < numSlots; slot++) {
        html += `<tr>`;
        html += `<td><strong>Slot ${slot + 1}</strong></td>`;

        // Add cell for each day
        for (const day of days) {
          const entry = timetableData[division][day][slot];
          let cellClass = "";
          let cellContent = "";

          if (entry.class === "FREE") {
            cellClass = "free";
            cellContent = "FREE";
          } else if (entry.class === "LUNCH") {
            cellClass = "lunch";
            cellContent = "LUNCH BREAK";
          } else {
            // Regular class entry with subject, teacher, and classroom
            cellContent = `
              <div class="subject-name">${entry.class || "N/A"}</div>
              ${entry.teacher ? `<div class="teacher-name">${entry.teacher}</div>` : ""}
              ${entry.room ? `<div class="room-name">${entry.room}</div>` : ""}
            `;
          }

          html += `<td class="${cellClass}">${cellContent}</td>`;
        }

        html += `</tr>`;
      }

      html += `</table>`;
    }

    html += `</body></html>`;

    // Launch Puppeteer and generate PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      landscape: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    // Return PDF as response
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
