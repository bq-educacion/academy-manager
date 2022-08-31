import {
  CheckBox,
  InputSuper,
  styles,
  useTranslate,
} from "@academy-manager/ui";
import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { Days, TimetableInput } from "../generated/graphql";

const AddTimeTable: FC<{
  setTimeTable: (data: TimetableInput[]) => void;
}> = ({ setTimeTable }) => {
  const t = useTranslate();
  const [monday, setMonday] = useState<TimetableInput>();
  const [tuesday, setTuesday] = useState<TimetableInput>();
  const [wednesday, setWednesday] = useState<TimetableInput>();
  const [thursday, setThursday] = useState<TimetableInput>();
  const [friday, setFriday] = useState<TimetableInput>();
  const [saturday, setSaturday] = useState<TimetableInput>();
  const [sunday, setSunday] = useState<TimetableInput>();

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
  return (
    <GridEnclouser>
      <div>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.day")}
        </styles.BoldP4>
      </div>
      <div>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.start-time")}
        </styles.BoldP4>
      </div>
      <div>
        <styles.BoldP4>
          {t("components.create-group.2.subtitle.end-time")}
        </styles.BoldP4>
      </div>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
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
      <InputDiv>
        <InputSuper
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
      </InputDiv>
    </GridEnclouser>
  );
};

export default AddTimeTable;

const GridEnclouser = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;
`;
const DayDiv = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  & > p {
    margin-left: 10px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  & > input {
    width: 100%;
  }
`;
