import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const RadioButton: FC<{
  option: boolean;
  setOption: (option: boolean) => void;
}> = ({ setOption, option }) => {
  const handleClick = () => {
    setOption(!option);
  };
  return (
    <RadioButtonWrapper clicked={option} onClick={handleClick}>
      {option && <Selected />}
    </RadioButtonWrapper>
  );
};

export default RadioButton;

const RadioButtonWrapper = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: solid 1px ${colors.colors.gray5};
  background-color: ${colors.colors.white};
`;

const Selected = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${colors.colors.blue80};
`;
