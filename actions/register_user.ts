"use server";

import dbConnect from "@/lib/mongodb";
import { User, IUser } from "@/models";
import bcrypt from "bcryptjs";

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<IUser> {
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, name });
  await user.save();
  return user.toJSON();
}
