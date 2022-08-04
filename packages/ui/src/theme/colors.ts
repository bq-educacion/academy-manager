export const adjustColorOpacity = (color: string, opacity: number): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
};
const colors = {
  shadow5: adjustColorOpacity("#000000", 0.5),
  shadow1: adjustColorOpacity("#000000", 0.1),

  black: "#4e4f53",
  blackBackground: "#3d3e42",

  white: "#ffffff",
  whiteTransparent: adjustColorOpacity("#f0f0f0", 0.1),

  gray100: "#434242",
  gray80: "#6d6c6c",
  gray70: "#ababab",
  gray60: "#e0e0e0",
  gray40: "#eaeae9",
  gray20: "#f5f5f5",

  gray80Transparent: adjustColorOpacity("#6d6c6c", 0.3),

  grayBlue: "#f2f2f3",
  grayBlue2: "#6e7077",
  grayBlueTransparent: adjustColorOpacity("#f2f2f3", 0.5),
  gray: "#ccc",
  gray2: "#bdbec2",
  gray3: "#d7d8da",

  orange100: "#db4501",
  orange80: "#fe5000",
  orange60: "#fe7333",
  orange40: "#fea77f",

  yellow100: "#d18800",
  yellow80: "#f6a001",
  yellow60: "#f8b333",
  yellow40: "#facf7f",

  purple100: "#56195e",
  purple80: "#6d2077",
  purple60: "#8a4d92",
  purple40: "#b68fbb",

  red100: "#bf0226",
  red80: "#e4002b",
  red60: "#ff1842",
  red40: "#ff5776",

  green100: "#688a2f",
  green80: "#82ad3a",
  green60: "#9bbd61",
  green40: "#bfd69c",

  blue100: "#37948c",
  blue80: "#44b8af",
  blue60: "#69c6bf",
  blue40: "#a1dbd7",

  blue1: "#3db8b0",

  brown100: "#8f7561",
  brown80: "#b29279",
  brown60: "#c1a894",
  brown40: "#d8c8bc",
};
const gradient = {
  rainbow:
    "linear-gradient(to right, #44b8af, #f6a001 33%, #e4002b 67%, #6d2077)",

  pink100: "linear-gradient(266deg, #56195e, #bf0226)",
  pink80: "linear-gradient(266deg, #6d2077, #e4002b)",
  pink60: "linear-gradient(266deg, #8a4d92, #ff1842)",
  pink40: "linear-gradient(266deg, #b68fbb, #ff5776)",

  orange100: "linear-gradient(266deg, #ff1842, #fe5000)",
  orange80: "linear-gradient(266deg, #ff4768, #ff7333)",
  orange60: "linear-gradient(266deg, #ff758e, #ff9666)",
  orange40: "linear-gradient(266deg, #ffc8d2, #ffd6c2)",

  yellow100: "linear-gradient(266deg, #db4501, #d18800)",
  yellow80: "linear-gradient(266deg, #fe5000, #f6a001)",
  yellow60: "linear-gradient(266deg, #fe7333, #f8b333)",
  yellow40: "linear-gradient(266deg, #fea77f, #facf7f)",
};

export default {
  colors,
  gradient,
};
