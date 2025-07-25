export const calcLeftDay = (
  lateDate: Date | string,
  earlyDate: Date | string = new Date(),
) => {
  return Math.floor(
    (new Date(lateDate).getTime() - new Date(earlyDate).getTime()) /
      1000 /
      24 /
      60 /
      60,
  );
};
