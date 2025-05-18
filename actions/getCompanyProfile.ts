"use server";

import dbConnect from "@/lib/mongodb";
import { User, CompanyProfile, Profession } from "@/models";

export async function getCompanyProfile(id: string) {
  try {
    await dbConnect();

    // Try to find the company profile directly
    const profileResult = await CompanyProfile.findById(id).lean();

    if (!profileResult) {
      return null;
    }

    // Convert MongoDB document to plain object
    const companyProfile = JSON.parse(JSON.stringify(profileResult));

    // Find the user who owns this company profile
    const userResult = await User.findOne({
      companyProfileId: id,
    }).lean();

    const owner = userResult ? JSON.parse(JSON.stringify(userResult)) : null;

    // Get related professionals using a sophisticated approach
    let relatedProfessionals = [];

    // 1. Determine relevant professions based on company's industry/services
    const relevantProfessions = [];

    // If company has products/services defined, use them to find relevant professions
    if (
      companyProfile.productsOrServices &&
      companyProfile.productsOrServices.length > 0
    ) {
      // Find professions that match company's services
      const serviceKeywords = companyProfile.productsOrServices
        .join(" ")
        .toLowerCase();

      // Find professions that might be relevant to these services
      const professions = await Profession.find({
        $or: [
          {
            name: {
              $regex: new RegExp(serviceKeywords.split(" ").join("|"), "i"),
            },
          },
          // Add other relevant criteria here
        ],
      }).lean();

      relevantProfessions.push(...professions.map((p) => p._id));
    }

    // 2. Find professionals based on relevance criteria
    const query: any = {
      profession: { $exists: true },
      // Exclude the owner if they exist
      ...(owner?._id && { _id: { $ne: owner._id } }),
    };

    // If we found relevant professions, prioritize them
    if (relevantProfessions.length > 0) {
      query.$or = [
        { profession: { $in: relevantProfessions } },
        // Also include professionals in the same city/region if available
        ...(companyProfile.contact?.address
          ? [
              {
                city: {
                  $regex: new RegExp(
                    companyProfile.contact.address.split(",")[0],
                    "i"
                  ),
                },
              },
            ]
          : []),
      ];
    }

    // Find professionals matching our criteria
    const response = await User.find(query)
      .populate("profession")
      .select("name profession image city country")
      .sort({ createdAt: -1 }) // Get most recently active professionals
      .limit(10)
      .lean();

    relatedProfessionals = JSON.parse(JSON.stringify(response));

    // 3. Sort by relevance (could implement more sophisticated scoring here)
    // For now, just randomize to show different professionals on each view
    relatedProfessionals.sort(() => Math.random() - 0.5);

    return {
      companyProfile,
      owner,
      professionals: relatedProfessionals.slice(0, 3),
    };
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
}
