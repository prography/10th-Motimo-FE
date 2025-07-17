import { TodoItemsInfo } from "@/types/todoList";
import { SubGoalWithTodosRs } from "@/api/generated/motimo/Api";
import { TodoRsStatusEnum } from "@/api/generated/motimo/Api";

const subGoalTodo2TodoItemList = (
  subGoalWitTodo: SubGoalWithTodosRs,
): TodoItemsInfo[] => {
  return (
    subGoalWitTodo.todos?.map((todoInfo) => ({
      id: todoInfo.id ?? "",
      title: todoInfo.title ?? "",
      checked: todoInfo.status === TodoRsStatusEnum.COMPLETE,
      reported: todoInfo.todoResult?.todoResultId ? true : false,
      targetDate: todoInfo.date ? new Date(todoInfo.date) : new Date(),
    })) ?? []
  );
};

export { subGoalTodo2TodoItemList };
