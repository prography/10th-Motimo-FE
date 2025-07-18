export const calcLeftDay = (
  date: Date | string,
  dueDate: Date | string = new Date(),
) => {
  return Math.floor(
    (new Date(date).getTime() - new Date(dueDate).getTime()) /
      1000 /
      24 /
      60 /
      60,
  );
};
