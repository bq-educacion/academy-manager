import { ObjectId } from "objectId";
import { Collection } from "mongo";
import { GroupModel } from "../models/GroupModel.ts";
import { StudentModel } from "../models/StudentModel.ts";
import { InstructorModel } from "../models/InstructorModel.ts";

export const setActiveToFalse = async (
  ids: ObjectId[],
  DBmodel: Collection<GroupModel>,
  type: "students" | "instructors",
  updateDBModel: Collection<StudentModel | InstructorModel>,
): Promise<void> => {
  const typeFilter = {
    students: "students",
    instructors: "instructors",
  };

  if (ids.length > 0) {
    const inactiveIds = await Promise.all(
      ids.map(async (id) => {
        const groups = await DBmodel.countDocuments({
          $and: [{ [typeFilter[type]]: id }, { active: true }],
        });
        if (groups === 0) {
          return new ObjectId(id);
        }
      }),
    ) as ObjectId[];
    if (inactiveIds.length > 0) {
      await updateDBModel.updateMany(
        { _id: { $in: inactiveIds } },
        { $set: { active: false } },
      );
    }
  }
};
