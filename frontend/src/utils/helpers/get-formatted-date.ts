export const getFormattedDate = (date: string) => {
  return date.split("T")[0].split("-").reverse().join(".");
};
