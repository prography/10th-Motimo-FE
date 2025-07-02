"use client";

import useGoalStore from "@/stores/useGoalStore";
import TodoList from "../TodoList/TodoList";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import { GoalWithSubGoalTodoRs } from "@/api/generated/motimo/Api";
import GoalTitleArea from "../GoalTitleArea/GoalTitleArea";
import GoalInfo from "@/components/shared/GoalInfo/GoalInfo";
import TodoBottomSheet, {
  TodoInfoForSubmission,
} from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import useTodoList from "@/hooks/main/queries/useTodoList";
import { useEffect, useState } from "react";
import { createNewGoal } from "@/lib/main/goalFetching";
import { createNewTodoOnSubGoal } from "@/lib/main/subGoalFetching";
import { updateTodo } from "@/lib/main/todoFetching";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";

interface GoalCardProps {
  initSubGoalTodo?: GoalWithSubGoalTodoRs;
}

const GoalCard = ({ initSubGoalTodo }: GoalCardProps) => {
  const { goalId } = useGoalStore();
  const { data: goalWithSubGoalTodo } = useGoalWithSubGoalTodo(goalId || "", {
    fallbackData: initSubGoalTodo,
  });
  const [newTodo, setNewTodo] = useState<TodoInfoForSubmission | null>(null);
  const { mutate } = useTodoList(newTodo?.subGoalId ?? "");
  const { isActive, setIsActive, initContent } = useActiveTodoBottomSheet();

  // GoalInfo props 계산
  const goalLeftDate = Math.floor(
    (new Date(goalWithSubGoalTodo.dueDate ?? "").getTime() -
      new Date().getTime()) /
      1000 /
      24 /
      60 /
      60,
  );

  const totalTodoLenInGoal = goalWithSubGoalTodo.subGoals.reduce(
    (acc, subGoal) => acc + subGoal.todoTotalLen,
    0,
  );
  const checkedTodoLenInGoal = goalWithSubGoalTodo.subGoals.reduce(
    (acc, subGoal) => acc + (subGoal.todoCheckedLen ?? 0),
    0,
  );
  const goalLeftTodoNum = totalTodoLenInGoal - checkedTodoLenInGoal;

  useEffect(() => {
    mutate();
  }, [newTodo]);

  return (
    <>
      <div className="w-full flex-1 p-4 bg-background-normal inline-flex flex-col justify-start items-start gap-2 ">
        <GoalTitleArea goalTitle={goalWithSubGoalTodo.title ?? ""} />
        <GoalInfo leftDateNum={goalLeftDate} leftTodoNum={goalLeftTodoNum} />
        <section className="flex flex-col gap-4 w-full">
          {goalWithSubGoalTodo?.subGoals?.map((subGoalInfo) => {
            return <TodoList {...subGoalInfo} key={subGoalInfo.subGoalId} />;
          })}
        </section>
      </div>

      <TodoBottomSheet
        isActivated={isActive}
        initTodoInfo={{
          initDate: initContent?.date,
          initSubGoalId: initContent?.subGoalId,
          initSubGoalTitle: initContent?.subGoalTitle,
          initTodo: initContent?.todo,
          initTodoId: initContent?.id,
        }}
        setIsActivated={setIsActive}
        subGoals={goalWithSubGoalTodo?.subGoals.map((subGoalInfo) => ({
          id: subGoalInfo.subGoalId,
          title: subGoalInfo.subGoal ?? "",
        }))}
        openModal={goalWithSubGoalTodo?.subGoals.length > 0}
        onSubmitTodo={async (newTodoInfo) => {
          const isCreating = newTodoInfo.id ? true : false;
          let fetchRes;
          if (isCreating) {
            fetchRes = await createNewTodoOnSubGoal(newTodoInfo.subGoalId, {
              title: newTodoInfo.todo,
            });
          } else {
            fetchRes = await updateTodo(newTodoInfo.id ?? "", {
              date: newTodoInfo.date,
              title: newTodoInfo.todo,
            });
          }

          const isFetchOk = fetchRes ? true : false;
          if (isFetchOk) {
            setNewTodo(newTodoInfo);
          }

          return isFetchOk;
        }}
      />
    </>
  );
};
export default GoalCard;
