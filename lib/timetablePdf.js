function pad(value) {
  return value.toString().padStart(2, "0");
}

function formatLabel(hour) {
  const h = hour % 12 || 12;
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${pad(h)}:00 ${suffix}`;
}

function generatePeriods(settings = {}) {
  const start = Number.isFinite(settings.start_hour) ? settings.start_hour : 9;
  const end = Number.isFinite(settings.end_hour) ? settings.end_hour : 17;
  const lunch = Number.isFinite(settings.lunch_start_hour)
    ? settings.lunch_start_hour
    : null;

  const periods = [];
  for (let hour = start; hour < end; hour++) {
    periods.push({
      label: formatLabel(hour),
      isLunch: lunch !== null && hour === lunch,
    });
  }
  return periods;
}

function renderSlot(slot = {}) {
  if (!slot || Object.keys(slot).length === 0) {
    return `<span style="font-size:10px;color:#94a3b8;">Free</span>`;
  }

  const slotClass = typeof slot === "string" ? slot : slot.class;

  if (
    slot === "-" ||
    slotClass?.toUpperCase() === "FREE" ||
    slotClass?.toUpperCase() === "FREE SLOT"
  ) {
    return `<span style="font-size:10px;color:#94a3b8;">Free</span>`;
  }

  if (
    slotClass?.toUpperCase() === "LUNCH" ||
    slot.type?.toUpperCase() === "LUNCH"
  ) {
    return `<strong style="color:#b45309;">Lunch</strong>`;
  }

  const subject = slotClass
    ? `<strong style="color:#1f2937;">${slotClass}</strong>`
    : "";
  const teacher = slot.teacher
    ? `<span style="font-size:10px;color:#475569;">${slot.teacher}</span>`
    : "";
  const room = slot.room
    ? `<span style="font-size:10px;color:#475569;">${slot.room}</span>`
    : "";

  return `${subject}${teacher ? "<br/>" + teacher : ""}${
    room ? "<br/>" + room : ""
  }`;
}

export function getTimetableHtml(
  timetableData,
  divisionName,
  settings = {},
  generatedAt = new Date()
) {
  if (!timetableData || !divisionName || !timetableData[divisionName]) {
    return `<p style="font-family:sans-serif;padding:20px;">No timetable data found for division: ${divisionName}</p>`;
  }

  const divisionSchedule = timetableData[divisionName];
  const days = settings.days?.length
    ? settings.days
    : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const periods = generatePeriods(settings);

  const headerHtml = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #e5e7eb;">
      <div style="display:flex;align-items:center;">
        <div style="width:32px;height:32px;background-color:#1A4C8B;border-radius:6px;display:flex;justify-content:center;align-items:center;color:white;font-weight:700;font-size:12px;margin-right:12px;">ST</div>
        <div>
          <p style="margin:0;font-size:18px;font-weight:600;color:#0f172a;">Smart Timetable</p>
          <p style="margin:0;margin-top:2px;font-size:12px;color:#475569;">Institute Timetable Division</p>
        </div>
      </div>
      <div style="text-align:right;font-size:12px;color:#475569;">
        <p style="margin:0;">Generated: ${new Date(
          generatedAt
        ).toLocaleString()}</p>
        <p style="margin:0;">Printed: ${new Date().toLocaleString()}</p>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:20px;font-size:12px;color:#475569;">
      <div>
        <p style="margin:0;"><strong>Division:</strong> ${divisionName}</p>
        <p style="margin:0;"><strong>Academic Year:</strong> 2024-25</p>
        <p style="margin:0;"><strong>Department:</strong> Institute of Excellence</p>
      </div>
      <div>
        <p style="margin:0;"><strong>W.E.F. Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p style="margin:0;"><strong>Revision:</strong> ${new Date(
          generatedAt
        ).toLocaleDateString()}</p>
        <p style="margin:0;"><strong>Prepared by:</strong> Automated Scheduler</p>
      </div>
    </div>
  `;

  const tableHead = `
    <thead>
      <tr style="background-color:#f1f5f9;">
        <th style="border:1px solid #cbd5e1;padding:10px;text-align:left;width:90px;color:#475569;">Day</th>
        ${periods
          .map(
            (p) =>
              `<th style="border:1px solid #cbd5e1;padding:10px;text-align:center;color:#475569;">${p.label}</th>`
          )
          .join("")}
      </tr>
    </thead>
  `;

  const tableBody = `
    <tbody>
      ${days
        .map((day) => {
          const slots = Array.isArray(divisionSchedule[day])
            ? divisionSchedule[day]
            : [];

          return `
            <tr>
              <td style="border:1px solid #cbd5e1;padding:10px;font-weight:600;background-color:#f8fafc;color:#1f2937;">${day}</td>
              ${periods
                .map((period, idx) => {
                  const slot = slots[idx];
                  const lunchBg = period.isLunch
                    ? "background-color:#fef3c7;"
                    : "";
                  return `
                    <td style="border:1px solid #cbd5e1;padding:10px;text-align:center;vertical-align:top;${lunchBg}">
                      ${renderSlot(slot)}
                    </td>
                  `;
                })
                .join("")}
            </tr>
          `;
        })
        .join("")}
    </tbody>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Timetable - ${divisionName}</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            margin: 32px;
            color: #0f172a;
          }
        </style>
      </head>
      <body>
        ${headerHtml}
        <table style="width:100%;border-collapse:collapse;font-size:12px;border:1px solid #cbd5e1;">
          ${tableHead}
          ${tableBody}
        </table>
      </body>
    </html>
  `;
}

export default getTimetableHtml;

