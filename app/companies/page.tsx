import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import { CompanyProfile } from "@/models";
import CompanyDirectory from "./components/CompanyDirectory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Building2, Search, Briefcase, Shield } from "lucide-react";
import { Header } from "@/components/header";
import { auth } from "@/auth";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Companies Directory",
  description: "Browse and discover companies in our network",
};

export default async function CompaniesPage() {
  await dbConnect();
  const session = (await auth()) || {};

  // Fetch company profiles
  const companyProfiles = await CompanyProfile.find({})
    .sort({ createdAt: -1 })
    .lean();

  // Convert MongoDB documents to plain objects
  const companies = JSON.parse(JSON.stringify(companyProfiles));

  // Calculate stats once to ensure consistency
  const totalCompanies = companies.length;
  const industriesCount = new Set(
    companies.map((c: { industry?: string }) => c.industry || "Other")
  ).size;
  const verifiedCount = companies.filter(
    (c: { legal?: { registrationNumber?: string } }) =>
      c.legal?.registrationNumber
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header session={session} />
      </Suspense>

      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Companies Directory
              </h1>
              <p className="mt-4 text-xl text-blue-100 leading-relaxed">
                Discover and connect with innovative companies in our growing
                network of industry leaders and emerging businesses
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link
                href="/profile"
                className="flex items-center gap-2 px-6 py-3"
              >
                <Plus className="h-5 w-5" />
                Add Your Company
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="rounded-full bg-blue-100 p-4 mr-5">
              <Building2 className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Total Companies
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {totalCompanies}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="rounded-full bg-indigo-100 p-4 mr-5">
              <Briefcase className="h-7 w-7 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Industries
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {industriesCount}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="rounded-full bg-green-100 p-4 mr-5">
              <Shield className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Verified Companies
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {verifiedCount}
              </p>
            </div>
          </div>
        </div>

        {/* Directory section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                <Search className="h-6 w-6 text-blue-500 mr-3" />
                Browse Companies
              </h2>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Sort: Newest
                </Button>
              </div>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="p-8 text-center">Loading companies...</div>
            }
          >
            <CompanyDirectory companies={companies} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
