import styled from "@emotion/styled";
import { FC } from "react";
import { colors, styles } from "../theme";

const Button: FC<{
  text: string;
  onClick: () => void;
  secondary?: boolean;
  create?: boolean;
  main?: boolean;
  deleteRed?: boolean;
  disabled?: boolean;
}> = ({ text, onClick, main, secondary, create, deleteRed, disabled }) => {
  return (
    <>
      {main && !disabled && (
        <MainButton onClick={onClick}>
          <styles.BoldP4>{text}</styles.BoldP4>
        </MainButton>
      )}
      {secondary && !disabled && (
        <SecondaryButton onClick={onClick}>
          <styles.BoldP4>{text}</styles.BoldP4>
        </SecondaryButton>
      )}
      {create && !disabled && (
        <CreateButton onClick={onClick}>
          <styles.BoldP4>{text}</styles.BoldP4>
        </CreateButton>
      )}
      {deleteRed && !disabled && (
        <DeleteButton onClick={onClick}>
          <styles.BoldP4>{text}</styles.BoldP4>
        </DeleteButton>
      )}
      {disabled && (
        <DisabledButton onClick={onClick}>
          <styles.BoldP4>{text}</styles.BoldP4>
        </DisabledButton>
      )}
    </>
  );
};

const DisabledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  color: ${colors.colors.gray2};
  background-color: ${colors.colors.gray20};
  border: none;
  pointer-events: none;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  color: ${colors.colors.white};
  background-color: ${colors.colors.red80};
  border: none;
  &:hover {
    background-color: ${colors.colors.red2};
    cursor: pointer;
  }
`;

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

const MainButton = styled.button<{ color?: string; backColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  padding: 0 20px;
  height: 40px;
  border-radius: 4px;
  color: ${colors.colors.white};
  background-color: ${colors.colors.blackBackground};
  border: none;
  &:hover {
    background-color: ${colors.colors.grayBlue2};
    cursor: pointer;
  }
`;

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

export default Button;
