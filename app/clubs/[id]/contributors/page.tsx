import { getUserByClubId } from "@/actions/user";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getClub from "@/actions/getClub";

export default async function Contributors({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const members = await getUserByClubId(id);
  const club = await getClub(id).catch(() => null);

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
      cardBg: string;
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
      cardBg: "bg-red-50",
    },
    yanga: {
      primary: "bg-green-600",
      secondary: "bg-yellow-500",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-yellow-400",
      buttonBg: "bg-green-600",
      buttonHover: "hover:bg-green-700",
      cardBg: "bg-green-50",
    },
    chelsea: {
      primary: "bg-blue-600",
      secondary: "bg-blue-400",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-400",
      buttonBg: "bg-blue-600",
      buttonHover: "hover:bg-blue-700",
      cardBg: "bg-blue-50",
    },
    arsenal: {
      primary: "bg-red-600",
      secondary: "bg-gray-800",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-gray-800",
      buttonBg: "bg-red-600",
      buttonHover: "hover:bg-red-700",
      cardBg: "bg-red-50",
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
      cardBg: "",
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

  return (
    <div className={`min-h-screen ${colorScheme.bg} py-8`}>
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link href={`/clubs/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className={`${colorScheme.text} border-${
                colorScheme.border === "border-white" ? "" : colorScheme.border
              }`}
            >
              ← Back to Club
            </Button>
          </Link>
          <h1
            className={`text-3xl font-bold mt-4 text-center md:text-left ${colorScheme.text}`}
          >
            {club.name} Contributors
          </h1>
          <p className="text-gray-600 mt-2 text-center md:text-left">
            People who support this club
          </p>

          {/* Only show for Simba */}
          {isSimba && (
            <div className="mt-4 mb-6 md:max-w-md">
              <div className="bg-red-600 text-white rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-bold">
                  Confederation Cup 2025 Campaign
                </h2>
                <p className="text-sm mt-1">
                  Support our team with your contribution
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "TZS",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(1000000)}
                  </span>
                  <span className="text-sm bg-yellow-500 text-red-800 px-2 py-1 rounded-full">
                    {Array.isArray(members) ? members.length : 0} supporters
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {Array.isArray(members) && members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member: any) => (
              <Card
                key={member._id}
                className={`hover:shadow-md transition-shadow ${
                  colorScheme.border === "border-white"
                    ? ""
                    : "border-yellow-200 border"
                }`}
              >
                <CardHeader className={`pb-2 ${colorScheme.cardBg}`}>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={member.image ?? "/default.png"}
                        alt={`${member.name}'s avatar`}
                        fill
                        className={`rounded-full object-cover border-2 ${colorScheme.border}`}
                      />
                    </div>
                    <CardTitle className={`text-lg ${colorScheme.text}`}>
                      {member.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {member.profession && (
                    <p className="text-sm text-gray-600 mb-1 capitalize">
                      <span className="font-medium">Profession:</span>{" "}
                      {member.profession.name}
                    </p>
                  )}
                  {member.business && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Business:</span>{" "}
                      <span className="capitalize">{member.business}</span>
                    </p>
                  )}
                  <Link
                    href={`/profile/${member._id}`}
                    className="mt-3 inline-block"
                  >
                    <Button
                      className={`${colorScheme.buttonBg} ${colorScheme.buttonHover}`}
                      size="sm"
                    >
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-12 ${
              colorScheme.bg
            } ${colorScheme.text.replace("700", "500")} rounded-lg`}
          >
            <p className="text-xl">No contributors found for this club</p>
          </div>
        )}
      </div>
    </div>
  );
}
