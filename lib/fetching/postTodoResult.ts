import { templateFetch } from "./template/fetchTemplate";
import { TodoResultRqEmotionEnum } from "@/api/generated/motimo/Api";

const postTodoResult = async (
  todoId: string,
  emotion: TodoResultRqEmotionEnum,
  memo: string,
  file?: File,
) => {
  const formData = new FormData();
  formData.append(
    "request",
    new Blob([JSON.stringify({ emotion, content: memo })], {
      type: "application/json",
    }),
  );
  if (file) formData.append("file", file);
  const res = await templateFetch({
    apiUrl: `/v1/todos/${todoId}/result`,
    method: "POST",
    body: formData,
  });
  return res;
};

export { postTodoResult };
