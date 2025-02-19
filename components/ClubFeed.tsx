import PostCard from "./PostCard";

export default function ClubFeed({ posts }: { posts: any[] }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id.toString()} post={post} />
      ))}
    </div>
  );
}
