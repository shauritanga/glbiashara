import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Star, Trophy, MapPin, Calendar, User, Award, Eye, Heart, MessageCircle } from "lucide-react";
import { getSportsTalents } from "@/actions/sports/talents";
import { getSportsCategories } from "@/actions/sports/categories";
import ScoutingFilters from "./components/ScoutingFilters";
import TalentScoutCard from "./components/TalentScoutCard";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    sport?: string;
    level?: string;
    position?: string;
    age_min?: string;
    age_max?: string;
    experience_min?: string;
    experience_max?: string;
    region?: string;
    availability?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ScoutTalentsPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;

  // Get advanced filter parameters
  const filters = {
    sport: params.sport,
    level: params.level,
    position: params.position,
    search: params.search,
    page: parseInt(params.page || "1"),
    limit: 12,
  };

  // Fetch data
  const [talentsData, categories] = await Promise.all([
    getSportsTalents(filters),
    getSportsCategories(),
  ]);

  const { talents, pagination } = talentsData;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session as any} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            <Link
              href="/sports/talents"
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Talents
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Scout Talents
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover and connect with exceptional sporting talents across Tanzania. 
              Use advanced filters to find athletes that match your specific requirements.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                {talents.length} talents found • Page {pagination.page} of {pagination.pages}
              </p>
            </div>
          </div>

          {/* Scouting Features Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <Eye className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Advanced Search
              </h3>
              <p className="text-gray-600 text-sm">
                Filter by sport, skill level, age, experience, and location to find the perfect talent.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Direct Contact
              </h3>
              <p className="text-gray-600 text-sm">
                Connect directly with talents through our secure messaging system.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Save Favorites
              </h3>
              <p className="text-gray-600 text-sm">
                Bookmark promising talents and build your shortlist for future opportunities.
              </p>
            </div>
          </div>

          {/* Advanced Filters */}
          <ScoutingFilters categories={categories} />

          {/* No Results */}
          {talents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No talents match your criteria
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to discover more talents.
              </p>
              <Link
                href="/sports/talents"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Talents
              </Link>
            </div>
          )}

          {/* Talents Grid */}
          {talents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {talents.map((talent: any) => (
                <TalentScoutCard 
                  key={talent._id} 
                  talent={talent} 
                  currentUserId={session?.user?.id}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-2 mb-8">
              {pagination.page > 1 && (
                <Link
                  href={`/sports/scout?${new URLSearchParams({
                    ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v)),
                    page: (pagination.page - 1).toString(),
                  }).toString()}`}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                const pageNum = Math.max(1, pagination.page - 2) + i;
                if (pageNum > pagination.pages) return null;
                
                return (
                  <Link
                    key={pageNum}
                    href={`/sports/scout?${new URLSearchParams({
                      ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v)),
                      page: pageNum.toString(),
                    }).toString()}`}
                    className={`px-3 py-2 border rounded-lg ${
                      pageNum === pagination.page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
              
              {pagination.page < pagination.pages && (
                <Link
                  href={`/sports/scout?${new URLSearchParams({
                    ...Object.fromEntries(Object.entries(params).filter(([_, v]) => v)),
                    page: (pagination.page + 1).toString(),
                  }).toString()}`}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Looking for Specific Talents?
            </h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact us and we'll help you connect 
              with talents that match your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/sports/register-academy"
                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors border border-purple-500"
              >
                Register Your Academy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
