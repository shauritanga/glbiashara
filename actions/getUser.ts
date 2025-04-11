"use server";

import dbConnect from "@/lib/mongodb";
import { User, IUser } from "@/models";

export async function getUser(email: string): Promise<IUser> {
  await dbConnect();
  const user = await User.findOne({ email });
  return JSON.parse(JSON.stringify(user, null, 2));
}

export async function updateUser(id: string, formData: any) {
  await dbConnect();
  const updatedUser = await User.findByIdAndUpdate(id, formData);
}
