import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";

const MButton: FC<{ width: string; text: string; Click: () => void }> = ({
  width,
  text,
  Click,
}) => {
  return (
    <MainButton width={width} onClick={Click}>
      {text}
    </MainButton>
  );
};

const MainButton = styled.button<{ width: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: 40px;
  border-radius: 4px;
  background-color: ${colors.colors.blackBackground};
  color: ${colors.colors.white};
  border: none;
  &:hover {
    background-color: ${colors.colors.grayBlue2};
    cursor: pointer;
  }
  &:active {
    border: 1px solid ${colors.colors.grayBlue};
  }
`;

export default MButton;
