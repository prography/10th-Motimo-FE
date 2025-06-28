"use client";

import { TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import { getTodosOnSubGoal } from "@/lib/main/subGoalFetching";
import { TodoItemsInfo } from "@/types/todoList";
import useSWR, { SWRConfiguration } from "swr";

const mockFetcher = async () => {};

const useTodoList = (subGoalId: string, options?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(subGoalId, getTodosOnSubGoal, options);
  const convertedResult: TodoItemsInfo[] =
    data?.map((todoRs) => ({
      id: todoRs.id ?? "",
      title: todoRs.title ?? "",
      checked: todoRs.status === TodoRsStatusEnum.COMPLETE,
      reported: !!todoRs.todoResultId,
      targetDate: todoRs.date ? new Date(todoRs.date) : undefined,
    })) ?? [];
  return { data: convertedResult, error, mutate };
};

export default useTodoList;
