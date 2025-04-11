import dbConnect from "@/lib/mongodb";
import { IIndustry, Industry } from "@/models";

export default async function getIndustries(): Promise<IIndustry | []> {
  try {
    await dbConnect();
    const result = await Industry.find();

    const industries = JSON.parse(JSON.stringify(result));
    return industries;
  } catch (error) {
    console.log(error);
    return [];
  }
}
