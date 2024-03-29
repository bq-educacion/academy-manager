import styled from "@emotion/styled";
import React, { memo, FC } from "react";
import {
  Add,
  Bell,
  ClosePannel,
  Lens,
  MenuKebab,
  OrderDown,
  OrderUp,
  Triangle,
  OrderNon,
  CloseCross,
  Tick,
  User,
  Eliminate,
  Map,
  Direction,
  CrossBad,
  Alert,
  External,
  Interrogation,
} from "../assets/icons";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    case "add":
      return <Add {...rest} />;
    case "order-up":
      return <OrderUp {...rest} />;
    case "order-down":
      return <OrderDown {...rest} />;
    case "order-non":
      return <OrderNon {...rest} />;
    case "close-cross":
      return <CloseCross {...rest} />;
    case "tick":
      return <Tick {...rest} />;
    case "user":
      return <User {...rest} />;
    case "eliminate":
      return <Eliminate {...rest} />;
    case "map":
      return <Map {...rest} />;
    case "direction":
      return <Direction {...rest} />;
    case "cross-bad":
      return <CrossBad {...rest} />;
    case "alert":
      return <Alert {...rest} />;
    case "external":
      return <External {...rest} />;
    case "interrogation":
      return <Interrogation {...rest} />;
    default:
      // eslint-disable-next-line no-console
      console.warn("Icon not found");
      return null;
  }
};

const Icon: FC<IIconProps> = ({ ...props }) => <StyledIcon {...props} />;

const StyledIcon = styled(IconSVG)<{ negative?: boolean }>`
  color: ${(props) => (props.negative ? colors.colors.white : "inherit")};
`;

export default memo(Icon);
