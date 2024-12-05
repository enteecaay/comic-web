export const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (isNaN(date.getTime())) {
    throw new RangeError("Invalid time value");
  }
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
