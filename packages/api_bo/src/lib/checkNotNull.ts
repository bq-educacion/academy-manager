import {
  CenterContactInput,
  CreateCenterInput,
  CreateGroupInput,
  CreateInstructorInput,
  EditCenterContactInput,
  EditCenterInput,
  EditGroupInput,
  EditInstructorInput,
  MutationAddStudentContactArgs,
  MutationCreateAreaArgs,
  MutationCreateStudentArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  MutationSetActiveCenterArgs,
  MutationSetStatusInstructorArgs,
  MutationSetStatusStudentArgs,
} from "../types.ts";

export function checkNotNull(
  args:
    | MutationCreateStudentArgs
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
    | EditGroupInput
    | CreateInstructorInput
    | EditInstructorInput,
): void {
  if (Object.values(args).some((item) => item === null)) {
    throw new Error("Fields cannot be null");
  }
}
