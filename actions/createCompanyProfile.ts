"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import { User, CompanyProfile } from "@/models";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createCompanyProfile(formData: FormData) {
  try {
    const session = await auth();
    await dbConnect();

    if (!session || !session.user || !session.user.id) {
      console.error("Authentication error: No valid session");
      return { success: false, error: "User is not authenticated" };
    }

    // Extract basic company info
    const userId = formData.get("userId") as string;

    // Log the userId to verify it's being passed correctly
    console.log("Creating company profile for user:", userId);

    if (!userId) {
      console.error("Missing userId in form data");
      return { success: false, error: "User ID is required" };
    }

    const name = formData.get("name") as string;
    const overview = formData.get("overview") as string;
    const mission = formData.get("mission") as string;
    const vision = formData.get("vision") as string;
    const history = formData.get("history") as string;
    const targetMarket = formData.get("targetMarket") as string;

    // Validate required fields
    if (!name || !overview) {
      return {
        success: false,
        error: "Company name and overview are required",
      };
    }

    // Process logo upload
    let logoUrl = "";
    const logoFile = formData.get("logo") as File;
    if (logoFile && logoFile.size > 0) {
      const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
      const logoBase64 = `data:${logoFile.type};base64,${logoBuffer.toString(
        "base64"
      )}`;

      const logoResult = await cloudinary.uploader.upload(logoBase64, {
        folder: "company_logos",
      });

      logoUrl = logoResult.secure_url;
    }

    // Process arrays from form data
    const productsOrServices: string[] = [];
    const coreValues: string[] = [];
    const achievements: string[] = [];
    const certifications: string[] = [];

    // Extract arrays using regex pattern matching on form keys
    for (const [key, value] of formData.entries()) {
      if (key.match(/^productsOrServices\[\d+\]$/)) {
        productsOrServices.push(value as string);
      } else if (key.match(/^coreValues\[\d+\]$/)) {
        coreValues.push(value as string);
      } else if (key.match(/^achievements\[\d+\]$/)) {
        achievements.push(value as string);
      } else if (key.match(/^legal\[certifications\]\[\d+\]$/)) {
        certifications.push(value as string);
      }
    }

    // Extract contact information
    const email = formData.get("contact[email]") as string;
    const phone = formData.get("contact[phone]") as string;
    const website = formData.get("contact[website]") as string;
    const address = formData.get("contact[address]") as string;

    // Extract social media
    const socialMedia: { platform: string; url: string }[] = [];
    const socialMediaKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("contact[socialMedia]")
    );

    // Group social media entries by index
    const socialMediaIndices = new Set<number>();
    socialMediaKeys.forEach((key) => {
      const match = key.match(/contact\[socialMedia\]\[(\d+)\]/);
      if (match) {
        socialMediaIndices.add(parseInt(match[1]));
      }
    });

    // Create social media objects
    Array.from(socialMediaIndices).forEach((index) => {
      const platform = formData.get(
        `contact[socialMedia][${index}][platform]`
      ) as string;
      const url = formData.get(`contact[socialMedia][${index}][url]`) as string;

      if (platform && url) {
        socialMedia.push({ platform, url });
      }
    });

    // Extract legal information
    const registrationNumber = formData.get(
      "legal[registrationNumber]"
    ) as string;

    // Process leadership team
    const leadership: {
      name: string;
      position: string;
      bio?: string;
      photoUrl?: string;
    }[] = [];

    // Find all leadership team members
    const leadershipKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith("leadership[")
    );

    // Group leadership entries by index
    const leadershipIndices = new Set<number>();
    leadershipKeys.forEach((key) => {
      const match = key.match(/leadership\[(\d+)\]/);
      if (match) {
        leadershipIndices.add(parseInt(match[1]));
      }
    });

    // Process each leadership team member
    for (const index of Array.from(leadershipIndices)) {
      const name = formData.get(`leadership[${index}][name]`) as string;
      const position = formData.get(`leadership[${index}][position]`) as string;
      const bio = formData.get(`leadership[${index}][bio]`) as string;

      if (name && position) {
        const leadershipMember: {
          name: string;
          position: string;
          bio?: string;
          photoUrl?: string;
        } = {
          name,
          position,
          bio: bio || undefined,
        };

        // Process photo if exists
        const photoFile = formData.get(`leadershipPhoto${index}`) as File;
        if (photoFile && photoFile.size > 0) {
          const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
          const photoBase64 = `data:${
            photoFile.type
          };base64,${photoBuffer.toString("base64")}`;

          const photoResult = await cloudinary.uploader.upload(photoBase64, {
            folder: "leadership_photos",
          });

          leadershipMember.photoUrl = photoResult.secure_url;
        }

        leadership.push(leadershipMember);
      }
    }

    // Create company profile object
    const companyProfileData = {
      name,
      logoUrl: logoUrl || undefined,
      overview,
      mission: mission || undefined,
      vision: vision || undefined,
      history: history || undefined,
      productsOrServices:
        productsOrServices.length > 0 ? productsOrServices : undefined,
      coreValues: coreValues.length > 0 ? coreValues : undefined,
      achievements: achievements.length > 0 ? achievements : undefined,
      leadership: leadership.length > 0 ? leadership : undefined,
      targetMarket: targetMarket || undefined,
      contact: {
        email: email || undefined,
        phone: phone || undefined,
        website: website || undefined,
        address: address || undefined,
        socialMedia: socialMedia.length > 0 ? socialMedia : undefined,
      },
      legal: {
        registrationNumber: registrationNumber || undefined,
        certifications: certifications.length > 0 ? certifications : undefined,
      },
    };

    console.log("Creating CompanyProfile document");

    // Create a new CompanyProfile document
    const companyProfile = new CompanyProfile(companyProfileData);
    const savedProfile = await companyProfile.save();

    console.log("CompanyProfile created with ID:", savedProfile._id);

    // Update user with reference to company profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        companyProfileId: savedProfile._id,
      },
      { new: true }
    );

    if (!updatedUser) {
      console.error("User not found:", userId);
      return { success: false, error: "User not found" };
    }

    console.log("Company profile created successfully");
    revalidatePath("/profile");
    return { success: true };
  } catch (error: any) {
    console.error("Error creating company profile:", error);
    return {
      success: false,
      error: error.message || "Failed to create company profile",
    };
  }
}
