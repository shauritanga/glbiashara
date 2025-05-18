"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, Phone, Globe, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BarPostCard from "./components/BarPostCard";

interface BarPost {
  _id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: string;
  likes: number;
}

interface Bar {
  _id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  openingHours: string;
  contact: {
    phone: string;
    website?: string;
  };
  specifications: string[];
  posts: BarPost[];
}

export default function BarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [bar, setBar] = useState<Bar | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedId = (await params).id;
      setId(resolvedId);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    // In a real implementation, fetch data from API
    // For now, we'll simulate with mock data
    const fetchBar = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockBar: Bar = {
          _id: id,
          name: id === "bar1" ? "Samaki Bar & Grill" : "Kilimanjaro Lounge",
          location: id === "bar1" ? "Masaki, Dar es Salaam" : "Arusha",
          description:
            id === "bar1"
              ? "Popular bar serving TBL products with seafood specialties. Located in the heart of Masaki, Samaki Bar & Grill offers a relaxed atmosphere with live music on weekends."
              : "Premium lounge with mountain views and craft beer selection. Kilimanjaro Lounge is known for its spectacular views and extensive selection of local and imported beers.",
          image: id === "bar1" ? "/samaki.jpeg" : "/kilimanjaro-bar.jpeg",
          rating: id === "bar1" ? 4.5 : 4.7,
          openingHours: "Mon-Sun: 12:00 PM - 2:00 AM",
          contact: {
            phone: "+255 123 456 789",
            website:
              id === "bar1" ? "samakibar.co.tz" : "kilimanjarolounge.co.tz",
          },
          specifications:
            id === "bar1"
              ? ["Bar", "Restaurant", "Live Music", "Outdoor Seating"]
              : ["Bar", "Lounge", "Craft Beer", "Mountain View"],
          posts: [
            {
              _id: "post1",
              title: "Weekend Special: Live Band Performance",
              description:
                "Join us this weekend for an electrifying performance by the renowned local band 'Tanzanite'. Enjoy special discounts on all TBL products during the show!",
              mediaUrl: "/bar-event.jpeg",
              mediaType: "image",
              createdAt: new Date(
                Date.now() - 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
              likes: 24,
            },
            {
              _id: "post2",
              title: "New Menu Items",
              description:
                "We've added exciting new dishes to our menu! Come try our grilled tilapia with coconut rice and our special TBL beer-battered prawns.",
              mediaUrl: "/food-special.jpeg",
              mediaType: "image",
              createdAt: new Date(
                Date.now() - 5 * 24 * 60 * 60 * 1000
              ).toISOString(),
              likes: 18,
            },
            {
              _id: "post3",
              title: "Happy Hour Promotion",
              description:
                "Join us for happy hour every weekday from 5PM to 7PM. Buy one get one free on all TBL draft beers!",
              mediaUrl: "/happy-hour.mp4",
              mediaType: "video",
              createdAt: new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              likes: 32,
            },
            {
              _id: "post4",
              title: "Meet Our New Mixologist",
              description:
                "We're excited to welcome John to our team! With over 10 years of experience, he's bringing exciting new cocktails featuring TBL spirits.",
              mediaUrl: "/mixologist.jpeg",
              mediaType: "image",
              createdAt: new Date(
                Date.now() - 10 * 24 * 60 * 60 * 1000
              ).toISOString(),
              likes: 15,
            },
            {
              _id: "post5",
              title: "Bar Tour",
              description:
                "Take a virtual tour of our newly renovated space featuring our expanded outdoor seating area with stunning views.",
              mediaUrl: "/bar-tour.mp4",
              mediaType: "video",
              createdAt: new Date(
                Date.now() - 14 * 24 * 60 * 60 * 1000
              ).toISOString(),
              likes: 27,
            },
          ],
        };

        setBar(mockBar);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bar details:", error);
        setLoading(false);
      }
    };

    fetchBar();
  }, [id]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : i < rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <Skeleton className="h-64 w-full rounded-lg" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <Skeleton className="h-16 w-full rounded-lg mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-lg" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bar) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Bar Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The bar you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with background image */}
      <div className="relative h-48 md:h-64 bg-amber-700">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={bar.image}
            alt={bar.name}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-700/90" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 py-6 max-w-7xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-colors w-fit"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {bar.name}
          </h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{bar.location}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar - Bar details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-amber-100">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">
                About
              </h2>
              <p className="text-gray-700 mb-4">{bar.description}</p>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Hours</p>
                      <p className="text-sm text-gray-600">
                        {bar.openingHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">
                        {bar.contact.phone}
                      </p>
                    </div>
                  </div>

                  {bar.contact.website && (
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Website
                        </p>
                        <a
                          href={`https://${bar.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-amber-600 hover:text-amber-800 hover:underline"
                        >
                          {bar.contact.website}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Rating
                      </p>
                      <div className="mt-1">{renderRating(bar.rating)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {bar.specifications.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle section - Posts */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-5">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">
                Latest Updates
              </h2>

              <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                <div className="space-y-6">
                  {bar.posts.map((post) => (
                    <BarPostCard key={post._id} post={post} />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right sidebar - Additional info */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-5 border border-amber-100">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">
                Featured Products
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src="/safari-lager.jpeg"
                    alt="Safari Lager"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800">Safari Lager</h3>
                    <p className="text-sm text-gray-600">
                      Tanzania's premium lager
                    </p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src="/kilimanjaro-beer.jpeg"
                    alt="Kilimanjaro Beer"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800">
                      Kilimanjaro Beer
                    </h3>
                    <p className="text-sm text-gray-600">
                      Crisp and refreshing
                    </p>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src="/serengeti-beer.jpeg"
                    alt="Serengeti Beer"
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800">
                      Serengeti Beer
                    </h3>
                    <p className="text-sm text-gray-600">Bold and flavorful</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
