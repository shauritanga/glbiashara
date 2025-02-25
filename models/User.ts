import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  club: ObjectId;
  streetAddress: string;
  state: string;
  country: string;
  profession: string;
  business: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  streetAddress: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  profession: { type: String },
  business: { type: String },
  club: { type: Schema.Types.ObjectId, ref: "Page" },
});

export default mongoose.models?.User ||
  mongoose.model<IUser>("User", userSchema);
