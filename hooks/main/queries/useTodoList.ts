import { TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import { getTodosOnSubGoal } from "@/lib/main/subGoalFetching";
import { TodoItemsInfo } from "@/types/todoList";
import useSWR, { SWRConfiguration } from "swr";

const mockFetcher = async () => {};

const useTodoList = (subGoalId: string, options?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(subGoalId, getTodosOnSubGoal, options);

  return { data: data ?? [], error, mutate };
};

export default useTodoList;
