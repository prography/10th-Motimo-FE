import { http, HttpResponse } from "msw";
import { myMainDB } from "./db";

const subGoalHandlers = [
  http.post("/v1/sub-goals/:subGoalId/todo", async ({ request, params }) => {
    const newTodo = (await request.json()) as (typeof myMainDB.todos)[0];
    console.log("newTodo: ", newTodo);

    const targetId = params.subGoalId as string;
    const found = myMainDB.subGoals.findIndex(
      (subgoal) => subgoal.id === targetId,
    );
    if (found === -1) {
      throw new Error("못찾음");
    }
    const newTodoId = `투두${myMainDB.todos.length + 1}`;
    // subgoal에 처리
    myMainDB.subGoals[found].todos.push(newTodoId);
    // todo에 처리
    myMainDB.todos.push({
      ...newTodo,
      id: newTodoId,
      todoResultId: undefined,
      status: "INCOMPLETE", // 아마
    });

    return HttpResponse.json({
      todoId: newTodoId,
    });
  }),

  http.patch(
    "/v1/sub-goals/:subGoalId/completion/toggle",
    async ({ params }) => {
      const targetId = params.subGoalId as string;

      const found = myMainDB.subGoals.findIndex(
        (subgoal) => subgoal.id === targetId,
      );
      if (found === -1) {
        throw new Error("못찾음");
      }
      // subGoal에만 토글. 복원할 때 원래 데이터 보존 일단.
      myMainDB.subGoals[found].isCompleted =
        !myMainDB.subGoals[found].isCompleted;

      console.log("patch성공");
      return HttpResponse.json({
        id: targetId,
      });
    },
  ),

  http.get(
    "/v1/sub-goals/:subGoalId/todos/incomplete-or-date",
    async ({ params }) => {
      const targetId = params.subGoalId as string;
      const found = myMainDB.subGoals.findIndex(
        (subgoal) => subgoal.id === targetId,
      );
      if (found === -1) {
        throw new Error("못찾음");
      }

      const todoIdsOfSubgoal = myMainDB.subGoals[found].todos;
      const resTodos = myMainDB.todos.filter((todo) =>
        todoIdsOfSubgoal.includes(todo.id),
      );

      return HttpResponse.json(resTodos);
    },
  ),
];

export default subGoalHandlers;
