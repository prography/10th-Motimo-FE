import { HttpResponse } from "msw";

const createErrorResponse = () =>
  new HttpResponse("네트워크 에러", { status: 500 });

export { createErrorResponse };
