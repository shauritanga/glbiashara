import { getPostByCategory } from "@/actions/posts";
import { IPost } from "@/models/Post";
import PostList from "./components/PostList";

// Add proper typing for searchParams
interface SearchParams {
  type?: string;
}

export default async function BusinessOpportunities({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Await searchParams once at the top
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.type ?? "";

  // Fetch posts with error handling
  let posts: IPost[] = [];
  try {
    posts = (await getPostByCategory(category)) as IPost[];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // You might want to return an error component here
  }

  // Add basic validation
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    posts = [];
  }

  return (
    <div className="p-1">
      <PostList posts={posts} />
    </div>
  );
}

// Optional: Add metadata if needed
export const dynamic = "force-dynamic"; // Adjust based on your caching needs
