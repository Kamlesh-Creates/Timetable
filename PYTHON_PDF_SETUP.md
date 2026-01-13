# Python PDF Generation Setup Guide

This guide explains how to update your Python FastAPI backend to use the new ReportLab-based PDF generation.

## Required Python Packages

Install these packages in your Python environment:

```bash
pip install reportlab fastapi pydantic
```

## Updated Files

### 1. `generate_pdf.py` - Updated Version

Replace your existing `generate_pdf.py` with the version below that accepts data as parameters instead of reading from files:

```python
import json
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from io import BytesIO

def generate_pdf_from_data(timetable_data, config, output_path=None):
    """
    Generate PDF from timetable data and config objects.
    
    Args:
        timetable_data: Dictionary containing division schedules
        config: Dictionary containing days, start_hour, end_hour, lunch_start_hour
        output_path: Optional file path to save PDF. If None, returns BytesIO buffer.
    
    Returns:
        BytesIO buffer if output_path is None, otherwise None
    """
    # Use BytesIO if no output path specified (for API response)
    if output_path:
        doc = SimpleDocTemplate(output_path, pagesize=landscape(A4), topMargin=30, bottomMargin=30)
    else:
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=landscape(A4), topMargin=30, bottomMargin=30)
    
    elements = []
    styles = getSampleStyleSheet()
    title_style = styles['Heading1']
    title_style.alignment = 1  # Center
    
    # Title
    elements.append(Paragraph("Smart Timetable - Computer Department", title_style))
    elements.append(Spacer(1, 20))
    
    days = config.get('days', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    
    # Generate slots from start/end hour
    start_h = config.get('start_hour', 9)
    end_h = config.get('end_hour', 17)
    slots = [f"{h}:00" for h in range(start_h, end_h)]
    
    # Calculate lunch index
    lunch_start = config.get('lunch_start_hour')
    lunch_idx = None
    if lunch_start:
        try:
            lunch_idx = slots.index(f"{lunch_start}:00")
        except ValueError:
            pass
    
    # Define Column Widths
    page_width = landscape(A4)[0] - 60  # margins
    col_width = (page_width - 0.8*inch) / len(slots)
    col_widths = [0.8*inch] + [col_width] * len(slots)
    
    # Process each Division
    for div_idx, (div_name, div_schedule) in enumerate(timetable_data.items()):
        if div_idx > 0:
            elements.append(PageBreak())
            
        elements.append(Paragraph(f"Division: {div_name}", styles['Heading2']))
        elements.append(Spacer(1, 10))
        
        # Prepare Table Data
        headers = ['Day'] + slots
        table_data = [headers]
        
        # Get all batches
        batches = sorted(div_schedule.keys())
        
        # Rows are Days
        for day in days:
            row_data = [day]
            
            # For each slot, gather info from ALL batches
            for s_idx, slot_time in enumerate(slots):
                batch_contents = {}  # content -> list of batches
                
                for batch in batches:
                    day_sched = div_schedule[batch].get(day, [])
                    
                    if s_idx < len(day_sched):
                        slot_info = day_sched[s_idx]
                        
                        if not slot_info or slot_info == "-":
                            content = "-"
                        elif isinstance(slot_info, dict):
                            if slot_info.get('type') == 'LUNCH':
                                content = "LUNCH"
                            elif slot_info.get('type') == 'FREE':
                                content = slot_info.get('class', 'Free')
                            else:
                                cls = slot_info.get('class', '')
                                teacher = slot_info.get('teacher', '')
                                room = slot_info.get('room', '')
                                content = f"{cls}\n({teacher}, {room})"
                        else:
                            content = str(slot_info)
                    else:
                        content = "-"
                        
                    if content not in batch_contents:
                        batch_contents[content] = []
                    batch_contents[content].append(batch)
                
                # Format cell content
                if len(batch_contents) == 1:
                    # Single content for all batches (Lecture or Lunch)
                    cell_text = list(batch_contents.keys())[0]
                else:
                    # Mixed content (Labs/Practicals)
                    sorted_contents = []
                    for content, batch_list in batch_contents.items():
                        if content in ["-", "Free"]:
                            continue
                        batch_str = ", ".join(batch_list)
                        sorted_contents.append(f"{batch_str}: {content}")
                    
                    cell_text = "\n\n".join(sorted_contents) if sorted_contents else "-"
                
                row_data.append(cell_text)
            
            table_data.append(row_data)
        
        # Create Table
        t = Table(table_data, colWidths=col_widths)
        
        # Styling
        style = TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTSIZE', (0, 1), (-1, -1), 8),
        ])
        
        # Apply conditional colors
        for r_idx, row in enumerate(table_data[1:], start=1):
            for c_idx, cell_content in enumerate(row[1:], start=1):
                if cell_content == "LUNCH":
                    style.add('BACKGROUND', (c_idx, r_idx), (c_idx, r_idx), colors.black)
                    style.add('TEXTCOLOR', (c_idx, r_idx), (c_idx, r_idx), colors.white)
                elif cell_content in ["-", "Free"]:
                    pass  # White background
                elif ":" in cell_content and "\n\n" in cell_content:
                    # Multiple batches (Labs)
                    style.add('BACKGROUND', (c_idx, r_idx), (c_idx, r_idx), colors.lightgreen)
                else:
                    # Single content (Lecture)
                    style.add('BACKGROUND', (c_idx, r_idx), (c_idx, r_idx), colors.lightblue)

        # Horizontal merging for adjacent identical cells
        for r_idx in range(1, len(table_data)):
            row = table_data[r_idx]
            start_col = 1
            
            while start_col < len(row):
                content = row[start_col]
                
                if content in ["LUNCH", "-", "Free"]:
                    start_col += 1
                    continue
                
                end_col = start_col
                while end_col + 1 < len(row):
                    if row[end_col + 1] == content and content not in ["-", "Free"]:
                        end_col += 1
                    else:
                        break
                
                if end_col > start_col:
                    style.add('SPAN', (start_col, r_idx), (end_col, r_idx))
                
                start_col = end_col + 1

        t.setStyle(style)
        elements.append(t)
        elements.append(Spacer(1, 20))
    
    doc.build(elements)
    
    if output_path:
        print(f"PDF generated successfully: {output_path}")
        return None
    else:
        buffer.seek(0)
        return buffer


# Backward compatibility function
def generate_pdf(json_path='timetable_full.json', output_path='timetable.pdf'):
    """Legacy function that reads from files"""
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    with open('config.json', 'r') as f:
        config = json.load(f)
    
    generate_pdf_from_data(data, config, output_path)


if __name__ == "__main__":
    generate_pdf()
```

### 2. `main.py` - Updated FastAPI Backend

Update your `main.py` to accept timetable data via POST request:

```python
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import json
import traceback
import os
from typing import Dict, Any

from timetable_solver import TimetableScheduler
from ortools.sat.python import cp_model

# Import PDF generator
from generate_pdf import generate_pdf, generate_pdf_from_data

app = FastAPI()

# -----------------------------
# Solver wrapper
# -----------------------------
def generate_timetable(
    config_path="config.json",
    freq_path="frequencies.json",
    teacher_path="teachers.json",
    room_path="rooms.json",
    output_file="timetable_full.json"
):
    try:
        scheduler = TimetableScheduler(
            config_path=config_path,
            freq_path=freq_path,
            teacher_path=teacher_path,
            room_path=room_path
        )

        scheduler.build_model()
        status = scheduler.solve()

        if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
            scheduler.export_solution(filename=output_file)
            return True

        return False

    except Exception as e:
        print("Solver error:", e)
        traceback.print_exc()
        return False


# -----------------------------
# API Payload Schemas
# -----------------------------
class TimetablePayload(BaseModel):
    divisions: list
    lectures: list
    labs: list
    frequencies: dict
    teachers: dict
    rooms: dict
    settings: dict


class PDFGenerationPayload(BaseModel):
    timetable: Dict[str, Any]
    settings: Dict[str, Any]


# -----------------------------
# Generate Timetable JSON
# -----------------------------
@app.post("/generate")
def generate(payload: TimetablePayload):
    print("Received timetable generation request.")

    with open("config.json", "w") as f:
        json.dump({
            "divisions": payload.divisions,
            "lectures": payload.lectures,
            "labs": payload.labs,
            **payload.settings
        }, f, indent=2)

    with open("frequencies.json", "w") as f:
        json.dump(payload.frequencies, f, indent=2)

    with open("teachers.json", "w") as f:
        json.dump(payload.teachers, f, indent=2)

    with open("rooms.json", "w") as f:
        json.dump(payload.rooms, f, indent=2)

    success = generate_timetable()

    if not success:
        raise HTTPException(
            status_code=500,
            detail="Timetable generation failed. Check constraints."
        )

    with open("timetable_full.json") as f:
        return {"timetable": json.load(f)}


# -----------------------------
# Generate PDF from provided data
# -----------------------------
@app.post("/generate-pdf")
def generate_pdf_api(payload: PDFGenerationPayload):
    """
    Generate PDF from timetable data and settings provided in request body.
    Returns PDF as streaming response.
    """
    try:
        # Generate PDF in memory
        pdf_buffer = generate_pdf_from_data(
            timetable_data=payload.timetable,
            config=payload.settings,
            output_path=None  # Return buffer instead of saving to file
        )
        
        if pdf_buffer is None:
            raise HTTPException(
                status_code=500,
                detail="PDF generation returned empty buffer"
            )
        
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=timetable.pdf"
            }
        )
    
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {str(e)}"
        )


# -----------------------------
# Legacy: Generate PDF from files
# -----------------------------
@app.post("/generate-pdf-from-files")
def generate_pdf_from_files_api():
    """
    Legacy endpoint: Assumes timetable_full.json and config.json already exist
    """
    if not os.path.exists("timetable_full.json"):
        raise HTTPException(
            status_code=400,
            detail="Timetable not generated yet"
        )
    
    if not os.path.exists("config.json"):
        raise HTTPException(
            status_code=400,
            detail="Config file not found"
        )

    output_pdf = "timetable.pdf"

    try:
        generate_pdf(
            json_path="timetable_full.json",
            output_path=output_pdf
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {str(e)}"
        )

    from fastapi.responses import FileResponse
    return FileResponse(
        output_pdf,
        media_type="application/pdf",
        filename="timetable.pdf"
    )


# -----------------------------
# Health check
# -----------------------------
@app.get("/")
def read_root():
    return {"status": "ok", "service": "Timetable Generator API"}


# -----------------------------
# Optional CLI run
# -----------------------------
if __name__ == "__main__":
    ok = generate_timetable()
    print("SUCCESS" if ok else "FAILED")
```

## Environment Configuration

Make sure your `.env` file in the Next.js project has:

```env
PYTHON_API_URL=http://localhost:8000
```

## Running the Services

1. **Start Python FastAPI Backend:**
   ```bash
   cd /path/to/python/backend
   uvicorn main:app --reload --port 8000
   ```

2. **Start Next.js Frontend:**
   ```bash
   cd /path/to/nextjs/project
   npm run dev
   ```

## Testing

1. Generate a timetable from the UI
2. Click "Download PDF" for any division
3. The PDF should now be generated with:
   - Color-coded cells (blue for lectures, green for labs, black for lunch)
   - Merged cells for multi-hour sessions
   - Professional landscape A4 formatting
   - Batch information for lab sessions

## Key Changes Summary

- ✅ Removed Puppeteer dependency from Next.js
- ✅ PDF generation now handled by Python ReportLab
- ✅ Better formatting with cell merging and color coding
- ✅ All timetable data sent via POST instead of file system
- ✅ Memory-efficient streaming response for PDFs
- ✅ Maintains backward compatibility for CLI usage
