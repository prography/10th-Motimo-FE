import { date2StringWithSpliter } from "@/utils/date2String";
import { templateFetch } from "./template/fetchTemplate";
import { TodoRs } from "../../api/generated/motimo/Api";

/** todo */

interface UpdateTodoBody {
  title?: string;
  date?: Date;
}

const updateTodo = async (todoId: string, body: UpdateTodoBody) => {
  await templateFetch(`/v1/todos/${todoId}`, "PUT", {
    ...body,
    date: body.date ? date2StringWithSpliter(body.date, "-") : undefined,
  });
};
const toggleTodo = async (todoId: string) => {
  await templateFetch(`/v1/todos/${todoId}/completion`, "PATCH");
};
const deleteTodo = async (todoId: string) => {
  await templateFetch(`/v1/todos/${todoId}`, "DELETE");
};

/** todoResult */
const getTodoResult = async (todoId: string) => {
  const todoResult = await templateFetch<TodoRs>(
    `/v1/todos/${todoId}/result`,
    "GET",
  );

  return todoResult ?? {};
};
const postTodoResult = async (todoId: string) => {
  await templateFetch(`/v1/todos/${todoId}/result`, "POST");
};
const deleteTodoResult = async (todoResultId: string) => {
  await templateFetch(`/v1/todos/result/${todoResultId}`, "DELETE");
};

/** */

export {
  updateTodo,
  deleteTodo,
  getTodoResult,
  postTodoResult,
  toggleTodo,
  deleteTodoResult,
};
