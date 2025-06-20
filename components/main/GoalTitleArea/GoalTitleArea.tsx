"use client";
import RightArrowSvg from "@/public/Chevron_Right_MD.svg";

interface GoalTitleAreaProps {
  goalTitle: string;
}

const GoalTitleArea = ({ goalTitle }: GoalTitleAreaProps) => {
  return (
    <>
      <div className="self-stretch h-10 inline-flex justify-start items-center gap-2">
        <p className="flex-1 justify-center text-label-strong text-lg font-bold font-['SUIT_Variable'] leading-relaxed">
          {goalTitle}
        </p>
        <div className="w-6 h-6 relative overflow-hidden">
          <RightArrowSvg width={24} height={24} />
          {/* <div className="w-1 h-2 left-[10px] top-[8px] absolute  outline-[1.50px] outline-offset-[-0.75px] outline-Color-gray-80"></div> */}
        </div>
      </div>
    </>
  );
};
export default GoalTitleArea;
