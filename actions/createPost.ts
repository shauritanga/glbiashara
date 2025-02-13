"use server";

import { mkdir, writeFile, access } from "fs/promises";
import { join } from "path";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { auth } from "@/auth";

export async function createPost(formData: FormData) {
  const session = await auth();
  await dbConnect();

  if (!session || !session.user || !session.user.id) {
    return { success: false, error: "User is not authenticated" };
  }

  const content = formData.get("content") as string;
  const file = formData.get("file") as File | null;

  let mediaUrl = "";
  let mediaType = "";

  try {
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = join(process.cwd(), "public", "uploads");

      try {
        await access(uploadDir); // Check if the directory exists
      } catch {
        await mkdir(uploadDir, { recursive: true }); // Create it if it doesn't exist
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      mediaUrl = `/uploads/${fileName}`;
      mediaType = file.type.startsWith("image/") ? "image" : "video";
    }

    console.log("Session data:", session);
    console.log("User ID:", session.user.id);

    const postResult = new Post({
      content,
      mediaUrl,
      mediaType,
      user: session.user.id, // Ensure this is a valid ObjectId
    });
    await postResult.save();

    const post = JSON.parse(JSON.stringify(postResult, null, 2));

    return { success: true, post };
  } catch (error: any) {
    console.error("File upload error:", error);
    return { success: false, error: error.message };
  }
}
