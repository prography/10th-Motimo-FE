"use client";
import GoalMenu, { GoalMenuProps } from "@/components/shared/GoalMenu/GoalMenu";
import { useGoals } from "@/api/hooks";
import useGoalStore from "@/stores/useGoalStore";
import { useEffect, useState, useRef } from "react";

import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import useModal from "@/hooks/useModal";
import ModalAddingGoal from "@/components/shared/Modal/ModalAddingGoal/ModalAddingGoal";
import { useRouter } from "next/navigation";
import { motion, useMotionValue } from "motion/react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [contentW, setContentW] = useState(0);

  const router = useRouter();
  const x = useMotionValue(0);

  useEffect(() => {
    updateGoalId(goalMenuInfoList[selectedGoalIdx]?.goalId ?? null);
  }, [goalMenuInfoList[selectedGoalIdx]?.goalId, updateGoalId]);

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current && contentRef.current) {
        setContainerW(containerRef.current.offsetWidth);
        setContentW(contentRef.current.scrollWidth);
      }
    };

    updateSizes();
  }, [goalMenuInfoList]);

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
                  onAddGoal={async () => {
                    closeModal();
                    router.push("/adding-goal");
                  }}
                />,
              )
            }
            className="w-8 h-8 p-1.5 bg-background-normal rounded-[999px] inline-flex justify-center items-center gap-2"
          >
            <div className="w-5 h-5 relative overflow-hidden flex justify-center items-center">
              <PlusSvg width={20} height={20} />
            </div>
          </button>
        </div>
        <div
          ref={containerRef}
          className="flex gap-2 w-full justify-start overflow-x-hidden"
        >
          <motion.div
            className="flex gap-2  justify-start w-max"
            drag="x"
            ref={contentRef}
            dragConstraints={{
              left: -(contentW - containerW),
              right: 0,
            }}
            dragElastic={0.1}
            whileDrag={{ cursor: "grabbing" }}
            style={{ x }}
          >
            {goalMenuInfoList.map((goalMenuInfo, idx) => (
              <GoalMenu
                key={goalMenuInfo.goalId}
                goal={goalMenuInfo.goal}
                percentage={
                  // 0과 100을 제외하고 소수점 표기
                  goalMenuInfo.percentage === 0 ||
                  goalMenuInfo.percentage === 100
                    ? goalMenuInfo.percentage
                    : Number(goalMenuInfo.percentage.toFixed(2))
                }
                selected={idx === selectedGoalIdx}
                onSelected={() => {
                  setSelectedGoalIdx(idx);
                  // updateGoalId(goalMenuInfo.goalId);
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default GoalMenuContainer;

export type { GoalMenuInfo };
