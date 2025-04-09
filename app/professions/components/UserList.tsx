"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IUser } from "@/models/User";

export default function UserList({ initialUsers }: { initialUsers: IUser[] }) {
  const [users] = useState(initialUsers);
  const [searchName, setSearchName] = useState("");
  const [searchProfession, setSearchProfession] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // Filter users based on search inputs
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const professionMatch = user.profession
      .toLowerCase()
      .includes(searchProfession.toLowerCase());
    const cityMatch = user.city
      .toLowerCase()
      .includes(searchCity.toLowerCase());
    return nameMatch && professionMatch && cityMatch;
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
          placeholder="Search by profession..."
          value={searchProfession}
          onChange={(e) => setSearchProfession(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <input
          type="text"
          placeholder="Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300 transition-colors"
        >
          Clear
        </button>
      </form>

      {/* User Cards */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <Link
              key={user._id}
              href={`/profile/${user._id}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl hover:border-blue-200 border border-transparent transition-all duration-300 p-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt={`${user.name}'s avatar`}
                    fill
                    className="rounded-full object-cover border-2 border-blue-300 group-hover:border-blue-500 transition-colors"
                  />
                </div>
                <h2 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors text-center">
                  {user.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-blue-600 capitalize text-center">
                  {user.profession.replace("-", " ")}
                </p>
                <p className="mt-1 text-sm text-gray-600 text-center">
                  {user.city}, {user.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-blue-600 mt-4">
          No users found matching your search criteria.
        </p>
      )}
    </>
  );
}
