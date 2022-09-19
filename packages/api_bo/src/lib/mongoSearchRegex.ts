export const mongoSearchRegex = (
  data: string,
) => ({ $regex: data, $options: "i" });
