import styled from "@emotion/styled";
import { FC } from "react";
import { colors } from "../theme";
import { ImageLogoGoogle } from "../assets/images";

const GoogleButton: FC = () => {
  return (
    <GButton>
      <ImageLogoGoogle />
    </GButton>
  );
};

const GButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 191px;
  height: 40px;
  border: solid 1px ${colors.colors.blackBackground};
  border-radius: 4px;
  background-color: ${colors.colors.white};

  &:hover {
    border: solid 1px ${colors.colors.grayBlue};
  }
`;

export default GoogleButton;
