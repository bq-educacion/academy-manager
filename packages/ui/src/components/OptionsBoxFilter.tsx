import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";
import InputSuper from "./InputSuper";

type Option = {
  label: string;
  key: string;
};
const OptionsBoxFilter: FC<{
  options: Option[];
  title: string;
  results: string[];
  setResults: (results: string[]) => void;
  notOther?: boolean;
}> = ({ options, title, setResults, results, notOther }) => {
  const t = useTranslate();
  const [localOptions, setLocalOptions] = useState<Option[]>(options);
  const [newInput, setNewInput] = useState<string>("");
  const [clickOther, setClickOther] = useState<boolean>(false);

  return (
    <ContentDiv>
      <TitleDiv>
        <styles.BoldP4>{title}</styles.BoldP4>
      </TitleDiv>
      {localOptions.map((option) => (
        <InsideDiv>
          <styles.P4>{t(option.label)}</styles.P4>
          <CheckBox
            option={results.some((elem) => elem === option.key)}
            setOption={() => {
              const newResults = results.includes(option.key)
                ? results.filter((elem) => elem !== option.key)
                : [...results, option.key];
              setResults(newResults);
            }}
          />
        </InsideDiv>
      ))}
      {!notOther && (
        <InsideDiv>
          {clickOther ? (
            <InputSuper
              height="30px"
              input={newInput}
              setInput={setNewInput}
              placeholder={t("general.tools.other")}
              onEnter={() => {
                setLocalOptions([
                  ...localOptions,
                  { key: newInput, label: newInput },
                ]);
                setNewInput("");
                setClickOther(false);
              }}
            />
          ) : (
            <OtherP4
              onClick={() => {
                setClickOther(true);
              }}
            >
              {t("general.tools.other")}
            </OtherP4>
          )}
        </InsideDiv>
      )}
    </ContentDiv>
  );
};

export default OptionsBoxFilter;

const OtherP4 = styled(styles.P4)`
  cursor: pointer;
`;

const ContentDiv = styled.div`
  border: solid 1px ${colors.colors.grayBlue};
  border-top: none;
  width: 100%;
  & > * {
    padding: 0 20px;
  }
`;

const TitleDiv = styled.div`
  border-bottom: solid 1px ${colors.colors.grayBlue2};
  height: 40px;
  display: flex;
  align-items: center;
`;

const InsideDiv = styled.div`
  border-bottom: solid 1px ${colors.colors.grayBlue};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
