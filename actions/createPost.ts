"use server";

import cloudinary from "cloudinary";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(formData: FormData) {
  try {
    const session = await auth();
    await dbConnect();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "User is not authenticated" };
    }

    const content = formData.get("content") as string;
    const file = formData.get("file") as File | null;

    if (!content || !file) throw new Error("Missing required fields");

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const result = await cloudinary.v2.uploader.upload(
      `data:${file.type};base64,${base64}`,
      { resource_type: "auto" }
    );

    const postResult = new Post({
      content,
      mediaUrl: result.secure_url,
      mediaType: file.type.startsWith("image/") ? "image" : "video",
      user: session.user.id,
    });
    await postResult.save();

    const post = JSON.parse(JSON.stringify(postResult, null, 2));
    return { success: true, post };
  } catch (error) {
    console.log({ error });
  }
}
