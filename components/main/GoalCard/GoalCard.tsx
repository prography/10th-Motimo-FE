"use client";

import useGoalStore from "@/stores/useGoalStore";
import TodoList from "../TodoList/TodoList";
import { useGoalWithSubGoals, useSubGoalTodos } from "@/api/hooks";
import {
  GoalWithSubGoalTodoRs,
  TodoRsStatusEnum,
} from "@/api/generated/motimo/Api";
import GoalTitleArea from "../GoalTitleArea/GoalTitleArea";
import GoalInfo from "@/components/shared/GoalInfo/GoalInfo";
import TodoBottomSheet, {
  TodoBottomSheetProps,
  TodoInfoForSubmission,
} from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import { TodoListProps } from "../TodoList/TodoList";
import { TodoItemsInfo } from "@/types/todoList";
import { useEffect, useRef, useState } from "react";
import { goalApi, subGoalApi, todoApi } from "@/api/service";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";
import useModal from "@/hooks/useModal";
import { date2StringWithSpliter } from "@/utils/date2String";

// Define the converted data type
type ConvertedGoalWithSubGoalTodo = Omit<GoalWithSubGoalTodoRs, "subGoals"> & {
  subGoals: TodoListProps[];
};

interface GoalCardProps {
  initSubGoalTodo?: GoalWithSubGoalTodoRs;
}

const GoalCard = ({ initSubGoalTodo }: GoalCardProps) => {
  const { goalId } = useGoalStore();
  const { data: rawGoalData } = useGoalWithSubGoals(goalId || "", {
    fallbackData: initSubGoalTodo,
  });

  // Convert raw goal data to the format expected by the component
  const goalWithSubGoalTodo: ConvertedGoalWithSubGoalTodo = {
    ...rawGoalData,
    subGoals:
      rawGoalData?.subGoals?.map((subGoalInfo) => {
        const todosInSubGoal: TodoItemsInfo[] =
          subGoalInfo.todos?.map((todoInfo) => ({
            id: todoInfo.id ?? "",
            title: todoInfo.title ?? "",
            checked: todoInfo.status === TodoRsStatusEnum.COMPLETE,
            reported: todoInfo.todoResultId ? true : false,
            targetDate: todoInfo.date ? new Date(todoInfo.date) : new Date(),
          })) ?? [];

        return {
          subGoalId: subGoalInfo.id ?? "",
          initTodoTotalLen: todosInSubGoal.length,
          initTodoItemsInfo: todosInSubGoal,
          subGoal: subGoalInfo.title,
          initTodoCheckedLen: todosInSubGoal.filter(
            (todoInfo) => todoInfo.checked,
          ).length,
        };
      }) ?? [],
  } as ConvertedGoalWithSubGoalTodo;

  const [newTodo, setNewTodo] = useState<TodoInfoForSubmission | null>(null);
  const { mutate } = useSubGoalTodos(newTodo?.subGoalId ?? "");
  const { isActive, setIsActive, initContent } = useActiveTodoBottomSheet();
  const { isOpened: isModalOpened } = useModal();

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
    (acc, subGoal) => acc + subGoal.initTodoTotalLen,
    0,
  );
  const checkedTodoLenInGoal = goalWithSubGoalTodo.subGoals.reduce(
    (acc, subGoal) => acc + (subGoal.initTodoCheckedLen ?? 0),
    0,
  );
  const goalLeftTodoNum = totalTodoLenInGoal - checkedTodoLenInGoal;

  // 투두 추가/변경에서 refetch
  useEffect(() => {
    mutate();
  }, [newTodo, mutate]);

  return (
    <>
      <div className="w-full flex-1 p-4 pb-38 bg-background-normal inline-flex flex-col justify-start items-start gap-2 ">
        <GoalTitleArea goalTitle={goalWithSubGoalTodo.title ?? ""} />
        <GoalInfo leftDateNum={goalLeftDate} leftTodoNum={goalLeftTodoNum} />
        <section className="flex flex-col gap-4 w-full">
          {goalWithSubGoalTodo?.subGoals?.map((subGoalInfo) => {
            return <TodoList {...subGoalInfo} key={subGoalInfo.subGoalId} />;
          })}
          <TodoList
            key={"new"}
            initTodoTotalLen={0}
            goalId={goalId ? goalId : undefined}
          />
        </section>
      </div>

      <TodoBottomSheet
        hasBottomTabBar={true}
        isActivated={isActive}
        initTodoInfo={initContent}
        setIsActivated={setIsActive}
        subGoals={goalWithSubGoalTodo?.subGoals.map((subGoalInfo) => ({
          id: subGoalInfo.subGoalId ?? "",
          title: subGoalInfo.subGoal ?? "",
        }))}
        // modal이 등장하면 bottomSheet는 닫기.
        openBottomSheet={
          !isModalOpened && goalWithSubGoalTodo?.subGoals.length > 0
        }
        onSubmitTodo={async (newTodoInfo) => {
          const isCreating = newTodoInfo.id ? false : true;
          let fetchRes;
          if (isCreating) {
            fetchRes = await subGoalApi.createTodo(newTodoInfo.subGoalId, {
              title: newTodoInfo.todo,
              date: newTodoInfo?.date
                ? date2StringWithSpliter(newTodoInfo?.date, "-")
                : undefined,
            });
          } else {
            fetchRes = await todoApi.updateTodo(newTodoInfo.id ?? "", {
              date: newTodoInfo.date
                ? date2StringWithSpliter(newTodoInfo.date, "-")
                : undefined,
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
