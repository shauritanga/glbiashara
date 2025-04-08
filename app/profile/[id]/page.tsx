"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaDownload,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { getUser } from "@/actions/getUser";
import { IUser } from "@/models/User";
import { useParams } from "next/navigation";
import { getUserById } from "@/actions/user";

interface Project {
  _id: string;
  name: string;
  description: string;
  image?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

export default function PortfolioPage() {
  const { id } = useParams();
  console.log("user id", id);

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch user data
    const fetchUserData = async () => {
      try {
        // In a real app, this would be an API call
        const response = await getUserById(id as string);

        setUser(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  console.log("user data", user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {user?.image && (
              <Image
                src={user.image}
                alt={user.name}
                width={200}
                height={200}
                className="rounded-full border-4 border-white"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
              <p className="text-xl mb-4 capitalize">
                {user?.profession.replace("-", " ")}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {user?.streetAddress}, {user?.city},{" "}
                {user?.state}, {user?.country}
              </p>
              <p className="flex items-center gap-2">
                <FaBriefcase /> {user?.business}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and CV Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="flex items-center gap-2 mb-2">
              <FaEnvelope /> {user?.email}
            </p>
            {user.phone && (
              <p className="flex items-center gap-2 mb-2">
                <FaPhone /> {user?.phone}
              </p>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Download CV</h2>
            <a
              href="/path-to-cv.pdf"
              download={`${user?.name}-cv.pdf`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaDownload /> Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.projects?.map((project) => (
            <div
              key={project._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {project?.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  width={300}
                  height={200}
                  className="rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-2">{project.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Location: {project.location}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Duration: {new Date(project.startDate).toLocaleDateString()} -{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  project.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
