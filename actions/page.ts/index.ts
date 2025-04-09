"use server";

import dbConnect from "@/lib/mongodb";
import Page from "@/models/Page";

export async function getPageByCompany() {
  await dbConnect();
  const companies = await Page.find({ type: "company" })
    .select("name description country logo district")
    .lean();

  console.log("Companies:", companies);
  return JSON.parse(JSON.stringify(companies));
}
