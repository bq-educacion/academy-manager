import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import Icon from "./Icon";

const CheckBox: FC<{
  option: boolean;
  setOption: (option: boolean) => void;
}> = ({ setOption, option }) => {
  const handleClick = () => {
    setOption(!option);
  };
  return (
    <CheckBoxWrapper clicked={option} onClick={handleClick}>
      <Icon name="tick" />
    </CheckBoxWrapper>
  );
};

export default CheckBox;

const CheckBoxWrapper = styled.div<{ clicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 3px;
  border: solid 1px ${colors.colors.gray5};
  background-color: ${colors.colors.white};
  ${(props) =>
    props.clicked &&
    `   
        background-color: ${colors.colors.blue80};
        border: solid 1px ${colors.colors.blue80};
    `}

  color: ${colors.colors.white};
`;
