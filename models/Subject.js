import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["theory", "lab"], default: "theory" },
  },
  { timestamps: true }
);

if (mongoose.models.Subject) {
  delete mongoose.models.Subject;
}

export default mongoose.model("Subject", subjectSchema);


