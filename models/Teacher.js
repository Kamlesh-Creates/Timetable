import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    availability: [
      {
        type: String,
        trim: true, // e.g. "Mon-1"
      },
    ],
    maxHoursPerDay: { type: Number, min: 0 },
    maxHoursPerWeek: { type: Number, min: 0 },
    unavailableDates: [{ type: Date }],
  },
  { timestamps: true }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;


