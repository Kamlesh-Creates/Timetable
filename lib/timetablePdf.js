const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DEFAULT_PERIOD_LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];

function formatDateLabel(rawDate) {
  if (!rawDate) {
    return new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  }
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

function normalizeDivisionData(resultJson, division) {
  const root =
    (resultJson?.result && typeof resultJson.result === "object" ? resultJson.result : null) ||
    (typeof resultJson?.divisions === "object" && !Array.isArray(resultJson.divisions)
      ? resultJson.divisions
      : null) ||
    resultJson;

  const divisionData = root?.[division];
  if (!divisionData || typeof divisionData !== "object") {
    return [];
  }

  return Object.entries(divisionData).map(([day, slots]) => ({
    day,
    periods: Array.isArray(slots)
      ? slots.map((slot) => ({
          subject:
            slot?.class ||
            slot?.subject ||
            slot?.name ||
            slot?.course ||
            slot?.title ||
            "",
          teacher: slot?.teacher || slot?.faculty || slot?.instructor || "",
          room: slot?.room || slot?.classroom || slot?.location || "",
          isLunch: (slot?.class || slot?.subject || "").toUpperCase() === "LUNCH",
          isFree: (slot?.class || slot?.subject || "").toUpperCase() === "FREE",
        }))
      : [],
  }));
}

function inferPeriodLabels(resultJson, normalizedDays) {
  if (Array.isArray(resultJson?.periods) && resultJson.periods.length > 0) {
    return resultJson.periods;
  }
  if (Array.isArray(resultJson?.periodLabels) && resultJson.periodLabels.length > 0) {
    return resultJson.periodLabels;
  }
  const metaPeriods = resultJson?.meta?.periods;
  if (Array.isArray(metaPeriods) && metaPeriods.length > 0) {
    return metaPeriods;
  }
  const maxPeriods = normalizedDays.reduce(
    (max, day) => Math.max(max, Array.isArray(day.periods) ? day.periods.length : 0),
    0
  );
  if (maxPeriods > 0) {
    return Array.from({ length: maxPeriods }, (_, index) => `P${index + 1}`);
  }
  return DEFAULT_PERIOD_LABELS;
}

function safeText(value, fallback = "") {
  if (value === null || value === undefined) return fallback;
  return String(value);
}

function renderCell(slot) {
  if (!slot || Object.keys(slot).length === 0) {
    return "";
  }

  if (slot.isLunch) {
    return `<div style="font-weight:600;font-size:12px;color:#b45309;">Lunch</div>`;
  }

  if (slot.isFree) {
    return `<div style="font-weight:600;font-size:12px;color:#94a3b8;">Free</div>`;
  }

  const subject = safeText(slot.subject);
  const teacher = safeText(slot.teacher);
  const room = safeText(slot.room);

  return `
    ${subject ? `<div style="font-weight:600;font-size:12px;color:#0f172a;">${subject}</div>` : ""}
    ${teacher ? `<div style="font-size:10px;color:#334155;margin-top:2px;">${teacher}</div>` : ""}
    ${room ? `<div style="font-size:10px;color:#475569;margin-top:1px;">${room}</div>` : ""}
  `;
}

export function getTimetableHtml(resultJson = {}, division) {
  const sourceRoot =
    (resultJson?.result && typeof resultJson.result === "object" ? resultJson.result : null) ||
    (typeof resultJson?.divisions === "object" && !Array.isArray(resultJson.divisions)
      ? resultJson.divisions
      : null) ||
    resultJson;
  const resolvedDivision = division || Object.keys(sourceRoot || {})[0] || "";

  const normalizedDays = normalizeDivisionData(resultJson, resolvedDivision);
  const daysOrder = resultJson?.meta?.days || resultJson?.settings?.days || DEFAULT_DAYS;
  const orderedDays = normalizedDays.sort((a, b) => {
    const indexA = daysOrder.indexOf(a.day);
    const indexB = daysOrder.indexOf(b.day);
    if (indexA === -1 && indexB === -1) return a.day.localeCompare(b.day);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const periodLabels = inferPeriodLabels(resultJson, orderedDays);

  const instituteName =
    safeText(
      resultJson?.meta?.instituteName ||
        resultJson?.meta?.institute ||
        resultJson?.settings?.institute ||
        "Smart Timetable Institute"
    );
  const department =
    safeText(
      resultJson?.meta?.department ||
        resultJson?.meta?.dept ||
        division ||
        "Department"
    );
  const academicYear =
    safeText(
      resultJson?.meta?.academicYear ||
        resultJson?.meta?.year ||
        new Date().getFullYear()
    );
  const className =
    safeText(
      resultJson?.meta?.className ||
        resultJson?.meta?.class ||
        division ||
        "Class"
    );
  const teacherName = safeText(resultJson?.meta?.classTeacher || "");
  const wefDate = formatDateLabel(resultJson?.meta?.wef || resultJson?._generatedAt);
  const revision = formatDateLabel(resultJson?.meta?.revision || resultJson?._updatedAt || resultJson?._generatedAt);

  const headerSection = `
    <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div>
        <div style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:4px;">${instituteName}</div>
        <div style="font-size:13px;color:#475569;">Academic Timetable (${division})</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:64px;height:64px;border:1px dashed #94a3b8;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#94a3b8;">
          Logo
        </div>
        <div style="text-align:right;">
          <div style="font-size:12px;color:#475569;">Generated: ${formatDateLabel(resultJson?._generatedAt)}</div>
          <div style="font-size:12px;color:#475569;">Revision: ${revision}</div>
        </div>
      </div>
    </header>
  `;

  const metadataSection = `
    <section style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;font-size:12px;color:#0f172a;margin-bottom:18px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Department</div>
        <div style="font-weight:600;margin-top:4px;">${department}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Academic Year</div>
        <div style="font-weight:600;margin-top:4px;">${academicYear}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Class</div>
        <div style="font-weight:600;margin-top:4px;">${className}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">Class Teacher</div>
        <div style="font-weight:600;margin-top:4px;">${teacherName || "-"}</div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
        <div style="font-size:10px;text-transform:uppercase;color:#94a3b8;letter-spacing:0.08em;">W.E.F Date</div>
        <div style="font-weight:600;margin-top:4px;">${wefDate}</div>
      </div>
    </section>
  `;

  const tableHeaderCells = periodLabels
    .map(
      (label) => `
        <th style="background:#0f172a;color:#e2e8f0;font-size:12px;font-weight:600;padding:10px;border:1px solid #e2e8f0;">
          ${label}
        </th>
      `
    )
    .join("");

  const tableRows = orderedDays
    .map(({ day, periods }) => {
      const cells = periodLabels.map((_, idx) => {
        const slot = periods?.[idx] || null;
        const lunchStyles = slot?.isLunch ? "background:#fef3c7;" : "";
        return `<td style="border:1px solid #e2e8f0;padding:8px;min-width:110px;vertical-align:top;${lunchStyles}">${renderCell(
          slot
        )}</td>`;
      });

      return `
        <tr>
          <td style="border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;padding:10px;min-width:90px;">
            ${safeText(day)}
          </td>
          ${cells.join("")}
        </tr>
      `;
    })
    .join("");

  const timetableTable = `
    <table style="width:100%;border-collapse:collapse;table-layout:fixed;font-family:'Segoe UI', 'Helvetica Neue', sans-serif;">
      <thead>
        <tr>
          <th style="background:#0f172a;color:#e2e8f0;font-size:12px;font-weight:600;padding:10px;border:1px solid #e2e8f0;min-width:90px;">Days</th>
          ${tableHeaderCells}
        </tr>
      </thead>
      <tbody>
        ${
          tableRows ||
          `<tr><td colspan="${
            periodLabels.length + 1
          }" style="text-align:center;padding:24px;border:1px solid #e2e8f0;color:#94a3b8;">No timetable data available for this division.</td></tr>`
        }
      </tbody>
    </table>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${instituteName} - ${division} Timetable</title>
      </head>
      <body style="font-family:'Segoe UI','Helvetica Neue',sans-serif;margin:0;padding:32px;background:#ffffff;color:#0f172a;">
        ${headerSection}
        ${metadataSection}
        ${timetableTable}
        <footer style="margin-top:24px;font-size:10px;color:#94a3b8;text-align:right;">
          Generated via Smart Timetable Scheduler • ${formatDateLabel(resultJson?._generatedAt)}
        </footer>
      </body>
    </html>
  `;
}

