"use client";

import { IPosts } from "@/types";
import React from "react";
import { Feed } from "./Feed";

export default function ClubFeed(posts: IPosts[]) {
  return posts.map((post) => <Feed post={post} />);
}
