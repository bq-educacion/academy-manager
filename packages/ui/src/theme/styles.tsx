import styled from "@emotion/styled";
import fonts from "./fonts";
import colors from "./colors";

export const P0 = styled.p`
  ${fonts.size.small};
`;

export const P0Error = styled(P0)`
  color: ${colors.colors.red2};
`;

export const P1 = styled.p`
  ${fonts.size.huge};
`;

export const BoldP1 = styled(P1)`
  font-weight: bold;
`;

export const P2 = styled.p`
  ${fonts.size.large};
`;

export const BoldP2 = styled(P2)`
  font-weight: bold;
`;

export const P3 = styled.p`
  ${fonts.size.medium};
  font-weight: 500;
`;

export const P4 = styled.p`
  ${fonts.size.normal};
`;

export const BoldP4 = styled(P4)`
  font-weight: bold;
`;

export const PG = styled.p`
  ${fonts.size.giant};
`;

export const A = styled.a`
  ${fonts.size.normal};
  font-weight: bold;
  color: ${colors.colors.gray2};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: ${colors.colors.blue1};
  }
  &:active {
    color: ${colors.colors.blue60};
  }
`;

export const RainbowDivider = styled.div`
  background-image: ${colors.gradient.rainbow};
  width: 100%;
  height: 3px;
`;

export const BlueYellowDivider = styled.div`
  background-image: ${colors.gradient.blueYellow};
  width: 100%;
  height: 3px;
`;

export const OrangeDivider = styled.div`
  background-color: ${colors.colors.yellow80};
  width: 100%;
  height: 3px;
`;

export const RedDivider = styled.div`
  background-color: ${colors.colors.red80};
  width: 100%;
  height: 3px;
`;

export const RedPinkDivider = styled.div`
  background-image: ${colors.gradient.pink80};
  width: 100%;
  height: 3px;
`;

export default {
  P0,
  P1,
  P2,
  P3,
  P4,
  PG,
  A,
  RainbowDivider,
  BoldP1,
  BoldP2,
  BoldP4,
  P0Error,
};
