"use server";

import dbConnect from "@/lib/mongodb";
import { PagePost } from "@/models";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000, // 60 seconds timeout
});

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 10MB in bytes

export async function createPagePost(pageId: string, formData: FormData) {
  await dbConnect();

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!title || !description) {
      return { success: false, error: "Title and description are required" };
    }

    let mediaUrl = "";
    let mediaType = "";

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          error:
            "File size exceeds the 10MB limit. Please upload a smaller file.",
        };
      }

      try {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");

        // Add timeout and quality options
        const result = await cloudinary.v2.uploader.upload(
          `data:${file.type};base64,${base64}`,
          {
            resource_type: "auto",
            timeout: 60000, // 60 seconds timeout
            quality: "auto:good", // Optimize quality
            fetch_format: "auto", // Auto-select optimal format
          }
        );

        mediaUrl = result.secure_url;
        mediaType = file.type.startsWith("image/") ? "image" : "video";
      } catch (uploadError: any) {
        console.error("Cloudinary upload error:", uploadError);

        // Create post without media if upload fails
        if (
          uploadError.http_code === 499 ||
          uploadError.name === "TimeoutError"
        ) {
          return {
            success: false,
            error:
              "Media upload timed out. Please try with a smaller file or try again later.",
          };
        }

        return {
          success: false,
          error: "Failed to upload media. Please try again.",
        };
      }
    }

    const newPost = new PagePost({
      pageId,
      title,
      description,
      mediaUrl,
      mediaType,
    });

    await newPost.save();
    const post = JSON.parse(JSON.stringify(newPost));

    return { success: true, post };
  } catch (error) {
    console.error("Error creating page post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create page post",
    };
  }
}
