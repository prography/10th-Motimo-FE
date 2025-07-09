import { TodoItemProps } from "@/components/shared/TodoItem/TodoItem";

type TodoItemsInfo = Omit<TodoItemProps, "onReportedClick" | "onChecked"> & {
  id: string;
};

export type { TodoItemsInfo };
