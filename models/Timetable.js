import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    data: { type: Object, required: true },
    result: { type: Object },
    generatedAt: { type: Date, default: Date.now },
    divisions: [{ type: String }],
  },
  { timestamps: true }
);

const Timetable =
  mongoose.models.Timetable || mongoose.model("Timetable", timetableSchema);

export default Timetable;
