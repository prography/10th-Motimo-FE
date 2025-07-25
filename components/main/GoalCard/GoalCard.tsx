"use client";

import useGoalStore from "@/stores/useGoalStore";
import TodoList from "../TodoList/TodoList";
import { useGoalWithSubGoals } from "@/api/hooks";
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
import { calcLeftDay } from "@/utils/calcLeftDay";
import TodoResultBottomSheet from "@/components/shared/BottomSheets/TodoResultBottomSheet/TodoResultBottomSheet";
import { TodoResultRqEmotionEnum } from "@/api/generated/motimo/Api";
import { useSubGoalTodosIncompleteOrTodayInfinite } from "@/hooks/queries/useSubGoalTodosInfiniites";
import { subGoalTodo2TodoItemList } from "@/utils/subGoalTodo2TodoItemList";
import { postTodoResult } from "@/lib/fetching/postTodoResult";

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

  // // Convert raw goal data to the format expected by the component
  const goalWithSubGoalTodo: ConvertedGoalWithSubGoalTodo = {
    ...rawGoalData,
    subGoals:
      rawGoalData?.subGoals?.map((subGoalInfo) => {
        const todosInSubGoal: TodoItemsInfo[] =
          subGoalTodo2TodoItemList(subGoalInfo);

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

  const [newTodoForSubmission, setNewTodoForSubmission] = useState<Pick<
    TodoInfoForSubmission,
    "id" | "subGoalId"
  > | null>(null);

  const { mutate } = useSubGoalTodosIncompleteOrTodayInfinite(
    newTodoForSubmission?.subGoalId ?? "",
    {
      revalidateAll: true,
    },
  );
  const { isActive, setIsActive, initContent } = useActiveTodoBottomSheet();
  const { isOpened: isModalOpened } = useModal();
  const [todoResBottomSheetInfo, setTodoResBottomSheetInfo] = useState<{
    open: boolean;
    todoId: string | null;
    subGoalId: string | null;
  }>({
    open: false,
    todoId: null,
    subGoalId: null,
  });

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
  }, [newTodoForSubmission, mutate]);

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
                  setTodoResBottomSheetInfo({
                    open: true,
                    todoId,
                    subGoalId: subGoalInfo.subGoalId ?? null,
                  });
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
            setNewTodoForSubmission(newTodoInfo);
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
            todoResult.emotion as unknown as TodoResultRqEmotionEnum,
            todoResult.memo,
            todoResult.file || undefined,
          );
          // const res = await todoApi.upsertTodoResult(
          //   todoResBottomSheetInfo.todoId ?? "",
          //   {
          //     request: {
          //       content: todoResult.memo,
          //       emotion:
          //         todoResult.emotion as unknown as TodoResultRqEmotionEnum,
          //     },
          //     file: todoResult.file || undefined,
          //   },
          // );

          if (res) {
            setTodoResBottomSheetInfo({
              open: false,
              todoId: null,
              subGoalId: null,
            });
            setNewTodoForSubmission({
              subGoalId: todoResBottomSheetInfo.subGoalId ?? "",
              id: todoResBottomSheetInfo.todoId ?? "",
            });
          }
        }}
      />
    </>
  );
};
export default GoalCard;
