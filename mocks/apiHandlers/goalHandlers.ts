import { http, HttpResponse } from "msw";
import { myMainDB } from "./db";
import { createErrorResponse } from "./utils";

const goalHandlers = [
  http.put("/v1/goals/:id", async ({ request, params }) => {
    if (!params.id) {
      // 1초 딜레이

      return createErrorResponse();
    }

    const updatedGoal = (await request.json()) as (typeof myMainDB.goals)[0];
    console.log("updatedGoal: ", updatedGoal);
    const foundGoalIdx = myMainDB.goals.findIndex(
      (goal) => goal.id === updatedGoal.id,
    );
    if (foundGoalIdx !== -1) myMainDB.goals[foundGoalIdx] = updatedGoal;
    else {
      const errMsg = "존재하지 않는 골 id임";
      console.error(errMsg);
      throw new Error(errMsg);
    }

    // 1초 딜레이

    return HttpResponse.json({
      id: updatedGoal.id,
    });
  }),

  http.get("/v1/goals", async () => {
    // 1초 딜레이
    //

    return HttpResponse.json({
      goals: myMainDB.goals,
    });
  }),

  http.post("/v1/goals", async ({ request }) => {
    const newGoal = await request.json();
    console.log("newGoal: ", newGoal);

    // 1초 딜레이

    const newId = `골${myMainDB.goals.length + 1}`;
    myMainDB.goals.push({
      ...(newGoal as (typeof myMainDB.goals)[0]),
      id: newId,
      isCompleted: false,
      isJoinedGroup: false,
    });

    return HttpResponse.json({
      id: newId,
    });
  }),

  http.post("/v1/goals/:goalId/subGoal", async ({ request, params }) => {
    const newSubGoal = await request.json();
    console.log("newSubGoal: ", newSubGoal);

    // 1초 딜레이
    const newSubGoalId = `서브골${myMainDB.subGoals.length + 1}`;
    myMainDB.subGoals.push({
      ...(newSubGoal as (typeof myMainDB.subGoals)[0]),
      id: newSubGoalId,
      isCompleted: false,
      todos: [],
    });
    // goal에 suvgoal등록하기
    const targetId = params.goalId as string;
    const found = myMainDB.goals.findIndex((goal) => goal.id === targetId);
    if (found === -1) {
      throw new Error("못찾음");
    }

    myMainDB.goals[found].subGoals.push(newSubGoalId);

    return HttpResponse.json({
      id: newSubGoalId,
    });
  }),

  http.patch("/v1/goals/:goalId/completion", async ({ request, params }) => {
    const targetId = params.goalId;
    const found = myMainDB.goals.findIndex((goal) => goal.id === targetId);
    if (found !== -1) {
      myMainDB.goals[found].isCompleted = !myMainDB.goals[found].isCompleted;
    } else {
      console.error("id 못찾음");
      throw new Error("못찾음");
    }

    // 1초 딜레이

    return HttpResponse.json({
      id: targetId,
    });
  }),

  http.get("/v1/goals/:goalId", async ({ params }) => {
    const targetId = params.goalId;
    const found = myMainDB.goals.findIndex((goal) => goal.id === targetId);

    if (found === -1) {
      console.error("못찾음");
      throw new Error("못찾음");
    }

    // 1초 딜레이

    return HttpResponse.json({
      ...myMainDB.goals[found],
      subGoals: undefined,
    });
  }),

  http.get("/v1/goals/:goalId/sub-goals/all", async ({ params }) => {
    const targetId = params.goalId;
    const found = myMainDB.goals.findIndex((goal) => goal.id === targetId);
    if (found === -1) {
      throw new Error("못찾음");
    }

    //test
    console.log(myMainDB);

    const allSubGoals = myMainDB.goals[found].subGoals.reduce(
      (acc: object[], subGoalId) => {
        const subGoalInfo = myMainDB.subGoals.find(
          (subGoal) => subGoal.id === subGoalId,
        );
        const relatedTodos = subGoalInfo?.todos.map((todoId) => ({
          ...myMainDB.todos.find((todo) => todo.id === todoId),
        }));
        return [...acc, { ...subGoalInfo, todos: relatedTodos }];
      },

      [],
    );
    const result = {
      ...myMainDB.goals[found],
      progress: undefined,
      isCompleted: undefined,
      isJoinedGroup: undefined,
      subGoals: [...allSubGoals],
    };

    return HttpResponse.json(result);
  }),
];

export default goalHandlers;
