import styled from "@emotion/styled";
import { FC } from "react";
import { colors, styles } from "../theme";

const SButton: FC<{
  text: string;
  Click: () => void;
}> = ({ text, Click }) => {
  return (
    <SecondaryButton onClick={Click}>
      <styles.BoldP4>{text}</styles.BoldP4>
    </SecondaryButton>
  );
};

const SecondaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  color: ${colors.colors.blackBackground};
  background-color: ${colors.colors.gray60};
  border: none;
  &:hover {
    background-color: ${colors.colors.white};
    cursor: pointer;
    border: solid 1px ${colors.colors.grayBlue2};
    color: ${colors.colors.grayBlue2};
  }
`;

export default SButton;
