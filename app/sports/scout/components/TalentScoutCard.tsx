"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Star, Trophy, MapPin, Calendar, User, Award, Heart, MessageCircle, 
  Eye, Clock, Target, TrendingUp, CheckCircle, X 
} from "lucide-react";
import ContactForm from "@/components/sports/ContactForm";

interface TalentScoutCardProps {
  talent: any;
  currentUserId?: string;
}

export default function TalentScoutCard({ talent, currentUserId }: TalentScoutCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const age = new Date().getFullYear() - new Date(talent.dateOfBirth).getFullYear();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite functionality with server action
  };

  const getAvailabilityBadges = () => {
    const badges = [];
    if (talent.availability?.forTraining) badges.push({ text: "Training", color: "green" });
    if (talent.availability?.forMatches) badges.push({ text: "Matches", color: "blue" });
    if (talent.availability?.forTransfer) badges.push({ text: "Transfer", color: "purple" });
    if (talent.preferences?.willingToRelocate) badges.push({ text: "Relocate", color: "orange" });
    return badges;
  };

  const getStatistics = () => {
    const stats = [];
    if (talent.statistics?.matchesPlayed) {
      stats.push({ label: "Matches", value: talent.statistics.matchesPlayed });
    }
    if (talent.statistics?.goals) {
      stats.push({ label: "Goals", value: talent.statistics.goals });
    }
    if (talent.statistics?.assists) {
      stats.push({ label: "Assists", value: talent.statistics.assists });
    }
    return stats;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Header with Favorite Button */}
        <div className="relative p-6 pb-4">
          <button
            onClick={handleFavorite}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isFavorited 
                ? "bg-red-100 text-red-600" 
                : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          {/* Talent Info */}
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              {talent.user?.name?.split(' ').map((n: string) => n[0]).join('') || 'T'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {talent.user?.name || 'Anonymous'}
              </h3>
              <p className="text-gray-600 text-sm">{talent.position}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm text-gray-600">{talent.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500 ml-1">({talent.totalReviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-sm font-semibold text-gray-900">{age}</div>
              <div className="text-xs text-gray-600">Age</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-sm font-semibold text-gray-900">{talent.experience.years}</div>
              <div className="text-xs text-gray-600">Years Exp</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className={`text-sm font-semibold ${
                talent.level === 'Professional' ? 'text-red-600' :
                talent.level === 'Advanced' ? 'text-orange-600' :
                talent.level === 'Intermediate' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {talent.level}
              </div>
              <div className="text-xs text-gray-600">Level</div>
            </div>
          </div>

          {/* Sport and Location */}
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{talent.sport?.name}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              {talent.user?.city}, {talent.user?.state}
            </div>
          </div>

          {/* Availability Badges */}
          <div className="flex flex-wrap gap-1 mb-4">
            {getAvailabilityBadges().map((badge, index) => (
              <span
                key={index}
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  badge.color === 'green' ? 'bg-green-100 text-green-800' :
                  badge.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  badge.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>

          {/* Statistics */}
          {getStatistics().length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Performance</h4>
              <div className="flex space-x-3">
                {getStatistics().map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Achievements */}
          {talent.achievements && talent.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Top Achievements</h4>
              <div className="space-y-1">
                {talent.achievements.slice(0, 2).map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <Award className="h-3 w-3 mr-2 text-yellow-500 flex-shrink-0" />
                    <span className="truncate">{achievement}</span>
                  </div>
                ))}
                {talent.achievements.length > 2 && (
                  <button
                    onClick={() => setShowFullProfile(true)}
                    className="text-xs text-blue-600 hover:text-blue-800 ml-5"
                  >
                    +{talent.achievements.length - 2} more
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Current Academy */}
          {talent.currentAcademy && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">Currently training at:</p>
              <p className="text-sm font-medium text-blue-600">{talent.currentAcademy.name}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowContactForm(true)}
              className="flex items-center justify-center bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </button>
            <Link
              href={`/sports/talents/${talent._id}`}
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              View Full
            </Link>
          </div>

          {/* Verification Badge */}
          {talent.isVerified && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <ContactForm
              targetType="Talent"
              targetId={talent._id}
              targetName={talent.user?.name || 'Talent'}
              onSuccess={() => setShowContactForm(false)}
            />
            <div className="p-4 border-t">
              <button
                onClick={() => setShowContactForm(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Profile Modal */}
      {showFullProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {talent.user?.name} - Full Profile
                </h3>
                <button
                  onClick={() => setShowFullProfile(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Full achievements list */}
              {talent.achievements && talent.achievements.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">All Achievements</h4>
                  <div className="space-y-2">
                    {talent.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <Award className="h-4 w-4 mr-3 text-yellow-500 flex-shrink-0" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience description */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {talent.experience.description}
                </p>
              </div>

              {/* Looking for */}
              {talent.preferences?.lookingFor && talent.preferences.lookingFor.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Looking For</h4>
                  <div className="flex flex-wrap gap-2">
                    {talent.preferences.lookingFor.map((item: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
