import {
  Availability,
  AvailabilityInput,
  Timetable,
  TimetableInput,
} from "../types.ts";

export const setIdDays = (
  field: TimetableInput[] | AvailabilityInput[],
): Timetable[] | Availability[] => {
  const newField = field.map(
    (field) => {
      const id = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ].indexOf(field.day) + 1;

      return { ...field, id_day: id };
    },
  );
  return newField.sort((a, b) => a.id_day - b.id_day) as
    | Timetable[]
    | Availability[];
};
