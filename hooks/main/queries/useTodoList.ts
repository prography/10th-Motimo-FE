import { getTodosOnTodoList } from "@/api/main/todoListFetching";
import useSWR from "swr";

const mockFetcher = async () => {};

const useTodoList = ({ todoListId }: { todoListId: string }) => {
  const swr = useSWR(todoListId, getTodosOnTodoList);
  return swr;
};

export default useTodoList;
