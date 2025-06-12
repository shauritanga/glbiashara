"use server";

import dbConnect from "@/lib/mongodb";
import { SportsAcademy, SportsTalent, SportsCategory } from "@/models/sports";
import { ActionResponse } from "@/types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email";

// Check if user is admin
async function isAdmin() {
  const session = await auth();
  return session?.user?.email === "admin@glbiashara.com";
}

// Approve academy
export async function approveAcademy(academyId: string): Promise<ActionResponse> {
  try {
    if (!(await isAdmin())) {
      return {
        success: false,
        message: "Unauthorized: Admin access required",
      };
    }

    await dbConnect();

    const academy = await SportsAcademy.findById(academyId)
      .populate("createdBy", "name email")
      .populate("sport", "name");

    if (!academy) {
      return {
        success: false,
        message: "Academy not found",
      };
    }

    academy.isVerified = true;
    await academy.save();

    // Send approval email
    try {
      await sendEmail({
        to: academy.createdBy.email,
        subject: "Academy Approved - GLBiashara Sports",
        html: `
          <h2>Congratulations! Your Academy has been Approved</h2>
          <p>Dear ${academy.createdBy.name},</p>
          <p>We're excited to inform you that your academy "<strong>${academy.name}</strong>" has been approved and is now live on our platform!</p>
          <p><strong>Academy Details:</strong></p>
          <ul>
            <li>Name: ${academy.name}</li>
            <li>Sport: ${academy.sport.name}</li>
            <li>Location: ${academy.location.district}, ${academy.location.region}</li>
          </ul>
          <p>Your academy is now visible to potential students and can start receiving inquiries.</p>
          <p><a href="${process.env.NEXTAUTH_URL}/sports/academies/${academy.slug}" style="background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Your Academy</a></p>
          <p>Best regards,<br>GLBiashara Sports Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
    }

    revalidatePath("/admin/sports");
    revalidatePath("/sports/academies");

    return {
      success: true,
      message: "Academy approved successfully",
    };
  } catch (error) {
    console.error("Error approving academy:", error);
    return {
      success: false,
      message: "Failed to approve academy",
    };
  }
}

// Reject academy
export async function rejectAcademy(
  academyId: string,
  reason: string
): Promise<ActionResponse> {
  try {
    if (!(await isAdmin())) {
      return {
        success: false,
        message: "Unauthorized: Admin access required",
      };
    }

    await dbConnect();

    const academy = await SportsAcademy.findById(academyId)
      .populate("createdBy", "name email");

    if (!academy) {
      return {
        success: false,
        message: "Academy not found",
      };
    }

    // Send rejection email
    try {
      await sendEmail({
        to: academy.createdBy.email,
        subject: "Academy Application Update - GLBiashara Sports",
        html: `
          <h2>Academy Application Update</h2>
          <p>Dear ${academy.createdBy.name},</p>
          <p>Thank you for your interest in joining GLBiashara Sports platform.</p>
          <p>After reviewing your academy application for "<strong>${academy.name}</strong>", we need some additional information or improvements before we can approve it.</p>
          <p><strong>Feedback:</strong></p>
          <p>${reason}</p>
          <p>Please review the feedback and feel free to resubmit your application with the necessary updates.</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>GLBiashara Sports Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send rejection email:", emailError);
    }

    // Mark as inactive instead of deleting
    academy.isActive = false;
    await academy.save();

    revalidatePath("/admin/sports");

    return {
      success: true,
      message: "Academy rejected and notification sent",
    };
  } catch (error) {
    console.error("Error rejecting academy:", error);
    return {
      success: false,
      message: "Failed to reject academy",
    };
  }
}

// Approve talent
export async function approveTalent(talentId: string): Promise<ActionResponse> {
  try {
    if (!(await isAdmin())) {
      return {
        success: false,
        message: "Unauthorized: Admin access required",
      };
    }

    await dbConnect();

    const talent = await SportsTalent.findById(talentId)
      .populate("user", "name email")
      .populate("sport", "name");

    if (!talent) {
      return {
        success: false,
        message: "Talent not found",
      };
    }

    talent.isVerified = true;
    await talent.save();

    // Send approval email
    try {
      await sendEmail({
        to: talent.user.email,
        subject: "Talent Profile Approved - GLBiashara Sports",
        html: `
          <h2>Congratulations! Your Talent Profile has been Approved</h2>
          <p>Dear ${talent.user.name},</p>
          <p>We're excited to inform you that your talent profile has been approved and is now live on our platform!</p>
          <p><strong>Profile Details:</strong></p>
          <ul>
            <li>Sport: ${talent.sport.name}</li>
            <li>Position: ${talent.position}</li>
            <li>Level: ${talent.level}</li>
            <li>Experience: ${talent.experience.years} years</li>
          </ul>
          <p>Your profile is now visible to academies, coaches, and scouts who are looking for talented athletes like you.</p>
          <p><a href="${process.env.NEXTAUTH_URL}/sports/talents/${talent._id}" style="background-color: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Your Profile</a></p>
          <p>Best regards,<br>GLBiashara Sports Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send approval email:", emailError);
    }

    revalidatePath("/admin/sports");
    revalidatePath("/sports/talents");

    return {
      success: true,
      message: "Talent approved successfully",
    };
  } catch (error) {
    console.error("Error approving talent:", error);
    return {
      success: false,
      message: "Failed to approve talent",
    };
  }
}

// Reject talent
export async function rejectTalent(
  talentId: string,
  reason: string
): Promise<ActionResponse> {
  try {
    if (!(await isAdmin())) {
      return {
        success: false,
        message: "Unauthorized: Admin access required",
      };
    }

    await dbConnect();

    const talent = await SportsTalent.findById(talentId)
      .populate("user", "name email");

    if (!talent) {
      return {
        success: false,
        message: "Talent not found",
      };
    }

    // Send rejection email
    try {
      await sendEmail({
        to: talent.user.email,
        subject: "Talent Profile Update - GLBiashara Sports",
        html: `
          <h2>Talent Profile Update</h2>
          <p>Dear ${talent.user.name},</p>
          <p>Thank you for creating your talent profile on GLBiashara Sports platform.</p>
          <p>After reviewing your profile, we need some additional information or improvements before we can approve it.</p>
          <p><strong>Feedback:</strong></p>
          <p>${reason}</p>
          <p>Please review the feedback and update your profile with the necessary information.</p>
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          <p>Best regards,<br>GLBiashara Sports Team</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send rejection email:", emailError);
    }

    // Mark as inactive instead of deleting
    talent.isActive = false;
    await talent.save();

    revalidatePath("/admin/sports");

    return {
      success: true,
      message: "Talent rejected and notification sent",
    };
  } catch (error) {
    console.error("Error rejecting talent:", error);
    return {
      success: false,
      message: "Failed to reject talent",
    };
  }
}

// Get admin statistics
export async function getAdminStatistics() {
  try {
    if (!(await isAdmin())) {
      throw new Error("Unauthorized");
    }

    await dbConnect();

    const [
      totalAcademies,
      verifiedAcademies,
      pendingAcademies,
      totalTalents,
      verifiedTalents,
      pendingTalents,
      totalCategories,
    ] = await Promise.all([
      SportsAcademy.countDocuments({ isActive: true }),
      SportsAcademy.countDocuments({ isActive: true, isVerified: true }),
      SportsAcademy.countDocuments({ isActive: true, isVerified: false }),
      SportsTalent.countDocuments({ isActive: true }),
      SportsTalent.countDocuments({ isActive: true, isVerified: true }),
      SportsTalent.countDocuments({ isActive: true, isVerified: false }),
      SportsCategory.countDocuments({ isActive: true }),
    ]);

    return {
      academies: {
        total: totalAcademies,
        verified: verifiedAcademies,
        pending: pendingAcademies,
      },
      talents: {
        total: totalTalents,
        verified: verifiedTalents,
        pending: pendingTalents,
      },
      categories: totalCategories,
    };
  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    return {
      academies: { total: 0, verified: 0, pending: 0 },
      talents: { total: 0, verified: 0, pending: 0 },
      categories: 0,
    };
  }
}

// Seed sample data
export async function seedSampleData(): Promise<ActionResponse> {
  try {
    if (!(await isAdmin())) {
      return {
        success: false,
        message: "Unauthorized: Admin access required",
      };
    }

    // Import and run the seed function
    const { seedSportsData } = await import("@/scripts/seedSportsData");
    const result = await seedSportsData();

    revalidatePath("/admin/sports");
    revalidatePath("/sports");

    return result;
  } catch (error) {
    console.error("Error seeding sample data:", error);
    return {
      success: false,
      message: "Failed to seed sample data",
    };
  }
}
