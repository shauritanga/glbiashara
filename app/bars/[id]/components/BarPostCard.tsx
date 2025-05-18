"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BarPost {
  _id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: string;
  likes: number;
}

export default function BarPostCard({ post }: { post: BarPost }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsPlaying(true);
  };

  const handleVideoPause = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsPlaying(false);
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  // Truncate description if it's too long
  const shouldTruncate = post.description.length > 150;
  const truncatedDescription =
    shouldTruncate && !showFullDescription
      ? `${post.description.slice(0, 150)}...`
      : post.description;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save Post</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">
          {truncatedDescription}
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="ml-1 text-amber-600 hover:text-amber-800 font-medium"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </p>

        {/* Media Content */}
        {post.mediaUrl && (
          <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-100">
            {post.mediaType === "image" ? (
              <div className="relative h-64 w-full">
                <Image
                  src={post.mediaUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : post.mediaType === "video" ? (
              <div className="relative">
                <video
                  src={post.mediaUrl}
                  className="w-full rounded-lg"
                  controls
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/30 rounded-full p-3">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
          </div>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
