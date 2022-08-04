import { FC } from "react";
import styled from "@emotion/styled";
import { colors } from "../theme";
import Icon from "./Icon";

const OptionsButton: FC<{ disable?: boolean }> = ({ disable }) => {
  const disabled = disable ? true : false;
  return (
    <Kebabdiv disable={disabled}>
      <Icon name="menu-kebab" />
    </Kebabdiv>
  );
};

const Kebabdiv = styled.div<{ disable: boolean }>`
  color: ${colors.colors.grayBlue2};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 5px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  ${(props) =>
    props.disable &&
    `
        color: ${colors.colors.gray3};
        &:hover {
            color: ${colors.colors.gray3};
        }
    `}
`;

export default OptionsButton;
