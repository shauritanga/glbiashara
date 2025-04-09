"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export async function createPage(formData: FormData) {
  const session = await auth();
  await dbConnect();

  const data = {
    ...formData,
    createdBy: session?.user?.id,
  };

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
