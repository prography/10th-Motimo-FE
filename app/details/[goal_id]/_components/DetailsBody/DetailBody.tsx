import GoalData from "@/components/details/GoalData/GoalData";
import ListCard from "@/components/details/ListCard/ListCard";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import { useState } from "react";
interface DetailBodyProps {
  goalId: string;
}

const DetailBody = ({ goalId }: DetailBodyProps) => {
  const { data, mutate } = useGoalWithSubGoalTodo(goalId);
  const [targetSubGoalIdx, setTargetSubGoalIdx] = useState(0);

  // 모든 세부목표 완료 시에 모달.... => 지금 기획이 수정되는 것 같아서 일단 다른 것부터
  return (
    <>
      <GoalData goalId={goalId} />
      <ListCard
        initTodoInfoList={data.subGoals[targetSubGoalIdx].initTodoItemsInfo}
        onLeft={() =>
          setTargetSubGoalIdx((prev) => {
            if (prev > 0) return prev - 1;
            // 에러 방지
            return prev;
          })
        }
        onRight={() =>
          setTargetSubGoalIdx((prev) => {
            if (prev < data.subGoals?.length ?? 0) return prev + 1;
            // 에러방지
            return prev;
          })
        }
        subGoalInfo={{
          id: data.subGoals[targetSubGoalIdx].subGoalId,
          idx: targetSubGoalIdx,
          name: data.subGoals[targetSubGoalIdx].subGoalId,
          totalSubGoalsLen: data.subGoals?.length ?? 0,
        }}
        applyOnGoalData={() => mutate()}
      />
    </>
  );
};

export default DetailBody;
