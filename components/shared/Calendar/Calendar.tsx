import { useState } from "react";

interface CalendarProps {
  initDate?: Date;
  selected?: Date;
  onChange: (date: Date) => void;
}

/**
 * @param param0
 * @returns
 */
const Calendar = ({
  initDate = new Date(),
  selected,
  onChange,
}: CalendarProps) => {
  const [thisDate, setThisDate] = useState(selected ?? initDate);
  const thisFirstDate = new Date(
    `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-1`,
  );
  const prevLastDate = mutateDate("date", thisFirstDate, -1);
  const nextFirstDate = mutateDate("month", thisFirstDate, +1);
  const thisLastDate = mutateDate("date", nextFirstDate, -1);

  /* 월요일을 0th로. */
  const startIdxOfthisMonth =
    thisFirstDate.getDay() === 0 ? 6 : (thisFirstDate.getDay() % 7) - 1;

  const calendarHeight =
    Math.floor(
      (startIdxOfthisMonth + thisLastDate.getDate() - 1) / WEEK_LENGTH,
    ) + 1;

  const calendarDateSize = WEEK_LENGTH * calendarHeight;

  const prevMonthDates = [...Array(startIdxOfthisMonth)]
    .map((_, idx) => mutateDate("date", prevLastDate, -idx))
    // .map((_, idx) => prevLastDate.getDate() - idx)
    .reverse();
  const thisMonthDates = [...Array(thisLastDate.getDate())].map(
    (value, idx) => {
      return mutateDate("date", thisFirstDate, idx);
      // return idx + 1;
    },
  );

  const nextMonthDates = [
    ...Array(calendarDateSize - prevMonthDates.length - thisMonthDates.length),
  ].map((_, idx) =>
    // idx + 1
    mutateDate("date", nextFirstDate, idx),
  );

  const viewingDates = [
    ...prevMonthDates,
    ...thisMonthDates,
    ...nextMonthDates,
  ];

  return (
    <>
      <div>
        <nav>
          <p>{`${thisDate.getFullYear()}년 ${thisDate.getMonth() + 1}월`}</p>
          <div>
            <button
              onClick={() => {
                setThisDate((prevDate) => mutateDate("month", prevDate, -1));
              }}
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                setThisDate((prevDate) => mutateDate("month", prevDate, +1));
              }}
            >
              {">"}
            </button>
          </div>
        </nav>
        <div className="grid grid-cols-7 text-center">
          {dayOfDate.map((dayString) => (
            <p>{dayString}</p>
          ))}
        </div>
        <section className="grid grid-cols-7 text-center">
          {viewingDates.map((date, idx) => {
            const isDateOnThisMonth =
              startIdxOfthisMonth <= idx &&
              idx < thisMonthDates.length + startIdxOfthisMonth;

            const isSelectedOnThisMonth =
              selected?.getFullYear() === thisDate.getFullYear() &&
              selected.getMonth() === thisDate.getMonth();
            const isSelected =
              isSelectedOnThisMonth &&
              idx === startIdxOfthisMonth + selected.getDate() - 1;

            return (
              <DateItem
                date={date}
                disabled={!isDateOnThisMonth}
                selected={isSelected}
                onClick={onChange}
              />
            );
          })}
        </section>
      </div>
    </>
  );
};
export default Calendar;

interface DateItemProps {
  date: Date;
  disabled: boolean;
  selected: boolean;
  onClick: CalendarProps["onChange"];
}
const DateItem = ({ date, disabled, selected, onClick }: DateItemProps) => {
  return (
    <>
      <button
        onClick={() => onClick(date)}
        type="button"
        disabled={disabled}
        className={`${disabled ? "bg-gray-200" : ""} ${selected ? "bg-amber-700" : ""}`}
      >
        <p>{date.getDate()}</p>
      </button>
    </>
  );
};

/** utils */

const dayOfDate = ["월", "화", "수", "목", "금", "토", "일"];
const WEEK_LENGTH = 7;
const mutateDate = (
  unit: "date" | "month" | "year",
  prevDate: Date,
  delta: number,
) => {
  const newDate = new Date(prevDate);
  switch (unit) {
    case "date":
      newDate.setDate(prevDate.getDate() + delta);
      break;
    case "month":
      newDate.setMonth(prevDate.getMonth() + delta);
      break;
    case "year":
      newDate.setFullYear(prevDate.getFullYear() + delta);
      break;
    default:
      break;
  }

  return newDate;
};
