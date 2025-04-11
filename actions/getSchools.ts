"use server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/models";

export default async function getSchools() {
  await dbConnect();
  const query = { type: "school" };

  const pages = await Page.find(query).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(pages));
}
