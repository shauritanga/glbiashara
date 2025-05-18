import mongoose, { Schema, Document } from "mongoose";

export interface IBarPost extends Document {
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: Date;
  likes: number;
  bar: Schema.Types.ObjectId;
}

export interface IBar extends Document {
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  openingHours: string;
  contact: {
    phone: string;
    website?: string;
  };
  specifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

const barPostSchema = new Schema<IBarPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ["image", "video"] },
    likes: { type: Number, default: 0 },
    bar: { type: Schema.Types.ObjectId, ref: "Bar", required: true },
  },
  { timestamps: true }
);

const barSchema = new Schema<IBar>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    openingHours: { type: String, required: true },
    contact: {
      phone: { type: String, required: true },
      website: { type: String },
    },
    specifications: [{ type: String }],
  },
  { timestamps: true }
);

export const BarPost =
  mongoose.models.BarPost || mongoose.model<IBarPost>("BarPost", barPostSchema);
export const Bar =
  mongoose.models.Bar || mongoose.model<IBar>("Bar", barSchema);
