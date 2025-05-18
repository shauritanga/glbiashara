import { getVodacomUsers } from "@/actions/getVodacomUsers";
import Image from "next/image";
import Link from "next/link";
import { Building, ChevronRight, MapPin, Phone } from "lucide-react";
import BusinessImage from "./BusinessImage";

export default async function BusinessCustomers() {
  // Fetch Vodacom business users
  const businessUsers = await getVodacomUsers();

  // Fallback business customers in case no users are found
  const fallbackBusinessCustomers = [
    {
      _id: "1",
      name: "John Doe",
      businessName: "Tanzania Breweries Limited",
      image: "/tbl-logo.png",
      industry: "Manufacturing",
      city: "Dar es Salaam",
      country: "Tanzania",
      phone: "+255 74 123 4567",
    },
    {
      _id: "2",
      name: "Jane Smith",
      businessName: "CRDB Bank",
      image: "/crdb.jpg",
      industry: "Banking",
      city: "Arusha",
      country: "Tanzania",
      phone: "+255 75 987 6543",
    },
    {
      _id: "3",
      name: "Michael Johnson",
      businessName: "Precision Air",
      image: "/precision-air.png",
      industry: "Aviation",
      city: "Mwanza",
      country: "Tanzania",
      phone: "+255 76 456 7890",
    },
  ];

  // Use fetched business users or fallback if empty
  const displayBusinessUsers =
    businessUsers.length > 0 ? businessUsers : fallbackBusinessCustomers;

  // Company info for the sidebar
  const companyInfo = {
    contact: {
      phone: "+255 222 192 100",
      email: "customercare@vodacom.co.tz",
      address:
        "15th Floor, Vodacom Tower, Ursino Estate, Plot 23, Bagamoyo Road, Dar es Salaam, Tanzania",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 bg-red-600 p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Our Business Customers</h3>
          <p className="text-gray-100 mb-6">
            Vodacom Tanzania serves a diverse range of businesses across various
            industries. Our customers benefit from our reliable connectivity,
            innovative solutions, and exceptional customer support.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Contact</p>
                <p>{companyInfo.contact.phone}</p>
                <p className="text-sm">{companyInfo.contact.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p>{companyInfo.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Businesses Using Vodacom Services
          </h3>

          <div className="space-y-8">
            {displayBusinessUsers.map(
              (business: {
                _id: string;
                name: string;
                businessName: string;
                image?: string;
                industry?: string;
                city?: string;
                country?: string;
                phone?: string;
              }) => (
                <div
                  key={business._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 relative rounded-full overflow-hidden mr-4 bg-gray-200 flex-shrink-0">
                      {business.image ? (
                        <BusinessImage
                          src={business.image}
                          alt={business.businessName}
                          businessName={business.businessName}
                        />
                      ) : (
                        <Building className="h-8 w-8 text-gray-400 m-auto" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {business.businessName}
                      </h4>
                      <p className="text-gray-600">
                        {business.industry || "Business"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {business.city}
                        {business.city && business.country ? ", " : ""}
                        {business.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Contact:</span>{" "}
                      {business.phone || "Not available"}
                    </p>
                    <Link
                      href={`/profile/${business._id}`}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      View Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
