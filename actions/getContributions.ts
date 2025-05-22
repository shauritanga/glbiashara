"use server";

import dbConnect from "@/lib/mongodb";
import { Contribution } from "@/models";
import mongoose from "mongoose";

export async function getClubContributions(clubId: string) {
  try {
    await dbConnect();

    console.log("Fetching contributions for club ID:", clubId);

    // Ensure we have a valid ObjectId
    const clubObjectId = new mongoose.Types.ObjectId(clubId);
    console.log("Club ObjectId:", clubObjectId.toString());

    // Get all contributions for this club
    const contributions = await Contribution.find({
      $or: [
        { club: clubObjectId },
        { club: { $exists: false } }, // Include contributions without club field (for backward compatibility)
      ],
    });

    console.log(
      `Found ${contributions.length} contributions for club:`,
      clubId
    );

    if (contributions.length > 0) {
      console.log("Sample contribution:", JSON.stringify(contributions[0]));
    }

    // Calculate total amount
    const totalAmount = contributions.reduce((sum, contribution) => {
      return sum + (contribution.amount || 0);
    }, 0);
    console.log("Calculated total amount:", totalAmount);

    // Count unique contributors (by name)
    const uniqueContributors = new Set();
    contributions.forEach((contribution) => {
      if (contribution.name) {
        uniqueContributors.add(contribution.name);
      }
    });
    console.log("Unique contributors count:", uniqueContributors.size);

    const result = {
      totalAmount,
      contributionsCount: contributions.length,
      uniqueContributorsCount: uniqueContributors.size,
    };

    console.log("Returning contribution data:", result);
    return result;
  } catch (error) {
    console.error("Error fetching club contributions:", error);
    return {
      totalAmount: 0,
      contributionsCount: 0,
      uniqueContributorsCount: 0,
    };
  }
}

// New function to get list of contributors with their amounts
export async function getContributorsList(clubId: string) {
  try {
    await dbConnect();

    console.log("Fetching contributors list for club ID:", clubId);

    // Ensure we have a valid ObjectId
    const clubObjectId = new mongoose.Types.ObjectId(clubId);

    // Get all contributions for this club
    const contributions = await Contribution.find({
      $or: [
        { club: clubObjectId },
        { club: { $exists: false } }, // Include contributions without club field (for backward compatibility)
      ],
    })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert to plain JavaScript objects

    // Format the data to include only necessary fields
    const contributors = contributions.map((contribution) => ({
      _id: contribution._id,
      name: contribution.name || "Anonymous",
      amount: contribution.amount || 0,
      createdAt: contribution.createdAt,
      phone: contribution.phone || "",
      paymentMethod: contribution.paymentMethod || "",
    }));

    console.log(`Returning ${contributors.length} contributors`);
    return contributors;
  } catch (error) {
    console.error("Error fetching contributors list:", error);
    return [];
  }
}
