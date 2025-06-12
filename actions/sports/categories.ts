"use server";

import dbConnect from "@/lib/mongodb";
import { SportsCategory } from "@/models/sports";
import { ActionResponse } from "@/types";
import { revalidatePath } from "next/cache";

// Get all sports categories
export async function getSportsCategories() {
  try {
    await dbConnect();
    const categories = await SportsCategory.find({ isActive: true })
      .sort({ name: 1 })
      .lean();
    
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching sports categories:", error);
    return [];
  }
}

// Get single sports category by slug
export async function getSportsCategoryBySlug(slug: string) {
  try {
    await dbConnect();
    const category = await SportsCategory.findOne({ slug, isActive: true }).lean();
    
    if (!category) {
      return null;
    }
    
    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    console.error("Error fetching sports category:", error);
    return null;
  }
}

// Create sports category (admin function)
export async function createSportsCategory(
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const description = formData.get("description") as string;

    if (!name || !icon || !description) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Create slug from name
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Check if category already exists
    const existingCategory = await SportsCategory.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return {
        success: false,
        message: "Sports category already exists",
      };
    }

    const category = new SportsCategory({
      name,
      slug,
      icon,
      description,
    });

    await category.save();
    revalidatePath("/sports");

    return {
      success: true,
      message: "Sports category created successfully",
    };
  } catch (error) {
    console.error("Error creating sports category:", error);
    return {
      success: false,
      message: "Failed to create sports category",
    };
  }
}

// Initialize default sports categories
export async function initializeSportsCategories() {
  try {
    await dbConnect();

    const defaultCategories = [
      {
        name: "Football",
        slug: "football",
        icon: "⚽",
        description: "Professional football academies and talent development programs across Tanzania.",
      },
      {
        name: "Basketball",
        slug: "basketball",
        icon: "🏀",
        description: "Basketball training centers and emerging players developing their skills.",
      },
      {
        name: "Athletics",
        slug: "athletics",
        icon: "🏃",
        description: "Track and field training programs for sprinters, distance runners, and field event athletes.",
      },
      {
        name: "Swimming",
        slug: "swimming",
        icon: "🏊",
        description: "Swimming academies and aquatic sports training facilities.",
      },
      {
        name: "Tennis",
        slug: "tennis",
        icon: "🎾",
        description: "Tennis coaching and player development with international standard courts.",
      },
      {
        name: "Volleyball",
        slug: "volleyball",
        icon: "🏐",
        description: "Volleyball training and team development programs.",
      },
    ];

    for (const categoryData of defaultCategories) {
      const existingCategory = await SportsCategory.findOne({
        slug: categoryData.slug,
      });

      if (!existingCategory) {
        const category = new SportsCategory(categoryData);
        await category.save();
        console.log(`Created sports category: ${categoryData.name}`);
      }
    }

    return {
      success: true,
      message: "Sports categories initialized successfully",
    };
  } catch (error) {
    console.error("Error initializing sports categories:", error);
    return {
      success: false,
      message: "Failed to initialize sports categories",
    };
  }
}

// Get sports statistics
export async function getSportsStatistics() {
  try {
    await dbConnect();
    
    const categoriesCount = await SportsCategory.countDocuments({ isActive: true });

    return {
      categories: categoriesCount,
      academies: 0, // Will be updated when academy actions are created
      talents: 0, // Will be updated when talent actions are created
      averageRating: 4.7, // Will be calculated from real data
    };
  } catch (error) {
    console.error("Error fetching sports statistics:", error);
    return {
      categories: 0,
      academies: 0,
      talents: 0,
      averageRating: 0,
    };
  }
}
