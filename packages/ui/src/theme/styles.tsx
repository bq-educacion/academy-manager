import styled from "@emotion/styled";
import fonts from "./fonts";
import colors from "./colors";

export const P1 = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.huge};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${colors.colors.black};
`

export const P2 = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.large};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${colors.colors.black};
`

export const P3 = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.medium};
  font-weight: 500;
  color: ${colors.colors.black};
`

export const P4 = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.normal}; 
  font-weight: bold;
  color: ${colors.colors.black};
`;

export const PG = styled.p`
  ${fonts.family.roboto};
  ${fonts.size.giant};
  color: ${colors.colors.black};
`

export const A = styled.a`
  ${fonts.family.roboto};
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
`

export const RainbowDivider = styled.div`
    background-image: ${colors.gradient.rainbow};
    width: 100%;
    height: 1px;
`