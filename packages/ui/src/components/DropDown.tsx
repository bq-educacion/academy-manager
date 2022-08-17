import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";
import Icon from "./Icon";
import Popover from "./Popover";

const DropDown: FC<{
  width: number;
  titles: string[];
  setSelected: (selected: string[]) => void;
}> = ({ width, titles, setSelected }) => {
  const t = useTranslate();
  const [selected, setSelectedState] = useState<string[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <Popover
      title={
        <InputBox
          onClick={() => {
            setClicked(!clicked);
            setSelected(selected);
          }}
          clicked={clicked}
          width={width}
        >
          <styles.P4>
            {selected.length === 0
              ? t("components.Dropdown.title")
              : selected.join(", ")}
          </styles.P4>
          <Icon name="triangle" />
        </InputBox>
      }
      content={
        <OptionsBox width={width}>
          {titles.map((title) => {
            const [clickedOption, setClickedOption] = useState<boolean>(false);
            useEffect(() => {
              if (clickedOption) {
                {
                  selected.find((elem) => elem == title)
                    ? null
                    : setSelectedState([...selected, title]);
                }
              } else {
                setSelectedState(selected.filter((elem) => elem != title));
              }
            }, [clickedOption]);
            return (
              <OptionBox
                key={title}
                clicked={clickedOption}
                onClick={() => {
                  setClickedOption(!clickedOption);
                }}
              >
                <CheckBox option={clickedOption} setOption={setClickedOption} />
                <styles.P4>{title}</styles.P4>
              </OptionBox>
            );
          })}
        </OptionsBox>
      }
    />
  );
};

export default DropDown;

const OptionBox = styled.div<{ clicked: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 3px 0;
  padding-left: 20px;
  height: 26px;
  & > p {
    margin-left: 10px;
    ${(props) => props.clicked && `font-weight: bold;`}
  }
  &:hover {
    background-color: ${colors.colors.blue2};
  }
`;

const InputBox = styled.div<{ clicked: boolean; width: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  height: 40px;
  width: ${(props) => props.width}px;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray2};
  color: ${colors.colors.grayBlue2};
  cursor: pointer;
  & > svg {
    transform-origin: center;
    transition: transform 0.2s ease-in-out;
    ${(props) => props.clicked && `transform: rotate(-90deg);`}
  }

  &:hover {
    border: solid 1px ${colors.colors.black};
  }
  & > * {
    margin: 0 20px;
  }
`;

const OptionsBox = styled.div<{ width: number }>`
  position: relative;
  left: 20px;
  top: -22px;
  background-color: ${colors.colors.white};
  width: ${(props) => props.width}px;
  height: 150px;
  border: solid 1px ${colors.colors.gray4};
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  border-radius: 3px;
  overflow-y: scroll;
`;
