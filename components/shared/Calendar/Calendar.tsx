import { useState } from "react";
import LeftArrow from "../public/Chevron_Left_MD.svg";
import RightArrow from "../public/Chevron_Right_MD.svg";
interface CalendarProps {
  /** selected는 외부에서 주입하는 값. 제어형 컴포넌트 방식. */
  selected?: Date;
  /** 캘린더 날짜 클릭하면, 해당 날짜의 Date 값을 알 수 있다. */
  onChange: (date: Date) => void;
}

const Calendar = ({ selected = new Date(), onChange }: CalendarProps) => {
  const [thisDate, setThisDate] = useState(selected);
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
      <div className="w-80 inline-flex flex-col justify-start items-start gap-4">
        <nav className="justify-between flex w-full">
          <p
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            className=" text-black text-base font-bold font-['SUIT_Variable'] leading-tight"
          >{`${thisDate.getFullYear()}년 ${thisDate.getMonth() + 1}월`}</p>
          <div>
            <button
              className="w-8 h-8 p-2 inline-flex justify-center items-center gap-2"
              onClick={() => {
                setThisDate((prevDate) => mutateDate("month", prevDate, -1));
              }}
            >
              <div className="text-Color-gray-80">
                <LeftArrow />
              </div>
            </button>
            <button
              className="w-8 h-8 p-2 inline-flex justify-center items-center gap-2"
              onClick={() => {
                setThisDate((prevDate) => mutateDate("month", prevDate, +1));
              }}
            >
              <div className="text-Color-gray-80">
                <RightArrow />
              </div>
            </button>
          </div>
        </nav>
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-7 h-5 content-center text-center gap-x-1.5">
            {dayOfDate.map((dayString) => (
              <p className="w-10 text-center  justify-center text-Color-gray-80 text-xs font-medium font-['SUIT_Variable'] leading-none">
                {dayString}
              </p>
            ))}
          </div>
          <section className="grid grid-cols-7 text-center gap-x-1.5 gap-y-2">
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

const chooseTextColor = (selected: boolean, disbaled: boolean) => {
  if (selected) return "text-label-inverse";
  if (disbaled) return "text-label-assistive";

  //normal
  return "text-label-normal";
};

const DateItem = ({ date, disabled, selected, onClick }: DateItemProps) => {
  const buttonColor = selected
    ? "bg-background-primary"
    : "bg-background-normal";
  const textColor = chooseTextColor(selected, disabled);

  return (
    <>
      {/* <button
        
        className={`${disabled ? "bg-gray-200" : ""} ${selected ? "bg-amber-700" : ""}`}
      >
        <p>{date.getDate()}</p>
      </button> */}
      <button
        className={`${buttonColor} w-10 h-10 p-2  rounded-sm inline-flex justify-center items-center gap-2`}
        onClick={() => onClick(date)}
        type="button"
        disabled={disabled}
      >
        <p
          className={`${textColor} flex-1 text-center justify-center  text-xs font-medium font-['SUIT_Variable'] leading-none`}
        >
          {date.getDate()}
        </p>
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
