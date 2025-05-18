import { auth } from "@/auth";
import { getUser } from "@/actions/getUser";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NetworkTabs from "./components/NetworkTabs";
import { Suspense } from "react";
import NetworkSkeleton from "./components/NetworkSkeleton";

export default async function NetworkPage() {
  const session = await auth();
  const profile = await getUser(session?.user?.email!);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/profile"
              className="text-white hover:text-blue-100 transition flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Profile
            </Link>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold">Your Network</h1>
            <p className="mt-2 text-blue-100">
              Manage your professional connections
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Suspense fallback={<NetworkSkeleton />}>
            <NetworkTabs userId={profile._id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
