export const mongoSearchRegex = (
  data: string,
) => ({ $regex: data, $options: "i" });

export const advancedMongoSearchRegex = (
  field: string,
  data: string[],
  enumType?: boolean,
) => (
  {
    [field]: mongoSearchRegex(
      enumType ? `^(${data.join("|")})$` : data.join("|"),
    ),
  }
);
