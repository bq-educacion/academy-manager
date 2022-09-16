import {
  CenterContactInput,
  CreateCenterInput,
  CreateGroupInput,
  CreateInstructorInput,
  CreateStudentInput,
  EditCenterContactInput,
  EditCenterInput,
  EditGroupInput,
  EditInstructorInput,
  EditStudentContactInput,
  EditStudentInput,
  MutationCreateAreaArgs,
  MutationSetActiveCenterArgs,
  MutationSetStatusInstructorArgs,
  MutationSetStatusStudentArgs,
  StudentContactInput,
} from "../types.ts";

export function checkNotNull(
  args:
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
    | EditInstructorInput
    | CreateStudentInput
    | EditStudentInput
    | StudentContactInput
    | EditStudentContactInput,
): void {
  if (Object.values(args).some((item) => item === null)) {
    throw new Error("Fields cannot be null");
  }
}
