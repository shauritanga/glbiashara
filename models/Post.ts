import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  mediaUrl: string;
  mediaType: string;
  user: mongoose.Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  content: { type: String, required: true },
  mediaUrl: { type: String },
  mediaType: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", postSchema);
