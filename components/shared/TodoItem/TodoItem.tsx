import { useDeferredValue, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import NoEmo from "../public/emotion-none.svg";
import SmileEmo from "../public/emotion-smile.svg";
import Plus from "../public/Add_Plus.svg";
interface TodoItemProps {
  /** onMoodClick은 '기록 전' 상태에서의 클릭 이벤트 핸들러. 자세한건 미정*/
  onMoodClick?: () => void;
  checked?: boolean;
  onChecked: (prevChecekd: boolean) => void;
  title: string;
  mood?: number; // 아마 id로 주어질 듯?
  targetDate?: Date;
}

const chooseDateColor = (isLate: boolean, checked: boolean) => {
  if (isLate) return "text-status-negative";
  if (checked) return "text-label-assistive";
  // 일반 케이스
  return "text-label-normal";
};
const buildDateString = (targetDate?: Date) => {
  if (!targetDate) return "";
  const dateString =
    new Date().getDate() - targetDate.getDate() == 1
      ? `어제`
      : `
  ${targetDate.getFullYear()}.${String(targetDate.getMonth() + 1).padStart(2, "0")}.${String(targetDate.getDate()).padStart(2, "0")}`;
  return dateString;
};

const TodoItem = ({
  onMoodClick,
  checked = false,
  onChecked,
  title,
  mood,
  targetDate,
}: TodoItemProps) => {
  const deferredChecked = useDeferredValue(checked);
  const dateString = buildDateString(targetDate);
  const isLate = targetDate
    ? targetDate.getDate() < new Date().getDate()
    : false;

  return (
    <>
      <div
        className="w-72 h-16 pl-2 pr-3 py-2 bg-Color-gray-5 rounded-lg 
       inline-flex justify-start items-center
       gap-2"
      >
        <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
          <label
            className=" flex-1 self-stretch h-7 py-1 inline-flex justify-start items-center gap-1"
            htmlFor="todoItem"
            onClick={(e) => {
              // 기획 보니까, 취소는 바로. -> 낙관적 업뎃?
              // 체크는 결과물 제출 바텀 시트 필요?
              onChecked(deferredChecked);
            }}
          >
            <Checkbox id="todoItem" readOnly checked={deferredChecked} />

            <p
              className={`truncate flex-1  justify-start ${checked ? "text-label-assistive" : "text-label-normal"}   text-sm font-medium font-['SUIT_Variable'] leading-tight`}
              style={{ lineHeight: "normal" }}
            >
              {title}
            </p>
          </label>

          {targetDate && (
            <div className="flex-1 pl-5 pb-1 inline-flex justify-start items-center gap-2">
              <p
                className={`justify-center ${chooseDateColor(isLate, checked)}  text-xs font-medium font-['SUIT_Variable']  leading-none`}
              >
                {dateString}
              </p>
            </div>
          )}
        </div>
        {mood && (
          <div
            className="w-6  relative inline-flex flex-col justify-start items-start"
            onClick={() => {
              /** mood 1이 '기록 전'이라고 가정 */
              if (onMoodClick && mood === 1) onMoodClick();
            }}
          >
            <Mood moodId={mood} />
            <div className="w-6 relative inline-flex flex-col justify-start items-start"></div>
          </div>
        )}
      </div>
    </>
  );
};
export default TodoItem;

interface MoodProps {
  moodId: number;
}

const Mood = ({ moodId }: MoodProps) => {
  switch (moodId) {
    case 1:
      return (
        <>
          <NoEmo />
          <div className="w-3 h-3 left-[15px] top-[-3px] absolute bg-background-strong rounded-[666px]">
            <Plus />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <SmileEmo />
        </>
      );
    default:
      return <>{`mood Error`}</>;
  }
};
