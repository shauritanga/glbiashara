import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  specific: string;
  region: string;
  district: string;
  ward: string;
  street: string;
  mediaUrl: string;
  mediaType: string;
  user: mongoose.Schema.Types.ObjectId;
  isGlobal: boolean;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    specific: { type: String, required: true },
    region: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
    mediaUrl: { type: String },
    isGlobal: { type: Boolean, default: false },
    mediaType: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", postSchema);
