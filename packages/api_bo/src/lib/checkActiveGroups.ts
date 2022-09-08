import { GroupModel } from "../models/GroupModel.ts";

export const checkActiveGroups = (
  groups: GroupModel[],
): boolean => {
  let active = false;
  if (groups.length > 0) {
    const inactiveGroups = groups.find((group) => !group.active);
    if (inactiveGroups) {
      throw new Error("400, Groups not active");
    }
    active = true;
  }
  return active;
};
