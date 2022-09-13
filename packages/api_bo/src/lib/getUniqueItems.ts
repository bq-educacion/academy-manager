import { Collection, Filter } from "mongo";
import { GroupModel } from "../models/GroupModel.ts";
import { StudentModel } from "../models/StudentModel.ts";

export const getUniqueItems = async (
  DBModel: Collection<GroupModel | StudentModel>,
  field: "students" | "course",
  filter: Filter<StudentModel | GroupModel>,
): Promise<string[]> => {
  return [
    ...new Set((await DBModel.distinct(field, filter)).flat()),
  ] as string[];
};
