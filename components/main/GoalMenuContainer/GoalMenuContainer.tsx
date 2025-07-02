"use client";
import GoalMenu, { GoalMenuProps } from "@/components/shared/GoalMenu/GoalMenu";
import useGoalList from "@/hooks/main/queries/useGoalList";
import useGoalStore from "@/stores/useGoalStore";
import { useEffect, useState } from "react";

type GoalMenuInfo = Pick<GoalMenuProps, "goal" | "percentage"> & {
  goalId: string;
};
interface GoalMenuContainerProps {
  initGoalsInfo?: GoalMenuInfo[];
  initSelectedGoalInfo?: GoalMenuProps["goal"];
}

const GoalMenuContainer = ({}: GoalMenuContainerProps) => {
  const { data: goalMenuInfoList } = useGoalList();
  const [selectedGoalIdx, setSelectedGoalIdx] = useState(0);
  const { updateGoalId } = useGoalStore();

  useEffect(() => {
    updateGoalId(goalMenuInfoList[selectedGoalIdx]?.goalId ?? null);
  }, [selectedGoalIdx]);

  const goalNum = goalMenuInfoList.length;
  return (
    <>
      <div className="w-full p-4 bg-white inline-flex flex-col justify-start items-start gap-3">
        <div className="self-stretch inline-flex justify-start items-center">
          <p className="justify-center text-Color-gray-90 text-lg font-bold font-['SUIT_Variable'] leading-relaxed">
            {`${goalNum}개의 목표`}
          </p>
        </div>
        <div className="flex gap-2 justify-start">
          {goalMenuInfoList.map((goalMenuInfo, idx) => (
            <GoalMenu
              key={goalMenuInfo.goalId}
              goal={goalMenuInfo.goal}
              percentage={goalMenuInfo.percentage}
              selected={idx === selectedGoalIdx}
              onSelected={() => {
                setSelectedGoalIdx(idx);
                // updateGoalId(goalMenuInfo.goalId);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default GoalMenuContainer;

export type { GoalMenuInfo };
