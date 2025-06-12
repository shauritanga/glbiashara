"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createReview } from "@/actions/sports/reviews";

interface ReviewFormProps {
  targetType: "Academy" | "Talent";
  targetId: string;
  targetName: string;
  onSuccess?: () => void;
}

export default function ReviewForm({ targetType, targetId, targetName, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [state, formAction, isPending] = useActionState(
    createReview.bind(null, targetType, targetId),
    null
  );

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  // Handle successful submission
  if (state?.success && onSuccess) {
    onSuccess();
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Write a Review for {targetName}
      </h3>

      {state?.message && (
        <div className={`p-4 rounded-lg mb-4 ${
          state.success 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Rating Stars */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="p-1 transition-colors"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating > 0 && (
                <>
                  {rating} star{rating !== 1 ? "s" : ""}
                  {rating === 1 && " - Poor"}
                  {rating === 2 && " - Fair"}
                  {rating === 3 && " - Good"}
                  {rating === 4 && " - Very Good"}
                  {rating === 5 && " - Excellent"}
                </>
              )}
            </span>
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Share your experience with ${targetName}...`}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || rating === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
