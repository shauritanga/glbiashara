import { getPostByCategory } from "@/actions/posts";

import { IPost } from "@/models/Post";
import PostList from "./components/PostList";

export default async function BusinessOpportunities({
  searchParams,
}: {
  searchParams?: Promise<{ type: string | undefined }>;
}) {
  const category = (await searchParams)?.type ?? "";
  const posts = (await getPostByCategory(category)) as IPost[];

  return (
    <div className="p-12">
      <PostList posts={posts} />
    </div>
  );
}
