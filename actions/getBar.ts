"use server";

import dbConnect from "@/lib/mongodb";
import { Bar, BarPost } from "@/models/bar";
import mongoose from "mongoose";

export async function getBar(id: string) {
  try {
    await dbConnect();

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bar ID format");
    }

    // Find bar by ID
    const bar = await Bar.findById(id).lean();

    if (!bar) {
      throw new Error("Bar not found");
    }

    return bar;
  } catch (error) {
    console.error("Error fetching bar:", error);
    throw error;
  }
}

export async function getBarPosts(barId: string) {
  try {
    await dbConnect();

    // Validate MongoDB ObjectId
    if (!barId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bar ID format");
    }

    // Find posts for this bar
    const posts = await BarPost.find({ bar: barId })
      .sort({ createdAt: -1 })
      .lean();

    return posts;
  } catch (error) {
    console.error("Error fetching bar posts:", error);
    throw error;
  }
}

export async function getBarWithPosts(id: string) {
  try {
    await dbConnect();

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bar ID format");
    }

    // Find bar by ID
    const bar = await Bar.findById(id).lean();

    if (!bar) {
      throw new Error("Bar not found");
    }

    // Find posts for this bar
    const posts = await BarPost.find({ bar: id })
      .sort({ createdAt: -1 })
      .lean();

    // Combine bar data with posts
    return {
      ...bar,
      posts,
    };
  } catch (error) {
    console.error("Error fetching bar with posts:", error);
    throw error;
  }
}

export async function createBarPost(data: {
  title: string;
  description: string;
  barId: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}) {
  try {
    await dbConnect();

    const { title, description, barId, mediaUrl, mediaType } = data;

    // Validate MongoDB ObjectId
    if (!barId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Invalid bar ID format");
    }

    // Check if bar exists
    const barExists = await Bar.findById(barId);
    if (!barExists) {
      throw new Error("Bar not found");
    }

    // Create new post
    const post = new BarPost({
      title,
      description,
      bar: new mongoose.Types.ObjectId(barId),
      ...(mediaUrl && { mediaUrl }),
      ...(mediaType && { mediaType }),
      likes: 0,
      createdAt: new Date(),
    });

    await post.save();
    return post;
  } catch (error) {
    console.error("Error creating bar post:", error);
    throw error;
  }
}
