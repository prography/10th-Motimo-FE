import GoalData from "@/components/main/GoalData/GoalData";
import { calcLeftDay } from "@/utils/calcLeftDay";
import { useGoalDetail, useGoals } from "@/api/hooks";
import Link from "next/link";

interface GoalDataWrapperProps {
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
            <GoalDataWrapper
              dueDate={goalDataInfo.dueDate}
              goal={goalDataInfo.goal}
              goalId={goalDataInfo.goalId}
              percentage={goalDataInfo.percentage}
              isCompleted={goalDataInfo?.isCompleted}
              key={goalDataInfo.goalId}
            />
          );
        })}
      </div>
    </>
  );
};
export default GoalDataContainer;

const GoalDataWrapper = ({
  dueDate,
  goal,
  goalId,
  percentage,
  isCompleted,
}: GoalDataWrapperProps) => {
  const goalLeftDate = dueDate ? calcLeftDay(dueDate) : NaN;
  const { data } = useGoalDetail(goalId);

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
