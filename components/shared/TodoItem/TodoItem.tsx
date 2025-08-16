"use client";

import Checkbox from "../Checkbox/Checkbox";

import PlusSvg from "../public/Add_Plus.svg";
import CheckSvg from "../public/check.svg";
interface TodoItemProps {
  /** onMoodClick은 '기록 전' 상태에서의 클릭 이벤트 핸들러. 자세한건 미정*/
  onReportedClick?: () => Promise<void>;
  checked?: boolean;
  onChecked: (prevChecekd: boolean) => Promise<void>;
  title: string;
  reported?: boolean; // 아마 id로 주어질 듯?
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
  onReportedClick,
  checked = false,
  onChecked,
  title,
  reported,
  targetDate,
}: TodoItemProps) => {
  const dateString = buildDateString(targetDate);
  const isLate = targetDate
    ? targetDate.getDate() < new Date().getDate()
    : false;

  return (
    <>
      <div
        className="w-full h-16 pl-2 pr-3 py-2 bg-Color-gray-5 rounded-lg 
       inline-flex justify-start items-center
       gap-2"
      >
        <div className="flex-1 min-w-0 inline-flex flex-col justify-start items-start">
          <label
            className="max-w-full  h-7 py-1 inline-flex justify-start items-center gap-1"
            htmlFor="todoItem"
            onClick={(e) => {
              e.preventDefault();
              // 기획 보니까, 취소는 바로. -> 낙관적 업뎃?
              // 체크는 결과물 제출 바텀 시트 필요?
              onChecked(checked);
            }}
          >
            <Checkbox id="todoItem" readOnly checked={checked} />

            <p
              className={`truncate   justify-start ${checked ? "text-label-assistive" : "text-label-normal"}   text-sm font-medium font-['SUIT_Variable'] leading-tight`}
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
        {reported !== undefined && checked && (
          <div
            className="p-1  relative inline-flex flex-col justify-start items-start"
            onClick={() => {
              /** mood 1이 '기록 전'이라고 가정 */
              if (onReportedClick && !reported) onReportedClick();
            }}
          >
            <Reported reported={reported} />
            {/* <Mood moodId={mood} /> */}
            {/* <div className="w-6 relative inline-flex flex-col justify-start items-start"></div> */}
          </div>
        )}
      </div>
    </>
  );
};

export type { TodoItemProps };
export default TodoItem;

const Reported = ({ reported }: { reported: TodoItemProps["reported"] }) => {
  if (reported)
    return (
      <>
        <div className="self-stretch flex justify-center items-center  h-6 w-6 relative bg-background-primary rounded-[999px] overflow-hidden">
          <div className="w-5 h-5 flex justify-center items-center overflow-hidden text-white">
            <CheckSvg width={20} height={20} />
          </div>
        </div>
      </>
    );
  /** figma에선 기존 check랑 다른 svg를 사용하고 있는데, 따로 관리 귀찮아서 이거로 퉁침 */
  return (
    <div className="self-stretch w-6 h-6 flex justify-center items-center relative bg-background-assistive rounded-full overflow-hidden">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 6.00009L3 12.0001V15.0001L6 15.0001L12 9.00008M9 6.00009L11.1515 3.8486L11.1528 3.84732C11.4489 3.55116 11.5973 3.40282 11.7683 3.34725C11.9189 3.29831 12.0812 3.29831 12.2318 3.34725C12.4027 3.40278 12.5509 3.55095 12.8466 3.84669L14.1515 5.15154C14.4485 5.44855 14.597 5.59713 14.6527 5.76837C14.7016 5.91901 14.7016 6.08127 14.6527 6.2319C14.5971 6.40302 14.4487 6.55137 14.1521 6.84796L14.1515 6.8486L12 9.00008M9 6.00009L12 9.00008"
          stroke="#8A949E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

interface MoodProps {
  moodId: number;
}

// const Mood = ({ moodId }: MoodProps) => {
//   switch (moodId) {
//     case 1:
//       return (
//         <>
//           <NoEmo />
//           <div className="w-3 h-3 left-[15px] top-[-3px] absolute bg-background-strong rounded-[666px]">
//             <PlusSvg width={12} height={12} />
//           </div>
//         </>
//       );
//     case 2:
//       return (
//         <>
//           <SmileEmo />
//         </>
//       );
//     default:
//       return <>{`mood Error`}</>;
//   }
// };
