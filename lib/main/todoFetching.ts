import { date2StringWithSpliter } from "@/utils/date2String";
import { templateFetch } from "../common/fetchTemplate";
import { TodoRs } from "../../api/generated/motimo/Api";

/** todo */

interface UpdateTodoBody {
  title?: string;
  date?: Date;
}

const updateTodo = async (todoId: string, body: UpdateTodoBody) => {
  const res = await templateFetch(`/v1/todos/${todoId}`, "PUT", {
    ...body,
    date: body.date ? date2StringWithSpliter(body.date, "-") : undefined,
  });
  return res;
};
const toggleTodo = async (todoId: string) => {
  const res = await templateFetch(`/v1/todos/${todoId}/completion`, "PATCH");
  return res;
};
const deleteTodo = async (todoId: string) => {
  const res = await templateFetch(`/v1/todos/${todoId}`, "DELETE");
  return res;
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
  const res = await templateFetch(`/v1/todos/${todoId}/result`, "POST");
  return res;
};
const deleteTodoResult = async (todoResultId: string) => {
  const res = await templateFetch(`/v1/todos/result/${todoResultId}`, "DELETE");
  return res;
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
