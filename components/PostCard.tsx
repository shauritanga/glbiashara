import Image from "next/image";

export default async function PostCard({ post }: { post: any }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      key={post._id.toString()}
      className="bg-white rounded-lg shadow-lg overflow-hidden w-full h-96"
    >
      <header className="p-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <span>{formattedDate}</span>
      </header>
      <div className="p-4">
        <p className="text-gray-800">{post.content}</p>
      </div>
      <div className="relative w-full h-full">
        {post.mediaUrl && post.mediaType === "image" && (
          <Image
            src={post.mediaUrl}
            alt="Post image"
            fill
            className="object-cover rounded-bl-lg rounded-br-lg"
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
  );
}
