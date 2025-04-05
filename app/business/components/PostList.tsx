"use client";
import { IPost } from "@/models/Post";
import PostCard from "./PostCard";
import regions from "@/lib/regions.json";
import districts from "@/lib/districts.json";
import wards from "@/lib/wards.json";
import streets from "@/lib/streets.json";
import { useState, useMemo } from "react";

interface PostListProps {
  posts: IPost[];
}

export default function PostList({ posts }: PostListProps) {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

  const districtOptions = useMemo(
    () => districts.find((group) => group.region === region)?.districts || [],
    [region]
  );
  const wardOptions = useMemo(
    () => wards.find((group) => group.district === district)?.wards || [],
    [district]
  );
  const streetOptions = useMemo(
    () => streets.find((group) => group.ward === ward)?.streets || [],
    [ward]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (post.isGlobal) return true;

      return (
        (!region || post.region === region) &&
        (!district || post.district === district) &&
        (!ward || post.ward === ward) &&
        (!street || post.street === street)
      );
    });
  }, [posts, region, district, ward, street]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filter Section */}
      <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Filter Posts by Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setDistrict("");
                setWard("");
                setStreet("");
              }}
              className="w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option value="">All Regions</option>
              {regions.map((reg) => (
                <option key={reg.label} value={reg.label}>
                  {reg.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setWard("");
                setStreet("");
              }}
              disabled={!region}
              className="w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Districts</option>
              {districtOptions.map((dist) => (
                <option key={dist.label} value={dist.label}>
                  {dist.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ward
            </label>
            <select
              value={ward}
              onChange={(e) => {
                setWard(e.target.value);
                setStreet("");
              }}
              disabled={!district}
              className="w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Wards</option>
              {wardOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street
            </label>
            <select
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              disabled={!ward}
              className="w-full p-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Streets</option>
              {streetOptions.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
            <PostCard key={post._id.toString()} post={post} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">
              No posts available for this selection
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
