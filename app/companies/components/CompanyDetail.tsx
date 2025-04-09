"use client";

import { IPage } from "@/models/Page";
import { IUser } from "@/models/User";
import Image from "next/image";
import Link from "next/link";

export default function CompanyDetail({
  company,
  relatedProfessionals,
}: {
  company: IPage;
  relatedProfessionals: IUser[];
}) {
  return (
    <div className="space-y-12">
      {/* Company Header */}
      <header className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-24 h-24">
            <Image
              src={company.logo || "/default-avatar.png"}
              alt={`${company.name} logo`}
              fill
              className="rounded-full object-cover border-2 border-blue-300"
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-blue-800">{company.name}</h1>
            <p className="text-blue-600 mt-1">
              {company.district}, {company.country}
            </p>
            <p className="text-gray-600 mt-2">{company.description}</p>
          </div>
        </div>
      </header>

      {/* Company Overview */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Company Overview
        </h2>
        <p className="text-gray-600">
          Founded on {new Date(company.createdAt).toLocaleDateString()},{" "}
          {company.name} is a leading company in its field.{" "}
          {company.description}
        </p>
      </section>

      {/* Posts Section */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Recent Posts
        </h2>
        {company.posts && company.posts.length > 0 ? (
          <div className="space-y-4">
            {company.posts.map((post: any) => (
              <div
                key={post._id}
                className="p-4 bg-blue-50 rounded-md border border-blue-300 hover:bg-blue-100 transition-colors"
              >
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-blue-600 mt-2">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-blue-600">No posts available.</p>
        )}
      </section>

      {/* Related Professionals Section */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Related Professionals
        </h2>
        {relatedProfessionals && relatedProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProfessionals.map((user: IUser) => (
              <Link
                key={user._id}
                href={`/portfolio/${user._id}`}
                className="group block bg-blue-50 rounded-lg p-4 border border-blue-300 hover:bg-blue-100 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-3">
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt={`${user.name}'s avatar`}
                      fill
                      className="rounded-full object-cover border-2 border-blue-300 group-hover:border-blue-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-600 text-center">
                    {user.name}
                  </h3>
                  <p className="text-sm text-blue-600 text-center capitalize">
                    {user.profession.replace("-", " ")}
                  </p>
                  <p className="text-sm text-gray-600 text-center">
                    {user.city}, {user.country}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-blue-600">No related professionals found.</p>
        )}
      </section>

      {/* Contact Information */}
      <section className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Contact Information
        </h2>
        <p className="text-gray-600">
          Reach out to {company.name} for inquiries or collaboration:
        </p>
        <ul className="mt-2 space-y-2 text-gray-600">
          <li>
            Email:{" "}
            <span className="text-blue-600">
              contact@{company.name.toLowerCase().replace(/\s+/g, "")}.com
            </span>
          </li>
          <li>
            Location:{" "}
            <span className="text-blue-600">
              {company.district}, {company.country}
            </span>
          </li>
          <li>
            Phone: <span className="text-blue-600">+1 (555) 123-4567</span>{" "}
            (Placeholder)
          </li>
        </ul>
      </section>
    </div>
  );
}
