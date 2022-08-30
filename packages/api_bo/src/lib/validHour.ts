import { Timetable } from "../types.ts";

export const validHour = (
  hours: Timetable[],
): void => {
  hours.forEach((hour) => {
    const exp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (
      !exp.test(hour.start) || !exp.test(hour.end)
    ) {
      throw new Error("400, Invalid hour");
    }
  });
};
