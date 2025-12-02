import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    data: { type: Object, required: true },
    generatedAt: { type: Date, default: Date.now },
    divisions: [{ type: String }],
  },
  { timestamps: true }
);

if (mongoose.models.Timetable) {
  delete mongoose.models.Timetable;
}

export default mongoose.model("Timetable", timetableSchema);
