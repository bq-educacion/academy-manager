export const mongoSearchRegex = (
  data: string,
) => ({ $regex: data, $options: "i" });

export const advancedMongoSearchRegex = (
  field: string,
  data: string[],
) => (
  { [field]: mongoSearchRegex(data.join("|")) }
);
