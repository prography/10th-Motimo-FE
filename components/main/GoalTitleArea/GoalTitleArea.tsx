"use client";
import RightArrowSvg from "@/public/images/Chevron_Right_MD.svg";
import Link from "next/link";

interface GoalTitleAreaProps {
  goalTitle: string;
  goalId: string;
}

const GoalTitleArea = ({ goalTitle, goalId }: GoalTitleAreaProps) => {
  return (
    <>
      <div className="self-stretch h-10 inline-flex justify-start items-center gap-2">
        <p className="flex-1 justify-center text-label-strong text-lg font-bold font-['SUIT_Variable'] leading-relaxed">
          {goalTitle}
        </p>
        <Link href={`/details/${goalId}`} className="cursor-pointer">
          <button type="button" className="w-6 h-6 relative overflow-hidden">
            <RightArrowSvg width={24} height={24} />
          </button>
        </Link>
      </div>
    </>
  );
};
export default GoalTitleArea;
