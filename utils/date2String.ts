const date2StringWithSpliter = (dateValue: Date, spliter: string) => {
  const year = dateValue.getFullYear();
  const month = dateValue.getMonth() + 1;
  const date = dateValue.getDate();
  return `${year}${spliter}${String(month).padStart(2, "0")}${spliter}${String(date).padStart(2, "0")}`;
};
export { date2StringWithSpliter };
