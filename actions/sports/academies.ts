"use server";

import dbConnect from "@/lib/mongodb";
import { SportsAcademy, SportsCategory } from "@/models/sports";
import { ActionResponse } from "@/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all sports academies with optional filters
export async function getSportsAcademies(filters?: {
  sport?: string;
  region?: string;
  district?: string;
  search?: string;
  limit?: number;
  page?: number;
}) {
  try {
    await dbConnect();
    
    const query: any = { isActive: true };
    
    if (filters?.sport) {
      query.sport = filters.sport;
    }
    
    if (filters?.region) {
      query["location.region"] = filters.region;
    }
    
    if (filters?.district) {
      query["location.district"] = filters.district;
    }
    
    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ];
    }

    const limit = filters?.limit || 20;
    const page = filters?.page || 1;
    const skip = (page - 1) * limit;

    const academies = await SportsAcademy.find(query)
      .populate("sport", "name icon slug")
      .populate("createdBy", "name email")
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await SportsAcademy.countDocuments(query);

    return {
      academies: JSON.parse(JSON.stringify(academies)),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching sports academies:", error);
    return {
      academies: [],
      pagination: { total: 0, page: 1, limit: 20, pages: 0 },
    };
  }
}

// Get single sports academy by slug
export async function getSportsAcademyBySlug(slug: string) {
  try {
    await dbConnect();
    
    const academy = await SportsAcademy.findOne({ slug, isActive: true })
      .populate("sport", "name icon slug")
      .populate("createdBy", "name email image")
      .lean();

    if (!academy) {
      return null;
    }

    return JSON.parse(JSON.stringify(academy));
  } catch (error) {
    console.error("Error fetching sports academy:", error);
    return null;
  }
}

// Get academies by sport category
export async function getAcademiesByCategory(categorySlug: string) {
  try {
    await dbConnect();
    
    const category = await SportsCategory.findOne({ slug: categorySlug });
    if (!category) {
      return [];
    }

    const academies = await SportsAcademy.find({
      sport: category._id,
      isActive: true,
    })
      .populate("sport", "name icon slug")
      .sort({ rating: -1 })
      .limit(10)
      .lean();

    return JSON.parse(JSON.stringify(academies));
  } catch (error) {
    console.error("Error fetching academies by category:", error);
    return [];
  }
}

// Create sports academy
export async function createSportsAcademy(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to create an academy",
      };
    }

    await dbConnect();

    // Extract form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const sportId = formData.get("sport") as string;
    const region = formData.get("region") as string;
    const district = formData.get("district") as string;
    const ward = formData.get("ward") as string;
    const street = formData.get("street") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const website = formData.get("website") as string;
    const capacity = parseInt(formData.get("capacity") as string);
    const established = new Date(formData.get("established") as string);
    const facilities = formData.get("facilities") as string;
    const programs = formData.get("programs") as string;
    const ageGroups = formData.get("ageGroups") as string;

    // Validation
    if (!name || !description || !sportId || !region || !district || !phone || !email || !capacity) {
      return {
        success: false,
        message: "Please fill in all required fields",
      };
    }

    // Verify sport category exists
    const sport = await SportsCategory.findById(sportId);
    if (!sport) {
      return {
        success: false,
        message: "Invalid sport category selected",
      };
    }

    // Create slug from name
    const baseSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await SportsAcademy.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Handle image upload
    let imageUrls: string[] = [];
    const imageFiles = formData.getAll("images") as File[];
    
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "sports-academies",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        }) as any;
        
        imageUrls.push(result.secure_url);
      }
    }

    const academy = new SportsAcademy({
      name,
      slug,
      description,
      sport: sportId,
      location: {
        region,
        district,
        ward: ward || undefined,
        street: street || undefined,
      },
      contact: {
        phone,
        email,
        website: website || undefined,
      },
      facilities: facilities ? facilities.split(",").map(f => f.trim()) : [],
      programs: programs ? programs.split(",").map(p => p.trim()) : [],
      ageGroups: ageGroups ? ageGroups.split(",").map(a => a.trim()) : [],
      capacity,
      established,
      images: imageUrls,
      createdBy: session.user.id,
    });

    await academy.save();
    revalidatePath("/sports/academies");
    revalidatePath("/sports");

    return {
      success: true,
      message: "Sports academy created successfully! It will be reviewed before being published.",
    };
  } catch (error) {
    console.error("Error creating sports academy:", error);
    return {
      success: false,
      message: "Failed to create sports academy. Please try again.",
    };
  }
}

// Update sports academy
export async function updateSportsAcademy(
  academyId: string,
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update an academy",
      };
    }

    await dbConnect();

    const academy = await SportsAcademy.findById(academyId);
    if (!academy) {
      return {
        success: false,
        message: "Academy not found",
      };
    }

    // Check if user owns this academy
    if (academy.createdBy.toString() !== session.user.id) {
      return {
        success: false,
        message: "You can only update your own academies",
      };
    }

    // Extract and update fields
    const updateData: any = {};
    
    const name = formData.get("name") as string;
    if (name) updateData.name = name;
    
    const description = formData.get("description") as string;
    if (description) updateData.description = description;
    
    const phone = formData.get("phone") as string;
    if (phone) updateData["contact.phone"] = phone;
    
    const email = formData.get("email") as string;
    if (email) updateData["contact.email"] = email;
    
    const website = formData.get("website") as string;
    if (website) updateData["contact.website"] = website;

    await SportsAcademy.findByIdAndUpdate(academyId, updateData);
    revalidatePath("/sports/academies");
    revalidatePath(`/sports/academies/${academy.slug}`);

    return {
      success: true,
      message: "Academy updated successfully",
    };
  } catch (error) {
    console.error("Error updating sports academy:", error);
    return {
      success: false,
      message: "Failed to update academy",
    };
  }
}

// Get user's academies
export async function getUserAcademies() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    await dbConnect();

    const academies = await SportsAcademy.find({
      createdBy: session.user.id,
    })
      .populate("sport", "name icon")
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(academies));
  } catch (error) {
    console.error("Error fetching user academies:", error);
    return [];
  }
}

// Get academy statistics
export async function getAcademyStatistics() {
  try {
    await dbConnect();
    
    const [total, verified, avgRating] = await Promise.all([
      SportsAcademy.countDocuments({ isActive: true }),
      SportsAcademy.countDocuments({ isActive: true, isVerified: true }),
      SportsAcademy.aggregate([
        { $match: { isActive: true, rating: { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
    ]);

    return {
      total,
      verified,
      averageRating: avgRating[0]?.avgRating || 0,
    };
  } catch (error) {
    console.error("Error fetching academy statistics:", error);
    return {
      total: 0,
      verified: 0,
      averageRating: 0,
    };
  }
}
