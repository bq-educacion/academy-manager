import { Collection } from "mongo";
import { AreaModel } from "../models/AreaModel.ts";
import { Region } from "../types.ts";

export const checkAreas = async (
  areas: string[],
  regions: Region[],
  DBModel: Collection<AreaModel>,
): Promise<void> => {
  const areasInDB = await DBModel.find({
    name: { $in: areas },
    region: { $in: regions },
  }).toArray();
  if (areasInDB.length !== areas.length) {
    throw new Error("400, Invalid areas");
  }
};
