import dbConnect from "@/lib/mongodb";
import { Profession, IProfession } from "@/models";

export async function getProfessions(): Promise<IProfession[] | []> {
  try {
    await dbConnect();
    const result = await Profession.find();
    const professions = JSON.parse(JSON.stringify(result));
    return professions as unknown as IProfession[];
  } catch (error) {
    console.log({ error });
    return [];
  }
}
