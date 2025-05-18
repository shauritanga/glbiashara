import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Globe, MapPin, ChevronRight } from "lucide-react";
import { Suspense } from "react";
import BusinessCustomers from "./components/BusinessCustomers";
import FallbackImage from "./components/FallbackImage";

export default async function VodaCom() {
  // Company information
  const companyInfo = {
    name: "Vodacom Tanzania PLC",
    logo: "/vodacom-logo.png",
    established: 2000,
    headquarters: "Dar es Salaam, Tanzania",
    description:
      "Vodacom Tanzania PLC is a leading mobile network operator providing voice, messaging, data, and financial services. As part of the Vodafone Group, Vodacom Tanzania serves millions of customers across the country with reliable connectivity solutions and innovative digital services.",
    contact: {
      address:
        "15th Floor, Vodacom Tower, Ursino Estate, Plot 23, Bagamoyo Road, Dar es Salaam, Tanzania",
      phone: "+255 222 192 100",
      email: "customercare@vodacom.co.tz",
      website: "www.vodacom.co.tz",
    },
    dialingCodes: {
      countryCode: "+255",
      prefixes: ["074", "075", "076"],
    },
  };

  // Product information
  const products = [
    {
      name: "M-Pesa",
      image: "/mpesa.png",
      video: "/videos/mpesa.mp4",
      description:
        "Tanzania's leading mobile money service, allowing users to send and receive money, pay bills, and access financial services.",
      features: [
        "Money transfers",
        "Bill payments",
        "Savings",
        "Loans",
        "International remittances",
      ],
    },
    {
      name: "Vodacom Internet",
      image: "/vodacom-internet.jpeg",
      video: "/videos/vodacom-internet.mp4",
      description:
        "High-speed mobile internet services with nationwide coverage and flexible data packages.",
      features: [
        "4G/LTE coverage",
        "Daily, weekly & monthly bundles",
        "Night bundles",
        "Social media packages",
      ],
    },
    {
      name: "Vodacom Business",
      image: "/vodacom-business.jpeg",
      video: "/videos/vodacom-business.mp4",
      description:
        "Comprehensive business solutions including connectivity, cloud services, and IoT solutions.",
      features: [
        "Enterprise connectivity",
        "Cloud services",
        "IoT solutions",
        "Business mobility",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Video Background */}
      <div className="relative h-[50vh] bg-red-600">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          playsInline
        >
          <source src="/videos/vodacom-general.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-red-600/50"></div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
          <Link
            href="/"
            className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>

          <div className="mt-12">
            <FallbackImage
              src="/vodacom-logo.png"
              alt="Vodacom Tanzania"
              width={180}
              height={60}
              className="mb-6"
              priority
              fallbackSrc="https://placehold.co/180x60/FF0000/FFFFFF?text=Vodacom"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vodacom Tanzania
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">Further Together</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Company Information */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            About Vodacom Tanzania
          </h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-red-600 p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Company Profile</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Established</p>
                      <p>{companyInfo.established}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p>{companyInfo.headquarters}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Contact</p>
                      <p>{companyInfo.contact.phone}</p>
                      <p className="text-sm">{companyInfo.contact.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-red-500">
                  <h4 className="font-medium mb-2">Dialing Codes</h4>
                  <p>Country Code: {companyInfo.dialingCodes.countryCode}</p>
                  <p>
                    Prefixes: {companyInfo.dialingCodes.prefixes.join(", ")}
                  </p>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Our Story
                </h3>
                <p className="text-gray-600 mb-6">{companyInfo.description}</p>
                <p className="text-gray-600 mb-6">
                  Since its establishment in 2000, Vodacom Tanzania has grown to
                  become one of the country's largest telecommunications
                  companies, connecting millions of Tanzanians and driving
                  digital innovation across the nation.
                </p>
                <p className="text-gray-600">
                  Through our flagship M-Pesa service, we've revolutionized
                  financial inclusion in Tanzania, providing banking services to
                  previously unbanked populations and facilitating economic
                  growth in both urban and rural areas.
                </p>

                <div className="mt-8 flex justify-end">
                  <a
                    href="https://www.vodacom.co.tz/about-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                  >
                    Learn more about Vodacom
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products & Services */}
        <section id="products" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Products & Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
                        target.src = `https://placehold.co/600x400/FF0000/FFFFFF?text=${product.name}`;
                      }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <ul className="text-sm text-gray-600">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business Customers */}
        <section id="customers" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Business Customers
          </h2>

          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
              </div>
            }
          >
            <BusinessCustomers />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
