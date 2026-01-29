import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    // Call Python API to generate free slots
    const response = await fetch(`${PYTHON_API_URL}/generate-free-slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Free Slots] Python API error:", errorText);
      return NextResponse.json(
        {
          message: `Failed to generate free slots: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const freeSlots = data.free_slots || data;

    // Generate HTML for free slots
    const html = generateFreeSlotsHTML(freeSlots);

    // Return HTML as response (frontend will handle PDF generation via print)
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("[Free Slots] Error:", error);
    return NextResponse.json(
      {
        message: "Failed to generate free slots",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

function generateFreeSlotsHTML(freeSlots) {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Free Room Slots</title>
        <style>
          @media print {
            body { margin: 0; }
            .page-break { page-break-before: always; }
          }
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.4;
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #1A4C8B;
            font-size: 24px;
          }
          h2 {
            margin-top: 40px;
            text-align: center;
            color: #2c3e50;
            font-size: 20px;
            padding: 10px;
            background-color: #f0f4f8;
            border-radius: 5px;
          }
          .page-break {
            margin-top: 40px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 30px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          th, td {
            border: 1px solid #333;
            padding: 12px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background-color: #1A4C8B;
            color: white;
            font-weight: bold;
            font-size: 13px;
            width: 120px;
          }
          td {
            background-color: #d4edda;
            color: #155724;
          }
          .time-slot {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 6px 12px;
            margin: 4px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
          }
          .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
            font-style: italic;
          }
          .no-slots {
            color: #999;
            font-style: italic;
            text-align: center;
          }
          .summary {
            background-color: #e8f4f8;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            border-left: 4px solid #1A4C8B;
          }
          .summary p {
            margin: 5px 0;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <h1>Free Room Slots</h1>
  `;

  if (!freeSlots || Object.keys(freeSlots).length === 0) {
    html += '<div class="no-data">No free slots data available.</div>';
  } else {
    let roomIndex = 0;
    
    // Iterate through each room
    for (const roomName in freeSlots) {
      if (roomIndex > 0) {
        html += '<div class="page-break"></div>';
      }
      
      html += `<h2>Room: ${roomName}</h2>`;
      
      const schedule = freeSlots[roomName];
      
      if (!schedule || Object.keys(schedule).length === 0) {
        html += '<div class="no-data">No schedule available for this room.</div>';
        roomIndex++;
        continue;
      }

      // Get days and calculate total free slots
      const days = Object.keys(schedule);
      let totalFreeSlots = 0;
      for (const day of days) {
        const daySlots = schedule[day] || [];
        totalFreeSlots += daySlots.length;
      }

      html += `
        <div class="summary">
          <p><strong>Total Free Slots:</strong> ${totalFreeSlots} slots across ${days.length} days</p>
        </div>
      `;

      html += '<table>';
      
      // Rows for each day
      for (const day of days) {
        const daySlots = schedule[day] || [];
        
        html += `<tr><th>${day}</th><td>`;
        
        if (daySlots.length === 0) {
          html += '<span class="no-slots">No free slots</span>';
        } else {
          // Display each free time slot as a badge
          for (const timeSlot of daySlots) {
            html += `<span class="time-slot">${timeSlot}</span>`;
          }
        }
        
        html += '</td></tr>';
      }
      
      html += '</table>';
      roomIndex++;
    }
  }

  html += `
      </body>
    </html>
  `;

  return html;
}
