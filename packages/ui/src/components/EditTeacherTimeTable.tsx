import { FC, useEffect, useState } from "react";
import { useTranslate } from "../hooks";
import {
  AvailabilityInput,
  Days,
} from "../../../front_bo/src/generated/graphql";
import styled from "@emotion/styled";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";

const EditTeacherTimeTable: FC<{
  setChanges: (changes: boolean) => void;
  time: AvailabilityInput[];
  setTime: (time: AvailabilityInput[]) => void;
}> = ({ time, setTime, setChanges }) => {
  const t = useTranslate();

  const [monday0, setMonday0] = useState<boolean>(false);
  const [monday1, setMonday1] = useState<boolean>(false);
  const [monday2, setMonday2] = useState<boolean>(false);
  const [monday3, setMonday3] = useState<boolean>(false);
  const [monday4, setMonday4] = useState<boolean>(false);
  const [monday5, setMonday5] = useState<boolean>(false);
  const [monday6, setMonday6] = useState<boolean>(false);
  const [monday7, setMonday7] = useState<boolean>(false);
  const [monday8, setMonday8] = useState<boolean>(false);
  const [monday9, setMonday9] = useState<boolean>(false);
  const [monday10, setMonday10] = useState<boolean>(false);
  const [monday11, setMonday11] = useState<boolean>(false);
  const [monday12, setMonday12] = useState<boolean>(false);

  const [tuesday0, setTuesday0] = useState<boolean>(false);
  const [tuesday1, setTuesday1] = useState<boolean>(false);
  const [tuesday2, setTuesday2] = useState<boolean>(false);
  const [tuesday3, setTuesday3] = useState<boolean>(false);
  const [tuesday4, setTuesday4] = useState<boolean>(false);
  const [tuesday5, setTuesday5] = useState<boolean>(false);
  const [tuesday6, setTuesday6] = useState<boolean>(false);
  const [tuesday7, setTuesday7] = useState<boolean>(false);
  const [tuesday8, setTuesday8] = useState<boolean>(false);
  const [tuesday9, setTuesday9] = useState<boolean>(false);
  const [tuesday10, setTuesday10] = useState<boolean>(false);
  const [tuesday11, setTuesday11] = useState<boolean>(false);
  const [tuesday12, setTuesday12] = useState<boolean>(false);

  const [wednesday0, setWednesday0] = useState<boolean>(false);
  const [wednesday1, setWednesday1] = useState<boolean>(false);
  const [wednesday2, setWednesday2] = useState<boolean>(false);
  const [wednesday3, setWednesday3] = useState<boolean>(false);
  const [wednesday4, setWednesday4] = useState<boolean>(false);
  const [wednesday5, setWednesday5] = useState<boolean>(false);
  const [wednesday6, setWednesday6] = useState<boolean>(false);
  const [wednesday7, setWednesday7] = useState<boolean>(false);
  const [wednesday8, setWednesday8] = useState<boolean>(false);
  const [wednesday9, setWednesday9] = useState<boolean>(false);
  const [wednesday10, setWednesday10] = useState<boolean>(false);
  const [wednesday11, setWednesday11] = useState<boolean>(false);
  const [wednesday12, setWednesday12] = useState<boolean>(false);

  const [thursday0, setThursday0] = useState<boolean>(false);
  const [thursday1, setThursday1] = useState<boolean>(false);
  const [thursday2, setThursday2] = useState<boolean>(false);
  const [thursday3, setThursday3] = useState<boolean>(false);
  const [thursday4, setThursday4] = useState<boolean>(false);
  const [thursday5, setThursday5] = useState<boolean>(false);
  const [thursday6, setThursday6] = useState<boolean>(false);
  const [thursday7, setThursday7] = useState<boolean>(false);
  const [thursday8, setThursday8] = useState<boolean>(false);
  const [thursday9, setThursday9] = useState<boolean>(false);
  const [thursday10, setThursday10] = useState<boolean>(false);
  const [thursday11, setThursday11] = useState<boolean>(false);
  const [thursday12, setThursday12] = useState<boolean>(false);

  const [friday0, setfriday0] = useState<boolean>(false);
  const [friday1, setfriday1] = useState<boolean>(false);
  const [friday2, setfriday2] = useState<boolean>(false);
  const [friday3, setfriday3] = useState<boolean>(false);
  const [friday4, setfriday4] = useState<boolean>(false);
  const [friday5, setfriday5] = useState<boolean>(false);
  const [friday6, setfriday6] = useState<boolean>(false);
  const [friday7, setfriday7] = useState<boolean>(false);
  const [friday8, setfriday8] = useState<boolean>(false);
  const [friday9, setfriday9] = useState<boolean>(false);
  const [friday10, setfriday10] = useState<boolean>(false);
  const [friday11, setfriday11] = useState<boolean>(false);
  const [friday12, setfriday12] = useState<boolean>(false);

  const [saturday0, setsaturday0] = useState<boolean>(false);
  const [saturday1, setsaturday1] = useState<boolean>(false);
  const [saturday2, setsaturday2] = useState<boolean>(false);
  const [saturday3, setsaturday3] = useState<boolean>(false);
  const [saturday4, setsaturday4] = useState<boolean>(false);
  const [saturday5, setsaturday5] = useState<boolean>(false);
  const [saturday6, setsaturday6] = useState<boolean>(false);
  const [saturday7, setsaturday7] = useState<boolean>(false);
  const [saturday8, setsaturday8] = useState<boolean>(false);
  const [saturday9, setsaturday9] = useState<boolean>(false);
  const [saturday10, setsaturday10] = useState<boolean>(false);
  const [saturday11, setsaturday11] = useState<boolean>(false);
  const [saturday12, setsaturday12] = useState<boolean>(false);

  const [sunday0, setsunday0] = useState<boolean>(false);
  const [sunday1, setsunday1] = useState<boolean>(false);
  const [sunday2, setsunday2] = useState<boolean>(false);
  const [sunday3, setsunday3] = useState<boolean>(false);
  const [sunday4, setsunday4] = useState<boolean>(false);
  const [sunday5, setsunday5] = useState<boolean>(false);
  const [sunday6, setsunday6] = useState<boolean>(false);
  const [sunday7, setsunday7] = useState<boolean>(false);
  const [sunday8, setsunday8] = useState<boolean>(false);
  const [sunday9, setsunday9] = useState<boolean>(false);
  const [sunday10, setsunday10] = useState<boolean>(false);
  const [sunday11, setsunday11] = useState<boolean>(false);
  const [sunday12, setsunday12] = useState<boolean>(false);

  useEffect(() => {
    setMonday0(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setMonday1(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setMonday2(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("10:00 a 10:59"))
        ? true
        : false
    );
    setMonday3(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("11:00 a 11:59"))
        ? true
        : false
    );
    setMonday4(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("12:00 a 12:59"))
        ? true
        : false
    );
    setMonday5(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("13:00 a 13:59"))
        ? true
        : false
    );
    setMonday6(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("14:00 a 14:59"))
        ? true
        : false
    );
    setMonday7(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("15:00 a 15:59"))
        ? true
        : false
    );
    setMonday8(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("16:00 a 16:59"))
        ? true
        : false
    );
    setMonday9(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("17:00 a 17:59"))
        ? true
        : false
    );
    setMonday10(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("18:00 a 18:59"))
        ? true
        : false
    );
    setMonday11(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("19:00 a 19:59"))
        ? true
        : false
    );
    setMonday12(
      time.find((t) => t.day === "MONDAY" && t.hours.includes("20:00 a 20:59"))
        ? true
        : false
    );
    setTuesday0(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setTuesday1(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setTuesday2(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("10:00 a 10:59"))
        ? true
        : false
    );
    setTuesday3(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("11:00 a 11:59"))
        ? true
        : false
    );
    setTuesday4(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("12:00 a 12:59"))
        ? true
        : false
    );
    setTuesday5(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("13:00 a 13:59"))
        ? true
        : false
    );
    setTuesday6(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("14:00 a 14:59"))
        ? true
        : false
    );
    setTuesday7(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("15:00 a 15:59"))
        ? true
        : false
    );
    setTuesday8(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("16:00 a 16:59"))
        ? true
        : false
    );
    setTuesday9(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("17:00 a 17:59"))
        ? true
        : false
    );
    setTuesday10(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("18:00 a 18:59"))
        ? true
        : false
    );
    setTuesday11(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("19:00 a 19:59"))
        ? true
        : false
    );
    setTuesday12(
      time.find((t) => t.day === "TUESDAY" && t.hours.includes("20:00 a 20:59"))
        ? true
        : false
    );
    setWednesday0(
      time.find((t) => t.day === "WEDNESDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setWednesday1(
      time.find((t) => t.day === "WEDNESDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setWednesday2(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("10:00 a 10:59")
      )
        ? true
        : false
    );
    setWednesday3(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("11:00 a 11:59")
      )
        ? true
        : false
    );
    setWednesday4(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("12:00 a 12:59")
      )
        ? true
        : false
    );
    setWednesday5(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("13:00 a 13:59")
      )
        ? true
        : false
    );
    setWednesday6(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("14:00 a 14:59")
      )
        ? true
        : false
    );
    setWednesday7(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("15:00 a 15:59")
      )
        ? true
        : false
    );
    setWednesday8(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("16:00 a 16:59")
      )
        ? true
        : false
    );
    setWednesday9(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("17:00 a 17:59")
      )
        ? true
        : false
    );
    setWednesday10(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("18:00 a 18:59")
      )
        ? true
        : false
    );
    setWednesday11(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("19:00 a 19:59")
      )
        ? true
        : false
    );
    setWednesday12(
      time.find(
        (t) => t.day === "WEDNESDAY" && t.hours.includes("20:00 a 20:59")
      )
        ? true
        : false
    );
    setThursday0(
      time.find((t) => t.day === "THURSDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setThursday1(
      time.find((t) => t.day === "THURSDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setThursday2(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("10:00 a 10:59")
      )
        ? true
        : false
    );
    setThursday3(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("11:00 a 11:59")
      )
        ? true
        : false
    );
    setThursday4(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("12:00 a 12:59")
      )
        ? true
        : false
    );
    setThursday5(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("13:00 a 13:59")
      )
        ? true
        : false
    );
    setThursday6(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("14:00 a 14:59")
      )
        ? true
        : false
    );
    setThursday7(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("15:00 a 15:59")
      )
        ? true
        : false
    );
    setThursday8(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("16:00 a 16:59")
      )
        ? true
        : false
    );
    setThursday9(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("17:00 a 17:59")
      )
        ? true
        : false
    );
    setThursday10(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("18:00 a 18:59")
      )
        ? true
        : false
    );
    setThursday11(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("19:00 a 19:59")
      )
        ? true
        : false
    );
    setThursday12(
      time.find(
        (t) => t.day === "THURSDAY" && t.hours.includes("20:00 a 20:59")
      )
        ? true
        : false
    );
    setfriday0(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setfriday1(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setfriday2(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("10:00 a 10:59"))
        ? true
        : false
    );
    setfriday3(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("11:00 a 11:59"))
        ? true
        : false
    );
    setfriday4(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("12:00 a 12:59"))
        ? true
        : false
    );
    setfriday5(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("13:00 a 13:59"))
        ? true
        : false
    );
    setfriday6(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("14:00 a 14:59"))
        ? true
        : false
    );
    setfriday7(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("15:00 a 15:59"))
        ? true
        : false
    );
    setfriday8(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("16:00 a 16:59"))
        ? true
        : false
    );
    setfriday9(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("17:00 a 17:59"))
        ? true
        : false
    );
    setfriday10(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("18:00 a 18:59"))
        ? true
        : false
    );
    setfriday11(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("19:00 a 19:59"))
        ? true
        : false
    );
    setfriday12(
      time.find((t) => t.day === "FRIDAY" && t.hours.includes("20:00 a 20:59"))
        ? true
        : false
    );
    setsaturday0(
      time.find((t) => t.day === "SATURDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setsaturday1(
      time.find((t) => t.day === "SATURDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setsaturday2(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("10:00 a 10:59")
      )
        ? true
        : false
    );
    setsaturday3(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("11:00 a 11:59")
      )
        ? true
        : false
    );
    setsaturday4(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("12:00 a 12:59")
      )
        ? true
        : false
    );
    setsaturday5(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("13:00 a 13:59")
      )
        ? true
        : false
    );
    setsaturday6(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("14:00 a 14:59")
      )
        ? true
        : false
    );
    setsaturday7(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("15:00 a 15:59")
      )
        ? true
        : false
    );
    setsaturday8(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("16:00 a 16:59")
      )
        ? true
        : false
    );
    setsaturday9(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("17:00 a 17:59")
      )
        ? true
        : false
    );
    setsaturday10(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("18:00 a 18:59")
      )
        ? true
        : false
    );
    setsaturday11(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("19:00 a 19:59")
      )
        ? true
        : false
    );
    setsaturday12(
      time.find(
        (t) => t.day === "SATURDAY" && t.hours.includes("20:00 a 20:59")
      )
        ? true
        : false
    );
    setsunday0(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("8:00 a 8:59"))
        ? true
        : false
    );
    setsunday1(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("9:00 a 9:59"))
        ? true
        : false
    );
    setsunday2(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("10:00 a 10:59"))
        ? true
        : false
    );
    setsunday3(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("11:00 a 11:59"))
        ? true
        : false
    );
    setsunday4(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("12:00 a 12:59"))
        ? true
        : false
    );
    setsunday5(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("13:00 a 13:59"))
        ? true
        : false
    );
    setsunday6(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("14:00 a 14:59"))
        ? true
        : false
    );
    setsunday7(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("15:00 a 15:59"))
        ? true
        : false
    );
    setsunday8(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("16:00 a 16:59"))
        ? true
        : false
    );
    setsunday9(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("17:00 a 17:59"))
        ? true
        : false
    );
    setsunday10(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("18:00 a 18:59"))
        ? true
        : false
    );

    setsunday11(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("19:00 a 19:59"))
        ? true
        : false
    );
    setsunday12(
      time.find((t) => t.day === "SUNDAY" && t.hours.includes("20:00 a 20:59"))
        ? true
        : false
    );
  }, []);

  useEffect(() => {
    setTime([
      {
        day: Days.Monday,
        hours: [
          monday0 ? "8:00 a 8:59" : "",
          monday1 ? "9:00 a 9:59" : "",
          monday2 ? "10:00 a 10:59" : "",
          monday3 ? "11:00 a 11:59" : "",
          monday4 ? "12:00 a 12:59" : "",
          monday5 ? "13:00 a 13:59" : "",
          monday6 ? "14:00 a 14:59" : "",
          monday7 ? "15:00 a 15:59" : "",
          monday8 ? "16:00 a 16:59" : "",
          monday9 ? "17:00 a 17:59" : "",
          monday10 ? "18:00 a 18:59" : "",
          monday11 ? "19:00 a 19:59" : "",
          monday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Tuesday,
        hours: [
          tuesday0 ? "8:00 a 8:59" : "",
          tuesday1 ? "9:00 a 9:59" : "",
          tuesday2 ? "10:00 a 10:59" : "",
          tuesday3 ? "11:00 a 11:59" : "",
          tuesday4 ? "12:00 a 12:59" : "",
          tuesday5 ? "13:00 a 13:59" : "",
          tuesday6 ? "14:00 a 14:59" : "",
          tuesday7 ? "15:00 a 15:59" : "",
          tuesday8 ? "16:00 a 16:59" : "",
          tuesday9 ? "17:00 a 17:59" : "",
          tuesday10 ? "18:00 a 18:59" : "",
          tuesday11 ? "19:00 a 19:59" : "",
          tuesday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Wednesday,
        hours: [
          wednesday0 ? "8:00 a 8:59" : "",
          wednesday1 ? "9:00 a 9:59" : "",
          wednesday2 ? "10:00 a 10:59" : "",
          wednesday3 ? "11:00 a 11:59" : "",
          wednesday4 ? "12:00 a 12:59" : "",
          wednesday5 ? "13:00 a 13:59" : "",
          wednesday6 ? "14:00 a 14:59" : "",
          wednesday7 ? "15:00 a 15:59" : "",
          wednesday8 ? "16:00 a 16:59" : "",
          wednesday9 ? "17:00 a 17:59" : "",
          wednesday10 ? "18:00 a 18:59" : "",
          wednesday11 ? "19:00 a 19:59" : "",
          wednesday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Thursday,
        hours: [
          thursday0 ? "8:00 a 8:59" : "",
          thursday1 ? "9:00 a 9:59" : "",
          thursday2 ? "10:00 a 10:59" : "",
          thursday3 ? "11:00 a 11:59" : "",
          thursday4 ? "12:00 a 12:59" : "",
          thursday5 ? "13:00 a 13:59" : "",
          thursday6 ? "14:00 a 14:59" : "",
          thursday7 ? "15:00 a 15:59" : "",
          thursday8 ? "16:00 a 16:59" : "",
          thursday9 ? "17:00 a 17:59" : "",
          thursday10 ? "18:00 a 18:59" : "",
          thursday11 ? "19:00 a 19:59" : "",
          thursday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Friday,
        hours: [
          friday0 ? "8:00 a 8:59" : "",
          friday1 ? "9:00 a 9:59" : "",
          friday2 ? "10:00 a 10:59" : "",
          friday3 ? "11:00 a 11:59" : "",
          friday4 ? "12:00 a 12:59" : "",
          friday5 ? "13:00 a 13:59" : "",
          friday6 ? "14:00 a 14:59" : "",
          friday7 ? "15:00 a 15:59" : "",
          friday8 ? "16:00 a 16:59" : "",
          friday9 ? "17:00 a 17:59" : "",
          friday10 ? "18:00 a 18:59" : "",
          friday11 ? "19:00 a 19:59" : "",
          friday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Saturday,
        hours: [
          saturday0 ? "8:00 a 8:59" : "",
          saturday1 ? "9:00 a 9:59" : "",
          saturday2 ? "10:00 a 10:59" : "",
          saturday3 ? "11:00 a 11:59" : "",
          saturday4 ? "12:00 a 12:59" : "",
          saturday5 ? "13:00 a 13:59" : "",
          saturday6 ? "14:00 a 14:59" : "",
          saturday7 ? "15:00 a 15:59" : "",
          saturday8 ? "16:00 a 16:59" : "",
          saturday9 ? "17:00 a 17:59" : "",
          saturday10 ? "18:00 a 18:59" : "",
          saturday11 ? "19:00 a 19:59" : "",
          saturday12 ? "20:00 a 20:59" : "",
        ],
      },
      {
        day: Days.Sunday,
        hours: [
          sunday0 ? "8:00 a 8:59" : "",
          sunday1 ? "9:00 a 9:59" : "",
          sunday2 ? "10:00 a 10:59" : "",
          sunday3 ? "11:00 a 11:59" : "",
          sunday4 ? "12:00 a 12:59" : "",
          sunday5 ? "13:00 a 13:59" : "",
          sunday6 ? "14:00 a 14:59" : "",
          sunday7 ? "15:00 a 15:59" : "",
          sunday8 ? "16:00 a 16:59" : "",
          sunday9 ? "17:00 a 17:59" : "",
          sunday10 ? "18:00 a 18:59" : "",
          sunday11 ? "19:00 a 19:59" : "",
          sunday12 ? "20:00 a 20:59" : "",
        ],
      },
    ]);
  }, [
    monday0,
    monday1,
    monday2,
    monday3,
    monday4,
    monday5,
    monday6,
    monday7,
    monday8,
    monday9,
    monday10,
    monday11,
    monday12,
    tuesday0,
    tuesday1,
    tuesday2,
    tuesday3,
    tuesday4,
    tuesday5,
    tuesday6,
    tuesday7,
    tuesday8,
    tuesday9,
    tuesday10,
    tuesday11,
    tuesday12,
    wednesday0,
    wednesday1,
    wednesday2,
    wednesday3,
    wednesday4,
    wednesday5,
    wednesday6,
    wednesday7,
    wednesday8,
    wednesday9,
    wednesday10,
    wednesday11,
    wednesday12,
    thursday0,
    thursday1,
    thursday2,
    thursday3,
    thursday4,
    thursday5,
    thursday6,
    thursday7,
    thursday8,
    thursday9,
    thursday10,
    thursday11,
    thursday12,
    friday0,
    friday1,
    friday2,
    friday3,
    friday4,
    friday5,
    friday6,
    friday7,
    friday8,
    friday9,
    friday10,
    friday11,
    friday12,
    saturday0,
    saturday1,
    saturday2,
    saturday3,
    saturday4,
    saturday5,
    saturday6,
    saturday7,
    saturday8,
    saturday9,
    saturday10,
    saturday11,
    saturday12,
    sunday0,
    sunday1,
    sunday2,
    sunday3,
    sunday4,
    sunday5,
    sunday6,
    sunday7,
    sunday8,
    sunday9,
    sunday10,
    sunday11,
    sunday12,
  ]);

  return (
    <Content
      onClick={() => {
        setChanges(true);
      }}
    >
      <LeftCell className="topheader" />
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.M")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.T")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.W")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.R")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.F")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.S")}</styles.P4>
      </Cell>
      <Cell className="topheader Left">
        <styles.P4>{t("general.days.U")}</styles.P4>
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.8:00 a 8:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday0} setOption={setMonday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday0} setOption={setTuesday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday0} setOption={setWednesday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday0} setOption={setThursday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday0} setOption={setfriday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday0} setOption={setsaturday0} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday0} setOption={setsunday0} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.9:00 a 9:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday1} setOption={setMonday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday1} setOption={setTuesday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday1} setOption={setWednesday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday1} setOption={setThursday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday1} setOption={setfriday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday1} setOption={setsaturday1} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday1} setOption={setsunday1} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.10:00 a 10:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday2} setOption={setMonday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday2} setOption={setTuesday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday2} setOption={setWednesday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday2} setOption={setThursday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday2} setOption={setfriday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday2} setOption={setsaturday2} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday2} setOption={setsunday2} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.11:00 a 11:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday3} setOption={setMonday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday3} setOption={setTuesday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday3} setOption={setWednesday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday3} setOption={setThursday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday3} setOption={setfriday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday3} setOption={setsaturday3} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday3} setOption={setsunday3} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.12:00 a 12:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday4} setOption={setMonday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday4} setOption={setTuesday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday4} setOption={setWednesday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday4} setOption={setThursday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday4} setOption={setfriday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday4} setOption={setsaturday4} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday4} setOption={setsunday4} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.13:00 a 13:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday5} setOption={setMonday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday5} setOption={setTuesday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday5} setOption={setWednesday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday5} setOption={setThursday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday5} setOption={setfriday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday5} setOption={setsaturday5} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday5} setOption={setsunday5} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.14:00 a 14:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday6} setOption={setMonday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday6} setOption={setTuesday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday6} setOption={setWednesday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday6} setOption={setThursday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday6} setOption={setfriday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday6} setOption={setsaturday6} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday6} setOption={setsunday6} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.15:00 a 15:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday7} setOption={setMonday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday7} setOption={setTuesday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday7} setOption={setWednesday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday7} setOption={setThursday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday7} setOption={setfriday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday7} setOption={setsaturday7} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday7} setOption={setsunday7} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.16:00 a 16:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday8} setOption={setMonday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday8} setOption={setTuesday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday8} setOption={setWednesday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday8} setOption={setThursday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday8} setOption={setfriday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday8} setOption={setsaturday8} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday8} setOption={setsunday8} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.17:00 a 17:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday9} setOption={setMonday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday9} setOption={setTuesday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday9} setOption={setWednesday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday9} setOption={setThursday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday9} setOption={setfriday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday9} setOption={setsaturday9} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday9} setOption={setsunday9} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.18:00 a 18:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday10} setOption={setMonday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday10} setOption={setTuesday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday10} setOption={setWednesday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday10} setOption={setThursday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday10} setOption={setfriday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday10} setOption={setsaturday10} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday10} setOption={setsunday10} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.19:00 a 19:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday11} setOption={setMonday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday11} setOption={setTuesday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday11} setOption={setWednesday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday11} setOption={setThursday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday11} setOption={setfriday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday11} setOption={setsaturday11} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday11} setOption={setsunday11} />
      </Cell>
      <LeftCell className="top">
        <styles.P4>{t("general.times.20:00 a 20:59")}</styles.P4>
      </LeftCell>
      <Cell className="top Left">
        <CheckBox option={monday12} setOption={setMonday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={tuesday12} setOption={setTuesday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={wednesday12} setOption={setWednesday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={thursday12} setOption={setThursday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={friday12} setOption={setfriday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={saturday12} setOption={setsaturday12} />
      </Cell>
      <Cell className="top Left">
        <CheckBox option={sunday12} setOption={setsunday12} />
      </Cell>
    </Content>
  );
};

export default EditTeacherTimeTable;

const Content = styled.div`
  width: 100%;
  display: grid;
  border-top: 1px solid ${colors.colors.grayBlue};
  grid-template-columns: repeat(8, 1fr);
`;
const LeftCell = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 40px;
  border: 1px solid ${colors.colors.grayBlue};
  &.Top {
    border-top: none;
    border-bottom: 1px solid ${colors.colors.gray100};
  }
  border-left: none;
  &.top {
    border-top: none;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 1px solid ${colors.colors.grayBlue};
  &.topheader {
    border-top: none;
    border-bottom: 1px solid ${colors.colors.gray100};
  }
  &.top {
    border-top: none;
  }
  &.Left {
    border-left: none;
  }
  &.Right {
    border-right: none;
  }
  &.Bottom {
    border-bottom: none;
  }
`;
