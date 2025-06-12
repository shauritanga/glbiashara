"use server";

import dbConnect from "@/lib/mongodb";
import { SportsCategory, SportsAcademy, SportsTalent } from "@/models/sports";

// Get comprehensive sports statistics
export async function getSportsStatistics() {
  try {
    await dbConnect();
    
    const [
      categoriesCount,
      academiesCount,
      talentsCount,
      verifiedAcademies,
      verifiedTalents,
      avgAcademyRating,
      avgTalentRating,
      totalStudents,
    ] = await Promise.all([
      SportsCategory.countDocuments({ isActive: true }),
      SportsAcademy.countDocuments({ isActive: true }),
      SportsTalent.countDocuments({ isActive: true }),
      SportsAcademy.countDocuments({ isActive: true, isVerified: true }),
      SportsTalent.countDocuments({ isActive: true, isVerified: true }),
      SportsAcademy.aggregate([
        { $match: { isActive: true, rating: { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
      SportsTalent.aggregate([
        { $match: { isActive: true, rating: { $gt: 0 } } },
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
      SportsAcademy.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalStudents: { $sum: "$currentStudents" } } },
      ]),
    ]);

    return {
      categories: categoriesCount,
      academies: academiesCount,
      talents: talentsCount,
      verifiedAcademies,
      verifiedTalents,
      totalStudents: totalStudents[0]?.totalStudents || 0,
      averageRating: {
        academies: avgAcademyRating[0]?.avgRating || 0,
        talents: avgTalentRating[0]?.avgRating || 0,
        overall: ((avgAcademyRating[0]?.avgRating || 0) + (avgTalentRating[0]?.avgRating || 0)) / 2,
      },
    };
  } catch (error) {
    console.error("Error fetching sports statistics:", error);
    return {
      categories: 0,
      academies: 0,
      talents: 0,
      verifiedAcademies: 0,
      verifiedTalents: 0,
      totalStudents: 0,
      averageRating: {
        academies: 0,
        talents: 0,
        overall: 0,
      },
    };
  }
}

// Get sports categories with counts
export async function getSportsCategoriesWithCounts() {
  try {
    await dbConnect();
    
    const categories = await SportsCategory.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const [academiesCount, talentsCount] = await Promise.all([
          SportsAcademy.countDocuments({ sport: category._id, isActive: true }),
          SportsTalent.countDocuments({ sport: category._id, isActive: true }),
        ]);

        return {
          ...category,
          academiesCount,
          talentsCount,
        };
      })
    );

    return JSON.parse(JSON.stringify(categoriesWithCounts));
  } catch (error) {
    console.error("Error fetching sports categories with counts:", error);
    return [];
  }
}

// Get featured academies (top rated)
export async function getFeaturedAcademies(limit: number = 6) {
  try {
    await dbConnect();
    
    const academies = await SportsAcademy.find({
      isActive: true,
      isVerified: true,
      rating: { $gte: 4.0 },
    })
      .populate("sport", "name icon")
      .sort({ rating: -1, totalReviews: -1 })
      .limit(limit)
      .lean();

    return JSON.parse(JSON.stringify(academies));
  } catch (error) {
    console.error("Error fetching featured academies:", error);
    return [];
  }
}

// Get featured talents (top rated)
export async function getFeaturedTalents(limit: number = 6) {
  try {
    await dbConnect();
    
    const talents = await SportsTalent.find({
      isActive: true,
      isVerified: true,
      rating: { $gte: 4.0 },
    })
      .populate("user", "name image city")
      .populate("sport", "name icon")
      .populate("currentAcademy", "name")
      .sort({ rating: -1, totalReviews: -1 })
      .limit(limit)
      .lean();

    return JSON.parse(JSON.stringify(talents));
  } catch (error) {
    console.error("Error fetching featured talents:", error);
    return [];
  }
}

// Search across academies and talents
export async function searchSports(query: string, filters?: {
  type?: "academies" | "talents" | "both";
  sport?: string;
  region?: string;
  limit?: number;
}) {
  try {
    await dbConnect();
    
    const searchRegex = { $regex: query, $options: "i" };
    const limit = filters?.limit || 20;
    
    let academies: any[] = [];
    let talents: any[] = [];

    if (!filters?.type || filters.type === "academies" || filters.type === "both") {
      const academyQuery: any = {
        isActive: true,
        $or: [
          { name: searchRegex },
          { description: searchRegex },
        ],
      };

      if (filters?.sport) {
        academyQuery.sport = filters.sport;
      }

      if (filters?.region) {
        academyQuery["location.region"] = filters.region;
      }

      academies = await SportsAcademy.find(academyQuery)
        .populate("sport", "name icon")
        .sort({ rating: -1 })
        .limit(limit)
        .lean();
    }

    if (!filters?.type || filters.type === "talents" || filters.type === "both") {
      const talentQuery: any = {
        isActive: true,
        $or: [
          { position: searchRegex },
          { "experience.description": searchRegex },
        ],
      };

      if (filters?.sport) {
        talentQuery.sport = filters.sport;
      }

      talents = await SportsTalent.find(talentQuery)
        .populate("user", "name image city")
        .populate("sport", "name icon")
        .sort({ rating: -1 })
        .limit(limit)
        .lean();
    }

    return {
      academies: JSON.parse(JSON.stringify(academies)),
      talents: JSON.parse(JSON.stringify(talents)),
      total: academies.length + talents.length,
    };
  } catch (error) {
    console.error("Error searching sports:", error);
    return {
      academies: [],
      talents: [],
      total: 0,
    };
  }
}

// Get regional statistics
export async function getRegionalStatistics() {
  try {
    await dbConnect();
    
    const [academyStats, talentStats] = await Promise.all([
      SportsAcademy.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: "$location.region", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      SportsTalent.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        { $unwind: "$userInfo" },
        { $match: { isActive: true } },
        { $group: { _id: "$userInfo.state", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return {
      academies: academyStats,
      talents: talentStats,
    };
  } catch (error) {
    console.error("Error fetching regional statistics:", error);
    return {
      academies: [],
      talents: [],
    };
  }
}

// Get recent activities (new academies and talents)
export async function getRecentActivities(limit: number = 10) {
  try {
    await dbConnect();
    
    const [recentAcademies, recentTalents] = await Promise.all([
      SportsAcademy.find({ isActive: true })
        .populate("sport", "name icon")
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .limit(limit / 2)
        .lean(),
      SportsTalent.find({ isActive: true })
        .populate("user", "name image")
        .populate("sport", "name icon")
        .sort({ createdAt: -1 })
        .limit(limit / 2)
        .lean(),
    ]);

    // Combine and sort by creation date
    const activities = [
      ...recentAcademies.map(academy => ({
        ...academy,
        type: "academy",
        title: academy.name,
        user: academy.createdBy,
        createdAt: academy.createdAt,
      })),
      ...recentTalents.map(talent => ({
        ...talent,
        type: "talent",
        title: `${talent.user.name} - ${talent.position}`,
        user: talent.user,
        createdAt: talent.createdAt,
      })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
     .slice(0, limit);

    return JSON.parse(JSON.stringify(activities));
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
}
