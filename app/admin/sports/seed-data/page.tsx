import { Suspense } from "react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Footer } from "@/components/footer";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Database, Users, Trophy, Star } from "lucide-react";
import SeedDataForm from "./components/SeedDataForm";

export const dynamic = "force-dynamic";

export default async function SeedDataPage() {
  const session = await auth();
  
  // Check if user is admin
  if (!session?.user || session.user.email !== "admin@glbiashara.com") {
    redirect("/login?callbackUrl=/admin/sports/seed-data");
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header session={session as any} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center mb-8">
            <Link
              href="/admin/sports"
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Admin Panel
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Seed Sample Data
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Populate the sports platform with sample academies, talents, and categories 
              to demonstrate the system's functionality.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Important Notice
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    This action will clear all existing sports data and replace it with sample data. 
                    This includes:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All sports categories</li>
                    <li>All sports academies</li>
                    <li>All talent profiles</li>
                    <li>Related reviews and ratings</li>
                  </ul>
                  <p className="mt-2 font-medium">
                    This action cannot be undone. Use only for development or testing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Data Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Sample Academies
                </h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Elite Football Academy (Dar es Salaam)</li>
                <li>• Champions Basketball Center (Arusha)</li>
                <li>• Speed Athletics Club (Mwanza)</li>
              </ul>
              <div className="mt-4 text-xs text-gray-500">
                Complete with facilities, programs, and contact information
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Sample Talents
                </h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• John Mwalimu (Football Midfielder)</li>
                <li>• Grace Kimaro (Basketball Point Guard)</li>
                <li>• David Msigwa (Athletics Sprinter)</li>
              </ul>
              <div className="mt-4 text-xs text-gray-500">
                With achievements, statistics, and experience details
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Sports Categories
                </h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Football ⚽</li>
                <li>• Basketball 🏀</li>
                <li>• Athletics 🏃</li>
                <li>• Swimming 🏊</li>
                <li>• Tennis 🎾</li>
                <li>• Volleyball 🏐</li>
              </ul>
            </div>
          </div>

          {/* Seed Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <Suspense fallback={
              <div className="flex items-center justify-center p-12">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mb-4"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            }>
              <SeedDataForm />
            </Suspense>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              What happens after seeding?
            </h3>
            <div className="text-blue-800 space-y-2">
              <p>✅ Sample users will be created with login credentials</p>
              <p>✅ Academies will be pre-approved and verified</p>
              <p>✅ Talents will be linked to their respective academies</p>
              <p>✅ All data will have realistic ratings and reviews</p>
              <p>✅ You can immediately test all platform features</p>
            </div>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Sample Login Credentials:</strong><br />
                Email: john.mwalimu@example.com | Password: password123<br />
                Email: grace.kimaro@example.com | Password: password123<br />
                Email: david.msigwa@example.com | Password: password123
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
