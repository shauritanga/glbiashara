"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IPage } from "@/models";

export default function CompanyList({
  initialCompanies,
}: {
  initialCompanies: IPage[];
}) {
  const [companies] = useState(initialCompanies);
  const [searchName, setSearchName] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  // Filter companies based on search inputs
  const filteredCompanies = companies.filter((company) => {
    const nameMatch = company.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const descriptionMatch = company.description
      .toLowerCase()
      .includes(searchDescription.toLowerCase());
    const countryMatch = company.country
      .toLowerCase()
      .includes(searchCountry.toLowerCase());
    return nameMatch && descriptionMatch && countryMatch;
  });

  return (
    <>
      {/* Search Form */}
      <form
        className="mb-8 flex flex-col sm:flex-row gap-4 justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <input
          type="text"
          placeholder="Search by description..."
          value={searchDescription}
          onChange={(e) => setSearchDescription(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <input
          type="text"
          placeholder="Search by country..."
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <button
          type="button"
          onClick={() => {
            setSearchName("");
            setSearchDescription("");
            setSearchCountry("");
          }}
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 transition-colors"
        >
          Clear
        </button>
      </form>

      {/* Company Cards */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCompanies.map((company) => (
            <Link
              key={company._id.toString()}
              href={`/companies/${company._id.toString()}`} // Dynamic route to company detail page
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl hover:border-blue-200 border border-transparent transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={company.logo || "/default-avatar.png"}
                    alt={`${company.name} logo`}
                    fill
                    className="rounded-full object-cover border-2 border-blue-300 group-hover:border-blue-500 transition-colors"
                  />
                </div>
                <h2 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors text-center">
                  {company.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 text-center line-clamp-2">
                  {company.description}
                </p>
                <p className="mt-1 text-sm text-blue-600 text-center">
                  {company.district}, {company.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-600 mt-4">
          No companies found matching your search criteria.
        </p>
      )}
    </>
  );
}
