"use client";

import { useContributionUpdates } from "@/hooks/useContributionUpdates";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ContributionCounterProps = {
  clubId: string;
  initialData: {
    totalAmount: number;
    contributionsCount: number;
    uniqueContributorsCount: number;
  };
  colorScheme: {
    text: string;
    buttonBg: string;
    buttonHover: string;
  };
};

export default function ContributionCounter({
  clubId,
  initialData,
  colorScheme,
}: ContributionCounterProps) {
  const { data, isConnected } = useContributionUpdates(clubId, initialData);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className={`font-semibold ${colorScheme.text}`}>
          Current Amount:{" "}
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "TZS",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(data.totalAmount)}
        </h1>
        {isConnected && (
          <span className="flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
            <span className="text-xs text-green-600">Live</span>
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/clubs/${clubId}/contributors`}>
          <Button
            className={`flex items-center gap-2 ${colorScheme.buttonBg} ${colorScheme.buttonHover}`}
          >
            <span>Contributors</span>
            <span
              className={`text-xs bg-white ${colorScheme.text.replace(
                "text-",
                "text-"
              )} px-2 py-1 rounded-full`}
            >
              {data.uniqueContributorsCount}
            </span>
          </Button>
        </Link>
        <span className="text-sm text-gray-600">
          ({data.contributionsCount} contributions)
        </span>
      </div>
    </div>
  );
}
