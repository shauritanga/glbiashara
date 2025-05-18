import { auth } from "@/auth";
import { getUser } from "@/actions/getUser";
import getClubs from "@/actions/getClubs";
import { getProfessions } from "@/actions/getProfessions";
import { EditProfileForm } from "../components/EditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProfilePage() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);
  const clubs = await getClubs();
  const professions = await getProfessions();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        {/* Page header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Your Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Update your personal information and preferences
          </p>
        </div>

        {/* Form container with subtle shadow and rounded corners */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="p-6 md:p-8">
            <EditProfileForm
              profile={profile}
              professions={professions}
              clubs={clubs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
