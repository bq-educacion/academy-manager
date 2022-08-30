import { Timetable } from "../types.ts";

export const validHour = (
  hours: Timetable[],
): void => {
  hours.forEach((hour) => {
    if (
      hour.start !== `^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$` ||
      hour.end !== `^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`
    ) {
      throw new Error("400, Invalid hour");
    }
  });
};
