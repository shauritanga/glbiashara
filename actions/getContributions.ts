"use server";

import dbConnect from "@/lib/mongodb";
import { Contribution } from "@/models";
import mongoose from "mongoose";

export async function getClubContributions(clubId: string) {
  try {
    await dbConnect();

    // Ensure we have a valid ObjectId
    const clubObjectId = new mongoose.Types.ObjectId(clubId);

    // Get all contributions for this club
    const contributions = await Contribution.find({ club: clubObjectId });

    // Calculate total amount
    const totalAmount = contributions.reduce((sum, contribution) => {
      return sum + (contribution.amount || 0);
    }, 0);

    // Count unique contributors (by name)
    const uniqueContributors = new Set();
    contributions.forEach((contribution) => {
      if (contribution.name) {
        uniqueContributors.add(contribution.name);
      }
    });

    return {
      totalAmount,
      contributionsCount: contributions.length,
      uniqueContributorsCount: uniqueContributors.size,
    };
  } catch (error) {
    console.error("Error fetching club contributions:", error);
    return {
      totalAmount: 0,
      contributionsCount: 0,
      uniqueContributorsCount: 0,
    };
  }
}
