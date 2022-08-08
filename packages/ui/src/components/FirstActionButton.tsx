import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import Icon from "./Icon";

const FirstActionButton: FC<{ disable?: boolean }> = ({ disable }) => {
  const disabled = disable ? true : false;
  return (
    <Circle border={false} disable={disabled}>
      <Icon name="add" />
    </Circle>
  );
};

const Circle = styled.div<{ border: boolean; disable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px;
  background-color: ${colors.gradient.orange100};

  & > svg {
    color: ${colors.colors.white};
  }
  &:hover {
    cursor: pointer;
    background-color: ${colors.gradient.orange80};
  }
  ${(props) =>
    props.disable
      ? `
        border: none;
        background-color: ${colors.colors.gray3};
        &:hover {
            border: none;
            background-color: ${colors.colors.gray3};
        }
    }
    `
      : ""}
`;

export default FirstActionButton;
