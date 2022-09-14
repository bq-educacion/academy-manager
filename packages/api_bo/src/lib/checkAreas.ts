import { Collection } from "mongo";
import { AreaModel } from "../models/AreaModel.ts";
import { Region } from "../types.ts";

export const checkAreas = async (
  areas: string[],
  geographicalAvailability: Region[],
  DBAreas: Collection<AreaModel>,
): Promise<void> => {
  const areasInDB = await DBAreas.countDocuments({
    name: { $in: areas },
    region: { $in: geographicalAvailability },
  });

  if (areasInDB !== areas.length) {
    throw new Error("400, Area not found or not in the region");
  }
};
