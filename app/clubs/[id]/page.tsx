import Image from "next/image";
import Link from "next/link";
import getClub from "@/actions/getClub";
import getPagePosts from "@/actions/getPagePosts";
import { getPosts } from "@/actions/getPosts";
import { IPost } from "@/models";
import ClubFeed from "../compnonents/ClubFeed";
import TourismSlider from "@/components/tourism-carousel";
import NMBSlider from "@/components/nmb-carousel";
import AppDownloadButton from "../compnonents/member";
import TotalSlider from "@/components/total_energy";
import { getUserByClubId } from "@/actions/user";
import AdvertBanner from "../compnonents/Advert";
import { Button } from "@/components/ui/button";

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

  // Determine if club is Simba
  const isSimba = club.name.toLowerCase().includes("simba");

  // Club color schemes - add more as needed
  const clubColors: Record<
    string,
    {
      primary: string;
      secondary: string;
      bg: string;
      text: string;
      border: string;
      buttonBg: string;
      buttonHover: string;
    }
  > = {
    simba: {
      primary: "bg-red-600",
      secondary: "bg-yellow-500",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-yellow-400",
      buttonBg: "bg-red-600",
      buttonHover: "hover:bg-red-700",
    },
    yanga: {
      primary: "bg-green-600",
      secondary: "bg-yellow-500",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-yellow-400",
      buttonBg: "bg-green-600",
      buttonHover: "hover:bg-green-700",
    },
    chelsea: {
      primary: "bg-blue-600",
      secondary: "bg-blue-400",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-400",
      buttonBg: "bg-blue-600",
      buttonHover: "hover:bg-blue-700",
    },
    arsenal: {
      primary: "bg-red-600",
      secondary: "bg-gray-800",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-gray-800",
      buttonBg: "bg-red-600",
      buttonHover: "hover:bg-red-700",
    },
    // Default colors
    default: {
      primary: "bg-blue-600",
      secondary: "bg-blue-500",
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-white",
      buttonBg: "",
      buttonHover: "",
    },
  };

  // Determine club colors
  const clubName = club.name.toLowerCase();
  let colorScheme = clubColors.default;

  // Check for club name matches
  for (const [key, value] of Object.entries(clubColors)) {
    if (clubName.includes(key)) {
      colorScheme = value;
      break;
    }
  }

  const members = await getUserByClubId(id);

  return (
    <div className={`min-h-screen ${colorScheme.bg}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/clubs">
            <Button
              variant="outline"
              size="sm"
              className={`${colorScheme.text} border-${
                colorScheme.border === "border-white"
                  ? "gray-200"
                  : colorScheme.border
              }`}
            >
              ← Back to Clubs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="md:col-span-3">
            <div
              className={`bg-white rounded-lg shadow-sm p-4 sticky top-6 border ${
                colorScheme.border === "border-white" ? "" : "border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-4 mb-2">
                <Image
                  src={`/${club.name.split(" ")[0].toLowerCase()}.png`}
                  alt={`${club.name} logo`}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className={`text-2xl font-bold ${colorScheme.text}`}>
                    {club.name}
                  </h3>
                  <p className="text-gray-600">{club.country}</p>
                </div>
              </div>
              <AppDownloadButton id={id} />
              <div className="mt-20">
                <h2 className={colorScheme.text}>Official Members</h2>
                <div className="flex items-center">
                  {Array.isArray(members) && members.length > 0 ? (
                    <>
                      {/* Show first two members */}
                      {members.slice(0, 2).map((member: any) => (
                        <div
                          key={member["_id"]}
                          className="relative h-8 w-8 -mr-2"
                        >
                          <Image
                            src={member["image"] ?? "/default.png"}
                            alt="Member image"
                            fill
                            className={`rounded-full h-8 w-8 border-2 ${colorScheme.border}`}
                          />
                        </div>
                      ))}

                      {/* Show count of remaining members if more than 2 */}
                      {members.length > 2 && (
                        <Link href={`/clubs/${id}/contributors`}>
                          <div
                            className={`relative h-8 w-8 ${colorScheme.secondary} rounded-full flex items-center justify-center text-white text-xs font-medium border-2 ${colorScheme.border}`}
                          >
                            +{members.length - 2}
                          </div>
                        </Link>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No official members yet
                    </p>
                  )}
                </div>
              </div>

              {/* Only show for Simba */}
              {isSimba && (
                <div className="mt-20">
                  <AdvertBanner />
                  <div className="mt-4">
                    <h1
                      className={`text-xl font-bold ${colorScheme.text} mb-2`}
                    >
                      Current Amount:{" "}
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "TZS",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(1000000)}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Link href={`/clubs/${id}/contributors`}>
                        <Button
                          className={`flex items-center gap-2 ${colorScheme.buttonBg} ${colorScheme.buttonHover}`}
                        >
                          <span>Contributors</span>
                          <span
                            className={`text-xs bg-white ${colorScheme.text.replace(
                              "text-",
                              "text-"
                            )} px-2 py-1 rounded-full`}
                          >
                            {Array.isArray(members) ? members.length : 0}
                          </span>
                        </Button>
                      </Link>
                      <span className="text-sm text-gray-600">
                        ({Array.isArray(members) ? members.length : 0}{" "}
                        supporters)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-6">
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <ClubFeed posts={posts} />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="md:col-span-3 space-y-6">
            {/* Business Opportunities */}
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                Business Opportunities
              </h5>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((item, index) => (
                  <Link
                    key={index}
                    href={`/business?type=${item}`}
                    className={`px-3 py-1 ${
                      colorScheme.bg === "bg-gray-50"
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : `${colorScheme.bg} ${colorScheme.text} hover:opacity-80`
                    } text-sm rounded-full transition-colors`}
                  >
                    {item.toLowerCase()}
                  </Link>
                ))}
              </div>
            </div>
            {/* Health Care */}
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                Health Care
              </h5>
              <Link
                href="/health/kairuki"
                className={`${colorScheme.text} hover:underline transition-colors`}
              >
                Kairuki Institute
              </Link>
            </div>
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                Total Energy
              </h5>
              <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
                <TotalSlider />
              </div>
            </div>
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                CRDB Bank
              </h5>
              <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
                <NMBSlider />
              </div>
            </div>

            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                Tourism & Tourist Sites
              </h5>
              <Link href="/tourism/zanzibar">
                <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
                  <TourismSlider />
                </div>
              </Link>
            </div>
            {/* Sports & Talents */}
            <div
              className={`bg-white rounded-lg shadow-sm p-4 ${
                colorScheme.border === "border-white"
                  ? ""
                  : "border border-yellow-200"
              }`}
            >
              <h5 className={`text-lg font-semibold ${colorScheme.text} mb-3`}>
                Sports & Talents
              </h5>
              <div className="h-56 bg-gray-100 rounded-md">
                <video
                  className="w-full h-56 rounded-md object-cover"
                  controls
                  src="/videos/mikocheni.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
