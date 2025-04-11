// actions/updateProfilePicture.ts
"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models"; // Adjust path to your User model
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary (you should put these in environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function updateProfilePicture(formData: FormData) {
  console.log("0");
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Not authenticated" };
    }

    const image = formData.get("image") as File;
    if (!image) {
      return { error: "No image provided" };
    }

    // Validate file size (e.g., max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return { error: "Image too large (max 5MB)" };
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(image.type)) {
      return { error: "Invalid image type (JPEG, PNG, WEBP only)" };
    }

    // Convert file to buffer
    const buffer = Buffer.from(await image.arrayBuffer());
    console.log("1");

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "profile_pictures",
          transformation: [
            { width: 200, height: 200, crop: "fill", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
    console.log("2");

    console.log("Upload result:", uploadResult);

    const imageUrl = (uploadResult as any).secure_url;

    // Update user with new image URL
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { image: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return { error: "User not found" };
    }

    revalidatePath("/profile");
    return { success: true, image: imageUrl };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return { error: "Failed to update profile picture" };
  }
}

export async function getUsersWithProfession() {
  try {
    await dbConnect();
    const users = await User.find({
      profession: { $exists: true },
    }).populate("profession");
    const userData = JSON.parse(JSON.stringify(users));
    return userData;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users" };
  }
}

export async function getUserById(id: string) {
  try {
    await dbConnect();
    const user = await User.findById(id);
    if (!user) {
      return { error: "User not found" };
    }
    const userData = JSON.parse(JSON.stringify(user));
    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to fetch user" };
  }
}
