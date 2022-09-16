import {
  CenterContactInput,
  CreateCenterInput,
  CreateGroupInput,
  EditCenterContactInput,
  EditCenterInput,
  EditGroupInput,
  MutationAddStudentContactArgs,
  MutationCreateAreaArgs,
  MutationCreateInstructorArgs,
  MutationCreateStudentArgs,
  MutationEditInstructorArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  MutationSetActiveCenterArgs,
  MutationSetStatusInstructorArgs,
  MutationSetStatusStudentArgs,
} from "../types.ts";

export function checkNotNull(
  args:
    | MutationCreateInstructorArgs
    | MutationCreateStudentArgs
    | MutationEditInstructorArgs
    | MutationEditStudentArgs
    | MutationEditStudentContactArgs
    | MutationAddStudentContactArgs
    | MutationSetActiveCenterArgs
    | MutationSetStatusStudentArgs
    | MutationSetStatusInstructorArgs
    | MutationCreateAreaArgs
    | CreateCenterInput
    | EditCenterInput
    | CenterContactInput
    | EditCenterContactInput
    | CreateGroupInput
    | EditGroupInput,
): void {
  if (Object.values(args).some((item) => item === null)) {
    throw new Error("Fields cannot be null");
  }
}
