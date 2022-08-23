export const validDate = (
  date: string,
): string => {
  const [d, m, y] = date.split("/");
  if (!d || !m || !y) {
    throw new Error("400, Invalid Date");
  }
  const validDate = new Date(`${y}/${m}/${d}`).toString();
  if (validDate === "Invalid Date") {
    throw new Error("400, Invalid Date");
  }
  return `${d}/${m}/${y}`;
};
