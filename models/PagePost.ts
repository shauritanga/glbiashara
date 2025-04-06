import mongoose from "mongoose";
export interface IPagePost extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  pageId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: string;
  createdAt: Date;
}

const PagePostSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.PagePost ||
  mongoose.model("PagePost", PagePostSchema);
