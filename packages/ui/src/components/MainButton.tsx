import styled from "@emotion/styled";
import { FC } from "react";
import { colors, styles } from "../theme";

const MButton: FC<{
  color?: string;
  backColor?: string;
  text: string;
  Click: () => void;
}> = ({ text, Click, color, backColor }) => {
  return (
    <MainButton color={color} backColor={backColor} onClick={Click}>
      <styles.BoldP4>{text}</styles.BoldP4>
    </MainButton>
  );
};

const MainButton = styled.button<{ color?: string; backColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  ${(props) =>
    props.color
      ? `
        color: ${props.color};
    `
      : `
        color: ${colors.colors.white};
    `}
  ${(props) =>
    props.backColor
      ? `
        background-color: ${props.backColor};
    `
      : `
        background-color: ${colors.colors.blackBackground};
    `}
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
