import Image from "next/image";
import Link from "next/link";
import getClub from "@/actions/getClub";
import getPagePosts from "@/actions/getPagePosts";
import { getPosts } from "@/actions/getPosts";
import { IPost } from "@/models";
import ClubFeed from "../compnonents/ClubFeed";

export const dynamic = "force-dynamic";

export default async function FootballClubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const club = await getClub(id).catch(() => null);
  const posts = await getPagePosts(id).catch(() => []);
  const business = await getPosts();
  const uniqueCategories = Array.from(
    new Set(business.map((item: IPost) => item.category))
  ) as string[];

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl font-medium">Club not found</p>
      </div>
    );
  }

  const includesLocals = ["simba", "yanga"].some((word) =>
    club.name.toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <div className="flex items-center gap-4">
                <Image
                  src={`/${club.name.split(" ")[0].toLowerCase()}.png`}
                  alt={`${club.name} logo`}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {club.name}
                  </h3>
                  <p className="text-gray-600">{club.country}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ClubFeed posts={posts} />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="md:col-span-3 space-y-6">
            {/* Business Opportunities */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                Business Opportunities
              </h5>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((item, index) => (
                  <Link
                    key={index}
                    href={`/business?type=${item}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {item.toLowerCase()}
                  </Link>
                ))}
              </div>
            </div>

            {/* Health Care */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                Health Care
              </h5>
              <Link
                href="/health/kairuki"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Kairuki Institute
              </Link>
            </div>

            {/* Conditional Section */}
            {includesLocals ? (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-3">
                  NBC Official Sponsor
                </h5>
                <div className="h-56 bg-gray-100 rounded-md" />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h5 className="text-lg font-semibold text-gray-800 mb-3">
                  Tourism & Tourist Sites
                </h5>
                <Link href="/tourism/zanzibar">
                  <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity" />
                </Link>
              </div>
            )}

            {/* Sports & Talents */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h5 className="text-lg font-semibold text-gray-800 mb-3">
                Sports & Talents
              </h5>
              <div className="h-56 bg-gray-100 rounded-md" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
