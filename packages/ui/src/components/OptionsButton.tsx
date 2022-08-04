import { FC } from "react";
import { MenuKebab } from "@academy-manager/ui/src/assets/icons";
import styled from "@emotion/styled";
import { colors } from "../theme";

const OptionsButton: FC<{ disable?: boolean }> = ({ disable }) => {
  const disabled = disable ? true : false;
  return (
    <Kebabdiv disable={disabled}>
      <MenuKebab />
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
