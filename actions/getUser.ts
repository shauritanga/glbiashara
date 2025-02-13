"use server";

import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function getUser(email: string): Promise<IUser> {
  await dbConnect();
  const user = await User.findOne({ email });
  return JSON.parse(JSON.stringify(user, null, 2));
}
