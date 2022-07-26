export const adjustColorOpacity = (color: string, opacity: number): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
};

const black = "#4e4f53";
const blackBackground = "#3d3e42";
const white = "#ffffff";
const whiteTransparent = adjustColorOpacity("#f0f0f0", 0.1);
const grayBlue = "#6e7077";
const grayBlueTransparent = adjustColorOpacity("#f2f2f3", 0.5);
const gray = "#ccc";
const gray2 = "#bdbec2";
const orange = "#fe5000";
const red = "#e4002b";
const purple = "#6d2077";

export default {
  black,
  blackBackground,
  white,
  whiteTransparent,
  grayBlue,
  grayBlueTransparent,
  gray,
  gray2,
  orange,
  red,
  purple
};
