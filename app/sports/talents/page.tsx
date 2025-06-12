import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { MapPin, Trophy, Star, Calendar, User, Award } from "lucide-react";
import { getSportsTalents } from "@/actions/sports/talents";
import { getSportsCategories } from "@/actions/sports/categories";
import { getTalentStatistics } from "@/actions/sports/talents";
import TalentsFilter from "./components/TalentsFilter";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    sport?: string;
    level?: string;
    position?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function TalentsPage({ searchParams }: PageProps) {
  const session = (await auth()) || {};
  const params = await searchParams;

  // Get filter parameters
  const filters = {
    sport: params.sport,
    level: params.level,
    position: params.position,
    search: params.search,
    page: parseInt(params.page || "1"),
    limit: 12,
  };

  // Fetch data
  const [talentsData, categories, statistics] = await Promise.all([
    getSportsTalents(filters),
    getSportsCategories(),
    getTalentStatistics(),
  ]);

  const { talents, pagination } = talentsData;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sports Talents
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover exceptional sporting talents from across Tanzania. Connect with
              promising athletes and help them reach their full potential.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sports/register-talent"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>✨</span>
                <span>Register as Talent</span>
              </Link>
              <Link
                href="/sports/scout"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>🔍</span>
                <span>Advanced Scouting</span>
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Showing {talents.length} of {pagination.total} talents
              </p>
            </div>
          </div>

          {/* Filters */}
          <TalentsFilter categories={categories} />

          {/* No Results */}
          {talents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No talents found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <Link
                href="/sports/register-talent"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register as Talent
              </Link>
            </div>
          )}

          {/* Talents Grid */}
          {talents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {talents.map((talent: any) => {
                const age = new Date().getFullYear() - new Date(talent.dateOfBirth).getFullYear();
                return (
                  <div
                    key={talent._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                          {talent.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'T'}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {talent.user?.name || 'Anonymous'}
                          </h3>
                          <p className="text-gray-600 text-sm">{talent.position}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-600">{talent.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">{talent.sport?.name}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          {talent.user?.city}, {talent.user?.state}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          Age: {age}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          Experience: {talent.experience.years} years
                        </div>
                        <div className="flex items-center">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            talent.level === 'Professional' ? 'bg-red-100 text-red-800' :
                            talent.level === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                            talent.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {talent.level}
                          </span>
                        </div>
                      </div>

                      {talent.currentAcademy && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Training at:</p>
                          <p className="text-sm font-medium text-blue-600">{talent.currentAcademy.name}</p>
                        </div>
                      )}

                      {talent.achievements && talent.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Achievements:</h4>
                          <div className="space-y-1">
                            {talent.achievements.slice(0, 2).map((achievement: string, index: number) => (
                              <div key={index} className="flex items-center text-xs text-gray-600">
                                <Award className="h-3 w-3 mr-2 text-yellow-500" />
                                {achievement}
                              </div>
                            ))}
                            {talent.achievements.length > 2 && (
                              <p className="text-xs text-gray-500">
                                +{talent.achievements.length - 2} more achievements
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t">
                        <Link
                          href={`/sports/talents/${talent._id}`}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block text-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.total}</h3>
              <p className="text-gray-600">Registered Talents</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.verified}</h3>
              <p className="text-gray-600">Verified Talents</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.averageRating.toFixed(1)}</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join Our Talent Community
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Whether you're an athlete looking to showcase your skills or a scout searching
              for the next sports star, everything you need is right here.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center max-w-3xl mx-auto">
              <Link
                href="/sports/register-talent"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>✨</span>
                <span>Register as Talent</span>
              </Link>
              <Link
                href="/sports/scout"
                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors border border-purple-500 flex items-center justify-center space-x-2"
              >
                <span>🔍</span>
                <span>Advanced Scouting</span>
              </Link>
              <Link
                href="/sports/academies"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors border border-blue-500 flex items-center justify-center space-x-2"
              >
                <span>🏫</span>
                <span>Browse Academies</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
