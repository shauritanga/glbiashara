"use server";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export default async function getClubs() {
  await dbConnect();
  const query = { type: "club" };

  console.log({ query });

  const pages = await Page.find(query).sort({ createdAt: -1 }).lean();
  console.log({ pages });

  return JSON.parse(JSON.stringify(pages));
}
