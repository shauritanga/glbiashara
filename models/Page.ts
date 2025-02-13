import mongoose from "mongoose";

export interface IPage {
  name: string;
  description: string;
  type: string;
  country: string;
  logo: string;
  district: string;
  createdBy: string;
  posts: [string];
}

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ["school", "club"], required: true },
  country: { type: String, required: true },
  logo: { type: String },
  district: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "PagePost" }],
});

export default mongoose.models.Page || mongoose.model("Page", PageSchema);
