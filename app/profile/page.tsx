import { Suspense } from "react";
import PostList from "@/components/post-list";
import { getUser } from "@/actions/getUser";
import { auth } from "@/auth";
import Link from "next/link";
import UserPages from "./components/UserPages";
import { updateProfilePicture } from "@/actions/user";
import { revalidatePath } from "next/cache";
import CreatePageModal from "./components/CreatePageForm";
import getIndustries from "@/actions/getIndustries";
import CreateCompanyProfileModal from "./components/CreateCompanyProfileModal";
import ProfileImageUploader from "./components/ProfileImageUploader";
import dbConnect from "@/lib/mongodb";
import { CompanyProfile } from "@/models";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);
  const industries = await getIndustries();

  // Fetch company profile if it exists
  let companyProfile = null;
  if (profile.companyProfileId) {
    await dbConnect();
    const profileData = await CompanyProfile.findById(profile.companyProfileId);
    if (profileData) {
      companyProfile = JSON.parse(JSON.stringify(profileData));
    }
  }

  const updateProfilePictureAction = async (formData: FormData) => {
    "use server";
    const result = await updateProfilePicture(formData);
    if (result.success) {
      revalidatePath("/profile");
    }
    return result;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with background gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-5">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-white hover:text-blue-100 transition flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                  <ProfileImageUploader
                    imageUrl={profile.image || "/default-avatar.png"}
                    userName={profile.name}
                    updateAction={async (formData: FormData) => {
                      "use server";
                      const result = await updateProfilePicture(formData);
                      return { success: !!result.success };
                    }}
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 pb-8 px-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {profile.name}
                </h1>
                <p className="text-gray-500 mb-4">{profile.email}</p>

                {/* Edit Profile Link */}
                <div className="mb-4">
                  <Link
                    href="/profile/edit"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </Link>
                </div>

                {/* Profile Details */}
                <div className="space-y-3 mt-6 text-left">
                  {profile.profession && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      <span>{profile.profession.toString()}</span>
                    </div>
                  )}

                  {profile.country && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {profile.city
                          ? `${profile.city}, ${profile.country}`
                          : profile.country}
                      </span>
                    </div>
                  )}

                  {profile.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    href="/profile/posts/new"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">
                      Create New Post
                    </span>
                  </Link>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">
                      <CreatePageModal
                        industries={
                          Array.isArray(industries) ? industries : [industries]
                        }
                      />
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.95-4.419 2.95A1 1 0 014 16V4zm6 9.5l4 2.667V4a1 1 0 00-1-1H7a1 1 0 00-1 1v12.167l4-2.667z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">
                      <CreateCompanyProfileModal userId={profile._id} />
                    </span>
                  </div>

                  <Link
                    href="/profile/network"
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">
                      Manage Network
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2 space-y-8">
            {/* Posts Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  }
                >
                  <PostList />
                </Suspense>
              </div>
            </div>

            {/* Pages Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  }
                >
                  <UserPages
                    userId={profile._id}
                    refreshProfile={async () => {
                      "use server";
                      return revalidatePath("/profile");
                    }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
