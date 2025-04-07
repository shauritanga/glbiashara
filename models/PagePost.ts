import { min } from "date-fns";
import mongoose, { Schema, model, models, Document } from "mongoose";
export interface IPagePost extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  pageId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
}

export interface IPostInteraction extends Document {
  postId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  type: "like" | "dislike";
  createdAt: Date;
}

export interface IActionResponse {
  success: boolean;
  likes?: number;
  dislikes?: number;
  error?: string;
}

const PagePostSchema = new Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number, default: 0, min: 0 },
    dislikes: { type: Number, default: 0, min: 0 },
    mediaUrl: { type: String },
    mediaType: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.PagePost || model("PagePost", PagePostSchema);

const PostInteractionSchema = new Schema<IPostInteraction>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "PagePost",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "dislike"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const PostInteraction =
  models.PostInteraction ||
  model<IPostInteraction>("PostInteraction", PostInteractionSchema);

PagePostSchema.index({ createdAt: -1 });
PostInteractionSchema.index({ postId: 1, userId: 1 }, { unique: true });
