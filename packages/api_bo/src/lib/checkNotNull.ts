import {
  MutationCreateCenterArgs,
  MutationCreateGroupArgs,
  MutationCreateInstructorArgs,
  MutationEditCenterArgs,
  MutationEditCenterContactArgs,
  MutationEditGroupArgs,
  MutationEditInstructorArgs,
  MutationEditStudentArgs,
  MutationEditStudentContactArgs,
} from "../types.ts";

export function checkNotNullCenter(args: MutationCreateCenterArgs): void {
  if (
    args.email === null || args.notes === null || args.phone === null ||
    args.contacts === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullGroup(args: MutationCreateGroupArgs): void {
  if (args.instructors === null || args.notes === null) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullInstructor(
  args: MutationCreateInstructorArgs,
): void {
  if (
    args.corporateEmail === null || args.notes === null ||
    args.phone === null ||
    args.personalEmail === null || args.knowledge === null ||
    args.languages === null ||
    args.materialsExperience === null ||
    args.platformEducationExperience === null ||
    args.summerAvailability === null || args.urlCV === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditCenter(args: MutationEditCenterArgs): void {
  if (
    args.address === null || args.city === null || args.contacts === null ||
    args.email === null ||
    args.languages === null || args.name === null || args.notes === null ||
    args.phone === null ||
    args.type === null || args.nature === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditCenterContact(
  args: MutationEditCenterContactArgs,
): void {
  if (args.email === null || args.name === null || args.phone === null) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditGroup(args: MutationEditGroupArgs): void {
  if (
    args.center === null || args.instructors === null ||
    args.modality === null ||
    args.name === null || args.notes === null || args.timetable === null ||
    args.type === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditInstructor(
  args: MutationEditInstructorArgs,
): void {
  if (
    args.areas === null || args.availability === null ||
    args.corporateEmail === null ||
    args.geographicalAvailability === null || args.groups === null ||
    args.knowledge === null ||
    args.languages === null || args.materialsExperience === null ||
    args.name === null ||
    args.notes === null || args.personalEmail === null || args.phone === null ||
    args.platformEducationExperience === null ||
    args.previousExperience === null ||
    args.programmingExperience === null || args.state === null ||
    args.summerAvailability === null ||
    args.training === null || args.urlCV === null || args.vehicle === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditStudent(args: MutationEditStudentArgs): void {
  if (
    args.allergies === null || args.birthDate === null ||
    args.collectionPermit === null ||
    args.contacts === null || args.course === null ||
    args.descriptionAllergy === null ||
    args.groups === null || args.imageAuthorisation === null ||
    args.name === null ||
    args.notes === null || args.oldStudent === null ||
    args.registrationDate === null ||
    args.signedMandate === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}

export function checkNotNullEditStudentContact(
  args: MutationEditStudentContactArgs,
): void {
  if (
    args.email === null || args.name === null || args.phone === null ||
    args.send_info === null
  ) {
    throw new Error("400, Fields cannot be null");
  }
}
