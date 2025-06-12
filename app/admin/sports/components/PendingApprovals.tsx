"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Eye, Trophy, Users } from "lucide-react";
import Link from "next/link";

interface PendingApprovalsProps {
  pendingAcademies: any[];
  pendingTalents: any[];
}

export default function PendingApprovals({ pendingAcademies, pendingTalents }: PendingApprovalsProps) {
  const [activeTab, setActiveTab] = useState<"academies" | "talents">("academies");

  const handleApprove = async (type: "academy" | "talent", id: string) => {
    // TODO: Implement approval action
    console.log(`Approving ${type}:`, id);
  };

  const handleReject = async (type: "academy" | "talent", id: string) => {
    // TODO: Implement rejection action
    console.log(`Rejecting ${type}:`, id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("academies")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "academies"
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Trophy className="h-4 w-4 inline mr-2" />
            Academies ({pendingAcademies.length})
          </button>
          <button
            onClick={() => setActiveTab("talents")}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "talents"
                ? "border-green-500 text-green-600 bg-green-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Talents ({pendingTalents.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "academies" && (
          <div>
            {pendingAcademies.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending academies
                </h3>
                <p className="text-gray-500">
                  All academies have been reviewed and approved.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAcademies.map((academy) => (
                  <div
                    key={academy._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">
                            {academy.name}
                          </h4>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{academy.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>{academy.sport?.name}</span>
                          <span>•</span>
                          <span>{academy.location.district}, {academy.location.region}</span>
                          <span>•</span>
                          <span>Capacity: {academy.capacity}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/admin/sports/academies/${academy._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleApprove("academy", academy._id)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject("academy", academy._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "talents" && (
          <div>
            {pendingTalents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No pending talents
                </h3>
                <p className="text-gray-500">
                  All talent profiles have been reviewed and approved.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingTalents.map((talent) => (
                  <div
                    key={talent._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">
                            {talent.user.name}
                          </h4>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                            Pending Review
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{talent.experience.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>{talent.sport?.name}</span>
                          <span>•</span>
                          <span>{talent.position}</span>
                          <span>•</span>
                          <span>{talent.level}</span>
                          <span>•</span>
                          <span>{talent.experience.years} years experience</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/admin/sports/talents/${talent._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleApprove("talent", talent._id)}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject("talent", talent._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
