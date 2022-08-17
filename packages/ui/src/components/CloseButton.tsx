import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import Icon from "./Icon";

const CloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Circle onClick={onClick}>
      <Icon name="close-cross" />
    </Circle>
  );
};

export default CloseButton;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${colors.colors.gray20};
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
