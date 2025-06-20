"use client";
import GoalMenu from "@/components/shared/GoalMenu/GoalMenu";
const GoalMenuContainer = () => {
  /** 클릭 이벤트에 따라 fetch해야함. */
  const goalNum = 1;
  return (
    <>
      <div className="w-full p-4 bg-white inline-flex flex-col justify-start items-start gap-3">
        <div className="self-stretch inline-flex justify-start items-center">
          <p className="justify-center text-Color-gray-90 text-lg font-bold font-['SUIT_Variable'] leading-relaxed">
            {`${goalNum}개의 목표`}
          </p>
        </div>
        <GoalMenu
          goal="목표1"
          percentage={0}
          selected
          onSelected={() => {
            console.log("onSelect임");
          }}
        />
      </div>
    </>
  );
};
export default GoalMenuContainer;
