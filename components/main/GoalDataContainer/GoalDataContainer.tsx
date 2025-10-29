import GoalData from "@/components/main/GoalData/GoalData";
import { calcLeftDay } from "@/utils/calcLeftDay";
import { useGoalDetail, useGoals } from "@/api/hooks";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export interface GoalDataWrapperProps {
  goal: string;
  percentage: number;
  goalId: string;
  dueDate: string;
  isCompleted?: boolean;
}

const GoalDataContainer = () => {
  const { data: rawGoalData } = useGoals();

  // Convert raw goal data to the format expected by the component
  const goalDataInfoList: GoalDataWrapperProps[] =
    rawGoalData?.goals?.map((goalInfo) => ({
      goal: goalInfo.title ?? "",
      percentage: goalInfo.progress ?? 0,
      goalId: goalInfo.id ?? "",
      dueDate: goalInfo.dueDate ?? "",
    })) ?? [];

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-2">
        {goalDataInfoList.map((goalDataInfo) => {
          return (
            <Suspense
              fallback={
                <div className="w-82 h-[130px] bg-gray-200 px-4 flex flex-col justify-center gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="h-[26px] w-15 bg-gray-300"></div>
                    <div className="h-[24px] w-full bg-gray-300"></div>
                  </div>
                  <div className="bg-gray-300 w-full h-[14px]"></div>
                </div>
              }
              key={goalDataInfo.goalId}
            >
              <GoalDataWrapper
                // key={goalDataInfo.goalId}
                dueDate={goalDataInfo.dueDate}
                goal={goalDataInfo.goal}
                goalId={goalDataInfo.goalId}
                percentage={goalDataInfo.percentage}
                isCompleted={goalDataInfo?.isCompleted}
              />
            </Suspense>
          );
        })}
      </div>
    </>
  );
};
export default GoalDataContainer;

export const GoalDataWrapper = ({
  dueDate,
  goal,
  goalId,
  percentage,
  isCompleted,
}: GoalDataWrapperProps) => {
  const goalLeftDate = dueDate ? calcLeftDay(dueDate) : NaN;
  // const { data } = useGoalDetail(goalId);
  const { data } = useGoalDetail(goalId, { suspense: true });

  return (
    <>
      <Link href={`/details/${goalId}`}>
        <div className="w-82 h-[130px] bg-background-alternative rounded-lg outline-1 outline-offset-[-1px] outline-line-normal inline-flex flex-col justify-center items-center gap-3">
          <GoalData
            dDay={goalLeftDate}
            goalName={goal}
            isCompleted={isCompleted ?? data?.isCompleted ?? false}
            progress={percentage}
          />
        </div>
      </Link>
    </>
  );
};
