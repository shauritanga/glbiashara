import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Trophy, Users, Star, Settings, Eye, CheckCircle, XCircle } from "lucide-react";
import { getSportsStatistics } from "@/actions/sports";
import { getSportsAcademies } from "@/actions/sports/academies";
import { getSportsTalents } from "@/actions/sports/talents";
import AdminStatsCards from "./components/AdminStatsCards";
import PendingApprovals from "./components/PendingApprovals";

export const dynamic = "force-dynamic";

export default async function AdminSportsPage() {
  const session = await auth();

  // Check if user is admin (you can implement your own admin check logic)
  if (!session?.user || session.user.email !== "admin@glbiashara.com") {
    redirect("/login?callbackUrl=/admin/sports");
  }

  // Fetch data for admin dashboard
  const [statistics, academiesData, talentsData] = await Promise.all([
    getSportsStatistics(),
    getSportsAcademies({ limit: 10 }),
    getSportsTalents({ limit: 10 }),
  ]);

  const { academies } = academiesData;
  const { talents } = talentsData;

  // Get pending approvals
  const pendingAcademies = academies.filter((academy: any) => !academy.isVerified);
  const pendingTalents = talents.filter((talent: any) => !talent.isVerified);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session as any} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sports Admin Panel
              </h1>
              <p className="text-lg text-gray-600">
                Manage sports academies, talents, and platform settings
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/sports/categories"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Categories
              </Link>
              <Link
                href="/admin/sports/seed-data"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Seed Sample Data
              </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <AdminStatsCards statistics={statistics} />

          {/* Pending Approvals */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pending Approvals
            </h2>
            <PendingApprovals 
              pendingAcademies={pendingAcademies}
              pendingTalents={pendingTalents}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link
              href="/admin/sports/academies"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-300"
            >
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Manage Academies
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                View, approve, and manage all sports academies
              </p>
              <div className="mt-4 text-blue-600 text-sm font-medium">
                {statistics.academies} Total Academies →
              </div>
            </Link>

            <Link
              href="/admin/sports/talents"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-green-300"
            >
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Manage Talents
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                View, approve, and manage talent profiles
              </p>
              <div className="mt-4 text-green-600 text-sm font-medium">
                {statistics.talents} Total Talents →
              </div>
            </Link>

            <Link
              href="/admin/sports/reviews"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-yellow-300"
            >
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Manage Reviews
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Moderate reviews and ratings
              </p>
              <div className="mt-4 text-yellow-600 text-sm font-medium">
                View All Reviews →
              </div>
            </Link>

            <Link
              href="/admin/sports/analytics"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-purple-300"
            >
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                View detailed analytics and reports
              </p>
              <div className="mt-4 text-purple-600 text-sm font-medium">
                View Analytics →
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {academies.slice(0, 5).map((academy: any) => (
                <div key={academy._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{academy.name}</h4>
                      <p className="text-sm text-gray-600">
                        New academy registered • {academy.location.district}, {academy.location.region}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {academy.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(academy.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              
              {talents.slice(0, 3).map((talent: any) => (
                <div key={talent._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{talent.user.name}</h4>
                      <p className="text-sm text-gray-600">
                        New talent registered • {talent.position} • {talent.sport.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {talent.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(talent.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
