import {
  MoreHorizontal,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { IPagePost } from "@/models";
import { useState, useOptimistic, useTransition, useEffect } from "react";
import { checkIfInteracted, dislikePost, likePost } from "@/actions/page-post";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface PostProps {
  post: IPagePost;
}

export function Feed({ post }: PostProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    post.likes,
    (currentLikes, newLikes: number) => newLikes
  );
  const [optimisticDislikes, setOptimisticDislikes] = useOptimistic(
    post.dislikes,
    (currentDislikes, newDislikes: number) => newDislikes
  );
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleRedirect = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    const checkInteraction = async () => {
      if (!session?.user) return;
      const userId = session.user.id as string;
      const postId = post._id.toString();
      const result = await checkIfInteracted(userId, postId);
      if (result) {
        setIsLiked(result.type === "like");
        setIsDisliked(result.type === "dislike");
      }
    };
    checkInteraction();
  }, [session]);

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard.writeText(postUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLike = async () => {
    startTransition(async () => {
      if (isLiked) return;
      setOptimisticLikes(optimisticLikes + 1);
      if (isDisliked) {
        setIsDisliked(false);
        setOptimisticDislikes(optimisticDislikes - 1);
      }

      try {
        const result = await likePost(
          post._id.toString(),
          post.pageId.toString()
        );
        if (!result.success) {
          // Revert optimistic update on failure
          result.error === "Unauthorized" ? handleRedirect("/login") : null;
          setOptimisticLikes(optimisticLikes);
          if (isDisliked) {
            setIsDisliked(true);
            setOptimisticDislikes(optimisticDislikes);
          }
          return;
        }
        setIsLiked(true);
        setOptimisticLikes(result.likes ?? optimisticLikes);
      } catch (error: any) {
        // Revert on error
        setOptimisticLikes(optimisticLikes);
        if (isDisliked) {
          setIsDisliked(true);
          setOptimisticDislikes(optimisticDislikes);
        }
        console.error("Failed to like post:", error);
      }
    });
  };

  const handleDislike = async () => {
    startTransition(async () => {
      if (isDisliked) return;
      setOptimisticDislikes(optimisticDislikes + 1);
      if (isLiked) {
        setIsLiked(false);
        setOptimisticLikes(optimisticLikes - 1);
      }

      try {
        const result = await dislikePost(
          post._id.toString(),
          post.pageId.toString()
        );
        if (!result.success) {
          // Revert optimistic update on failure
          setOptimisticDislikes(optimisticDislikes);
          if (isLiked) {
            setIsLiked(true);
            setOptimisticLikes(optimisticLikes);
          }
          return;
        }
        setIsDisliked(true);
        setOptimisticDislikes(result.dislikes ?? optimisticDislikes);
      } catch (error) {
        // Revert on error
        setOptimisticDislikes(optimisticDislikes);
        if (isLiked) {
          setIsLiked(true);
          setOptimisticLikes(optimisticLikes);
        }
        console.error("Failed to dislike post:", error);
      }
    });
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="flex px-5 py-4 justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* {post.user?.image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
              <Image
                src={post.user.image}
                alt={post.user.name || "Author"}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://placehold.co/200x200/e2e8f0/64748b?text=User";
                }}
              />
            </div>
          )} */}
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold text-gray-800">
              {post.title}
            </h5>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="px-5 py-4">
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          {post.description}
        </p>

        {/* Media Section */}
        {post.mediaUrl && (
          <div className="w-full relative rounded-lg overflow-hidden mb-2">
            {post.mediaType === "image" ? (
              <div className="aspect-video relative">
                <Image
                  src={post.mediaUrl}
                  alt={post.title ?? "Post image"}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placehold.co/800x450/e2e8f0/64748b?text=Image+Not+Available";
                  }}
                />
              </div>
            ) : (
              <div className="aspect-video relative bg-gray-100">
                <video
                  src={post.mediaUrl}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const placeholder = document.createElement("div");
                      placeholder.className =
                        "w-full h-full flex items-center justify-center bg-gray-200 text-gray-500";
                      placeholder.innerHTML = "<p>Video not available</p>";
                      parent.appendChild(placeholder);
                    }
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="px-5 py-3 border-t border-gray-100 text-sm flex justify-between items-center bg-gray-50">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            disabled={isPending}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
              isLiked
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Like this post"
          >
            <ThumbsUp
              className={`w-4 h-4 ${
                isLiked ? "fill-blue-500 text-blue-500" : ""
              }`}
            />
            <span className="font-medium">{optimisticLikes}</span>
          </button>
          <button
            onClick={handleDislike}
            disabled={isPending}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
              isDisliked
                ? "bg-red-50 text-red-600"
                : "text-gray-600 hover:bg-gray-100"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            title="Dislike this post"
          >
            <ThumbsDown
              className={`w-4 h-4 ${
                isDisliked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span className="font-medium">{optimisticDislikes}</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Comment on this post"
          >
            <MessageCircle className="w-4 h-4" />
            {/* <span className="font-medium">{post.comments || 0}</span> */}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Copy post link"
          >
            <Copy className="w-4 h-4" />
            <span className={`font-medium ${isCopied ? "text-green-500" : ""}`}>
              {isCopied ? "Copied!" : "Copy"}
            </span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Share this post"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
