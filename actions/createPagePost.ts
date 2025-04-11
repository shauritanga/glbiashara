"use server";

import dbConnect from "@/lib/mongodb";
import { PagePost } from "@/models";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPagePost(pageId: string, formData: FormData) {
  await dbConnect();

  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  if (!content || !file) throw new Error("Missing required fields");

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const result = await cloudinary.v2.uploader.upload(
    `data:${file.type};base64,${base64}`,
    { resource_type: "auto" }
  );

  try {
    const newPost = new PagePost({
      pageId,
      content,
      mediaUrl: result.secure_url,
      mediaType: file.type.startsWith("image/") ? "image" : "video",
    });

    await newPost.save();
    const post = JSON.parse(JSON.stringify(newPost));

    return { success: true, post };
  } catch (error) {
    console.error("Error creating page post:", error);
    return { success: false, error: "Failed to create page post" };
  }
}
