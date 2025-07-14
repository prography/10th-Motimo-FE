"use client";

import useGoalStore from "@/stores/useGoalStore";
import TodoList from "../TodoList/TodoList";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import {
  GoalWithSubGoalTodoRs,
  TodoResultRqEmotionEnum,
} from "@/api/generated/motimo/Api";
import GoalTitleArea from "../GoalTitleArea/GoalTitleArea";
import GoalInfo from "@/components/shared/GoalInfo/GoalInfo";
import TodoBottomSheet, {
  TodoBottomSheetProps,
  TodoInfoForSubmission,
} from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import useTodoList from "@/hooks/main/queries/useTodoList";
import { useEffect, useRef, useState } from "react";
import { createNewGoal } from "@/lib/fetching/goalFetching";
import { createNewTodoOnSubGoal } from "@/lib/fetching/subGoalFetching";
import { postTodoResult, updateTodo } from "@/lib/fetching/todoFetching";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";
import useModal from "@/hooks/useModal";
import { date2StringWithSpliter } from "@/utils/date2String";
import { calcLeftDay } from "@/utils/calcLeftDay";
import TodoResultBottomSheet from "@/components/shared/BottomSheets/TodoResultBottomSheet/TodoResultBottomSheet";

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
  const { isOpened: isModalOpened } = useModal();
  const [todoResBottomSheetInfo, setTodoResBottomSheetInfo] = useState<{
    open: boolean;
    todoId: string | null;
  }>({
    open: false,
    todoId: null,
  });

  // GoalInfo props 계산
  // const goalLeftDate = Math.floor(
  //   (new Date(goalWithSubGoalTodo.dueDate ?? "").getTime() -
  //     new Date().getTime()) /
  //     1000 /
  //     24 /
  //     60 /
  //     60,
  // );
  const goalLeftDate = calcLeftDay(goalWithSubGoalTodo.dueDate ?? new Date());

  const totalTodoLenInGoal =
    goalWithSubGoalTodo.subGoals?.reduce(
      (acc, subGoal) => acc + subGoal.initTodoTotalLen,
      0,
    ) ?? 0;
  const checkedTodoLenInGoal =
    goalWithSubGoalTodo.subGoals?.reduce(
      (acc, subGoal) => acc + (subGoal.initTodoCheckedLen ?? 0),
      0,
    ) ?? 0;
  const goalLeftTodoNum = totalTodoLenInGoal - checkedTodoLenInGoal;

  // 투두 추가/변경에서 refetch
  useEffect(() => {
    mutate();
  }, [newTodo, mutate]);

  return (
    <>
      <div className="w-full flex-1 p-4 pb-38 bg-background-normal inline-flex flex-col justify-start items-start gap-2 ">
        <GoalTitleArea
          goalTitle={goalWithSubGoalTodo.title ?? ""}
          goalId={goalId || ""}
        />
        <GoalInfo leftDateNum={goalLeftDate} leftTodoNum={goalLeftTodoNum} />
        <section className="flex flex-col gap-4 w-full">
          {goalWithSubGoalTodo?.subGoals?.map((subGoalInfo) => {
            return (
              <TodoList
                {...subGoalInfo}
                goalId={goalId || ""}
                key={subGoalInfo.subGoalId}
                onReportedClick={(todoId) => {
                  setTodoResBottomSheetInfo({ open: true, todoId });
                }}
              />
            );
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
        subGoals={
          goalWithSubGoalTodo.subGoals?.map((subGoalInfo) => ({
            id: subGoalInfo.subGoalId ?? "",
            title: subGoalInfo.subGoal ?? "",
          })) ?? []
        }
        // modal이 등장하면 bottomSheet는 닫기.
        openBottomSheet={
          !isModalOpened &&
          goalWithSubGoalTodo.subGoals !== undefined &&
          goalWithSubGoalTodo.subGoals.length > 0
        }
        onSubmitTodo={async (newTodoInfo) => {
          const isCreating = newTodoInfo.id ? false : true;
          let fetchRes;
          if (isCreating) {
            fetchRes = await createNewTodoOnSubGoal(newTodoInfo.subGoalId, {
              title: newTodoInfo.todo,
              date: newTodoInfo?.date
                ? date2StringWithSpliter(newTodoInfo?.date, "-")
                : undefined,
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
      <TodoResultBottomSheet
        hasBottomTabBar={true}
        openBottomSheet={todoResBottomSheetInfo.open}
        setOpenBottomSheet={(nextIsOpen) =>
          setTodoResBottomSheetInfo((prev) => ({ ...prev, open: nextIsOpen }))
        }
        onSubmit={async (todoResult) => {
          const res = await postTodoResult(
            todoResBottomSheetInfo.todoId ?? "",
            {
              ...todoResult,
              emotion: todoResult.emotion as unknown as TodoResultRqEmotionEnum,
            },
          );
          if (res) {
            setTodoResBottomSheetInfo({ open: false, todoId: null });
          }
        }}
      />
    </>
  );
};
export default GoalCard;
