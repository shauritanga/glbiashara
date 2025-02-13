"use server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export default async function getClubs() {
  await dbConnect();

  const query = { type: "club" };

  const pages = await Page.find(query).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(pages));
}
