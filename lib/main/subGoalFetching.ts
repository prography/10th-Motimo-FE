import {
  TodoRs,
  TodoRsStatusEnum,
  TodoUpdateRq,
  SubGoalCreateRq,
} from "../../api/generated/motimo/Api";
import { templateFetch } from "../../api/common/fetchTemplate";
import { TodoItemsInfo } from "@/types/todoList";

const createNewTodoOnSubGoal = async (
  subGoalId: string,
  newTodo: SubGoalCreateRq,
) => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch(
    `/v1/sub-goals/${subGoalId}/todo`,
    "POST",
    newTodo,
  );

  // 타입 변환 해야할 수도
  return result;
};

const toggleCompletionTodoOnSubGoal = async (subGoalId: string) => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch(
    `/v1/sub-goals/${subGoalId}/completion/toggle`,
    "PATCH",
  );
  // 타입 변환 해야할 수도
  return result;
};

const getTodosOnSubGoal = async (subGoalId: string) => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch<TodoRs[]>(
    `/v1/sub-goals/${subGoalId}/todos/incomplete-or-date`,
    "GET",
  );

  const convertedResult: TodoItemsInfo[] =
    result?.map((todoRs) => ({
      id: todoRs.id ?? "",
      title: todoRs.title ?? "",
      checked: todoRs.status === TodoRsStatusEnum.COMPLETE,
      reported: !!todoRs.todoResultId,
      targetDate: todoRs.date ? new Date(todoRs.date) : undefined,
    })) ?? [];

  return convertedResult;
};

export {
  createNewTodoOnSubGoal,
  getTodosOnSubGoal,
  toggleCompletionTodoOnSubGoal,
};
