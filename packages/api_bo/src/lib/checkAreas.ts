import { Collection } from "https://deno.land/x/mongo@v0.31.0/mod.ts";
import { AreaModel } from "../models/AreaModel.ts";
import { Region } from "../types.ts";

export const checkAreas = async (
  areas: string[],
  geographicalAvailability: Region[],
  DBAreas: Collection<AreaModel>,
): Promise<void> => {
  const areasInDB = await DBAreas.find({
    name: { $in: areas },
    region: { $in: geographicalAvailability },
  }).toArray();

  if (areasInDB.length !== areas.length) {
    throw new Error("400, Area not found or not in the region");
  }
};
