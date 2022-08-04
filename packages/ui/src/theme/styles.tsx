import styled from "@emotion/styled";
import fonts from "./fonts";
import colors from "./colors";

export const P1 = styled.p`
  ${fonts.size.huge};
  font-weight: bold;
`;

export const P2 = styled.p`
  ${fonts.size.large};
  font-weight: bold;
`;

export const P3 = styled.p`
  ${fonts.size.medium};
  font-weight: 500;
`;

export const P4 = styled.p`
  ${fonts.size.normal};
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
  height: 1px;
`;

export default {
  P1,
  P2,
  P3,
  P4,
  PG,
  A,
  RainbowDivider,
};
