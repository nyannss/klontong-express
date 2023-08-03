export const isNumeric = (value: any) => !isNaN(Number(value));

export const validateNumericFields = (...fields: any[]) => {
  return fields.some((field) => field && !isNumeric(field));
};
