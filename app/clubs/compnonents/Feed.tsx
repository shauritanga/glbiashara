import { MoreHorizontal, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { IPagePost } from "@/models/PagePost";
import { useState, useOptimistic, useTransition, useEffect } from "react";
import { checkIfInteracted, dislikePost, likePost } from "@/actions/page-post";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { set } from "mongoose";

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

      try {
        const result = await likePost(
          post._id.toString(),
          post.pageId.toString()
        );
        if (!result.success) {
          // Revert optimistic update on failure
          result.error === "Unauthorized" ? handleRedirect("/login") : null;
          setOptimisticLikes(optimisticLikes);
          return;
        }
        setIsLiked(true);
        setOptimisticLikes(result.likes ?? optimisticLikes);
      } catch (error: any) {
        // Revert on error
        setOptimisticLikes(optimisticLikes);
        console.error("Failed to like post:", error);
        console.log(error.message);
      }
    });
  };

  const handleDislike = async () => {
    startTransition(async () => {
      if (isDisliked) return;
      setOptimisticDislikes(optimisticDislikes + 1);
      try {
        const result = await dislikePost(
          post._id.toString(),
          post.pageId.toString()
        );
        if (!result.success) {
          // Revert optimistic update on failure
          setOptimisticDislikes(optimisticDislikes);
          return;
        }
        setIsDisliked(true);
        setOptimisticDislikes(result.dislikes ?? optimisticDislikes);
      } catch (error) {
        // Revert on error
        setOptimisticDislikes(optimisticDislikes);
        console.error("Failed to like post:", error);
      }
    });
  };

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
      <div className="px-4 pt-2 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            disabled={isPending}
            className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
              isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            title="Like this post"
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? "text-blue-500" : ""}`} />
            <span>{optimisticLikes}</span>
          </button>
          <button
            onClick={handleDislike}
            disabled={isPending}
            className={`flex items-center gap-2 px-2 py-1 rounded-md transition-colors ${
              isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            title="Dislike this post"
          >
            <ThumbsDown
              className={`w-4 h-4 ${isDisliked ? "text-blue-500" : ""}`}
            />
            <span>{optimisticDislikes}</span>
          </button>
        </div>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md transition-colors"
          title="Copy post link"
        >
          <Copy className="w-4 h-4" />
          <span className={`${isCopied ? "text-green-500" : ""}`}>
            {isCopied ? "Copied!" : "Copy Link"}
          </span>
        </button>
      </div>
    </div>
  );
}
