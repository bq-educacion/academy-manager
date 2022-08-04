import styled from "@emotion/styled";
import { FC } from "react";
import { colors, fonts } from "../theme";

const UserButton: FC<{ disable?: boolean }> = ({ disable }) => {
  const disabled = disable ? true : false;
  return (
    <Circle border={false} disable={disabled}>
      <PUser>JL</PUser>
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
  background-image: ${colors.gradient.pink80};
  border: ${(props) =>
    props.border ? `1px solid ${colors.colors.grayBlue2}` : "none"};
  &:hover {
    background-image: ${colors.gradient.yellow80};
    cursor: pointer;
  }
  ${(props) =>
    props.disable &&
    `
        border: none;
        background-image: none;
        background-color: ${colors.colors.gray3};
        &:hover {
            background-image: none;
            background-color: ${colors.colors.gray3};
        }
    `}
`;

const PUser = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.medium};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${colors.colors.white};
`;

export default UserButton;
