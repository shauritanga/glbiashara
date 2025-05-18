"use server";

import dbConnect from "@/lib/mongodb";
import { Contribution } from "@/models";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export async function saveContribution(formData: {
  amount: string;
  name: string;
  phone: string;
  paymentMethod: string;
  clubId?: string;
}) {
  try {
    await dbConnect();

    const { amount, name, phone, paymentMethod, clubId } = formData;

    console.log("Saving contribution with data:", {
      amount,
      name,
      phone,
      paymentMethod,
      clubId,
    });

    // Default club ID for Simba SC - make sure this is a valid ObjectId
    const defaultClubId = "67ae0aeb8c8248cf93a5f19e";

    // Ensure we have a valid ObjectId for the club
    let clubObjectId;
    try {
      clubObjectId =
        clubId && mongoose.isValidObjectId(clubId)
          ? new mongoose.Types.ObjectId(clubId)
          : new mongoose.Types.ObjectId(defaultClubId);
    } catch (error) {
      console.error("Invalid ObjectId:", error);
      // Fallback to default ID if there's an error
      clubObjectId = new mongoose.Types.ObjectId(defaultClubId);
    }

    // Create new contribution record
    const contribution = new Contribution({
      amount: Number(amount),
      name, // No longer optional
      phone, // No longer optional
      paymentMethod,
      club: clubObjectId,
      createdAt: new Date(),
    });

    const savedContribution = await contribution.save();
    console.log("Saved contribution:", savedContribution);

    // Revalidate relevant paths
    revalidatePath("/clubs");

    return {
      success: true,
      message: `Thank you for your contribution of TZS ${amount}!`,
    };
  } catch (error: any) {
    console.error("Error saving contribution:", error);
    return {
      success: false,
      error: error.message || "Failed to process contribution",
    };
  }
}
