import {
  GoalWithSubGoalTodoRs,
  TodoRsStatusEnum,
} from "@/api/generated/motimo/Api";
import { TodoItemsInfo } from "@/types/todoList";
import useSWR, { SWRConfiguration } from "swr";

import { TodoListProps } from "@/components/main/TodoList/TodoList";
import { useGoalWithSubGoals } from "@/api/hooks";

type ConvertedGoalWithSubGoalTodo = Omit<GoalWithSubGoalTodoRs, "subGoals"> & {
  subGoals?: TodoListProps[];
};

const useGoalWithSubGoalTodo = (goalId: string, options?: SWRConfiguration) => {
  useGoalWithSubGoals;
  const { data, mutate } = useGoalWithSubGoals(goalId, options);

  const convertedSubGoals: TodoListProps[] | undefined = data?.subGoals?.map(
    (subGoalInfo) => {
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
    },
  );

  const convertedData: Partial<ConvertedGoalWithSubGoalTodo> = {
    ...data,
    subGoals: convertedSubGoals,
  };

  return { data: convertedData, mutate };
};
export default useGoalWithSubGoalTodo;
export type { ConvertedGoalWithSubGoalTodo };
