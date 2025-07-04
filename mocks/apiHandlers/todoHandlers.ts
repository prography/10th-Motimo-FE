import { http, HttpResponse } from "msw";
import { myMainDB } from "./db";

const todoHandlers = [
  http.put("/v1/todos/:todoId", async ({ request, params }) => {
    const updatedTodo = (await request.json()) as (typeof myMainDB.todos)[0];
    console.log("updatedTodo: ", updatedTodo);

    const targetID = params.todoId;
    const found = myMainDB.todos.findIndex((todo) => todo.id === targetID);
    if (found === -1) {
      throw new Error("못찾음");
    }

    myMainDB.todos[found] = updatedTodo;

    return HttpResponse.json({
      todoId: targetID,
    });
  }),

  http.delete("/v1/todos/:todoId", async ({ params }) => {
    const targetId = params.todoId as string;
    const found = myMainDB.todos.findIndex((todo) => todo.id === targetId);
    if (found === -1) {
      throw new Error("못찾음");
    }
    //todos 테이블에서 없애기
    myMainDB.todos = myMainDB.todos.filter((todo) => todo.id !== targetId);
    //subgoals 테이블에서 없애기
    myMainDB.subGoals.forEach((subGoal) => {
      if (subGoal.todos.includes(targetId)) {
        subGoal.todos = subGoal.todos.filter((todoId) => todoId !== targetId);
      }
    });

    return HttpResponse.json({
      status: 204,
    });
  }),

  http.get("/v1/todos/:todoId/result", async ({ params }) => {
    const targetId = params.todoId;
    const found = myMainDB.todoResults.findIndex(
      (todoResult) => todoResult.todoId === targetId,
    );
    if (found === -1) {
      throw new Error("못찾음");
    }

    return HttpResponse.json({
      ...myMainDB.todoResults[found],
    });
  }),

  http.post("/v1/todos/:todoId/result", async ({ request, params }) => {
    const newTodo = await request.json();
    console.log("newTodo: ", newTodo);

    const targetId = params.todoId as string;
    const newResultId = `투두결과${myMainDB.todoResults.length + 1}`;
    myMainDB.todoResults.push({
      ...(newTodo as (typeof myMainDB.todoResults)[0]),
      todoId: targetId,
      todoResultId: newResultId,
    });

    return HttpResponse.json({
      todoResultId: newResultId,
    });
  }),

  http.patch("/v1/todos/:todoId/completion", async ({ params }) => {
    const targetId = params.todoId;
    const found = myMainDB.todos.findIndex((todo) => todo.id === targetId);
    if (found === -1) {
      throw new Error("못찾음");
    }
    myMainDB.todos[found].status =
      myMainDB.todos[found].status === "COMPLETE" ? "INCOMPLETE" : "COMPLETE";

    console.log("completion patch");

    return HttpResponse.json({
      todoId: targetId,
    });
  }),

  http.delete("/v1/todos/result/:todoResultId", async ({ params }) => {
    const targetId = params.todoResultId as string;
    // todoRes에서 처리
    myMainDB.todoResults = myMainDB.todoResults.filter(
      (todoRes) => todoRes.todoResultId !== targetId,
    );

    // todo에서 처리
    myMainDB.todos = myMainDB.todos.reduce(
      (acc, todo: (typeof myMainDB.todos)[0]) => {
        if (!todo.todoResultId?.includes(targetId)) return [...acc, todo];
        return [
          ...acc,
          {
            ...todo,
            todoResultId: undefined,
          },
        ];
      },
      [] as typeof myMainDB.todos,
    );

    return HttpResponse.json({
      status: 204,
    });
  }),
];

export default todoHandlers;
