import { Timetable, TimetableInput } from "../types.ts";

export const setIdTimetable = (
  timetable: TimetableInput[],
): Timetable[] => {
  const newTimetable = timetable.map(
    (time) => {
      const id = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ].indexOf(time.day) + 1;
      return { id_day: id, day: time.day, end: time.end, start: time.start };
    },
  );
  return newTimetable.sort((a, b) => a.id_day - b.id_day);
};
