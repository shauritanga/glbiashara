"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models";

export async function getVodacomUsers() {
  try {
    await dbConnect();

    // Find users with Vodacom phone numbers
    // This regex matches phone numbers that:
    // 1. Start with +255 followed by 7[456] (country code + Vodacom prefix)
    // 2. Start with 0[74][456] (local format with Vodacom prefix)
    const vodacomUsers = await User.find({
      $and: [
        { phone: { $exists: true, $ne: "" } },
        {
          $or: [
            { phone: { $regex: /^\+255\s*7[456]/ } }, // +255 74/75/76
            { phone: { $regex: /^0\s*7[456]/ } }, // 074/075/076
            { phone: { $regex: /^7[456]/ } }, // Just 74/75/76
          ],
        },
        { businessName: { $exists: true, $ne: "" } }, // Must have a business name
      ],
    })
      .select("name businessName image industry city country phone")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return JSON.parse(JSON.stringify(vodacomUsers));
  } catch (error) {
    console.error("Error fetching Vodacom users:", error);
    return [];
  }
}
