"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";

interface CompanyProfileProps {
  profile: {
    name: string;
    logoUrl?: string;
    overview?: string;
    mission?: string;
    vision?: string;
    history?: string;
    productsOrServices?: string[];
    coreValues?: string[];
    achievements?: string[];
    leadership?: {
      name: string;
      position: string;
      bio?: string;
      photoUrl?: string;
    }[];
    targetMarket?: string;
    contact: {
      email?: string;
      phone?: string;
      website?: string;
      address?: string;
      socialMedia?: {
        platform: string;
        url: string;
      }[];
    };
    legal?: {
      registrationNumber?: string;
      certifications?: string[];
    };
  };
}

export default function CompanyProfileCard({ profile }: CompanyProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Company Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
        <div className="flex items-center space-x-4">
          {profile.logoUrl ? (
            <div className="relative h-20 w-20 rounded-full overflow-hidden bg-white p-1">
              <Image
                src={profile.logoUrl}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-blue-400 flex items-center justify-center">
              <Building size={40} />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            {profile.contact.website && (
              <a
                href={
                  profile.contact.website.startsWith("http")
                    ? profile.contact.website
                    : `https://${profile.contact.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-100 hover:text-white mt-1"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {profile.contact.website.replace(/^https?:\/\//, "")}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="w-full justify-start rounded-none bg-transparent border-b px-6">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none"
            >
              About
            </TabsTrigger>
            {profile.leadership && profile.leadership.length > 0 && (
              <TabsTrigger
                value="team"
                className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none"
              >
                Leadership
              </TabsTrigger>
            )}
            <TabsTrigger
              value="contact"
              className="data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-b-2 border-transparent rounded-none"
            >
              Contact
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-6">
          <div className="space-y-6">
            {profile.overview && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Overview</h3>
                <p className="text-gray-700">{profile.overview}</p>
              </div>
            )}

            {profile.productsOrServices &&
              profile.productsOrServices.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Products & Services
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {profile.productsOrServices.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

            {profile.coreValues && profile.coreValues.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.coreValues.map((value, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="p-6">
          <div className="space-y-6">
            {profile.mission && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                <p className="text-gray-700">{profile.mission}</p>
              </div>
            )}

            {profile.vision && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
                <p className="text-gray-700">{profile.vision}</p>
              </div>
            )}

            {profile.history && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Company History</h3>
                <p className="text-gray-700">{profile.history}</p>
              </div>
            )}

            {profile.achievements && profile.achievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                <ul className="space-y-2">
                  {profile.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.targetMarket && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Target Market</h3>
                <p className="text-gray-700">{profile.targetMarket}</p>
              </div>
            )}

            {profile.legal?.certifications &&
              profile.legal.certifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {profile.legal.certifications.map((cert, index) => (
                      <li key={index}>{cert}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </TabsContent>

        {/* Leadership Tab */}
        {profile.leadership && profile.leadership.length > 0 && (
          <TabsContent value="team" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.leadership.map((leader, index) => (
                <div key={index} className="flex space-x-4">
                  {leader.photoUrl ? (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={leader.photoUrl}
                        alt={leader.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">{leader.name}</h4>
                    <p className="text-sm text-blue-600">{leader.position}</p>
                    {leader.bio && (
                      <p className="text-sm text-gray-600 mt-1">{leader.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Contact Tab */}
        <TabsContent value="contact" className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.contact.email && (
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a
                      href={`mailto:${profile.contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {profile.contact.email}
                    </a>
                  </div>
                </div>
              )}

              {profile.contact.phone && (
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <a
                      href={`tel:${profile.contact.phone}`}
                      className="text-green-600 hover:underline"
                    >
                      {profile.contact.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile.contact.website && (
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a
                      href={
                        profile.contact.website.startsWith("http")
                          ? profile.contact.website
                          : `https://${profile.contact.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline flex items-center"
                    >
                      {profile.contact.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}

              {profile.contact.address && (
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-700">{profile.contact.address}</p>
                  </div>
                </div>
              )}
            </div>

            {profile.contact.socialMedia &&
              profile.contact.socialMedia.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-3">Social Media</h4>
                  <div className="flex flex-wrap gap-3">
                    {profile.contact.socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={
                          social.url.startsWith("http")
                            ? social.url
                            : `https://${social.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                      >
                        {social.platform}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            {profile.legal?.registrationNumber && (
              <div className="mt-6 flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="text-gray-700">
                    {profile.legal.registrationNumber}
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
