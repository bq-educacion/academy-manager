import { GroupModel } from "../models/GroupModel.ts";

export const checkActiveGroups = (
  groups: GroupModel[],
): boolean => {
  let activeGroup = false;
  if (groups.length > 0) {
    const inactiveGroups = groups.find((group) => !group.activeCenter);
    if (inactiveGroups) {
      throw new Error("400, Groups not active");
    }
    activeGroup = true;
  }
  return activeGroup;
};
