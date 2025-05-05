// actions/updateProfilePicture.ts
"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { User } from "@/models"; // Adjust path to your User model
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// Configure Cloudinary (you should put these in environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UserData {
  name: string;
  email: string;
  role: "Sell" | "Buy";
  businessName?: string;
  industry?: string;
  country?: string;
  city?: string;
  streetAddress?: string;
  image?: string;
  password: string;
}

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

export async function createUser(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    await dbConnect();

    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const role = formData.get("role")?.toString() as "Sell" | "Buy" | undefined;
    const password = formData.get("password")?.toString();
    const businessName = formData.get("businessName")?.toString();
    const industry = formData.get("industry")?.toString();
    const country = formData.get("country")?.toString();
    const city = formData.get("city")?.toString();
    const phone = formData.get("phone")?.toString();
    const streetAddress = formData.get("streetAddress")?.toString();
    const image = formData.get("image");

    if (!name || !email || !role || !password) {
      return { success: false, error: "Missing required fields" };
    }

    if (!["Sell", "Buy"].includes(role)) {
      return { success: false, error: "Invalid role" };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, error: "Email already exists" };
    }

    let imageUrl: string | undefined;
    if (role === "Sell") {
      if (!image || typeof image === "string") {
        return { success: false, error: "Image is required for sellers" };
      }
      if (!image.type.startsWith("image/")) {
        return { success: false, error: "Only image files are allowed" };
      }
      if (image.size > 10 * 1024 * 1024) {
        return { success: false, error: "Image size exceeds 10MB" };
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const result = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          );
          uploadStream.end(buffer);
        }
      );
      imageUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      role,
      phone,
      password: hashedPassword,
      ...(role === "Sell" && {
        businessName,
        industry,
        country,
        city,
        streetAddress,
        image: imageUrl,
      }),
    });

    await user.save();
    return { success: true };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, error: "Failed to create user" };
  }
}
