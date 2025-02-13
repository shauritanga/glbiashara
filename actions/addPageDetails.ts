"use server";

import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export async function addPageDetails(pageId: string, details: string) {
  await dbConnect();

  try {
    const updatedPage = await Page.findByIdAndUpdate(
      pageId,
      { $set: { details } },
      { new: true }
    );

    if (!updatedPage) {
      throw new Error("Page not found");
    }

    return { success: true, page: updatedPage };
  } catch (error) {
    console.error("Error adding page details:", error);
    return { success: false, error: "Failed to add page details" };
  }
}
