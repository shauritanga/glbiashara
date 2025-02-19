import mongoose from "mongoose";

const PagePostSchema = new mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  mediaType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PagePost ||
  mongoose.model("PagePost", PagePostSchema);
