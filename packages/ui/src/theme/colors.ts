// TODO: Add more colors
const black = "#4e4f53";
const white = "#ffffff";

export const adjustColorOpacity = (color: string, opacity: number): string => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
};

export default {
  black,
  white,
};
