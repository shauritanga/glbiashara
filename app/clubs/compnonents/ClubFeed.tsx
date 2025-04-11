"use client";
import React from "react";
import { Feed } from "./Feed";
import { IPagePost } from "@/models";

export default function ClubFeed({ posts }: { posts: IPagePost[] }) {
  return posts.map((post, index) => <Feed post={post} key={index} />); // Use index as a key for simplicity, but it's better to use a unique identifier if available
}
