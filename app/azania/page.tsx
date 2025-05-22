"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Users,
  CreditCard,
  Building,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AzaniaSlider from "@/components/azania-slider";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import the server actions
import {
  getClubContributions,
  getContributorsList,
} from "@/actions/getContributions";

interface Contributor {
  _id: string;
  name: string;
  amount: number;
  createdAt: string;
  phone?: string;
  paymentMethod?: string;
  image?: string;
}

interface BankService {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function Azania() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [contributionStats, setContributionStats] = useState({
    totalAmount: 0,
    contributionsCount: 0,
    uniqueContributorsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contributors using server action
    const fetchContributors = async () => {
      try {
        setLoading(true);
        // Azania Bank ID in your system - replace with actual ID
        const azaniaBankId = "67ae0aeb8c8248cf93a5f19e";

        // Use the server action to get contribution stats
        const stats = await getClubContributions(azaniaBankId);
        setContributionStats(stats);

        // Use the new server action to get contributors list
        const contributorsList = await getContributorsList(azaniaBankId);

        // Convert MongoDB ObjectIds to strings and add default image
        const formattedContributors = contributorsList.map((contributor) => ({
          ...contributor,
          _id:
            typeof contributor._id === "object"
              ? contributor._id!.toString()
              : (contributor._id as string) || "",
          image: "/default.png", // Default image if none provided
        }));

        setContributors(formattedContributors);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        // Fallback to empty array if fetch fails
        setContributors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // Bank services data
  const bankServices: BankService[] = [
    {
      id: "s1",
      name: "Personal Banking",
      description:
        "Comprehensive banking solutions for individuals including savings accounts, current accounts, and fixed deposits",
      image: "/personal-banking.jpg",
    },
    {
      id: "s2",
      name: "Business Banking",
      description:
        "Tailored financial services for businesses of all sizes, from SMEs to large corporations",
      image: "/business-banking.jpg",
    },
    {
      id: "s3",
      name: "Digital Banking",
      description:
        "Modern banking solutions including mobile banking, internet banking, and electronic payment systems",
      image: "/digital-banking.jpg",
    },
  ];

  // Bank information
  const bankInfo = {
    name: "Azania Bank",
    logo: "/azania-logo.png",
    description:
      "Azania Bank is a leading financial institution in Tanzania, providing innovative banking solutions to individuals and businesses. With a strong commitment to customer service and financial inclusion, we offer a wide range of products designed to meet the diverse needs of our clients.",
    location: "Dar es Salaam, Tanzania",
    founded: "1995",
    branches: "25+ nationwide",
    contact: {
      phone: "+255 22 2112823",
      email: "info@azaniabank.co.tz",
      website: "www.azaniabank.co.tz",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with background */}
      <div className="relative h-48 md:h-64 bg-blue-800">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/azania-banner.jpg"
            alt="Azania Bank Background"
            fill
            className="object-cover opacity-30"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/1920x1080/0066cc/FFFFFF?text=AZANIA+BANK";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/90" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 py-6 max-w-7xl mx-auto">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors w-fit"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {bankInfo.name}
          </h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{bankInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - Bank details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                About Azania Bank
              </h2>
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={bankInfo.logo}
                    alt={bankInfo.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://placehold.co/192x192/0066cc/FFFFFF?text=AZANIA";
                    }}
                  />
                </div>
              </div>
              <p className="text-gray-700 mb-4">{bankInfo.description}</p>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Bank Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="min-w-24">
                      <p className="text-sm font-medium text-gray-700">
                        Established
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{bankInfo.founded}</p>
                  </div>

                  <div className="flex items-start">
                    <div className="min-w-24">
                      <p className="text-sm font-medium text-gray-700">
                        Branches
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{bankInfo.branches}</p>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">
                        {bankInfo.contact.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Website
                      </p>
                      <a
                        href={`https://${bankInfo.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {bankInfo.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contributors section */}
            <div className="bg-white rounded-lg shadow-sm p-5 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-blue-800">
                    Top Customers
                  </h2>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  {contributionStats.uniqueContributorsCount} total
                </div>
              </div>

              {/* Stats summary */}
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-700">Total Contributions</p>
                <p className="text-xl font-bold text-blue-800">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "TZS",
                    minimumFractionDigits: 0,
                  }).format(contributionStats.totalAmount)}
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : contributors.length > 0 ? (
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {contributors.map((contributor) => (
                      <div
                        key={contributor._id}
                        className="flex items-center p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="relative h-12 w-12 mr-3">
                          <Image
                            src={contributor.image || "/default.png"}
                            alt={contributor.name}
                            fill
                            className="rounded-full object-cover border border-blue-200"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {contributor.name}
                          </h3>
                          <p className="text-sm text-blue-600 font-semibold">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "TZS",
                              minimumFractionDigits: 0,
                            }).format(contributor.amount)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(
                              contributor.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No contributors found</p>
                </div>
              )}
            </div>
          </div>

          {/* Middle section - Banking Services */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-5 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Our Banking Services
              </h2>

              <div className="space-y-6">
                {bankServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-blue-50 rounded-lg overflow-hidden border border-blue-100"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://placehold.co/800x400/0066cc/FFFFFF?text=${service.name.replace(
                            " ",
                            "+"
                          )}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-700">{service.description}</p>
                      <Button className="mt-3 bg-blue-600 hover:bg-blue-700">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-5">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Quick Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium text-blue-800 mb-1">Cards</h3>
                  <p className="text-sm text-gray-600">Credit & Debit Cards</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                  <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium text-blue-800 mb-1">Loans</h3>
                  <p className="text-sm text-gray-600">Personal & Business</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
                  <Landmark className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium text-blue-800 mb-1">
                    Investments
                  </h3>
                  <p className="text-sm text-gray-600">Grow your wealth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar - Slider and additional info */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-blue-100 mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Azania Bank Showcase
              </h2>
              <AzaniaSlider />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-5 border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 mb-4">
                At Azania Bank, we strive to be the preferred financial partner
                for all Tanzanians, providing innovative banking solutions that
                empower individuals and businesses to achieve their financial
                goals.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">
                  Open an Account Today
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Join thousands of satisfied customers and experience banking
                  excellence.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open an Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
