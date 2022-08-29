import { Timetable } from "../types.ts";

export const validHour = (
  hours: Timetable[],
): void => {
  hours.forEach((hour) => {
    const [start_h, start_m] = hour.start.split(":");
    const [end_h, end_m] = hour.end.split(":");
    if (!start_h || !start_m || !end_h || !end_m) {
      throw new Error("400, Invalid hour");
    }
    if (
      Number(start_h) < 0 || Number(start_h) > 23 || Number(start_m) < 0 ||
      Number(start_m) > 59
    ) {
      throw new Error("400, Invalid hour");
    }
    if (
      Number(end_h) < 0 || Number(end_h) > 23 || Number(end_m) < 0 ||
      Number(end_m) > 59
    ) {
      throw new Error("400, Invalid hour");
    }
  });
};
