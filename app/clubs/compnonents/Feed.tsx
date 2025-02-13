import { IPosts } from "@/types";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface PostProps {
  post: IPosts;
}

export function Feed({ post }: PostProps) {
  return (
    <div className="flex flex-col border py-2 m-2 rounded shadow-md">
      <div className="flex p-2 justify-between">
        <h5>{post.title}</h5>
        <MoreHorizontal />
      </div>
      <div className="w-full h-[400px]">
        {post.type === "image" ? (
          <Image
            src={post.url.toString()}
            width={600}
            height={400}
            objectFit="cover"
            alt="Staium"
            className="w-full"
          />
        ) : (
          <video
            src={post.url.toString()}
            controls
            className="w-full rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
