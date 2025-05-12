"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PageResponse } from "@/types";

interface SearchPagesProps {
  pages: PageResponse[];
}

export default function SearchPages({ pages }: SearchPagesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group clubs by first letter for alphabetical display
  const groupedClubs = filteredPages.reduce((acc, club) => {
    const firstLetter = club.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(club);
    return acc;
  }, {} as Record<string, PageResponse[]>);

  // Sort the keys alphabetically
  const sortedLetters = Object.keys(groupedClubs).sort();

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPages.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No clubs found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <div key={letter} className="space-y-4">
              <div className="sticky top-0 z-10 bg-gray-100 px-4 py-2 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800">{letter}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedClubs[letter].map((page: any) => (
                  <Link
                    href={`/clubs/${page._id}`}
                    key={page._id}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-300">
                      <div className="h-40 bg-gray-200 relative overflow-hidden">
                        {page.image ? (
                          <Image
                            src={page.image}
                            alt={page.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600">
                            <span className="text-4xl font-bold text-white">
                              {page.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                          {page.name}
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">
                          {page.members || 0} members
                        </p>
                        <div className="flex justify-between items-center">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 text-xs font-medium rounded-full",
                              page.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {page.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className="text-blue-600 text-sm font-medium group-hover:underline">
                            View details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
