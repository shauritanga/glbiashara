"use server";

import dbConnect from "@/lib/mongodb";
import PagePost from "@/models/PagePost";

export async function createPagePost(pageId: string, content: string) {
  await dbConnect();

  try {
    const newPost = new PagePost({
      pageId,
      content,
    });

    await newPost.save();

    return { success: true, post: newPost };
  } catch (error) {
    console.error("Error creating page post:", error);
    return { success: false, error: "Failed to create page post" };
  }
}
