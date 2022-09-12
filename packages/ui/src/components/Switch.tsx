import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const Switch: FC<{
  option: boolean;
  disabled?: boolean;
  setOption: (option: boolean) => void;
}> = ({ setOption, option, disabled }) => {
  const handleClick = () => {
    setOption(!option);
  };
  return (
    <>
      {!disabled && (
        <CheckBoxWrapper clicked={option} onClick={handleClick}>
          <Ball />
        </CheckBoxWrapper>
      )}
      {disabled && (
        <CheckBoxWrapperDisabled>
          <div />
        </CheckBoxWrapperDisabled>
      )}
    </>
  );
};

export default Switch;

const CheckBoxWrapperDisabled = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 40px;
  pointer-events: none;
  border-radius: 20px;
  background-color: ${colors.colors.gray40};
  justify-content: flex-start;
  & > div {
    height: 18px;
    width: 18px;
    border-radius: 20px;
    background-color: ${colors.colors.white};
    border: solid 1px ${colors.colors.gray40};
  }
`;

const CheckBoxWrapper = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  height: 20px;
  width: 40px;
  cursor: pointer;
  border-radius: 20px;
  background-color: ${({ clicked }) =>
    clicked ? colors.colors.blue80 : colors.colors.blue40};
  justify-content: flex-start;
  & > div {
    margin-left: ${({ clicked }) => (clicked ? "20px" : "0px")};
    border: ${({ clicked }) =>
      clicked
        ? `1px solid ${colors.colors.blue80}`
        : `1px solid ${colors.colors.blue40}`};
    transition: all 0.2s ease-in-out;
  }
  transition: all 0.2s ease-in-out;
`;

const Ball = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 20px;
  background-color: ${colors.colors.white};
  border: solid 1px ${colors.colors.blue80};
`;
