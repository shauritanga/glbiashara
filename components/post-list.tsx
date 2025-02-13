import Image from "next/image";
import dbConnect from "@/lib/mongodb";
import { unstable_cache } from "next/cache";
import { getPosts } from "@/actions/getPosts";
import { auth } from "@/auth";

const getCachedPosts = unstable_cache(
  async (id: string) => {
    await dbConnect();
    const posts = await getPosts(id);
    return posts;
  },
  ["posts"],
  { revalidate: 60 }
);

export default async function PostList() {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <p className="text-center text-red-500">User is not authenticated</p>
    );
  }

  const posts = await getCachedPosts(session.user.id);

  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">No posts available.</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Your Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post: any) => (
          <div
            key={post._id.toString()}
            className="bg-white rounded-lg shadow-md overflow-hidden w-full h-64"
          >
            <div className="relative w-full h-full">
              {post.mediaUrl && post.mediaType === "image" && (
                <Image
                  src={post.mediaUrl}
                  alt="Post image"
                  fill
                  className="object-cover rounded-lg"
                />
              )}
              {post.mediaUrl && post.mediaType === "video" && (
                <video
                  src={post.mediaUrl}
                  controls
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
