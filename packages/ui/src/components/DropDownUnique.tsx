import styled from "@emotion/styled";
import { FC, useEffect, useState } from "react";
import { useTranslate } from "../hooks";
import { colors, styles } from "../theme";
import Icon from "./Icon";
import Popover from "./Popover";

type Option = {
  key: string;
  label: string;
};

const DropDownUnique: FC<{
  width: string;
  options: Option[];
  selected?: string;
  setSelected: (selected: string) => void;
  disabled?: boolean;
  error?: boolean;
  setError?: (error: boolean) => void;
}> = ({ width, options, setSelected, selected, disabled, error, setError }) => {
  const t = useTranslate();
  const [clicked, setClicked] = useState<boolean>(false);
  const [localError, setLocalError] = useState<boolean>(error ? true : false);
  useEffect(() => {
    setLocalError(error ? true : false);
  }, [error]);
  return (
    <Popover
      isOpenEx={clicked}
      setIsOpenEx={setClicked}
      title={
        <InputBox
          error={localError}
          disabled={disabled ? true : false}
          onClick={() => {
            setClicked(!clicked);
            setLocalError(false);
            setError && setError(false);
          }}
          clicked={clicked}
          width={width}
        >
          <styles.P4>
            {!selected
              ? Number(width.match(/\d/g)?.join("")) > 170
                ? t("components.dropdown.title")
                : "-"
              : options.find((s) => s.key === selected)?.label}
          </styles.P4>
          <Icon name="triangle" />
        </InputBox>
      }
      content={
        <OptionsBox width={width}>
          {options.length > 0 &&
            options.map((option) => {
              const clicked = selected === option.key;
              return (
                <OptionBox
                  key={option.key}
                  clicked={clicked}
                  onClick={() => {
                    setSelected(option.key);
                    setClicked(false);
                  }}
                >
                  {clicked && <Check name="tick" />}
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
      }
    />
  );
};

export default DropDownUnique;

const OptionBox = styled.div<{ clicked: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding: 3px 20px;
  height: 26px;
  & > p {
    ${(props) => props.clicked && `font-weight: bold;`}
  }
  &:hover {
    background-color: ${colors.colors.blue2};
  }
`;

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
  error: boolean;
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
  overflow-y: hidden;
  ${(props) =>
    props.disabled &&
    `background-color: ${colors.colors.grayBlue}; pointer-events: none; color: ${colors.colors.gray2}`};
  ${(props) =>
    props.error &&
    `border: solid 1px ${colors.colors.red1}; background-color: ${colors.colors.pink1}; color: ${colors.colors.red2}`};
  & > svg {
    transform-origin: center;
    transition: transform 0.2s ease-in-out;
    ${(props) => props.clicked && `transform: rotate(-90deg);`}
    position: relative;
    right: 10px;
  }

  &:hover {
    ${(props) => !props.error && `border: solid 1px ${colors.colors.black};`}
  }
  & > p {
    margin: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

const Check = styled(Icon)`
  color: ${colors.colors.grayBlue2};
`;
