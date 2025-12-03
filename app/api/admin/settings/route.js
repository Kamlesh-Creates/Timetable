import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import Setting from "../../../../models/Setting";

async function getOrCreateSettings() {
  await connectToDatabase();
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      start_hour: 9,
      end_hour: 17,
      lunch_start_hour: 12,
      batches_per_div: 1,
    });
  }
  return settings;
}

export async function GET() {
  const settings = await getOrCreateSettings();
  return NextResponse.json({ settings }, { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { days, start_hour, end_hour, lunch_start_hour, batches_per_div } =
    body || {};

  if (
    start_hour != null &&
    end_hour != null &&
    (start_hour < 0 ||
      start_hour > 23 ||
      end_hour < 0 ||
      end_hour > 23 ||
      start_hour >= end_hour)
  ) {
    return NextResponse.json(
      { message: "start_hour must be before end_hour (0-23)" },
      { status: 400 }
    );
  }

  if (
    lunch_start_hour != null &&
    (lunch_start_hour < 0 || lunch_start_hour > 23)
  ) {
    return NextResponse.json(
      { message: "lunch_start_hour must be between 0 and 23" },
      { status: 400 }
    );
  }

  if (
    batches_per_div != null &&
    (batches_per_div < 1 || batches_per_div > 20)
  ) {
    return NextResponse.json(
      { message: "batches_per_div must be between 1 and 20" },
      { status: 400 }
    );
  }

  const settings = await getOrCreateSettings();

  if (Array.isArray(days)) {
    settings.days = days;
  }
  if (start_hour != null) {
    settings.start_hour = start_hour;
  }
  if (end_hour != null) {
    settings.end_hour = end_hour;
  }
  if (lunch_start_hour != null) {
    settings.lunch_start_hour = lunch_start_hour;
  }
   if (batches_per_div != null) {
     settings.batches_per_div = batches_per_div;
   }

  await settings.save();

  return NextResponse.json({ settings }, { status: 200 });
}

