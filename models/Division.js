import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Division =
  mongoose.models.Division || mongoose.model("Division", divisionSchema);

export default Division;


