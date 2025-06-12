"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, Filter } from "lucide-react";

interface TalentsFilterProps {
  categories: any[];
}

export default function TalentsFilter({ categories }: TalentsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentSport = searchParams.get("sport") || "";
  const currentLevel = searchParams.get("level") || "";
  const currentPosition = searchParams.get("position") || "";
  const currentSearch = searchParams.get("search") || "";

  const levels = ["Beginner", "Intermediate", "Advanced", "Professional"];

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to first page when filters change
    params.delete("page");
    
    router.push(`/sports/talents?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    updateFilters("search", searchTerm);
  };

  const clearFilters = () => {
    router.push("/sports/talents");
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search talents..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter Toggle Button (Mobile) */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters */}
      <div className={`${isFilterOpen ? "block" : "hidden"} md:block`}>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Sport Filter */}
            <div>
              <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-2">
                Sport Category
              </label>
              <select
                id="sport"
                value={currentSport}
                onChange={(e) => updateFilters("sport", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Sports</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <select
                id="level"
                value={currentLevel}
                onChange={(e) => updateFilters("level", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Position Filter */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={currentPosition}
                onChange={(e) => updateFilters("position", e.target.value)}
                placeholder="e.g., Midfielder"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(currentSport || currentLevel || currentPosition || currentSearch) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {currentSearch && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Search: "{currentSearch}"
                    <button
                      onClick={() => updateFilters("search", "")}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {currentSport && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Sport: {categories.find(c => c._id === currentSport)?.name}
                    <button
                      onClick={() => updateFilters("sport", "")}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {currentLevel && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                    Level: {currentLevel}
                    <button
                      onClick={() => updateFilters("level", "")}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {currentPosition && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                    Position: {currentPosition}
                    <button
                      onClick={() => updateFilters("position", "")}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
