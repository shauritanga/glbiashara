import dbConnect from "@/lib/mongodb";
import { Page } from "@/models";

export default async function getUserPages(userId: string) {
  await dbConnect();
  const pages = await Page.find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(pages, null, 2));
}
