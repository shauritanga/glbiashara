"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building,
  Search,
  MapPin,
  Globe,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { CompanyProfile } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CompanyDirectoryProps {
  companies: CompanyProfile[];
}

export default function CompanyDirectory({ companies }: CompanyDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter companies based on search term
  const filteredCompanies = companies.filter((company) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      company.name.toLowerCase().includes(searchLower) ||
      (company.overview &&
        company.overview.toLowerCase().includes(searchLower)) ||
      (company.contact?.address &&
        company.contact.address.toLowerCase().includes(searchLower))
    );
  });

  // Format date in a locale-independent way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Use ISO format (YYYY-MM-DD) which is consistent across server and client
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search companies by name, description or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Company List */}
      <div className="divide-y divide-gray-100">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <div
              key={company._id}
              className="p-6 hover:bg-blue-50 transition-colors"
            >
              <Link href={`/companies/${company._id}`} className="block">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 p-1 flex-shrink-0 flex items-center justify-center shadow-sm">
                    {company.logoUrl ? (
                      <Image
                        src={company.logoUrl}
                        alt={company.name}
                        width={56}
                        height={56}
                        className="rounded object-contain"
                      />
                    ) : (
                      <Building className="h-8 w-8 text-gray-400" />
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {company.name}
                      </h3>

                      {/* Created date */}
                      {company.createdAt && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            Joined {formatDate(company.createdAt.toString())}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Company Details */}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      {company.contact?.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-blue-500" />
                          <span>{company.contact.address}</span>
                        </div>
                      )}

                      {company.contact?.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3.5 w-3.5 text-blue-500" />
                          <span>{company.contact.website}</span>
                        </div>
                      )}
                    </div>

                    {/* Company Overview */}
                    {company.overview && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {company.overview}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {company.productsOrServices &&
                        company.productsOrServices
                          .map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))
                          .slice(0, 3)}

                      {company.productsOrServices &&
                        company.productsOrServices.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{company.productsOrServices.length - 3} more
                          </Badge>
                        )}

                      {company.legal?.registrationNumber && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 text-xs"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* View Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 self-center hidden sm:flex items-center gap-1"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No companies found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search terms or browse all companies by clearing the search"
                : "No companies have been added to the directory yet. Be the first to add your company!"}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
