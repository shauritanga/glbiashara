"use server";

import dbConnect from "@/lib/mongodb";
import { SportsReview, SportsAcademy, SportsTalent } from "@/models/sports";
import { ActionResponse } from "@/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Get reviews for a target (academy or talent)
export async function getReviews(targetType: "Academy" | "Talent", targetId: string) {
  try {
    await dbConnect();
    
    const reviews = await SportsReview.find({
      targetType,
      targetId,
    })
      .populate("reviewer", "name image")
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

// Create a review
export async function createReview(
  targetType: "Academy" | "Talent",
  targetId: string,
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to leave a review",
      };
    }

    await dbConnect();

    const rating = parseInt(formData.get("rating") as string);
    const comment = formData.get("comment") as string;

    if (!rating || !comment || rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Please provide a valid rating (1-5) and comment",
      };
    }

    // Check if user already reviewed this target
    const existingReview = await SportsReview.findOne({
      reviewer: session.user.id,
      targetType,
      targetId,
    });

    if (existingReview) {
      return {
        success: false,
        message: "You have already reviewed this " + targetType.toLowerCase(),
      };
    }

    // Verify target exists
    let target;
    if (targetType === "Academy") {
      target = await SportsAcademy.findById(targetId);
    } else {
      target = await SportsTalent.findById(targetId);
    }

    if (!target) {
      return {
        success: false,
        message: targetType + " not found",
      };
    }

    // Create review
    const review = new SportsReview({
      reviewer: session.user.id,
      targetType,
      targetId,
      rating,
      comment,
    });

    await review.save();

    // Update target's rating
    await updateTargetRating(targetType, targetId);

    revalidatePath(`/sports/${targetType.toLowerCase()}s`);
    revalidatePath(`/sports/${targetType.toLowerCase()}s/${target.slug || targetId}`);

    return {
      success: true,
      message: "Review submitted successfully",
    };
  } catch (error) {
    console.error("Error creating review:", error);
    return {
      success: false,
      message: "Failed to submit review",
    };
  }
}

// Update review
export async function updateReview(
  reviewId: string,
  _: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to update a review",
      };
    }

    await dbConnect();

    const review = await SportsReview.findById(reviewId);
    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    // Check if user owns this review
    if (review.reviewer.toString() !== session.user.id) {
      return {
        success: false,
        message: "You can only update your own reviews",
      };
    }

    const rating = parseInt(formData.get("rating") as string);
    const comment = formData.get("comment") as string;

    if (!rating || !comment || rating < 1 || rating > 5) {
      return {
        success: false,
        message: "Please provide a valid rating (1-5) and comment",
      };
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update target's rating
    await updateTargetRating(review.targetType, review.targetId.toString());

    revalidatePath(`/sports/${review.targetType.toLowerCase()}s`);

    return {
      success: true,
      message: "Review updated successfully",
    };
  } catch (error) {
    console.error("Error updating review:", error);
    return {
      success: false,
      message: "Failed to update review",
    };
  }
}

// Delete review
export async function deleteReview(reviewId: string): Promise<ActionResponse> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to delete a review",
      };
    }

    await dbConnect();

    const review = await SportsReview.findById(reviewId);
    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    // Check if user owns this review
    if (review.reviewer.toString() !== session.user.id) {
      return {
        success: false,
        message: "You can only delete your own reviews",
      };
    }

    const targetType = review.targetType;
    const targetId = review.targetId.toString();

    await SportsReview.findByIdAndDelete(reviewId);

    // Update target's rating
    await updateTargetRating(targetType, targetId);

    revalidatePath(`/sports/${targetType.toLowerCase()}s`);

    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting review:", error);
    return {
      success: false,
      message: "Failed to delete review",
    };
  }
}

// Helper function to update target's rating
async function updateTargetRating(targetType: "Academy" | "Talent", targetId: string) {
  try {
    const reviews = await SportsReview.find({
      targetType,
      targetId,
    });

    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
      : 0;

    if (targetType === "Academy") {
      await SportsAcademy.findByIdAndUpdate(targetId, {
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        totalReviews,
      });
    } else {
      await SportsTalent.findByIdAndUpdate(targetId, {
        rating: Math.round(averageRating * 10) / 10,
        totalReviews,
      });
    }
  } catch (error) {
    console.error("Error updating target rating:", error);
  }
}

// Get user's reviews
export async function getUserReviews() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return [];
    }

    await dbConnect();

    const reviews = await SportsReview.find({
      reviewer: session.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    // Populate target information
    const populatedReviews = await Promise.all(
      reviews.map(async (review) => {
        let target;
        if (review.targetType === "Academy") {
          target = await SportsAcademy.findById(review.targetId)
            .select("name slug")
            .lean();
        } else {
          target = await SportsTalent.findById(review.targetId)
            .populate("user", "name")
            .select("user")
            .lean();
        }
        
        return {
          ...review,
          target,
        };
      })
    );

    return JSON.parse(JSON.stringify(populatedReviews));
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return [];
  }
}

// Get review statistics
export async function getReviewStatistics() {
  try {
    await dbConnect();
    
    const [totalReviews, avgRating, ratingDistribution] = await Promise.all([
      SportsReview.countDocuments(),
      SportsReview.aggregate([
        { $group: { _id: null, avgRating: { $avg: "$rating" } } },
      ]),
      SportsReview.aggregate([
        { $group: { _id: "$rating", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    return {
      total: totalReviews,
      averageRating: avgRating[0]?.avgRating || 0,
      distribution: ratingDistribution.reduce((acc: any, stat: any) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    };
  } catch (error) {
    console.error("Error fetching review statistics:", error);
    return {
      total: 0,
      averageRating: 0,
      distribution: {},
    };
  }
}
