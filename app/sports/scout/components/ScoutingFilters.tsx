"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, Filter, Sliders, X } from "lucide-react";

interface ScoutingFiltersProps {
  categories: any[];
}

export default function ScoutingFilters({ categories }: ScoutingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const currentSport = searchParams.get("sport") || "";
  const currentLevel = searchParams.get("level") || "";
  const currentPosition = searchParams.get("position") || "";
  const currentAgeMin = searchParams.get("age_min") || "";
  const currentAgeMax = searchParams.get("age_max") || "";
  const currentExpMin = searchParams.get("experience_min") || "";
  const currentExpMax = searchParams.get("experience_max") || "";
  const currentRegion = searchParams.get("region") || "";
  const currentAvailability = searchParams.get("availability") || "";
  const currentSearch = searchParams.get("search") || "";

  const levels = ["Beginner", "Intermediate", "Advanced", "Professional"];
  const regions = [
    "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", "Katavi",
    "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", "Mbeya", "Morogoro",
    "Mtwara", "Mwanza", "Njombe", "Pemba North", "Pemba South", "Pwani",
    "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", "Singida", "Songwe", "Tabora",
    "Tanga", "Zanzibar Central/South", "Zanzibar North", "Zanzibar Urban/West"
  ];

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to first page when filters change
    params.delete("page");
    
    router.push(`/sports/scout?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;
    updateFilters("search", searchTerm);
  };

  const clearAllFilters = () => {
    router.push("/sports/scout");
  };

  const hasActiveFilters = currentSport || currentLevel || currentPosition || 
    currentAgeMin || currentAgeMax || currentExpMin || currentExpMax || 
    currentRegion || currentAvailability || currentSearch;

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="search"
            defaultValue={currentSearch}
            placeholder="Search by name, position, achievements, or description..."
            className="w-full pl-12 pr-20 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-2">
              Sport Category
            </label>
            <select
              id="sport"
              value={currentSport}
              onChange={(e) => updateFilters("sport", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Sports</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Skill Level
            </label>
            <select
              id="level"
              value={currentLevel}
              onChange={(e) => updateFilters("level", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input
              type="text"
              id="position"
              value={currentPosition}
              onChange={(e) => updateFilters("position", e.target.value)}
              placeholder="e.g., Midfielder, Point Guard"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center text-purple-600 hover:text-purple-800 font-medium"
          >
            <Sliders className="h-4 w-4 mr-2" />
            Advanced Filters
            <span className="ml-2 text-sm">
              {isAdvancedOpen ? "Hide" : "Show"}
            </span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Age Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={currentAgeMin}
                    onChange={(e) => updateFilters("age_min", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="10"
                    max="50"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={currentAgeMax}
                    onChange={(e) => updateFilters("age_max", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="10"
                    max="50"
                  />
                </div>
              </div>

              {/* Experience Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (Years)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={currentExpMin}
                    onChange={(e) => updateFilters("experience_min", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="0"
                    max="30"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={currentExpMax}
                    onChange={(e) => updateFilters("experience_max", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="0"
                    max="30"
                  />
                </div>
              </div>

              {/* Region */}
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select
                  id="region"
                  value={currentRegion}
                  onChange={(e) => updateFilters("region", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  id="availability"
                  value={currentAvailability}
                  onChange={(e) => updateFilters("availability", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Any</option>
                  <option value="training">Available for Training</option>
                  <option value="matches">Available for Matches</option>
                  <option value="transfer">Open to Transfer</option>
                  <option value="relocation">Willing to Relocate</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {currentSearch && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Search: "{currentSearch}"
                  <button
                    onClick={() => updateFilters("search", "")}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentSport && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Sport: {categories.find(c => c._id === currentSport)?.name}
                  <button
                    onClick={() => updateFilters("sport", "")}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentLevel && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Level: {currentLevel}
                  <button
                    onClick={() => updateFilters("level", "")}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {/* Add more filter tags as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
