import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { IPagePost } from "@/models/PagePost";

interface PostProps {
  post: IPagePost;
}

export function Feed({ post }: PostProps) {
  return (
    <div className="flex flex-col border border-gray-200 py-4 mx-2 my-4 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex px-4 pb-2 justify-between items-center border-b border-gray-100">
        <div className="flex flex-col">
          <h5 className="text-lg font-semibold text-gray-800">{post.title}</h5>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="px-4 py-3">
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          {post.description}
        </p>

        {/* Media Section */}
        {post.mediaUrl && (
          <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
            {post.mediaType === "image" ? (
              <Image
                src={post.mediaUrl}
                alt={post.title ?? "title"}
                width={600}
                height={400}
                objectFit="cover"
                className="w-full h-full transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="px-4 pt-2 border-t border-gray-100 text-sm text-gray-500">
        <span>Post ID: {post._id.toString()}</span>
      </div>
    </div>
  );
}
