import styled from "@emotion/styled";
import { FC } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";
import Icon from "./Icon";

type Option = {
  label: string;
  key: string;
};
const OptionsBoxOrdered: FC<{
  options: Option[];
  title: JSX.Element;
  results: string[];
  setResults: (results: string[]) => void;
  orderName: boolean;
  setOrderName: (orderName: boolean) => void;
}> = ({ options, title, setResults, results, orderName, setOrderName }) => {
  const t = useTranslate();
  return (
    <ContentDiv>
      <TitleDiv
        onClick={() => {
          setOrderName(!orderName);
        }}
      >
        <Icon name={orderName ? "order-down" : "order-up"} />
      </TitleDiv>
      <TitleDiv>{title}</TitleDiv>
      {options
        .map((option) => (
          <>
            <InsideDiv>
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
            <InsideDiv>
              <styles.P4>{t(option.label)}</styles.P4>
            </InsideDiv>
          </>
        ))
        .sort(() => {
          if (orderName) {
            return -1;
          }
          return 1;
        })}
    </ContentDiv>
  );
};

export default OptionsBoxOrdered;

const ContentDiv = styled.div`
  display: grid;
  grid-template-columns: 60px 330px;
  border: solid 1px ${colors.colors.black};
  border-radius: 3px;
  & > * {
    padding: 0 20px;
  }
  max-height: 330px;
  overflow-y: scroll;
`;

const TitleDiv = styled.div`
  border-left: solid 1px ${colors.colors.grayBlue};
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
