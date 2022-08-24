import styled from "@emotion/styled";
import { FC } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";

type Option = {
  label: string;
  key: string;
};
const OptionsBox: FC<{
  options: Option[];
  title: string;
  results: string[];
  setResults: (results: string[]) => void;
}> = ({ options, title, setResults, results }) => {
  const t = useTranslate();
  return (
    <ContentDiv>
      <TitleDiv>
        <styles.BoldP4>{title}</styles.BoldP4>
      </TitleDiv>
      {options.map((option) => (
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
    </ContentDiv>
  );
};

export default OptionsBox;

const ContentDiv = styled.div`
  border: solid 1px ${colors.colors.black};
  border-radius: 3px;
  & > * {
    padding: 0 20px;
  }
`;

const TitleDiv = styled.div`
  border-bottom: solid 1px ${colors.colors.black};
  height: 40px;
  display: flex;
  align-items: center;
`;

const InsideDiv = styled.div`
  border: solid 1px ${colors.colors.grayBlue};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
