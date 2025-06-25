import { TodoItemProps } from "@/components/shared/TodoItem/TodoItem";

type TodoItemsInfo = Omit<TodoItemProps, "onMoodClick" | "onChecked"> & {
  id: string;
};

export type { TodoItemsInfo };
