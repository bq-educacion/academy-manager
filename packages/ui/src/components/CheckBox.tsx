import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import Icon from "./Icon";

const CheckBox: FC<{
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
    <CheckBoxWrapper
      error={error ? true : false}
      clicked={option}
      onClick={handleClick}
    >
      <Icon name="tick" />
    </CheckBoxWrapper>
  );
};

export default CheckBox;

const CheckBoxWrapper = styled.div<{ clicked: boolean; error?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 3px;
  ${(props) =>
    props.error
      ? `border: solid 1px ${colors.colors.red80};`
      : `border: solid 1px ${colors.colors.gray5};
  background-color: ${colors.colors.white};`}

  ${(props) =>
    props.clicked &&
    `   
        background-color: ${colors.colors.blue80};
        border: solid 1px ${colors.colors.blue80};
    `}

  color: ${colors.colors.white};
`;
