import { Suspense } from "react";
import Image from "next/image";
import PostList from "@/components/post-list";
import { getUser } from "@/actions/getUser";
import { auth } from "@/auth";
import Link from "next/link";
import UserPages from "./components/UserPages";
import { updateProfilePicture } from "@/actions/user";
import { revalidatePath } from "next/cache";
import CreatePageModal from "./components/CreatePageForm";
import getIndustries from "@/actions/getIndustries";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);
  const industries = await getIndustries();

  const refreshProfile = async () => {
    "use server";
    revalidatePath("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1 flex flex-col items-center space-y-4">
          <form
            action={async (formData) => {
              "use server";
              console.log("FormData", formData);
              const image = formData.get("image") as File;
              const result = await updateProfilePicture(formData);
              if (result.success) {
                // Success handling could be added here if needed
              }
            }}
            className="relative group"
          >
            <div className="relative h-32 w-32 sm:h-40 sm:w-40">
              <Image
                src={profile.image ?? "/default-avatar.png"}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 128px, 160px"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full">
                <label
                  htmlFor="profile-image"
                  className="text-white text-sm cursor-pointer p-2 text-center"
                >
                  Change Photo
                </label>
                <input
                  id="profile-image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
              </div>
            </div>
            <button type="submit" className="hidden" />
          </form>

          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
              {profile.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base break-all">
              {profile.email}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full justify-center px-4">
            <Link href="/profile/edit">Edit Profile</Link>

            <CreatePageModal
              industries={Array.isArray(industries) ? industries : [industries]}
            />
            <Link
              href="/profile/posts/new"
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 text-sm md:text-base text-center w-full sm:w-auto"
            >
              Create Post
            </Link>
          </div>
        </div>

        {/* Posts and Pages Section */}
        <div className="md:col-span-2 space-y-6">
          <Suspense
            fallback={<div className="text-center">Loading posts...</div>}
          >
            <PostList />
          </Suspense>

          <Suspense
            fallback={<div className="text-center">Loading pages...</div>}
          >
            <UserPages userId={profile._id} refreshProfile={refreshProfile} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
