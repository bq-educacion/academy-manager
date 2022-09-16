import {
  CenterContactInput,
  CreateCenterInput,
  EditCenterContactInput,
  EditCenterInput,
  MutationAddStudentContactArgs,
  MutationCreateAreaArgs,
  MutationCreateGroupArgs,
  MutationCreateInstructorArgs,
  MutationCreateStudentArgs,
  MutationEditGroupArgs,
  MutationEditInstructorArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  MutationSetActiveCenterArgs,
  MutationSetStatusInstructorArgs,
  MutationSetStatusStudentArgs,
} from "../types.ts";

export function checkNotNull(
  args:
    | MutationCreateGroupArgs
    | MutationCreateInstructorArgs
    | MutationCreateStudentArgs
    | MutationEditGroupArgs
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
    | EditCenterContactInput,
): void {
  if (Object.values(args).some((item) => item === null)) {
    throw new Error("Fields cannot be null");
  }
}
