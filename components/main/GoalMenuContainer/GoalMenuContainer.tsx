"use client";
import GoalMenu, { GoalMenuProps } from "@/components/shared/GoalMenu/GoalMenu";
import { useGoals } from "@/api/hooks";
import useGoalStore from "@/stores/useGoalStore";
import { useEffect, useState } from "react";

import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import useModal from "@/hooks/useModal";
import ModalAddingGoal from "@/components/shared/Modal/ModalAddingGoal/ModalAddingGoal";

type GoalMenuInfo = Pick<GoalMenuProps, "goal" | "percentage"> & {
  goalId: string;
};
interface GoalMenuContainerProps {
  initGoalsInfo?: GoalMenuInfo[];
  initSelectedGoalInfo?: GoalMenuProps["goal"];
}

const GoalMenuContainer = ({}: GoalMenuContainerProps) => {
  const { data: rawGoalData, mutate } = useGoals();

  // Convert raw goal data to the format expected by the component
  const goalMenuInfoList: GoalMenuInfo[] =
    rawGoalData?.goals?.map((goalInfo) => ({
      goal: goalInfo.title ?? "",
      percentage: goalInfo.progress ?? 0,
      goalId: goalInfo.id ?? "",
    })) ?? [];

  const [selectedGoalIdx, setSelectedGoalIdx] = useState(0);
  const { updateGoalId } = useGoalStore();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    updateGoalId(goalMenuInfoList[selectedGoalIdx]?.goalId ?? null);
  }, [goalMenuInfoList[selectedGoalIdx]?.goalId, updateGoalId]);

  const goalNum = goalMenuInfoList.length;
  return (
    <>
      <div className="w-full p-4 bg-white inline-flex flex-col justify-start items-start gap-3">
        <div className="self-stretch inline-flex justify-between items-center">
          <p className="justify-center text-Color-gray-90 text-lg font-bold font-['SUIT_Variable'] leading-relaxed">
            {`${goalNum}개의 목표`}
          </p>
          <button
            type="button"
            onClick={() =>
              openModal(
                <ModalAddingGoal
                  onClose={closeModal}
                  onAddGoal={async () => {}}
                />,
              )
            }
            className="w-8 h-8 p-1.5 bg-background-normal rounded-[999px] inline-flex justify-center items-center gap-2"
          >
            <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
              <PlusSvg />
            </div>
          </button>
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
