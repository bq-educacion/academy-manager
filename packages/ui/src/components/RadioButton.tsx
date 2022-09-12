import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const RadioButton: FC<{
  option: boolean;
  setOption: (option: boolean) => void;
  error?: boolean;
  setError?: (error: boolean) => void;
}> = ({ setOption, option, error, setError }) => {
  const handleClick = () => {
    setOption(!option);
    {
      setError && setError(false);
    }
  };
  return (
    <RadioButtonWrapper
      error={error ? true : false}
      clicked={option}
      onClick={handleClick}
    >
      {option && <Selected />}
    </RadioButtonWrapper>
  );
};

export default RadioButton;

const RadioButtonWrapper = styled.div<{ error: boolean; clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) =>
    props.error
      ? `border: solid 1px ${colors.colors.red80};`
      : `border: solid 1px ${colors.colors.gray5};
  background-color: ${colors.colors.white};`}
`;

const Selected = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${colors.colors.blue80};
`;
