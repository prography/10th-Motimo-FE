import { HttpResponse, delay, http } from "msw";
import { todo } from "node:test";

const createErrorResponse = () =>
  new HttpResponse("네트워크 에러", { status: 500 });

const myMainDB = {
  goals: [
    {
      id: "골1",
      title: "자격증 따기",
      dueDate: "2025-07-01",
      progress: 24.5,
      isCompleted: true,
      isJoinedGroup: true,
      subGoals: ["서브골1", "서브골2"],
    },
    {
      id: "골2",
      title: "프로젝트 완주하기",
      dueDate: "2025-09-10",
      progress: 50,
      isCompleted: false,
      isJoinedGroup: true,
      subGoals: ["서브골3", "서브골4"],
    },
  ],
  subGoals: [
    {
      id: "서브골1",
      title: "자격증 책 한 권 끝내기",
      todos: ["투두1", "투두2"],
      isCompleted: false,
    },
    {
      id: "서브골2",
      title: "자격증 시험 보기",
      todos: ["투두3", "투두4"],
      isCompleted: false,
    },
    {
      id: "서브골3",
      title: "기획",
      todos: ["투두5", "투두6", "투두9", "투두10"], // 투두 9, 10 추가
      isCompleted: false,
    },
    {
      id: "서브골4",
      title: "개발",
      todos: ["투두7", "투두8", "투두11", "투두12"], // 투두 11, 12 추가
      isCompleted: false,
    },
  ],
  todos: [
    {
      id: "투두1",
      title: "영단어 10개 이상 외우기",
      date: "2025-07-01",
      status: "COMPLETE",
      todoResultId: "투두결과1",
      createdAt: "2025-07-01T07:57:53.097Z",
    },
    {
      id: "투두2",
      title: "암기 테스트 보기",
      date: "2025-07-03",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두3",
      title: "모의고사 치르기",
      date: "2025-07-06",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두4",
      title: "오답 분석하기",
      date: "2025-07-08",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두5",
      title: "프로젝트 기획서 초안 작성",
      date: "2025-07-05",
      status: "COMPLETE",
      todoResultId: "투두결과2",
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두6",
      title: "팀원들과 기획 회의",
      date: "2025-07-07",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두7",
      title: "개발 환경 세팅",
      date: "2025-07-09",
      status: "COMPLETE",
      todoResultId: "투두결과3",
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두8",
      title: "백엔드 API 설계",
      date: "2025-07-11",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-02T07:57:53.097Z",
    },
    {
      id: "투두9",
      title: "사용자 스토리 정의",
      date: "2025-07-06",
      status: "COMPLETE",
      todoResultId: "투두결과4",
      createdAt: "2025-07-03T07:57:53.097Z",
    },
    {
      id: "투두10",
      title: "UI/UX 와이어프레임 제작",
      date: "2025-07-08",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-03T07:57:53.097Z",
    },
    {
      id: "투두11",
      title: "프론트엔드 컴포넌트 개발",
      date: "2025-07-12",
      status: "INCOMPLETE",
      todoResultId: undefined,
      createdAt: "2025-07-03T07:57:53.097Z",
    },
    {
      id: "투두12",
      title:
        "데이터베이스 스키마 설계 겁나 길게 쓸거임 일부러 어디까지 가나 보자고 아니 좀 더 길어야 하는 것 같은뎅 와 어디까지 길어져야만 하는 겁니까.",
      date: "2025-07-10",
      status: "COMPLETE",
      todoResultId: "투두결과5",
      createdAt: "2025-07-03T07:57:53.097Z",
    },
  ],
  todoResults: [
    {
      todoResultId: "투두결과1",
      todoId: "투두1",
      emotion: "뿌듯",
      content: "영단어 10개 이상 외우기를 했다.",
      fileUrl: "url 대충",
    },
    {
      todoResultId: "투두결과2",
      todoId: "투두5",
      emotion: "만족",
      content: "프로젝트 기획서 초안을 성공적으로 작성했다.",
      fileUrl: "기획서_초안_링크",
    },
    {
      todoResultId: "투두결과3",
      todoId: "투두7",
      emotion: "기대",
      content: "개발 환경 세팅 완료! 이제 본격적인 개발 시작이다.",
      fileUrl: "개발환경_세팅_스크린샷",
    },
    {
      todoResultId: "투두결과4",
      todoId: "투두9",
      emotion: "흥미로움",
      content: "사용자 스토리 정의를 통해 기능 구현 방향성을 잡았다.",
      fileUrl: "사용자_스토리_문서",
    },
    {
      todoResultId: "투두결과5",
      todoId: "투두12",
      emotion: "개운함",
      content: "데이터베이스 스키마 설계를 마치고, 데이터 모델링을 완료했다.",
      fileUrl: "DB_스키마_다이어그램",
    },
  ],
};

export const handlers = [
  /** Goals */

  http.put("/v1/goals/:id", async ({ request, params }) => {
    if (!params.id) {
      // 1초 딜레이
      await delay(1000);

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
    await delay(1000);

    return HttpResponse.json({
      id: updatedGoal.id,
    });
  }),

  http.get("/v1/goals", async () => {
    // 1초 딜레이
    // await delay(1000);

    return HttpResponse.json({
      goals: myMainDB.goals,
    });
  }),

  http.post("/v1/goals", async ({ request }) => {
    const newGoal = await request.json();
    console.log("newGoal: ", newGoal);

    // 1초 딜레이
    await delay(1000);
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
    await delay(1000);

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
    await delay(1000);

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

  /** Todos */
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

  /** subGoals */

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
