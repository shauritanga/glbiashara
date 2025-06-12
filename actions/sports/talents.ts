"use server";

import dbConnect from "@/lib/mongodb";
import { SportsTalent, SportsCategory, SportsAcademy } from "@/models/sports";
import { ActionResponse } from "@/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all sports talents with optional filters
export async function getSportsTalents(filters?: {
  sport?: string;
  level?: string;
  position?: string;
  region?: string;
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
    
    if (filters?.level) {
      query.level = filters.level;
    }
    
    if (filters?.position) {
      query.position = { $regex: filters.position, $options: "i" };
    }
    
    if (filters?.search) {
      // We'll search in user's name through population
      query.$or = [
        { position: { $regex: filters.search, $options: "i" } },
        { "experience.description": { $regex: filters.search, $options: "i" } },
      ];
    }

    const limit = filters?.limit || 20;
    const page = filters?.page || 1;
    const skip = (page - 1) * limit;

    const talents = await SportsTalent.find(query)
      .populate("user", "name email image city state")
      .populate("sport", "name icon slug")
      .populate("currentAcademy", "name slug")
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await SportsTalent.countDocuments(query);

    return {
      talents: JSON.parse(JSON.stringify(talents)),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching sports talents:", error);
    return {
      talents: [],
      pagination: { total: 0, page: 1, limit: 20, pages: 0 },
    };
  }
}

// Get single sports talent by ID
export async function getSportsTalentById(talentId: string) {
  try {
    await dbConnect();
    
    const talent = await SportsTalent.findOne({ _id: talentId, isActive: true })
      .populate("user", "name email image city state phone")
      .populate("sport", "name icon slug")
      .populate("currentAcademy", "name slug location")
      .lean();

    if (!talent) {
      return null;
    }

    return JSON.parse(JSON.stringify(talent));
  } catch (error) {
    console.error("Error fetching sports talent:", error);
    return null;
  }
}

// Get talents by sport category
export async function getTalentsByCategory(categorySlug: string) {
  try {
    await dbConnect();
    
    const category = await SportsCategory.findOne({ slug: categorySlug });
    if (!category) {
      return [];
    }

    const talents = await SportsTalent.find({
      sport: category._id,
      isActive: true,
    })
      .populate("user", "name image city")
      .populate("sport", "name icon slug")
      .sort({ rating: -1 })
      .limit(10)
      .lean();

    return JSON.parse(JSON.stringify(talents));
  } catch (error) {
    console.error("Error fetching talents by category:", error);
    return [];
  }
}

// Create sports talent profile
export async function createSportsTalent(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to create a talent profile",
      };
    }

    await dbConnect();

    // Check if user already has a talent profile
    const existingTalent = await SportsTalent.findOne({
      user: session.user.id,
    });

    if (existingTalent) {
      return {
        success: false,
        message: "You already have a talent profile. Please update your existing profile instead.",
      };
    }

    // Extract form data
    const sportId = formData.get("sport") as string;
    const position = formData.get("position") as string;
    const level = formData.get("level") as string;
    const dateOfBirth = new Date(formData.get("dateOfBirth") as string);
    const height = formData.get("height") ? parseInt(formData.get("height") as string) : undefined;
    const weight = formData.get("weight") ? parseInt(formData.get("weight") as string) : undefined;
    const preferredFoot = formData.get("preferredFoot") as string;
    const experienceYears = parseInt(formData.get("experienceYears") as string);
    const experienceDescription = formData.get("experienceDescription") as string;
    const currentAcademyId = formData.get("currentAcademy") as string;
    const achievements = formData.get("achievements") as string;
    const willingToRelocate = formData.get("willingToRelocate") === "true";
    const lookingFor = formData.get("lookingFor") as string;

    // Validation
    if (!sportId || !position || !level || !dateOfBirth || !experienceYears || !experienceDescription) {
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

    // Verify academy if provided
    let currentAcademy = null;
    if (currentAcademyId) {
      currentAcademy = await SportsAcademy.findById(currentAcademyId);
      if (!currentAcademy) {
        return {
          success: false,
          message: "Invalid academy selected",
        };
      }
    }

    // Handle video uploads
    let videoUrls: string[] = [];
    const videoFiles = formData.getAll("videos") as File[];
    
    for (const file of videoFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            {
              resource_type: "video",
              folder: "sports-talents",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        }) as any;
        
        videoUrls.push(result.secure_url);
      }
    }

    const talent = new SportsTalent({
      user: session.user.id,
      sport: sportId,
      position,
      level,
      dateOfBirth,
      height,
      weight,
      preferredFoot: preferredFoot || undefined,
      experience: {
        years: experienceYears,
        description: experienceDescription,
      },
      currentAcademy: currentAcademyId || undefined,
      achievements: achievements ? achievements.split(",").map(a => a.trim()) : [],
      videos: videoUrls,
      preferences: {
        willingToRelocate,
        lookingFor: lookingFor ? lookingFor.split(",").map(l => l.trim()) : [],
        preferredRegions: [], // Can be added later
      },
    });

    await talent.save();
    revalidatePath("/sports/talents");
    revalidatePath("/sports");

    return {
      success: true,
      message: "Talent profile created successfully!",
    };
  } catch (error) {
    console.error("Error creating sports talent:", error);
    return {
      success: false,
      message: "Failed to create talent profile. Please try again.",
    };
  }
}

// Update sports talent profile
export async function updateSportsTalent(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update your talent profile",
      };
    }

    await dbConnect();

    const talent = await SportsTalent.findOne({ user: session.user.id });
    if (!talent) {
      return {
        success: false,
        message: "Talent profile not found",
      };
    }

    // Extract and update fields
    const updateData: any = {};
    
    const position = formData.get("position") as string;
    if (position) updateData.position = position;
    
    const level = formData.get("level") as string;
    if (level) updateData.level = level;
    
    const experienceDescription = formData.get("experienceDescription") as string;
    if (experienceDescription) {
      updateData["experience.description"] = experienceDescription;
    }
    
    const achievements = formData.get("achievements") as string;
    if (achievements) {
      updateData.achievements = achievements.split(",").map(a => a.trim());
    }

    await SportsTalent.findByIdAndUpdate(talent._id, updateData);
    revalidatePath("/sports/talents");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Talent profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating sports talent:", error);
    return {
      success: false,
      message: "Failed to update talent profile",
    };
  }
}

// Get user's talent profile
export async function getUserTalentProfile() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return null;
    }

    await dbConnect();

    const talent = await SportsTalent.findOne({
      user: session.user.id,
    })
      .populate("sport", "name icon")
      .populate("currentAcademy", "name slug")
      .lean();

    if (!talent) {
      return null;
    }

    return JSON.parse(JSON.stringify(talent));
  } catch (error) {
    console.error("Error fetching user talent profile:", error);
    return null;
  }
}

// Get talent statistics
export async function getTalentStatistics() {
  try {
    await dbConnect();
    
    const [total, verified, avgRating, levelStats] = await Promise.all([
      SportsTalent.countDocuments({ isActive: true }),
      SportsTalent.countDocuments({ isActive: true, isVerified: true }),
      SportsTalent.aggregate([
        { $match: { isActive: true, rating: { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
      SportsTalent.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$level", count: { $sum: 1 } } },
      ]),
    ]);

    return {
      total,
      verified,
      averageRating: avgRating[0]?.avgRating || 0,
      levelBreakdown: levelStats.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error("Error fetching talent statistics:", error);
    return {
      total: 0,
      verified: 0,
      averageRating: 0,
      levelBreakdown: {},
    };
  }
}
