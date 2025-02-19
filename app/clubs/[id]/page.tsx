import Image from "next/image";
import Link from "next/link";
import getClub from "@/actions/getClub";
import { getPackedSettings } from "http2";
import getPagePosts from "@/actions/getPagePosts";
import ClubFeed from "@/components/ClubFeed";

export default async function FootballClubPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Fetch club data (this is async and should be awaited)
  const club = await getClub(id).catch(() => null);
  const posts = await getPagePosts(id).catch(() => []);

  // Handle case where club is not found
  if (!club) {
    return <div className="text-center mt-10 text-red-500">Club not found</div>;
  }

  // Check if the club name includes specific keywords
  const includesLocals = ["simba", "yanga"].some((word) =>
    club.name.toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="container mx-auto min-h-screen grid grid-flow-col grid-cols-12">
      {/* Left Sidebar */}
      <div className="col-span-3 p-2">
        <div className="flex items-center gap-4">
          <Image
            src={"/" + club.name.split(" ")[0].toLowerCase() + ".png"} // Fallback to a default image if logo is missing
            alt={`${club.name} logo`}
            width={45}
            height={45}
            className="rounded-full" // Optional: Add styling for the logo
          />
          <h3 className="text-2xl font-semibold">{club.name}</h3>
        </div>
        <p className="text-gray-600 mt-2">{club.country}</p>
      </div>

      {/* Main Content */}
      <div className="col-span-6 m-3">
        {/* Placeholder for ClubFeed component */}
        <ClubFeed posts={posts} />
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3 p-2">
        {/* Health Care Section */}
        <div className="flex flex-col p-2">
          <h5 className="text-gray-800 mb-2 bg-gray-200 p-1 rounded">
            Health care
          </h5>
          <Link
            href="/health/kairuki"
            className="text-blue-500 hover:underline"
          >
            Kairuki Institute
          </Link>
        </div>
        <div className="h-[230px] border rounded shadow-md pb-3"></div>

        {/* Conditional Rendering for Sponsors or Tourism */}
        {includesLocals ? (
          <>
            <div className="flex flex-col p-2 mt-9">
              <h5 className="text-gray-800 mb-2">NBC Official Sponsor</h5>
            </div>
            <div className="h-[230px] border rounded shadow-md pb-3">
              {/* Placeholder for FullHeightSlider component */}
              {/* <FullHeightSlider linkTo={true} images={nbcs} /> */}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col p-2 mt-9">
              <h5 className="text-gray-800 mb-2">Tourism & Tourist Sites</h5>
            </div>
            <Link href="/tourism/zanzibar">
              <div className="h-[230px] border rounded shadow-md pb-3">
                {/* Placeholder for FullHeightSlider component */}
                {/* <FullHeightSlider linkTo={false} images={images} /> */}
              </div>
            </Link>
          </>
        )}

        {/* Sports & Talents Section */}
        <div className="flex flex-col p-2 mt-9">
          <h5 className="text-gray-800 mb-2">Sports & Talents</h5>
        </div>
        <div className="h-[230px] border rounded shadow-md pb-3"></div>
      </div>
    </div>
  );
}
