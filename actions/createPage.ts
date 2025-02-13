"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

interface CreatePageData {
  name: string;
  description: string;
  type: "school" | "club";
  country: string;
  district: string;
  createdBy: string;
}

export async function createPage(data: CreatePageData) {
  const session = await auth();
  await dbConnect();

  if (!session || !session.user || !session.user.id) {
    return { success: false, error: "User is not authenticated" };
  }

  try {
    const pageResult = new Page(data);
    await pageResult.save();

    const page = JSON.parse(JSON.stringify(pageResult, null, 2));
    return { success: true, page };
  } catch (error) {
    console.error("Error creating page:", error);
    return { success: false, error: "Failed to create page" };
  }
}
