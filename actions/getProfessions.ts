"use server";
import dbConnect from "@/lib/mongodb";
import { Profession } from "@/models";
import { IProfessions } from "@/types";

export async function getProfessions(): Promise<IProfessions[] | []> {
  try {
    await dbConnect();
    const result = await Profession.find();
    const professions = JSON.parse(JSON.stringify(result));
    return professions as IProfessions[];
  } catch (error) {
    console.log({ error });
    return [];
  }
}
