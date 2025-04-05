"use client";
import { IPost } from "@/models/Post";

import { useRouter } from "next/navigation"; // For App Router
import { useState } from "react";

interface PostCardProps {
  post: IPost & {
    user: {
      name: string;
      phone: string;
      avatarUrl?: string;
      createdAt: Date;
    };
  };
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter(); // Get router instance
  const [copied, setCopied] = useState(false);

  // Construct the full URL dynamically
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl); // Copy the URL to clipboard
      setCopied(true);
      alert("Link copied to clipboard!"); // Show alert
      // Optionally, you can use a toast notification instead of alert
      // toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
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
    <div
      onClick={copyToClipboard}
      className="w-full md:max-w-[320px]  flex flex-col bg-white shadow-lg rounded-xl p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
    >
      {/* User Info Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          <img
            src={post.user.avatarUrl || "/default-avatar.png"}
            //   alt={post.user.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <h4 className="font-semibold text-gray-800 ">
              {`${post.user.name.split(" ")[0]}`}
            </h4>
            <p className="text-xs text-gray-500">{post.user.phone}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Posted on {formatDate(post.createdAt)}
        </p>
      </div>

      {/* Media Display */}
      {post.mediaUrl && (
        <div className="mt-4 h-40 w-full rounded-lg overflow-hidden">
          {post.mediaType === "image" ? (
            <img
              src={post.mediaUrl}
              alt={post.title}
              className="w-full  rounded-lg object-cover shadow-md"
            />
          ) : post.mediaType === "video" ? (
            <video
              src={post.mediaUrl}
              controls
              className="w-full  rounded-lg object-cover shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}

      {/* Post Content */}
      <h2 className="text-xl font-bold text-gray-900 my-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 leading-relaxed">{post.description}</p>
    </div>
  );
}
