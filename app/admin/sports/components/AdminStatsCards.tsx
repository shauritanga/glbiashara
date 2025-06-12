"use client";

import { Trophy, Users, Star, CheckCircle, TrendingUp, MapPin } from "lucide-react";

interface AdminStatsCardsProps {
  statistics: {
    categories: number;
    academies: number;
    talents: number;
    verifiedAcademies: number;
    verifiedTalents: number;
    totalStudents: number;
    averageRating: {
      academies: number;
      talents: number;
      overall: number;
    };
  };
}

export default function AdminStatsCards({ statistics }: AdminStatsCardsProps) {
  const stats = [
    {
      title: "Total Academies",
      value: statistics.academies,
      icon: Trophy,
      color: "blue",
      subtitle: `${statistics.verifiedAcademies} verified`,
    },
    {
      title: "Total Talents",
      value: statistics.talents,
      icon: Users,
      color: "green",
      subtitle: `${statistics.verifiedTalents} verified`,
    },
    {
      title: "Total Students",
      value: statistics.totalStudents,
      icon: TrendingUp,
      color: "purple",
      subtitle: "Across all academies",
    },
    {
      title: "Average Rating",
      value: statistics.averageRating.overall.toFixed(1),
      icon: Star,
      color: "yellow",
      subtitle: "Platform-wide rating",
    },
    {
      title: "Sports Categories",
      value: statistics.categories,
      icon: MapPin,
      color: "indigo",
      subtitle: "Active categories",
    },
    {
      title: "Verification Rate",
      value: `${Math.round(((statistics.verifiedAcademies + statistics.verifiedTalents) / (statistics.academies + statistics.talents)) * 100)}%`,
      icon: CheckCircle,
      color: "emerald",
      subtitle: "Overall verification",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      indigo: "bg-indigo-100 text-indigo-600",
      emerald: "bg-emerald-100 text-emerald-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.subtitle}
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {stat.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
