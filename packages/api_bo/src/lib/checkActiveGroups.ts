import { GroupModel } from "../models/GroupModel.ts";

export const checkActiveGroups = (
  groups: GroupModel[],
  throwError?: boolean,
): boolean => {
  let active = true;
  const inactiveGroups = groups.find((group) => !group.active);
  if (inactiveGroups) {
    active = false;
  }
  // if we are creating Instructors and there are no active groups
  // we want to set active Instructor to false so that we can set the field enrolled
  // but if we are checking active groups in other methods then we want to throw an error if there are no active groups
  if (throwError) {
    if (!active) {
      throw new Error("400, Groups not active");
    }
  }
  return active;
};
