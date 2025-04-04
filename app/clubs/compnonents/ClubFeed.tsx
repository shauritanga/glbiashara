"use client";
import React from "react";
import { Feed } from "./Feed";
import { IPost } from "@/models/Post";

export default function ClubFeed(posts: IPost[]) {
  return posts.map((post) => <Feed post={post} />);
}
