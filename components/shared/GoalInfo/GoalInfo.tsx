import CalendarSvg from "../public/Calendar_Check.svg";
interface GoalInfoProps {
  leftDateNum: number;
  leftTodoNum: number;
}
const GoalInfo = ({ leftDateNum, leftTodoNum }: GoalInfoProps) => {
  // 대충 데이터 패칭 작업?
  // 혹은 밖에서 무한 쿼리 첫 페이지의 메타 데이터 사용할 수도 있음
  return (
    <>
      <div className="w-full min-w-80 h-10 px-3 py-0.5 bg-background-alternative rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex justify-start items-center gap-4">
        <div className="flex justify-start items-center gap-0.5">
          <div className="w-5 h-5 relative overflow-hidden">
            <CalendarSvg />
          </div>
          <div className="flex justify-start items-center">
            <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
              {`D-${leftDateNum}`}
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-0.5">
          <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            {`${leftTodoNum}개`}
          </p>
          <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            {`할 일`}
          </p>
        </div>
      </div>
    </>
  );
};

export default GoalInfo;
