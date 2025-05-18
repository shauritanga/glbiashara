"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BREWERIESlider from "@/components/breweries-slider";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Breweries() {
  const router = useRouter();
  const [relatedBusinesses, setRelatedBusinesses] = useState<
    Array<{
      _id: string;
      name: string;
      location: string;
      image: string;
      description: string;
      specifications: string[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  // Brewery information
  const breweryInfo = {
    name: "Tanzania Breweries Limited",
    logo: "/tbl-logo.png",
    established: 1933,
    headquarters: "Dar es Salaam, Tanzania",
    description:
      "Tanzania Breweries Limited (TBL) is Tanzania's largest brewing company, producing popular beer brands including Safari Lager, Kilimanjaro Premium Lager, and distributing international brands like Castle Lager and Castle Lite. As a subsidiary of AB InBev, TBL has a rich history of over 85 years in Tanzania.",
    contact: {
      address: "Plot No. 79, Nyerere Road, Dar es Salaam, Tanzania",
      phone: "+255 22 286 3100",
      email: "info@tanzaniabreweries.co.tz",
      website: "www.tanzaniabreweries.co.tz",
    },
  };

  // Product information
  const products = [
    {
      name: "Konyagi",
      image: "/konyagi.jpeg",
      video: "/videos/konyagi.mp4",
      description:
        "Tanzania's iconic beer, brewed with local ingredients for a refreshing taste.",
      type: "Lager",
      alcoholContent: "4.5%",
    },
    {
      name: "Safari Lager",
      image: "/safari-lager.jpeg",
      video: "/videos/safari-lager.mp4",
      description:
        "Tanzania's iconic beer, brewed with local ingredients for a refreshing taste.",
      type: "Lager",
      alcoholContent: "4.5%",
    },
    {
      name: "Kilimanjaro Premium Lager",
      image: "/kilimanjaro-lager.jpeg",
      video: "/videos/kilimanjaro-lager.mp4",
      description:
        "Named after Africa's highest mountain, this premium lager offers a crisp, clean taste.",
      type: "Premium Lager",
      alcoholContent: "4.5%",
    },
    {
      name: "Castle Lite",
      image: "/castle-lite.jpeg",
      video: "/videos/castle-lite.mp4",
      description:
        "Extra cold, low-calorie premium beer with a light, refreshing taste.",
      type: "Light Lager",
      alcoholContent: "4.0%",
    },
    {
      name: "Castle Lager",
      image: "/download.jpeg",
      video: null,
      description:
        "A golden, full-flavored lager with a distinctive taste and refreshing finish.",
      type: "Lager",
      alcoholContent: "5.0%",
    },
    {
      name: "Eagle Lager",
      image: "/eagle-lager.jpeg",
      video: null,
      description:
        "Brewed from local sorghum, providing a unique taste at an affordable price.",
      type: "Sorghum Lager",
      alcoholContent: "4.5%",
    },
  ];

  // Mock function to fetch related businesses
  useEffect(() => {
    const fetchRelatedBusinesses = async () => {
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate with mock data
        setTimeout(() => {
          setRelatedBusinesses([
            {
              _id: "bar1",
              name: "Samaki Bar & Grill",
              location: "Masaki, Dar es Salaam",
              image: "/samaki.jpeg",
              description:
                "Popular bar serving TBL products with seafood specialties",
              specifications: ["Bar", "Restaurant", "Live Music"],
            },
            {
              _id: "bar2",
              name: "Kilimanjaro Lounge",
              location: "Arusha",
              image: "/kilimanjaro-bar.jpeg",
              description:
                "Premium lounge with mountain views and craft beer selection",
              specifications: ["Bar", "Lounge", "Craft Beer"],
            },
            {
              _id: "bar3",
              name: "Safari Beach Club",
              location: "Zanzibar",
              image: "/safari-club.jpeg",
              description: "Beachfront bar with TBL products and ocean views",
              specifications: ["Bar", "Beach Club", "Cocktails"],
            },
            {
              _id: "bar4",
              name: "Serengeti Pub",
              location: "Mwanza",
              image: "/serengeti-pub.jpeg",
              description:
                "Traditional pub atmosphere with all TBL products on tap",
              specifications: ["Bar", "Pub", "Sports Bar"],
            },
            {
              _id: "bar5",
              name: "Serengeti Pub",
              location: "Mwanza",
              image: "/serengeti-pub.jpeg",
              description:
                "Traditional pub atmosphere with all TBL products on tap",
              specifications: ["Bar", "Pub", "Sports Bar"],
            },
            {
              _id: "bar6",
              name: "Serengeti Pub",
              location: "Mwanza",
              image: "/serengeti-pub.jpeg",
              description:
                "Traditional pub atmosphere with all TBL products on tap",
              specifications: ["Bar", "Pub", "Sports Bar"],
            },
            {
              _id: "bar7",
              name: "Serengeti Pub",
              location: "Mwanza",
              image: "/serengeti-pub.jpeg",
              description:
                "Traditional pub atmosphere with all TBL products on tap",
              specifications: ["Bar", "Pub", "Sports Bar"],
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching related businesses:", error);
        setLoading(false);
      }
    };

    fetchRelatedBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-amber-700 text-white p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button
              onClick={() => router.back()}
              className="bg-white text-amber-700 px-3 py-1.5 rounded text-sm sm:text-base hover:bg-gray-200"
            >
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back
            </button>
            <h1 className="text-xl sm:text-2xl font-bold">
              Tanzania Breweries Limited
            </h1>
          </div>
          <div className="flex space-x-4 text-sm sm:text-base">
            <a href="#products" className="hover:underline">
              Products
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#partners" className="hover:underline">
              Partners
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Main Slider */}
        <div className="mb-12">
          <div className="h-[400px]">
            {" "}
            {/* Increased height */}
            <BREWERIESlider />
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="mb-12 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex justify-center items-start">
              <div className="w-48 h-48 relative">
                <Image
                  src={breweryInfo.logo}
                  alt={breweryInfo.name}
                  width={192}
                  height={192}
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://placehold.co/192x192/amber700/FFFFFF?text=TBL";
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-amber-700 mb-4">
                {breweryInfo.name}
              </h2>
              <p className="text-gray-700 mb-4">{breweryInfo.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-amber-800">Established</h3>
                  <p>{breweryInfo.established}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">Headquarters</h3>
                  <p>{breweryInfo.headquarters}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">Contact</h3>
                  <p>{breweryInfo.contact.address}</p>
                  <p>{breweryInfo.contact.phone}</p>
                  <p>{breweryInfo.contact.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">Website</h3>
                  <a
                    href={`https://${breweryInfo.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {breweryInfo.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="mb-12">
          <h2 className="text-2xl font-bold text-amber-700 mb-6">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 relative">
                  {product.video ? (
                    <video
                      className="w-full h-full object-cover"
                      poster={product.image}
                      controls
                    >
                      <source src={product.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/400x300/amber700/FFFFFF?text=${product.name}`;
                      }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      {product.type}
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      {product.alcoholContent} ABV
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Businesses Section */}
        <section id="partners" className="mb-12">
          <h2 className="text-2xl font-bold text-amber-700 mb-6">
            Partner Bars & Lounges
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <div className="auto-scroll-container">
                <div className="auto-scroll-content">
                  {relatedBusinesses
                    .concat(relatedBusinesses)
                    .map((business: any, index: number) => (
                      <Link
                        key={`${business._id}-${index}`}
                        href={`/bars/${business._id}`}
                      >
                        <div
                          key={`${business._id}-${index}`}
                          className="bg-white rounded-lg shadow-md overflow-hidden w-72 flex-shrink-0 mx-3 transition-transform hover:scale-[1.02]"
                        >
                          <div className="h-48 relative">
                            <Image
                              src={business.image}
                              alt={business.name}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://placehold.co/400x300/amber700/FFFFFF?text=${business.name}`;
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-amber-800 mb-1">
                              {business.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                              {business.location}
                            </p>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {business.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {business.specifications.map(
                                (spec: string, i: number) => (
                                  <span
                                    key={i}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {spec}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              <div className="absolute left-0 top-0 w-12 bg-gradient-to-r from-gray-50 to-transparent h-full pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-12 bg-gradient-to-l from-gray-50 to-transparent h-full pointer-events-none"></div>
            </div>
          )}
        </section>

        {/* Advertisement Banner */}
        <section className="mb-12 bg-amber-50 rounded-lg shadow-md p-6 border border-amber-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-amber-700 mb-4">
              Enjoy Responsibly
            </h2>
            <p className="text-amber-800 mb-6">
              Tanzania Breweries Limited promotes responsible drinking. Not for
              sale to persons under the age of 18.
            </p>
            <div className="flex justify-center">
              <button className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
                Learn More About Responsible Drinking
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Tanzania Breweries Limited
              </h3>
              <p className="text-amber-200">
                A proud member of AB InBev family
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-amber-200 hover:text-white">
                    Our History
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-white">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-amber-200 hover:text-white">
                    News & Events
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-amber-200">
                {breweryInfo.contact.address}
                <br />
                Phone: {breweryInfo.contact.phone}
                <br />
                Email: {breweryInfo.contact.email}
              </address>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200">
            <p>
              &copy; {new Date().getFullYear()} Tanzania Breweries Limited. All
              rights reserved.
            </p>
            <p className="mt-2 text-sm">
              Drink Responsibly. Not for sale to persons under the age of 18.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
