import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import Icon from "./Icon";

const FirstActionButton: FC<{ onClick?: () => void; disable?: boolean }> = ({
  disable,
  onClick,
}) => {
  const disabled = disable ? true : false;
  return (
    <Circle onClick={onClick} border={false} disable={disabled}>
      <Icon name="add" />
    </Circle>
  );
};

const Circle = styled.div<{
  border: boolean;
  disable: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: ${colors.gradient.orange100};

  & > svg {
    color: ${colors.colors.white};
  }
  &:hover {
    cursor: pointer;
    background-image: ${colors.gradient.orange80};
  }
  ${(props) =>
    props.disable &&
    `
        pointer-events: none;
        border: none;
        background-image: none;
        background-color: ${colors.colors.gray3};
        &:hover {
            border: none;
            background-image: none;
            background-color: ${colors.colors.gray3};
        }
    }
    `}
`;

export default FirstActionButton;
