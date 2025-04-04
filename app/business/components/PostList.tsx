import { IPost } from "@/models/Post";
import PostCard from "./PostCard";
import regions from "@/lib/regions.json";

export default function PostList({ posts }: { posts: IPost[] }) {
  return (
    <div>
      <div>
        <select name="region" id="region" className="mb-4 p-2 border rounded">
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region.label} value={region.label}>
              {region.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gird-cols-1 gap-4 *:md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post: any) => (
          <PostCard key={post._id.toString()} post={post} />
        ))}
      </div>
    </div>
  );
}
