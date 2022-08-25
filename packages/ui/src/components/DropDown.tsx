import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import CheckBox from "./CheckBox";
import Icon from "./Icon";
import Popover from "./Popover";

type Option = {
  key: string;
  label: string;
};

const DropDown: FC<{
  width: string;
  options: Option[];
  selected: string[];
  disabled?: boolean;
  setSelected: (selected: string[]) => void;
}> = ({ width, options, setSelected, selected, disabled }) => {
  const t = useTranslate();
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <Popover
      title={
        <InputBox
          disabled={disabled ? true : false}
          onClick={() => {
            setClicked(!clicked);
            setSelected(selected);
          }}
          clicked={clicked}
          width={width}
        >
          <styles.P4>
            {selected.length === 0
              ? Number(width.match(/\d/g)?.join("")) > 170
                ? t("components.dropdown.title")
                : "-"
              : selected
                  .map((s) => options.find((op) => op.key === s)?.label)
                  .join(", ")}
          </styles.P4>
          <Icon name="triangle" />
        </InputBox>
      }
      content={
        !disabled && (
          <OptionsBox width={width}>
            {options.length > 0 &&
              options.map((option) => {
                const clicked = selected.includes(option.key);
                return (
                  <OptionBox
                    key={option.key}
                    clicked={clicked}
                    onClick={() =>
                      setSelected(
                        clicked
                          ? selected.filter((elem) => elem !== option.key)
                          : [...selected, option.key]
                      )
                    }
                  >
                    <CheckBox
                      option={clicked}
                      setOption={() =>
                        setSelected(
                          clicked
                            ? selected.filter((elem) => elem != option.key)
                            : [...selected, option.key]
                        )
                      }
                    />
                    <styles.P4>{option.label}</styles.P4>
                  </OptionBox>
                );
              })}
            {options.length === 0 && (
              <NoData>
                <styles.P4>{t("general.no-data")}</styles.P4>
              </NoData>
            )}
          </OptionsBox>
        )
      }
    />
  );
};

export default DropDown;

const NoData = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div<{
  clicked: boolean;
  width: string;
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  height: 40px;
  width: ${(props) => props.width};
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray2};
  color: ${colors.colors.grayBlue2};
  cursor: pointer;
  overflow: scroll;
  ${(props) => props.disabled && `background-color: ${colors.colors.gray2}`};
  & > svg {
    transform-origin: center;
    transition: transform 0.2s ease-in-out;
    ${(props) => props.clicked && `transform: rotate(-90deg);`}
    position: relative;
    right: 10px;
  }

  &:hover {
    border: solid 1px ${colors.colors.black};
  }
  & > p {
    margin: 0 20px;
  }
`;

const OptionsBox = styled.div<{ width: string }>`
  position: relative;
  left: 20px;
  top: -22px;
  background-color: ${colors.colors.white};
  width: ${(props) => props.width};
  max-height: 150px;
  border: solid 1px ${colors.colors.gray4};
  box-shadow: 0 10px 20px 0 ${colors.colors.shadow2};
  border-radius: 3px;
  overflow-y: scroll;
`;

const OptionBox = styled.div<{ clicked: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 3px 0;
  height: 26px;
  & > p {
    margin-left: 10px;
    ${(props) => props.clicked && `font-weight: bold;`}
  }
  & > div {
    margin-left: 22px;
  }
  &:hover {
    background-color: ${colors.colors.blue2};
  }
`;
