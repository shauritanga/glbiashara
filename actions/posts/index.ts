"use server";

import { Post } from "@/models";

export async function getPostByCategory(category: string) {
  try {
    const posts = await Post.find({ category }).populate("user");
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {}
}
