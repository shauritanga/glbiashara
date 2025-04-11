"use server";
import dbConnect from "@/lib/mongodb";
import { PagePost } from "@/models";

export default async function getPagePosts(id: string) {
  await dbConnect();

  const pages = await PagePost.find({ pageId: id }).sort({ createdAt: -1 });
  console.log({ pages });

  return JSON.parse(JSON.stringify(pages));
}
