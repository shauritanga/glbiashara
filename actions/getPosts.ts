"use server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function getPosts(id: string) {
  await dbConnect();

  const posts = await Post.find({ user: id });
  return JSON.parse(JSON.stringify(posts, null, 2));
}
