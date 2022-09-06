import { GroupModel } from "../models/GroupModel.ts";
import { InstructorModel } from "../models/InstructorModel.ts";
import { StudentModel } from "../models/StudentModel.ts";

export const checkActiveGroups = (
  groups: GroupModel[],
  update: Partial<StudentModel | InstructorModel>,
): void => {
  if (groups.length > 0) {
    const inactiveGroups = groups.find((group) => !group.activeCenter);
    if (inactiveGroups) {
      throw new Error("400, Groups not active");
    }
    update = { ...update, activeGroup: true };
  }
};
