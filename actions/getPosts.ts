"use server";
import dbConnect from "@/lib/mongodb";
import { Post } from "@/models";

export async function getPosts() {
  await dbConnect();

  const posts = await Post.find();
  return JSON.parse(JSON.stringify(posts, null, 2));
}

export async function getUserPosts(id: string) {
  await dbConnect();

  const posts = await Post.find({ user: id });
  return JSON.parse(JSON.stringify(posts, null, 2));
}
