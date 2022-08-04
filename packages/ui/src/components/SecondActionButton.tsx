import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import { P3 } from "../theme/styles";
import Icon from "./Icon";

const SecondActionButton: FC<{ disable?: boolean }> = ({ disable }) => {
  const disabled = disable ? true : false;
  return (
    <Circle border={true} disable={disabled}>
      <Icon name="bell" />
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
  background-color: ${(props) =>
    props.border ? `${colors.colors.white}` : ""};
  border: ${(props) =>
    props.border ? `1px solid ${colors.colors.grayBlue2}` : "none"};

  & > svg {
    color: ${colors.colors.grayBlue2};
  }
  &:hover {
    border: solid 1px ${colors.colors.gray2};
    cursor: pointer;
    & > svg {
      color: ${colors.colors.gray2};
    }
  }
  ${(props) =>
    props.disable
      ? `
        border: none;
        background-color: ${colors.colors.gray3};
        & > svg {color: ${colors.colors.gray20}}
        &:hover {
            border: none;
            background-color: ${colors.colors.gray3};
            & > svg {color: ${colors.colors.gray20}}
        }
    }
    `
      : ""}
`;

export default SecondActionButton;
