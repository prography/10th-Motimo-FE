import {
  GoalWithSubGoalTodoRs,
  TodoRsStatusEnum,
} from "@/api/generated/motimo/Api";
import { getGoalWithSubGoalTodo } from "@/lib/main/goalFetching";
import { TodoItemsInfo } from "@/types/todoList";
import useSWR, { SWRConfiguration } from "swr";

import { TodoListProps } from "@/components/main/TodoList/TodoList";

type ConvertedGoalWithSubGoalTodo = Omit<GoalWithSubGoalTodoRs, "subGoals"> & {
  subGoals: TodoListProps[];
};

const useGoalWithSubGoalTodo = (goalId: string, options?: SWRConfiguration) => {
  const { data, mutate } = useSWR(goalId, getGoalWithSubGoalTodo, options);

  const convertedSubGoals: TodoListProps[] =
    data?.subGoals?.map((subGoalInfo) => {
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
    }) ?? [];

  const convertedData: ConvertedGoalWithSubGoalTodo = {
    ...data,
    subGoals: convertedSubGoals,
  };

  return { data: convertedData, mutate };
};
export default useGoalWithSubGoalTodo;
export type { ConvertedGoalWithSubGoalTodo };
