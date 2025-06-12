import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { MapPin, Users, Star, Phone, Mail, Globe } from "lucide-react";
import { getSportsAcademies } from "@/actions/sports/academies";
import { getSportsCategories } from "@/actions/sports/categories";
import AcademiesFilter from "./components/AcademiesFilter";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    sport?: string;
    region?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AcademiesPage({ searchParams }: PageProps) {
  const session = (await auth()) || {};
  const params = await searchParams;

  // Get filter parameters
  const filters = {
    sport: params.sport,
    region: params.region,
    search: params.search,
    page: parseInt(params.page || "1"),
    limit: 12,
  };

  // Fetch data
  const [academiesData, categories] = await Promise.all([
    getSportsAcademies(filters),
    getSportsCategories(),
  ]);

  const { academies, pagination } = academiesData;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sports Academies
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover premier sports academies across Tanzania. Find the perfect
              training facility to develop your skills and achieve your sporting goals.
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Showing {academies.length} of {pagination.total} academies
              </p>
            </div>
          </div>

          {/* Filters */}
          <AcademiesFilter categories={categories} />

          {/* No Results */}
          {academies.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏟️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No academies found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms.
              </p>
              <Link
                href="/sports/register-academy"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register Your Academy
              </Link>
            </div>
          )}

          {/* Academies Grid */}
          {academies.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {academies.map((academy: any) => (
                <div
                  key={academy._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{academy.name}</h3>
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {academy.sport?.name} {academy.sport?.icon}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">
                          {academy.location.district}, {academy.location.region}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-600">{academy.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{academy.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-600">{academy.currentStudents} Students</span>
                      </div>
                      <div className="text-gray-600">
                        Est. {new Date(academy.established).getFullYear()}
                      </div>
                    </div>

                    {academy.programs && academy.programs.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Programs:</h4>
                        <div className="flex flex-wrap gap-2">
                          {academy.programs.map((program: any, index: number) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Contact:</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-2" />
                          {academy.contact.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-2" />
                          {academy.contact.email}
                        </div>
                        {academy.contact.website && (
                          <div className="flex items-center">
                            <Globe className="h-3 w-3 mr-2" />
                            {academy.contact.website}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Link
                        href={`/sports/academies/${academy.slug}`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Want to List Your Academy?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join our platform and connect with aspiring athletes looking for 
              quality training. Showcase your facilities and programs to a wider audience.
            </p>
            <Link
              href="/sports/register-academy"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Register Your Academy
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
