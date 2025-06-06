"use server";
import dbConnect from "@/lib/mongodb";
import { Page } from "@/models";

export default async function getClubs() {
  await dbConnect();
  const query = { type: "club" };

  const pages = await Page.find(query).sort({ createdAt: -1 }).lean();
  console.log({ pages });

  return JSON.parse(JSON.stringify(pages));
}
