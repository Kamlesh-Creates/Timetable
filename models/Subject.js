import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["theory", "lab"], default: "theory" },
    frequency: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

if (mongoose.models.Subject) {
  delete mongoose.models.Subject;
}

export default mongoose.model("Subject", subjectSchema);


