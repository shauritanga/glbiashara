import { Suspense } from "react";
import Image from "next/image";

import PostList from "@/components/post-list";
import CreatePageModal from "@/components/create-page";
import CreatePostModal from "@/components/create-post";
import EditProfileModal from "@/components/edit-profile";
import { getUser } from "@/actions/getUser";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import UserPages from "./components/UserPages";
import getClubs from "@/actions/getClubs";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);
  const clubs = await getClubs();

  const refreshProfile = async () => {
    "use server";
    revalidatePath("/profile");
  };

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 ">
      <Link href="/">Back</Link>
      <div className="flex flex-col items-center mb-8 justify-center">
        <div className="relative h-32 w-32">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            alt={profile.name}
            fill
            className="rounded-full"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
        <p className="text-gray-600 mb-4">{profile.email}</p>
        <div className="flex space-x-4">
          <EditProfileModal profile={profile} clubs={clubs} />
          <CreatePageModal />
          <CreatePostModal refreshPosts={refreshProfile} />
        </div>
      </div>

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostList />
      </Suspense>

      <Suspense fallback={<div>Loading posts...</div>}>
        <UserPages userId={profile._id} refreshProfile={refreshProfile} />
      </Suspense>
    </div>
  );
}
