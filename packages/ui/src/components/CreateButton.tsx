import styled from "@emotion/styled";
import { FC } from "react";
import { colors, styles } from "../theme";

const CButton: FC<{
  text: string;
  Click: () => void;
}> = ({ text, Click }) => {
  return (
    <CreateButton onClick={Click}>
      <styles.BoldP4>{text}</styles.BoldP4>
    </CreateButton>
  );
};

const CreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  color: ${colors.colors.white};
  background-color: ${colors.colors.green80};
  border: none;
  &:hover {
    background-color: ${colors.colors.green60};
    cursor: pointer;
  }
`;

export default CButton;
