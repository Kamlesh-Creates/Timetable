function pad(value) {
  return value.toString().padStart(2, "0");
}

function formatLabel(hour) {
  const h = hour % 12 || 12;
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${pad(h)}:00 ${suffix}`;
}

function renderSlotLine(batchKey, slot = {}, mode = "lab") {
  if (!slot || typeof slot !== "object" || Object.keys(slot).length === 0) {
    return "";
  }

  const classRaw = slot.class ? String(slot.class) : "";
  const teacherRaw = slot.teacher ? String(slot.teacher) : "";
  const roomRaw = slot.room ? String(slot.room) : "";

  if (!classRaw && !teacherRaw && !roomRaw) {
    return "";
  }

  const parts = [];
  if (teacherRaw) parts.push(teacherRaw);
  if (roomRaw) parts.push(roomRaw);
  const suffix = parts.length > 0 ? ` (${parts.join(" ")})` : "";

  // mode === "lecture": single line without batch label
  const lineText =
    mode === "lecture"
      ? `${classRaw || ""}${suffix}`.trim()
      : `${batchKey}: ${classRaw || ""}${suffix}`.trim();

  let color = "#0d47a1"; // lecture → blue
  if (mode === "lab") {
    color = "#1b5e20";
  }

  return `<div style="color:${color};font-size:11px;line-height:1.2;">${lineText}</div>`;
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

  const batchesForDivision = timetableData[divisionName] || {};
  const batchKeys = Object.keys(batchesForDivision);

  if (!batchKeys.length) {
    return `<p style="font-family:sans-serif;padding:20px;">No timetable data found for division: ${divisionName}</p>`;
  }

  const firstBatchSchedule = batchesForDivision[batchKeys[0]] || {};
  const days = settings.days?.length
    ? settings.days
    : Object.keys(firstBatchSchedule);

  // Fixed college-style columns with explicit times and a dedicated lunch column.
  // Mapping: 0–7 indices from JSON → 8 teaching periods; lunch column has no index.
  const columns = [
    { label: "9:00", periodIndex: 0 },
    { label: "10:00", periodIndex: 1 },
    { label: "11:00", periodIndex: 2 },
    { label: "12:00", periodIndex: 3 },
    { label: "LUNCH BREAK", periodIndex: null, isLunchColumn: true },
    { label: "1:00", periodIndex: 4 },
    { label: "2:00", periodIndex: 5 },
    { label: "3:00", periodIndex: 6 },
    { label: "4:00", periodIndex: 7 },
  ];

  const headerHtml = `
    <!-- Top header with logo, institute name, revision/date -->
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:6px;margin-bottom:6px;">
      <div style="width:80px;height:80px;border:1px solid #000;display:flex;align-items:center;justify-content:center;font-size:10px;">
        LOGO
      </div>
      <div style="flex:1;text-align:center;">
        <div style="font-size:20px;font-weight:700;text-transform:uppercase;">Your Institute Name</div>
        <div style="font-size:14px;margin-top:2px;">(Affiliated to XYZ University)</div>
      </div>
      <div style="border:1px solid #000;padding:6px 10px;font-size:11px;min-width:120px;">
        <div><strong>Rev. Date:</strong> ${new Date(
          generatedAt
        ).toLocaleDateString()}</div>
        <div><strong>Print Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    </div>

    <!-- Title -->
    <div style="text-align:center;margin-bottom:6px;">
      <span style="font-size:16px;font-weight:700;text-transform:uppercase;">Class Time Table</span>
    </div>

    <!-- Metadata row -->
    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;font-size:11px;">
      <tr>
        <td style="border:1px solid #000;padding:4px 6px;width:22%;">
          <strong>Department:</strong> Institute of Excellence
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:16%;">
          <strong>Academic Year:</strong> 2024-25
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:14%;">
          <strong>Division:</strong> ${divisionName}
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:12%;">
          <strong>Batch:</strong> ${batchKeys.join(", ")}
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:18%;">
          <strong>Class Teacher:</strong> __________
        </td>
        <td style="border:1px solid #000;padding:4px 6px;width:18%;">
          <strong>W.E.F Date:</strong> ${new Date().toLocaleDateString()}
        </td>
      </tr>
    </table>
  `;

  const tableHead = `
    <thead>
      <tr>
        <th style="border:2px solid #000;padding:6px;text-align:center;width:72px;font-size:11px;">Day</th>
        ${columns
          .map((col) => {
            if (col.isLunchColumn) {
              return `
                <th style="border:2px solid #000;padding:0 4px;text-align:center;width:40px;vertical-align:middle;">
                  <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;font-weight:700;">
                    LUNCH BREAK
                  </div>
                </th>
              `;
            }
            return `<th style="border:2px solid #000;padding:6px 4px;text-align:center;font-size:11px;">${col.label}</th>`;
          })
          .join("")}
      </tr>
    </thead>
  `;

  const tableBody = `
    <tbody>
      ${days
        .map((day) => {
          return `
            <tr>
              <td style="border:2px solid #000;padding:6px 4px;font-weight:700;background-color:#f5f5f5;text-align:center;font-size:11px;">${day}</td>
              ${(() => {
                const cells = [];
                for (let colIndex = 0; colIndex < columns.length; colIndex++) {
                  const col = columns[colIndex];

                  if (col.isLunchColumn) {
                    cells.push(
                      `<td style="border:2px solid #000;padding:0;background-color:#fff9c4;"></td>`
                    );
                    continue;
                  }

                  const idx = col.periodIndex;

                  const slotsForColumn = batchKeys.map((batchKey) => {
                    const batchSchedule = batchesForDivision[batchKey] || {};
                    const slotsForDay = Array.isArray(batchSchedule[day])
                      ? batchSchedule[day]
                      : [];
                    const slot =
                      Array.isArray(slotsForDay) && idx != null
                        ? slotsForDay[idx]
                        : null;
                    return { batchKey, slot };
                  });

                  const normalized = slotsForColumn.map(({ batchKey, slot }) => {
                    if (!slot || typeof slot !== "object") {
                      return {
                        batchKey,
                        slot: null,
                        type: "",
                        cls: "",
                      };
                    }
                    const type = slot.type ? String(slot.type).toUpperCase() : "";
                    const cls = slot.class ? String(slot.class).toUpperCase() : "";
                    return { batchKey, slot, type, cls };
                  });

                  const hasLunch = normalized.some(({ cls }) => cls === "LUNCH");
                  const allFreeOrEmpty = normalized.every(({ slot, type }) => {
                    if (!slot || !Object.keys(slot).length) return true;
                    return type === "FREE";
                  });

                  // LUNCH overrides everything
                  if (hasLunch) {
                    cells.push(
                      `<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:middle;background-color:#fff9c4;font-size:11px;font-weight:700;">
                        LUNCH
                      </td>`
                    );
                    continue;
                  }

                  // Try to detect 2-hour LAB block starting at this column
                  let usedColspan2 = false;
                  const nextCol = columns[colIndex + 1];
                  if (
                    nextCol &&
                    !nextCol.isLunchColumn &&
                    typeof nextCol.periodIndex === "number" &&
                    typeof idx === "number" &&
                    nextCol.periodIndex === idx + 1
                  ) {
                    const idxNext = nextCol.periodIndex;
                    const hasSpanningLab = batchKeys.some((batchKey) => {
                      const batchSchedule = batchesForDivision[batchKey] || {};
                      const slotsForDay = Array.isArray(batchSchedule[day])
                        ? batchSchedule[day]
                        : [];
                      const curr =
                        Array.isArray(slotsForDay) && idx != null
                          ? slotsForDay[idx]
                          : null;
                      const next =
                        Array.isArray(slotsForDay) && idxNext != null
                          ? slotsForDay[idxNext]
                          : null;

                      if (!curr || !next) return false;
                      if (
                        typeof curr !== "object" ||
                        typeof next !== "object"
                      ) {
                        return false;
                      }

                      const currType = curr.type
                        ? String(curr.type).toUpperCase()
                        : "";
                      const nextType = next.type
                        ? String(next.type).toUpperCase()
                        : "";

                      if (currType !== "LAB" || nextType !== "LAB") return false;

                      const currClass = curr.class || "";
                      const nextClass = next.class || "";
                      const currTeacher = curr.teacher || "";
                      const nextTeacher = next.teacher || "";

                      return (
                        currClass === nextClass && currTeacher === nextTeacher
                      );
                    });

                    if (hasSpanningLab) {
                      // Build LAB lines using the first period (idx)
                      const labLines = batchKeys
                        .map((batchKey) => {
                          const batchSchedule = batchesForDivision[batchKey] || {};
                          const slotsForDay = Array.isArray(batchSchedule[day])
                            ? batchSchedule[day]
                            : [];
                          const curr =
                            Array.isArray(slotsForDay) && idx != null
                              ? slotsForDay[idx]
                              : null;
                          const next =
                            Array.isArray(slotsForDay) && nextCol.periodIndex != null
                              ? slotsForDay[nextCol.periodIndex]
                              : null;

                          if (!curr || !next) return "";
                          if (
                            typeof curr !== "object" ||
                            typeof next !== "object"
                          ) {
                            return "";
                          }

                          const currType = curr.type
                            ? String(curr.type).toUpperCase()
                            : "";
                          const nextType = next.type
                            ? String(next.type).toUpperCase()
                            : "";

                          if (currType !== "LAB" || nextType !== "LAB") return "";

                          const currClass = curr.class || "";
                          const nextClass = next.class || "";
                          const currTeacher = curr.teacher || "";
                          const nextTeacher = next.teacher || "";

                          if (
                            currClass !== nextClass ||
                            currTeacher !== nextTeacher
                          ) {
                            return "";
                          }

                          return renderSlotLine(batchKey, curr, "lab");
                        })
                        .filter((html) => html && html.trim().length > 0)
                        .join("");

                      cells.push(
                        `<td colspan="2" style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:#dcedc8;font-size:11px;">
                          ${labLines}
                        </td>`
                      );
                      usedColspan2 = true;
                      colIndex++; // skip next column
                      continue;
                    }
                  }

                  if (allFreeOrEmpty) {
                    cells.push(
                      `<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:#ffffff;font-size:11px;">
                      </td>`
                    );
                    continue;
                  }

                  const lectureSlots = normalized.filter(
                    ({ slot, type }) =>
                      slot &&
                      type === "LECTURE" &&
                      (slot.class || slot.teacher || slot.room)
                  );

                  let cellHtml = "";
                  let bgColor = "#e3f2fd"; // lecture/light blue by default

                  if (lectureSlots.length > 0) {
                    // Show only the first lecture, without batch label
                    const { slot } = lectureSlots[0];
                    cellHtml = renderSlotLine("", slot, "lecture");
                    bgColor = "#e3f2fd";
                  } else {
                    // Otherwise treat as labs: one line per batch with LAB
                    const labSlots = normalized.filter(
                      ({ slot, type }) =>
                        slot &&
                        type === "LAB" &&
                        (slot.class || slot.teacher || slot.room)
                    );

                    if (labSlots.length > 0) {
                      bgColor = "#dcedc8"; // light green
                      cellHtml = labSlots
                        .map(({ batchKey, slot }) =>
                          renderSlotLine(batchKey, slot, "lab")
                        )
                        .join("");
                    } else {
                      // Fallback: non-FREE, non-LAB, non-LECTURE → show first as lecture-style
                      const nonFree = normalized.filter(
                        ({ slot, type }) =>
                          slot &&
                          type !== "FREE" &&
                          (slot.class || slot.teacher || slot.room)
                      );
                      if (nonFree.length > 0) {
                        const { slot } = nonFree[0];
                        cellHtml = renderSlotLine("", slot, "lecture");
                        bgColor = "#e3f2fd";
                      } else {
                        bgColor = "#ffffff";
                      }
                    }
                  }

                  cells.push(
                    `<td style="border:2px solid #000;padding:4px 3px;text-align:center;vertical-align:top;background-color:${bgColor};font-size:11px;">
                      ${cellHtml}
                    </td>`
                  );
                }
                return cells.join("");
              })()}
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
            font-family: "Times New Roman", Times, serif;
            margin: 24px 20px;
            color: #000000;
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        ${headerHtml}
        <table style="width:100%;border-collapse:collapse;font-size:12px;border:2px solid #000;">
          ${tableHead}
          ${tableBody}
        </table>
      </body>
    </html>
  `;
}

export default getTimetableHtml;

