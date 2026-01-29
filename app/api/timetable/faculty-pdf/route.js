import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://localhost:8000";

export async function GET() {
  try {
    // Call Python API to generate faculty timetable
    const response = await fetch(`${PYTHON_API_URL}/generate-faculty-timetable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Faculty Timetable] Python API error:", errorText);
      return NextResponse.json(
        {
          message: `Failed to generate faculty timetable: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    const facultyTimetable = data.faculty_timetable || data;

    // Generate HTML for faculty timetable
    const html = generateFacultyTimetableHTML(facultyTimetable);

    // Return HTML as response (frontend will handle PDF generation via print)
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("[Faculty Timetable] Error:", error);
    return NextResponse.json(
      {
        message: "Failed to generate faculty timetable",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

function generateFacultyTimetableHTML(facultyTimetable) {
  let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Faculty Timetable</title>
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
            padding: 10px;
            text-align: center;
            font-size: 11px;
          }
          th {
            background-color: #1A4C8B;
            color: white;
            font-weight: bold;
            font-size: 12px;
          }
          th.day-header {
            background-color: #2c3e50;
            font-size: 13px;
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
          td.occupied {
            background-color: #d6eaf8;
          }
          .subject {
            font-weight: bold;
            font-size: 12px;
            color: #1A4C8B;
          }
          .division {
            font-size: 10px;
            color: #555;
            margin-top: 3px;
          }
          .room {
            font-size: 9px;
            color: #777;
            margin-top: 2px;
          }
          .no-data {
            text-align: center;
            padding: 40px;
            color: #999;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <h1>Faculty/Teacher Timetable</h1>
  `;

  if (!facultyTimetable || Object.keys(facultyTimetable).length === 0) {
    html += '<div class="no-data">No faculty timetable data available.</div>';
  } else {
    let teacherIndex = 0;
    
    // Iterate through each teacher
    for (const teacherName in facultyTimetable) {
      if (teacherIndex > 0) {
        html += '<div class="page-break"></div>';
      }
      
      html += `<h2>Faculty: ${teacherName}</h2>`;
      
      const schedule = facultyTimetable[teacherName];
      
      if (!schedule || Object.keys(schedule).length === 0) {
        html += '<div class="no-data">No schedule available for this faculty member.</div>';
        teacherIndex++;
        continue;
      }

      // Get days and slots
      const days = Object.keys(schedule);
      const firstDay = days[0];
      const slots = schedule[firstDay] || [];
      const slotsCount = slots.length;

      html += '<table>';
      
      // Header row with time slots
      html += '<tr><th class="day-header">Day / Time</th>';
      for (let i = 0; i < slotsCount; i++) {
        html += `<th>Slot ${i + 1}</th>`;
      }
      html += '</tr>';

      // Rows for each day
      for (const day of days) {
        html += `<tr><th class="day-header">${day}</th>`;
        const daySlots = schedule[day] || [];
        
        for (const slot of daySlots) {
          if (!slot || slot === "Free" || slot === "") {
            html += '<td class="free">Free</td>';
          } else if (typeof slot === "string" && slot.toLowerCase().includes("lunch")) {
            html += '<td class="lunch">Lunch Break</td>';
          } else if (typeof slot === "object") {
            // Slot contains subject, division, room info
            const subject = slot.subject || slot.Subject || "";
            const division = slot.division || slot.Division || "";
            const room = slot.room || slot.Room || "";
            
            html += '<td class="occupied">';
            if (subject) {
              html += `<div class="subject">${subject}</div>`;
            }
            if (division) {
              html += `<div class="division">Division: ${division}</div>`;
            }
            if (room) {
              html += `<div class="room">Room: ${room}</div>`;
            }
            html += '</td>';
          } else {
            // Plain string with subject name
            html += `<td class="occupied"><div class="subject">${slot}</div></td>`;
          }
        }
        
        html += '</tr>';
      }
      
      html += '</table>';
      teacherIndex++;
    }
  }

  html += `
      </body>
    </html>
  `;

  return html;
}
