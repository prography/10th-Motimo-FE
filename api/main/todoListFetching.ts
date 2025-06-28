import { TodoUpdateRq } from "../generated/motimo/Api";
import { templateFetch } from "../common/fetchTemplate";

const createNewTodoOnTodoList = async (
  todoListId: string,
  newTodo: TodoUpdateRq,
) => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch(
    `/v1/sub-goals/${todoListId}/todo`,
    "POST",
    newTodo,
  );

  // 타입 변환 해야할 수도
  return result;
};

const toggleCompletionTodoOnTodoList = async (todoListId: string) => {
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch(
    `/v1/sub-goals/${todoListId}/completion/toggle`,
    "PATCH",
  );
  // 타입 변환 해야할 수도
  return result;
};

const getTodosOnTodoList = async (todoListId: string) => {
  // error처리 아직 안함. toast처리 해야 함
  const reuslt = await templateFetch(
    `/v1/sub-goals/${todoListId}/todos/incomplete-or-date`,
    "GET",
  );

  // 타입 변환 해야할 수도
  return reuslt;
};

export {
  createNewTodoOnTodoList,
  getTodosOnTodoList,
  toggleCompletionTodoOnTodoList,
};
