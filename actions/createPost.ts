"use server";

import cloudinary from "cloudinary";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";
import { ActionResponse } from "@/types";
import { revalidatePath } from "next/cache";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    await dbConnect();

    if (!session || !session.user || !session.user.id) {
      return { success: false, message: "Unauthorized" };
    }
    console.log({ formData });

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const region = formData.get("region") as string;
    const district = formData.get("district") as string;
    const specific = formData.get("specific") as string;
    const category = formData.get("category") as string;
    const ward = formData.get("ward") as string;
    const street = formData.get("street") as string;
    const file = formData.get("file") as File | null;

    if (!file) {
      return { success: false, message: "File is required" };
    }

    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const result = await cloudinary.v2.uploader.upload(
      `data:${file.type};base64,${base64}`,
      { resource_type: "auto" }
    );

    if (category === "Media") {
    }

    const postResult = new Post({
      title,
      description,
      region,
      district,
      ward,
      street,
      category,
      isGlobal: category === "Media" ? true : false,
      specific,
      mediaUrl: result.secure_url,
      mediaType: file.type.startsWith("image/") ? "image" : "video",
      user: session.user.id,
    });
    await postResult.save();
    revalidatePath("/profile");

    // const post = JSON.parse(JSON.stringify(postResult, null, 2));
    return { success: true, message: "Post created successfully" };
  } catch (error: any) {
    console.log({ error });
    return {
      success: false,
      message: error.message ?? "Failed to create post",
    };
  }
}
