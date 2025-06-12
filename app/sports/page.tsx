import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Trophy, Users, Star, Calendar, MapPin, Award } from "lucide-react";
import { getSportsStatistics, getSportsCategoriesWithCounts, getFeaturedAcademies } from "@/actions/sports";
import { initializeSportsCategories } from "@/actions/sports/categories";

export const dynamic = "force-dynamic";

export default async function SportsPage() {
  const session = (await auth()) || {};

  // Initialize sports categories if they don't exist
  await initializeSportsCategories();

  // Fetch real data from database
  const [statistics, sportsCategories, featuredAcademies] = await Promise.all([
    getSportsStatistics(),
    getSportsCategoriesWithCounts(),
    getFeaturedAcademies(3),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sports Academy & Talents
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover premier sports academies and showcase your talents. Connect with 
              professional training centers, coaches, and fellow athletes to elevate your 
              sporting journey.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.academies}</h3>
              <p className="text-gray-600">Sports Academies</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.talents}</h3>
              <p className="text-gray-600">Registered Talents</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.totalStudents}</h3>
              <p className="text-gray-600">Total Students</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900">{statistics.averageRating.overall.toFixed(1)}</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>

          {/* Sports Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Sports Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsCategories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/sports/${category.slug}`}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.academiesCount} Academies</span>
                      <span>{category.talentsCount} Talents</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Academies */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Academies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredAcademies.map((academy: any) => (
                <Link
                  key={academy._id}
                  href={`/sports/academies/${academy.slug}`}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 block"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {academy.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {academy.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {academy.location.district}, {academy.location.region}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {academy.currentStudents} Students
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Est. {new Date(academy.established).getFullYear()}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {academy.sport.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Sports Journey?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover top sports academies and talented athletes across Tanzania.
              Your sports journey begins here.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center max-w-2xl mx-auto">
              <Link
                href="/sports/academies"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center flex items-center justify-center space-x-2"
              >
                <span>🏫</span>
                <span>Browse Academies</span>
              </Link>
              <Link
                href="/sports/talents"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center border border-blue-500 flex items-center justify-center space-x-2"
              >
                <span>⭐</span>
                <span>Browse Talents</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
