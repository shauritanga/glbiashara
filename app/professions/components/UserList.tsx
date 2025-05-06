"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IUser } from "@/models";
import TotalSlider from "@/components/total_energy";
import { ScrollArea } from "@/components/ui/scroll-area";
import NMBSlider from "@/components/nmb-carousel";
import TourismSlider from "@/components/tourism-carousel";

export default function UserList({ initialUsers }: { initialUsers: IUser[] }) {
  const [users] = useState(initialUsers);
  const [searchName, setSearchName] = useState("");
  const [searchProfession, setSearchProfession] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const professionMatch = user.profession.name
      .toLowerCase()
      .includes(searchProfession.toLowerCase());
    const cityMatch = user.city
      .toLowerCase()
      .includes(searchCity.toLowerCase());
    return nameMatch && professionMatch && cityMatch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 container mx-auto">
      <div className="md:col-span-4">
        {/* Search Form */}
        <form
          className="mb-8 col-span-4 flex flex-col md:flex-row  gap-4 items-center justify-start"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full md:w-60 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
          />
          <input
            type="text"
            placeholder="Search by profession..."
            value={searchProfession}
            onChange={(e) => setSearchProfession(e.target.value)}
            className="w-full md:w-60 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
          />
          <input
            type="text"
            placeholder="Search by city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="w-full md:w-60 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 shadow-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchName("");
                setSearchProfession("");
                setSearchCity("");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors shadow-sm"
            >
              Clear
            </button>
          </div>
        </form>

        {/* User Cards */}
        {filteredUsers.length > 0 ? (
          <ScrollArea className="h-[90vh]">
            <div className="grid grid-cols-1 md:grid-cols-4 col-span-4 gap-4">
              {filteredUsers.map((user) => (
                <Link
                  key={user._id}
                  href={`/profile/${user._id}`}
                  className="block  bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col items-center p-6 text-center">
                    <div className="relative w-24 h-24 mb-4">
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt={`${user.name}'s avatar`}
                        fill
                        className="rounded-full object-cover border-2 border-blue-200"
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      {user.name}
                    </h2>
                    <p className="text-blue-700 font-medium capitalize mt-1">
                      {user.profession.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {user.city}, {user.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No users found matching your search criteria.
          </p>
        )}
      </div>

      <div className="grid-cols-1">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h5 className="text-lg font-semibold text-gray-800 mb-3">
            Total Energy
          </h5>
          <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
            <TotalSlider />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h5 className="text-lg font-semibold text-gray-800 mb-3">NMB Bank</h5>
          <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
            <NMBSlider />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h5 className="text-lg font-semibold text-gray-800 mb-3">
            Tourism & Tourist Sites
          </h5>
          <Link href="/tourism/zanzibar">
            <div className="h-56 bg-gray-100 rounded-md hover:opacity-90 transition-opacity">
              <TourismSlider />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
