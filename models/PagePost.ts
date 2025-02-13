import mongoose from "mongoose";

const PagePostSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PagePost ||
  mongoose.model("PagePost", PagePostSchema);
