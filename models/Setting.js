import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    days: [{ type: String, trim: true }], // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
    start_hour: { type: Number, min: 0, max: 23 }, // e.g. 9
    end_hour: { type: Number, min: 0, max: 23 }, // e.g. 17
    lunch_start_hour: { type: Number, min: 0, max: 23 } // e.g. 12
  },
  { timestamps: true }
);

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;


