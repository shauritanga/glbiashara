"use client";
import React from "react";
import { Feed } from "./Feed";
import { IPagePost } from "@/models";

export default function ClubFeed({ posts }: { posts: IPagePost[] }) {
  return posts.map((post, index) => (
    <div key={index} className="mb-4">
      <Feed post={post} key={index} />
    </div>
  )); // Use index as a key for simplicity, but it's better to use a unique identifier if available
}
