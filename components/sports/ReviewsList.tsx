"use client";

import { useState } from "react";
import { Star, ThumbsUp, Flag, MoreVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Review {
  _id: string;
  reviewer: {
    name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  isVerified: boolean;
}

interface ReviewsListProps {
  reviews: Review[];
  currentUserId?: string;
  targetType: "Academy" | "Talent";
  targetId: string;
}

export default function ReviewsList({ reviews, currentUserId, targetType, targetId }: ReviewsListProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0,
  }));

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-600">
          Be the first to share your experience with this {targetType.toLowerCase()}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <span className="text-4xl font-bold text-gray-900 mr-2">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">
              Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center text-sm">
                <span className="w-8 text-gray-600">{rating}★</span>
                <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Reviews ({reviews.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  {review.reviewer.image ? (
                    <img
                      src={review.reviewer.image}
                      alt={review.reviewer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-medium">
                      {review.reviewer.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="font-medium text-gray-900 mr-2">
                      {review.reviewer.name}
                    </h4>
                    {review.isVerified && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              {review.comment}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful
                </button>
                <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                  <Flag className="h-4 w-4 mr-1" />
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
