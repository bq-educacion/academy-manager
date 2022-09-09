import {
  MutationAddCenterContactArgs,
  MutationAddStudentContactArgs,
  MutationCreateAreaArgs,
  MutationCreateCenterArgs,
  MutationCreateGroupArgs,
  MutationCreateInstructorArgs,
  MutationCreateStudentArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactArgs,
  MutationEditGroupArgs,
  MutationEditInstructorArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
  MutationSetActiveCenterArgs,
} from "../types.ts";

export function checkNotNull(
  args:
    | MutationCreateCenterArgs
    | MutationCreateGroupArgs
    | MutationCreateInstructorArgs
    | MutationCreateStudentArgs
    | MutationEditCenterArgs
    | MutationEditCenterContactArgs
    | MutationEditGroupArgs
    | MutationEditInstructorArgs
    | MutationEditStudentArgs
    | MutationEditStudentContactArgs
    | MutationAddCenterContactArgs
    | MutationAddStudentContactArgs
    | MutationSetActiveCenterArgs
    | MutationCreateAreaArgs,
): void {
  if (Object.values(args).some((item) => item === null)) {
    throw new Error("Fields cannot be null");
  }
}
