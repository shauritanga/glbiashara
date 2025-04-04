"use server";

import Post from "@/models/Post";

export async function getPostByCategory(category: string) {
  try {
    const posts = await Post.find({ category }).populate("user");
    return posts;
  } catch (error) {}
}
