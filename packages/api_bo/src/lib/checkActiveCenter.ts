import { Collection } from "mongo";
import { CenterModel } from "../models/CenterModel.ts";
import { GroupModel } from "../models/GroupModel.ts";
import { ObjectId } from "objectId";

export const checkActiveCenter = async (
  groups: GroupModel[],
  DBModel: Collection<CenterModel>,
): Promise<void> => {
  const ids = groups.map((group) => {
    if (group.center !== null) return group.center;
  }) as ObjectId[];
  const centers = await DBModel.countDocuments({
    _id: { $in: ids },
    active: false,
  });
  if (centers > 0) {
    throw new Error("400, Center not active");
  }
};
