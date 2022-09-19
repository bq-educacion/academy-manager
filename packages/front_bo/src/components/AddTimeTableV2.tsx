import {
  CheckBox,
  colors,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { Days, TimetableInput } from "../generated/graphql";

const AddTimeTableV2: FC<{
  timeTableOnChange: TimetableInput[];
  setTimeTable: (data: TimetableInput[]) => void;
  checkErrors: (result: boolean) => void;
}> = ({ setTimeTable, checkErrors, timeTableOnChange }) => {
  const t = useTranslate();
  const [monday, setMonday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Monday) || undefined
  );
  const [tuesday, setTuesday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Tuesday) || undefined
  );
  const [wednesday, setWednesday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Wednesday) || undefined
  );
  const [thursday, setThursday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Thursday) || undefined
  );
  const [friday, setFriday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Friday) || undefined
  );
  const [saturday, setSaturday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Saturday) || undefined
  );
  const [sunday, setSunday] = useState<TimetableInput | undefined>(
    timeTableOnChange.find((e) => e.day === Days.Sunday) || undefined
  );

  useEffect(() => {
    const days: TimetableInput[] = [];
    {
      monday && days.push(monday);
    }
    {
      tuesday && days.push(tuesday);
    }
    {
      wednesday && days.push(wednesday);
    }
    {
      thursday && days.push(thursday);
    }
    {
      friday && days.push(friday);
    }
    {
      saturday && days.push(saturday);
    }
    {
      sunday && days.push(sunday);
    }
    setTimeTable(days);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  const [errorMondayStart, setErrorMondayStart] = useState<boolean>(false);
  const [errorMondayEnd, setErrorMondayEnd] = useState<boolean>(false);
  const [errorTuesdayStart, setErrorTuesdayStart] = useState<boolean>(false);
  const [errorTuesdayEnd, setErrorTuesdayEnd] = useState<boolean>(false);
  const [errorWednesdayStart, setErrorWednesdayStart] =
    useState<boolean>(false);
  const [errorWednesdayEnd, setErrorWednesdayEnd] = useState<boolean>(false);
  const [errorThursdayStart, setErrorThursdayStart] = useState<boolean>(false);
  const [errorThursdayEnd, setErrorThursdayEnd] = useState<boolean>(false);
  const [errorFridayStart, setErrorFridayStart] = useState<boolean>(false);
  const [errorFridayEnd, setErrorFridayEnd] = useState<boolean>(false);
  const [errorSaturdayStart, setErrorSaturdayStart] = useState<boolean>(false);
  const [errorSaturdayEnd, setErrorSaturdayEnd] = useState<boolean>(false);
  const [errorSundayStart, setErrorSundayStart] = useState<boolean>(false);
  const [errorSundayEnd, setErrorSundayEnd] = useState<boolean>(false);

  useEffect(() => {
    checkErrors(
      errorMondayStart ||
        errorMondayEnd ||
        errorTuesdayStart ||
        errorTuesdayEnd ||
        errorWednesdayStart ||
        errorWednesdayEnd ||
        errorThursdayStart ||
        errorThursdayEnd ||
        errorFridayStart ||
        errorFridayEnd ||
        errorSaturdayStart ||
        errorSaturdayEnd ||
        errorSundayStart ||
        errorSundayEnd
    );
  }, [
    errorMondayStart,
    errorMondayEnd,
    errorTuesdayStart,
    errorTuesdayEnd,
    errorWednesdayStart,
    errorWednesdayEnd,
    errorThursdayStart,
    errorThursdayEnd,
    errorFridayStart,
    errorFridayEnd,
    errorSaturdayStart,
    errorSaturdayEnd,
    errorSundayStart,
    errorSundayEnd,
  ]);

  return (
    <GridEnclouser>
      <HeadDiv>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.day")}
        </styles.BoldP4>
      </HeadDiv>
      <HeadDiv2>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.start-time")}
        </styles.BoldP4>
      </HeadDiv2>
      <HeadDiv2>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.end-time")}
        </styles.BoldP4>
      </HeadDiv2>
      <DayDiv>
        <CheckBox
          option={monday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setMonday({
                day: Days.Monday,
                start: monday ? monday.start : "",
                end: monday ? monday.end : "",
              });
            } else {
              setMonday(undefined);
            }
          }}
        />
        <styles.P4>{t("components.create-group.2.subtitle.monday")}</styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorMondayStart}
          setError={setErrorMondayStart}
          setValid={setErrorMondayStart}
          timePattern
          disabled={!monday}
          input={monday ? monday.start : ""}
          setInput={(elem) => {
            if (monday) {
              setMonday({
                day: Days.Monday,
                start: elem,
                end: monday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorMondayEnd}
          setError={setErrorMondayEnd}
          setValid={setErrorMondayEnd}
          timePattern
          disabled={!monday}
          input={monday ? monday.end : ""}
          setInput={(elem) => {
            if (monday) {
              setMonday({
                day: Days.Monday,
                start: monday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={tuesday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setTuesday({
                day: Days.Tuesday,
                start: tuesday ? tuesday.start : "",
                end: tuesday ? tuesday.end : "",
              });
            } else {
              setTuesday(undefined);
            }
          }}
        />
        <styles.P4>{t("components.create-group.2.subtitle.tuesday")}</styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorTuesdayStart}
          setError={setErrorTuesdayStart}
          setValid={setErrorTuesdayStart}
          timePattern
          disabled={!tuesday}
          input={tuesday ? tuesday.start : ""}
          setInput={(elem) => {
            if (tuesday) {
              setTuesday({
                day: Days.Tuesday,
                start: elem,
                end: tuesday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorTuesdayEnd}
          setError={setErrorTuesdayEnd}
          setValid={setErrorTuesdayEnd}
          timePattern
          disabled={!tuesday}
          input={tuesday ? tuesday.end : ""}
          setInput={(elem) => {
            if (tuesday) {
              setTuesday({
                day: Days.Tuesday,
                start: tuesday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={wednesday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setWednesday({
                day: Days.Wednesday,
                start: wednesday ? wednesday.start : "",
                end: wednesday ? wednesday.end : "",
              });
            } else {
              setWednesday(undefined);
            }
          }}
        />
        <styles.P4>
          {t("components.create-group.2.subtitle.wednesday")}
        </styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorWednesdayStart}
          setError={setErrorWednesdayStart}
          setValid={setErrorWednesdayStart}
          timePattern
          disabled={!wednesday}
          input={wednesday ? wednesday.start : ""}
          setInput={(elem) => {
            if (wednesday) {
              setWednesday({
                day: Days.Wednesday,
                start: elem,
                end: wednesday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorWednesdayEnd}
          setError={setErrorWednesdayEnd}
          setValid={setErrorWednesdayEnd}
          timePattern
          disabled={!wednesday}
          input={wednesday ? wednesday.end : ""}
          setInput={(elem) => {
            if (wednesday) {
              setWednesday({
                day: Days.Wednesday,
                start: wednesday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={thursday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setThursday({
                day: Days.Thursday,
                start: thursday ? thursday.start : "",
                end: thursday ? thursday.end : "",
              });
            } else {
              setThursday(undefined);
            }
          }}
        />
        <styles.P4>
          {t("components.create-group.2.subtitle.thursday")}
        </styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorThursdayStart}
          setError={setErrorThursdayStart}
          setValid={setErrorThursdayStart}
          timePattern
          disabled={!thursday}
          input={thursday ? thursday.start : ""}
          setInput={(elem) => {
            if (thursday) {
              setThursday({
                day: Days.Thursday,
                start: elem,
                end: thursday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorThursdayEnd}
          setError={setErrorThursdayEnd}
          setValid={setErrorThursdayEnd}
          timePattern
          disabled={!thursday}
          input={thursday ? thursday.end : ""}
          setInput={(elem) => {
            if (thursday) {
              setThursday({
                day: Days.Thursday,
                start: thursday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={friday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setFriday({
                day: Days.Friday,
                start: friday ? friday.start : "",
                end: friday ? friday.end : "",
              });
            } else {
              setFriday(undefined);
            }
          }}
        />
        <styles.P4>{t("components.create-group.2.subtitle.friday")}</styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorFridayStart}
          setError={setErrorFridayStart}
          setValid={setErrorFridayStart}
          timePattern
          disabled={!friday}
          input={friday ? friday.start : ""}
          setInput={(elem) => {
            if (friday) {
              setFriday({
                day: Days.Friday,
                start: elem,
                end: friday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorFridayEnd}
          setError={setErrorFridayEnd}
          setValid={setErrorFridayEnd}
          timePattern
          disabled={!friday}
          input={friday ? friday.end : ""}
          setInput={(elem) => {
            if (friday) {
              setFriday({
                day: Days.Friday,
                start: friday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={saturday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setSaturday({
                day: Days.Saturday,
                start: saturday ? saturday.start : "",
                end: saturday ? saturday.end : "",
              });
            } else {
              setSaturday(undefined);
            }
          }}
        />
        <styles.P4>
          {t("components.create-group.2.subtitle.saturday")}
        </styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorSaturdayStart}
          setError={setErrorSaturdayStart}
          setValid={setErrorSaturdayStart}
          timePattern
          disabled={!saturday}
          input={saturday ? saturday.start : ""}
          setInput={(elem) => {
            if (saturday) {
              setSaturday({
                day: Days.Saturday,
                start: elem,
                end: saturday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorSaturdayEnd}
          setError={setErrorSaturdayEnd}
          setValid={setErrorSaturdayEnd}
          timePattern
          disabled={!saturday}
          input={saturday ? saturday.end : ""}
          setInput={(elem) => {
            if (saturday) {
              setSaturday({
                day: Days.Saturday,
                start: saturday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
      <DayDiv>
        <CheckBox
          option={sunday ? true : false}
          setOption={(elem) => {
            if (elem) {
              setSunday({
                day: Days.Sunday,
                start: sunday ? sunday.start : "",
                end: sunday ? sunday.end : "",
              });
            } else {
              setSunday(undefined);
            }
          }}
        />
        <styles.P4>{t("components.create-group.2.subtitle.sunday")}</styles.P4>
      </DayDiv>
      <InputDiv>
        <InputSuper
          error={errorSundayStart}
          setError={setErrorSundayStart}
          setValid={setErrorSundayStart}
          timePattern
          disabled={!sunday}
          input={sunday ? sunday.start : ""}
          setInput={(elem) => {
            if (sunday) {
              setSunday({
                day: Days.Sunday,
                start: elem,
                end: sunday.end,
              });
            }
          }}
          placeholder={t(
            "components.create-group.2.subtitle.placeholder-start"
          )}
        />
      </InputDiv>
      <InputDiv2>
        <InputSuper
          error={errorSundayEnd}
          setError={setErrorSundayEnd}
          setValid={setErrorSundayEnd}
          timePattern
          disabled={!sunday}
          input={sunday ? sunday.end : ""}
          setInput={(elem) => {
            if (sunday) {
              setSunday({
                day: Days.Sunday,
                start: sunday.start,
                end: elem,
              });
            }
          }}
          placeholder={t("components.create-group.2.subtitle.placeholder-end")}
        />
      </InputDiv2>
    </GridEnclouser>
  );
};

export default AddTimeTableV2;

const HeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 36px;
  height: 40px;
  border-bottom: solid 1px ${colors.colors.grayBlue2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeadDiv2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  height: 40px;
  border-bottom: solid 1px ${colors.colors.grayBlue2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GridEnclouser = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 160px 150px 1fr;
`;
const DayDiv = styled.div`
  display: flex;
  height: 60px;
  width: 124px;
  padding-left: 36px;
  align-items: center;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  border-right: solid 1px ${colors.colors.grayBlue};
  & > p {
    margin-left: 10px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 60px;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  border-right: solid 1px ${colors.colors.grayBlue};
  & > input {
    width: 90px;
  }
`;

const InputDiv2 = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 60px;
  border-bottom: solid 1px ${colors.colors.grayBlue};
  & > input {
    width: 90px;
  }
`;
