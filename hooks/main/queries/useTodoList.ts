"use client";

import { TodoRs, TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import { getTodosOnSubGoal } from "@/lib/fetching/subGoalFetching";
import { TodoItemsInfo } from "@/types/todoList";
import { date2StringWithSpliter } from "@/utils/date2String";
import useSWR, { SWRConfiguration } from "swr";

const mockFetcher = async () => {};

type NewTodoItemsInfo = Omit<TodoItemsInfo, "reported"> & {
  reportId?: string;
};

const useTodoList = (subGoalId: string, options?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(subGoalId, getTodosOnSubGoal, options);

  const convertedResult: TodoItemsInfo[] | undefined = data?.map((todoRs) => ({
    id: todoRs.id ?? "",
    title: todoRs.title ?? "",
    checked: todoRs.status === TodoRsStatusEnum.COMPLETE,
    reported: !!todoRs.todoResultId,
    targetDate: todoRs.date ? new Date(todoRs.date) : undefined,
  }));

  // const mutateWithConversion = (
  //   newTodoItemsInfo: NewTodoItemsInfo[],
  // ): TodoRs[] => {
  //   return newTodoItemsInfo.map((newTodoItem) => ({
  //     title: newTodoItem.title,

  //     date: newTodoItem.targetDate
  //       ? date2StringWithSpliter(newTodoItem.targetDate, "-")
  //       : // 에러 확인할 수 있도록
  //         "",

  //     status: newTodoItem.checked
  //       ? TodoRsStatusEnum.COMPLETE
  //       : TodoRsStatusEnum.INCOMPLETE,

  //     todoResultId: newTodoItem.reportId,
  //   }));
  // };

  return {
    data: convertedResult,
    error,
    // mutate: (newData: NewTodoItemsInfo[]) =>
    //   mutate(mutateWithConversion(newData)),
    mutate,
  };
};

export default useTodoList;
