import Image from "next/image";
import { Calendar, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function CompanyPosts({
  posts,
  companyName,
}: {
  posts: any[];
  companyName: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">
          Latest Updates from {companyName}
        </h2>
      </div>

      {posts && posts.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {posts.map((post: any) => (
            <div key={post._id} className="p-6">
              <div className="flex items-start gap-4">
                {/* Post Content */}
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">
                      {post.createdAt ? (
                        <time dateTime={post.createdAt}>
                          {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                          })}
                        </time>
                      ) : (
                        "Recently"
                      )}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title || "Post image"}
                        width={600}
                        height={400}
                        className="w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">
            No posts available from this company yet.
          </p>
          <p className="text-sm text-gray-400">
            Check back later for updates and announcements.
          </p>
        </div>
      )}
    </div>
  );
}
