"use server"; // Ensure this is at the top if using Server Actions
import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export default async function getClub(id: string) {
  try {
    await dbConnect();

    const page = await Page.findById(id);

    if (!page) {
      return null;
    }

    return JSON.parse(JSON.stringify(page));
  } catch (error) {
    console.error("Error fetching club:", error);
    return null;
  }
}
