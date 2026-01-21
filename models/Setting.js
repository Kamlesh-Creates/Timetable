import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    days: [{ type: String, trim: true }], // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
    start_hour: { type: Number, min: 0, max: 23 }, // e.g. 9
    end_hour: { type: Number, min: 0, max: 23 }, // e.g. 17
    lunch_start_hour: { type: Number, min: 0, max: 23 }, // e.g. 12
    MDM_time: { type: mongoose.Schema.Types.Mixed }, // e.g. { "day": "Mon", "time": "1-2" }
    "OE-DS_time": { type: mongoose.Schema.Types.Mixed }, // e.g. [{ "day": "Tue", "time": "2-3" }, { "day": "Thu", "time": "2-3" }]
    "OE-ES_time": { type: mongoose.Schema.Types.Mixed }, // e.g. "Wed@13-14" or { "day": "Wed", "time": "13-14" }
  },
  { timestamps: true }
);

const Setting =
  mongoose.models.Setting || mongoose.model("Setting", settingSchema);

export default Setting;


