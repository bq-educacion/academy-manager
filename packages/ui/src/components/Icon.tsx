import styled from "@emotion/styled";
import React, { memo, FC } from "react";
import { Bell, ClosePannel, Lens, MenuKebab, Triangle } from "../assets/icons";
import { colors } from "../theme";

export interface IIconProps {
  className?: string;
  name: string;
  negative?: boolean;
}

/**
 * Icon component that renders an svg from a catalog of icons
 */
const IconSVG: FC<IIconProps> = ({ className, name }) => {
  const rest = { className } as any;

  switch (name) {
    case "close-pannel":
      return <ClosePannel {...rest} />;
    case "bell":
      return <Bell {...rest} />;
    case "menu-kebab":
      return <MenuKebab {...rest} />;
    case "lens":
      return <Lens {...rest} />;
    case "triangle":
      return <Triangle {...rest} />;
    default:
      // tslint:disable-next-line:no-console
      console.warn("Icon not found");
      return null;
  }
};

const Icon: FC<IIconProps> = ({ ...props }) => <StyledIcon {...props} />;

const StyledIcon = styled(IconSVG)<{ negative?: boolean }>`
  color: ${(props) => (props.negative ? colors.colors.white : "inherit")};
`;

export default memo(Icon);
