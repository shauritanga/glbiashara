import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CompanyProfile } from "@/types";

interface CompanyProfileViewProps {
  company: any; // Page model data (if available)
  companyProfile: CompanyProfile; // CompanyProfile model data
  owner: any; // User who owns the company
}

export default function CompanyProfileView({
  company,
  companyProfile,
  owner,
}: CompanyProfileViewProps) {
  // Use companyProfile as the primary data source
  const name = companyProfile?.name || company?.name || "";
  const logoUrl = companyProfile?.logoUrl || company?.logo || "";
  const overview = companyProfile?.overview || company?.description || "";

  // Get data from CompanyProfile model
  const mission = companyProfile?.mission || "";
  const vision = companyProfile?.vision || "";
  const history = companyProfile?.history || "";
  const productsOrServices = companyProfile?.productsOrServices || [];
  const coreValues = companyProfile?.coreValues || [];
  const achievements = companyProfile?.achievements || [];
  const leadership = companyProfile?.leadership || [];
  const targetMarket = companyProfile?.targetMarket || "";

  // Contact information from CompanyProfile model
  const contact = companyProfile?.contact || {};
  const email = contact.email || owner?.email || "";
  const phone = contact.phone || owner?.phone || "";
  const website = contact.website || "";
  const address =
    contact.address ||
    (company?.district && company?.country
      ? `${company.district}, ${company.country}`
      : "");
  const socialMedia = contact.socialMedia || [];

  // Legal information
  const legal = companyProfile?.legal || {};

  // Get social media icons
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Hero Section with Cover Image */}
      <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-800 relative">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Company Profile Card */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="bg-white rounded-xl shadow-lg -mt-20 relative z-10 overflow-hidden">
          {/* Company Header */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
            {/* Logo */}
            <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-md flex-shrink-0">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${name} logo`}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="h-full w-full rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building className="h-12 w-12 text-blue-500" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

              <div className="flex flex-wrap gap-3 mt-2">
                {company?.industry && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-blue-500" />
                    {company.industry}
                  </Badge>
                )}

                {address && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    {address}
                  </Badge>
                )}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                {email && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`mailto:${email}`}
                      className="flex items-center gap-1.5"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Link>
                  </Button>
                )}

                {phone && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`tel:${phone}`}
                      className="flex items-center gap-1.5"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </Link>
                  </Button>
                )}

                {website && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={
                        website.startsWith("http")
                          ? website
                          : `https://${website}`
                      }
                      target="_blank"
                      className="flex items-center gap-1.5"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b">
              <div className="px-6">
                <TabsList className="h-12">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    About
                  </TabsTrigger>
                  {leadership && leadership.length > 0 && (
                    <TabsTrigger
                      value="leadership"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                    >
                      Leadership
                    </TabsTrigger>
                  )}
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                  >
                    Contact
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Overview
                </h2>
                {overview ? (
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {overview}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No company overview available.
                  </p>
                )}

                {/* Products or Services */}
                {productsOrServices && productsOrServices.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Products & Services
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {productsOrServices.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Core Values */}
                {coreValues && coreValues.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Core Values
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {coreValues.map((value, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1 text-sm"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Market */}
                {targetMarket && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Target Market
                    </h3>
                    <p className="text-gray-700">{targetMarket}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="p-6">
              <div className="max-w-3xl">
                {/* Mission */}
                {mission && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Our Mission
                    </h3>
                    <p className="text-gray-700">{mission}</p>
                  </div>
                )}

                {/* Vision */}
                {vision && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Our Vision
                    </h3>
                    <p className="text-gray-700">{vision}</p>
                  </div>
                )}

                {/* History */}
                {history && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Company History
                    </h3>
                    <p className="text-gray-700">{history}</p>
                  </div>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Achievements
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Legal Information */}
                {legal &&
                  (legal.registrationNumber ||
                    (legal.certifications &&
                      legal.certifications.length > 0)) && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Legal Information
                      </h3>
                      {legal.registrationNumber && (
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">
                            Registration Number:
                          </span>{" "}
                          {legal.registrationNumber}
                        </p>
                      )}
                      {legal.certifications &&
                        legal.certifications.length > 0 && (
                          <div>
                            <p className="font-medium text-gray-700 mb-1">
                              Certifications:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {legal.certifications.map((cert, index) => (
                                <li key={index}>{cert}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}
              </div>
            </TabsContent>

            {/* Leadership Tab */}
            {leadership && leadership.length > 0 && (
              <TabsContent value="leadership" className="p-6">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Leadership Team
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {leadership.map((leader: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row">
                          {leader.photoUrl && (
                            <div className="sm:w-1/3">
                              <div className="relative h-48 sm:h-full">
                                <Image
                                  src={leader.photoUrl}
                                  alt={leader.name}
                                  width={96}
                                  height={96}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          )}
                          <div
                            className={`p-4 ${
                              leader.photoUrl ? "sm:w-2/3" : "w-full"
                            }`}
                          >
                            <h3 className="font-semibold text-gray-900">
                              {leader.name}
                            </h3>
                            <p className="text-blue-600 text-sm mb-2">
                              {leader.position}
                            </p>
                            {leader.bio && (
                              <p className="text-gray-600 text-sm">
                                {leader.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Contact Tab */}
            <TabsContent value="contact" className="p-6">
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {email && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <Link
                            href={`mailto:${email}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {email}
                          </Link>
                        </div>
                      </div>
                    )}

                    {phone && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <Link
                            href={`tel:${phone}`}
                            className="font-medium text-gray-900 hover:text-blue-600"
                          >
                            {phone}
                          </Link>
                        </div>
                      </div>
                    )}

                    {website && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <Link
                            href={
                              website.startsWith("http")
                                ? website
                                : `https://${website}`
                            }
                            target="_blank"
                            className="font-medium text-blue-600 hover:underline flex items-center"
                          >
                            {website.replace(/^https?:\/\//, "")}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {address && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">{address}</p>
                        </div>
                      </div>
                    )}

                    {/* Social Media */}
                    {socialMedia && socialMedia.length > 0 && (
                      <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">
                          Social Media
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {socialMedia.map((social: any, index: number) => (
                            <Link
                              key={index}
                              href={social.url}
                              target="_blank"
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-md text-gray-700 hover:text-blue-700 transition-colors"
                            >
                              {getSocialIcon(social.platform)}
                              <span>{social.platform}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
