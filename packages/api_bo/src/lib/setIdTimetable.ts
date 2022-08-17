import { Timetable, TimetableInput } from "../types.ts";

export const setIdTimetable = (
  timetable: TimetableInput[],
): Timetable[] => {
  const newTimetable = timetable.map(
    (time) => {
      let id;
      switch (time.day) {
        case "MONDAY":
          id = 1;
          break;
        case "TUESDAY":
          id = 2;
          break;
        case "WEDNESDAY":
          id = 3;
          break;
        case "THURSDAY":
          id = 4;
          break;
        case "FRIDAY":
          id = 5;
          break;
        case "SATURDAY":
          id = 6;
          break;
        case "SUNDAY":
          id = 7;
          break;
        default:
          id = -1;
          break;
      }

      return { id_day: id, day: time.day, end: time.end, start: time.start };
    },
  );
  return newTimetable.sort((a, b) => a.id_day - b.id_day);
};
