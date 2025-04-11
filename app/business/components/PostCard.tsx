"use client";
import { IPost } from "@/models";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiCopy } from "react-icons/fi"; // Assuming react-icons is installed

interface PostCardProps {
  post: IPost & {
    user: {
      _id: string;
      name: string;
      phone: string;
      image?: string;
      createdAt: Date;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
      {/* User Info Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={post.user.image || "/default-avatar.png"}
            alt={`${post.user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              <Link href={`/profile/${post.user._id}`}>
                {post.user.name.split(" ")[0]}
              </Link>
            </h4>
            <p className="text-xs text-gray-500 hidden sm:block">
              {post.user.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          <button
            onClick={copyToClipboard}
            className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
            title="Copy link"
          >
            <FiCopy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Media Display */}
      {post.mediaUrl && (
        <div className="relative w-full h-48 sm:h-56 md:h-64">
          {post.mediaType === "image" ? (
            <img
              src={post.mediaUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : post.mediaType === "video" ? (
            <video
              src={post.mediaUrl}
              controls
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}

      {/* Post Content */}
      <div className="p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
          {post.description}
        </p>
        <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-1">
          <span>{post.region}</span>
          <span>•</span>
          <span>{post.district}</span>
          <span>•</span>
          <span>{post.ward}</span>
        </div>
      </div>

      {/* Copied Indicator */}
      {copied && (
        <div className="absolute top-2 right-12 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Copied!
        </div>
      )}
    </div>
  );
}
