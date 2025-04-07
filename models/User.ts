import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  image?: string;
  city: string;
  club: ObjectId;
  streetAddress: string;
  state: string;
  country: string;
  profession: string;
  business: string;
  projects?: [
    {
      _id: string;
      name: string;
      description: string;
      image: string;
      location: string;
      startDate: Date;
      endDate: Date;
      status: string;
    }
  ];
}

const projectScema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

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
  image: { type: String },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  business: { type: String },
  club: { type: Schema.Types.ObjectId, ref: "Page" },
});

userSchema.index({ email: 1, password: 1 }, { unique: true });
userSchema.index({ name: 1, email: 1 }, { unique: true });
userSchema.index({ phone: 1, email: 1 }, { unique: true });

export default mongoose.models?.User ||
  mongoose.model<IUser>("User", userSchema);
