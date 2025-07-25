import {
  GoalWithSubGoalTodoRs,
  TodoRsStatusEnum,
} from "@/api/generated/motimo/Api";
import { TodoItemsInfo } from "@/types/todoList";
import useSWR, { SWRConfiguration } from "swr";

import { TodoListProps } from "@/components/main/TodoList/TodoList";
import { useGoalWithSubGoalsAndTodos } from "@/api/hooks";

type ConvertedGoalWithSubGoalTodo = Omit<GoalWithSubGoalTodoRs, "subGoals"> & {
  subGoals?: (TodoListProps & { isCompleted: boolean })[];
};

const useGoalWithSubGoalTodo = (goalId: string, options?: SWRConfiguration) => {
  const { data, mutate } = useGoalWithSubGoalsAndTodos(goalId, options);

  const convertedSubGoals:
    | (TodoListProps & { isCompleted: boolean })[]
    | undefined = data?.subGoals?.map((subGoalInfo) => {
    const todosInSubGoal: TodoItemsInfo[] =
      subGoalInfo.todos?.map((todoInfo) => ({
        id: todoInfo.id ?? "",
        title: todoInfo.title ?? "",
        checked: todoInfo.status === TodoRsStatusEnum.COMPLETE,
        reported: todoInfo.todoResult ? true : false,
        targetDate: todoInfo.date ? new Date(todoInfo.date) : new Date(),
      })) ?? [];

    return {
      isCompleted: subGoalInfo.isCompleted,
      subGoalId: subGoalInfo.id ?? "",
      initTodoTotalLen: todosInSubGoal.length,
      initTodoItemsInfo: todosInSubGoal,
      subGoal: subGoalInfo.title,
      initTodoCheckedLen: todosInSubGoal.filter((todoInfo) => todoInfo.checked)
        .length,
    };
  });

  const convertedData: Partial<ConvertedGoalWithSubGoalTodo> = {
    ...data,
    subGoals: convertedSubGoals,
  };

  return { data: convertedData, mutate };
};
export default useGoalWithSubGoalTodo;
export type { ConvertedGoalWithSubGoalTodo };
