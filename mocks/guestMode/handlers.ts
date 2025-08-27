// ...existing code...
import { http, HttpResponse } from "msw";
import { dbService } from "./db";
import type {
  UserRs,
  UserIdRs,
  UserUpdateRq,
  UserInterestsRq,
  GoalDetailRs,
  GoalCreateRq,
  GoalIdRs,
  GoalListRs,
  GoalWithSubGoalTodoRs,
  SubGoalCreateRq,
  SubGoalIdRs,
  TodoUpdateRq,
  TodoCreateRq,
  TodoIdRs,
  TodoResultRq,
  TodoResultIdRs,
  TodoResultRs,
  TodoRs,
  CustomSliceTodoRs,
  PointRs,
  CheerPhraseRs,
  GroupChatRs,
  GroupMemberRs,
  GroupDetailRs,
  JoinedGroupRs,
  GroupIdRs,
  GroupMessageIdRs,
} from "../../api/generated/motimo/Api";
import { DBGoal, DBSubGoal, DBTodo, DBTodoResult } from "./types";
import { date2StringWithSpliter } from "@/utils/date2String";

const genId = () => String(Date.now() + Math.floor(Math.random() * 1000));

/**
 * dbService 가정 메서드:
 * - getAll(storeName): Promise<any[]>
 * - get(storeName, id): Promise<any | undefined>
 * - add(storeName, item): Promise<any>
 * - put(storeName, item): Promise<any>
 * - delete(storeName, id): Promise<void>
 */

/* -------------------- 사용자 API -------------------- */
const userHandlers = [
  http.get("/v1/users/me", async ({ request }) => {
    try {
      const user = (await dbService.get("users", "me")) as UserRs | undefined;
      if (!user)
        return HttpResponse.json(
          { message: "Not Authorized" },
          { status: 401 },
        );
      return HttpResponse.json(user);
    } catch (e) {
      return HttpResponse.json({ message: `${e}` + "failed" }, { status: 500 });
    }
  }),

  http.put("/v1/users", async ({ request }) => {
    try {
      const body = (await request.json()) as {
        request: UserUpdateRq;
        file?: File;
      };
      const existing = (await dbService.get("users", "me")) as
        | UserRs
        | undefined;
      const updated = {
        ...(existing || { id: "me" }),
        ...(body.request as any),
      };
      if (body.file) {
        updated.profileImageUrl = ``;
        // updated.profileImageUrl = `mock:///${genId()}/${(body.file as any).name || "file"}`;
      }
      await dbService.put("users", updated);
      return HttpResponse.json({ userId: updated.id } as UserIdRs);
    } catch (e) {
      return HttpResponse.json({ message: `${e}` + "failed" }, { status: 500 });
    }
  }),

  http.patch("/v1/users/interests", async ({ request }) => {
    try {
      const body = (await request.json()) as UserInterestsRq;
      const user = ((await dbService.get("users", "me")) || {
        id: "me",
      }) as UserRs;
      const updated = {
        ...user,
        interestTypes: body.interests as any,
        id: "me",
      };
      await dbService.put("users", updated);
      return HttpResponse.json({ userId: updated.id } as UserIdRs);
    } catch (e) {
      return HttpResponse.json({ message: `${e}` + "failed" }, { status: 500 });
    }
  }),

  http.delete("/v1/users", async () => {
    try {
      await dbService.delete("users", "me");
      return HttpResponse.json(undefined, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),
];

/* -------------------- 목표 API -------------------- */
const goalHandlers = [
  http.get("/v1/goals", async () => {
    try {
      const goals = (await dbService.getAll<DBGoal>("goals")) || [];
      //test
      console.log("goal in handler: ", goals);
      return HttpResponse.json({ goals } as GoalListRs, {
        status: 200,
      });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.post("/v1/goals", async ({ request }) => {
    try {
      const body = (await request.json()) as GoalCreateRq;
      const goalId = genId();

      // dueDate처리
      const dueDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

      const newGoal = {
        id: goalId,
        ...{
          dueDate: body.dueDate
            ? undefined
            : date2StringWithSpliter(dueDate, "-"),
        },
        ...body,

        createdAt: new Date().toISOString(),
      } as any;
      await dbService.add<DBGoal>("goals", newGoal);

      // 기본 subgoal 추가
      // Create subGoals if provided
      if (body.subGoals && body.subGoals.length > 0) {
        const subGoalIds: string[] = [];

        for (let i = 0; i < body.subGoals.length; i++) {
          const subGoal = body.subGoals[i];
          const subGoalId = genId();
          const newSubGoal = {
            id: subGoalId,
            goalId: goalId,
            title: subGoal.title,
            todos: [],
            isCompleted: false,
            createdAt: new Date().toISOString(),
          } as DBSubGoal;
          await dbService.add<DBSubGoal>("subGoals", newSubGoal);
          subGoalIds.push(subGoalId);
        }

        // Update goal with subGoal IDs
        newGoal.subGoals = subGoalIds;
        await dbService.put("goals", newGoal);
      }

      return HttpResponse.json({ id: newGoal.id } as GoalIdRs, { status: 201 });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/v1/goals/:goalId", async ({ params }) => {
    try {
      const { goalId } = params as { goalId: string };
      const goal = (await dbService.get<DBGoal>(
        "goals",
        String(goalId),
      )) as any;
      if (!goal)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      return HttpResponse.json(goal as GoalDetailRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.put("/v1/goals/:goalId", async ({ params, request }) => {
    try {
      const { goalId } = params as { goalId: string };
      const body = (await request.json()) as Partial<GoalCreateRq>;
      const existing = (await dbService.get("goals", String(goalId))) as any;
      if (!existing)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      const updated = { ...existing, ...body };
      await dbService.put("goals", updated);
      return HttpResponse.json({ id: updated.id } as GoalIdRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.delete("/v1/goals/:goalId", async ({ params }) => {
    try {
      const { goalId } = params as { goalId: string };
      await dbService.delete("goals", String(goalId));
      return HttpResponse.json(undefined, { status: 200 });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.post("/v1/goals/:goalId/subGoal", async ({ params, request }) => {
    try {
      const { goalId } = params as { goalId: string };
      const body = (await request.json()) as SubGoalCreateRq;
      const newSub = { id: genId(), goalId: String(goalId), ...body };
      await dbService.add("subGoals", newSub);
      return HttpResponse.json({ id: newSub.id } as SubGoalIdRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/v1/goals/:goalId/sub-goals/todos/all", async ({ params }) => {
    try {
      const { goalId } = params as { goalId: string };
      const subs = (await dbService.getAll<DBSubGoal>("subGoals")) || [];
      const subsForGoal = subs.filter((s) => {
        //test
        console.log("s.goalId, goalId: ", s.goalId, goalId);
        return s.goalId === String(goalId);
      });
      const todos = (await dbService.getAll<DBTodo>("todos")) || [];
      const subWithTodos = subsForGoal.map((s) => ({
        ...s,
        todos: todos.filter((t) => t.subGoalId === s.id),
      }));
      const goal = (await dbService.get("goals", String(goalId))) || {
        id: goalId,
        title: "mock",
      };
      const payload = {
        ...goal,
        subGoals: subWithTodos,
      } as GoalWithSubGoalTodoRs;
      return HttpResponse.json(payload);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),
];

/* -------------------- 세부목표 API -------------------- */
const subGoalHandlers = [
  http.post("/v1/sub-goals/:subGoalId/todo", async ({ params, request }) => {
    try {
      const { subGoalId } = params as { subGoalId: string };
      const body = (await request.json()) as TodoCreateRq;
      const newTodo = {
        id: genId(),
        subGoalId: String(subGoalId),
        ...body,
        createdAt: new Date().toISOString(),
      } as TodoRs;
      await dbService.add("todos", newTodo);
      return HttpResponse.json({ todoId: newTodo.id } as TodoIdRs, {
        status: 201,
      });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.patch("/v1/sub-goals/:subGoalId", async ({ params, request }) => {
    try {
      const { subGoalId } = params as { subGoalId: string };
      const body = (await request.json()) as Partial<SubGoalCreateRq>;
      const existing = (await dbService.get(
        "subGoals",
        String(subGoalId),
      )) as any;
      if (!existing)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      const updated = { ...existing, ...body };
      await dbService.put("subGoals", updated);
      return HttpResponse.json({ id: updated.id } as SubGoalIdRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.patch(
    "/v1/sub-goals/:subGoalId/completion/toggle",
    async ({ params }) => {
      try {
        const { subGoalId } = params as { subGoalId: string };
        const existing = (await dbService.get(
          "subGoals",
          String(subGoalId),
        )) as any;
        if (!existing)
          return HttpResponse.json({ message: "no data" }, { status: 404 });
        const updated = { ...existing, isCompleted: !existing.isCompleted };
        await dbService.put("subGoals", updated);
        return HttpResponse.json({ id: updated.id } as SubGoalIdRs);
      } catch (e) {
        return HttpResponse.json(
          { message: `${e}` + "api error" },
          { status: 500 },
        );
      }
    },
  ),

  http.get("/v1/sub-goals/:subGoalId/todos", async ({ params, request }) => {
    try {
      const { subGoalId } = params as { subGoalId: string };
      const url = new URL(request.url);
      const offset = Number(url.searchParams.get("offset") || 0);
      const size = Number(url.searchParams.get("size") || 10);
      const todos = (await dbService.getAll<DBTodo>("todos")) || [];
      const list = todos.filter((t) => t.subGoalId === String(subGoalId));
      const slice = list.slice(offset, offset + size) as TodoRs[];
      const payload: CustomSliceTodoRs = {
        content: slice,
        hasNext: offset + size < list.length,
        offset,
        size,
      };
      return HttpResponse.json(payload);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get(
    "/v1/sub-goals/:subGoalId/todos/incomplete-or-date",
    async ({ params, request }) => {
      try {
        const { subGoalId } = params as { subGoalId: string };
        const url = new URL(request.url);
        const offset = Number(url.searchParams.get("offset") || 0);
        const size = Number(url.searchParams.get("size") || 10);
        const todos = (await dbService.getAll<DBTodo>("todos")) || [];
        const today = new Date().toISOString().slice(0, 10);
        const list = todos.filter(
          (t) =>
            t.subGoalId === String(subGoalId) &&
            (t.status !== "COMPLETE" || t.date === today),
        ) as TodoRs[];
        const slice = list.slice(offset, offset + size);
        const payload: CustomSliceTodoRs = {
          content: slice,
          hasNext: offset + size < list.length,
          offset,
          size,
        };
        return HttpResponse.json(payload);
      } catch (e) {
        return HttpResponse.json(
          { message: `${e}` + "api error" },
          { status: 500 },
        );
      }
    },
  ),
];

/* -------------------- 투두 API -------------------- */
const todoHandlers = [
  http.put("/v1/todos/:todoId", async ({ params, request }) => {
    try {
      const { todoId } = params as { todoId: string };
      const body = (await request.json()) as TodoUpdateRq | Partial<TodoRs>;
      const existing = (await dbService.get("todos", String(todoId))) as any;
      if (!existing)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      const updated = { ...existing, ...body };
      await dbService.put("todos", updated);
      return HttpResponse.json({ todoId: updated.id } as TodoIdRs, {
        status: 204,
      });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.delete("/v1/todos/:todoId", async ({ params }) => {
    try {
      const { todoId } = params as { todoId: string };
      await dbService.delete("todos", String(todoId));
      return HttpResponse.json(undefined, { status: 204 });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/v1/todos/me", async () => {
    try {
      const todos = (await dbService.getAll<DBTodo>("todos")) || [];
      const mine = todos.filter(
        (t) => t.ownerId === "me" || !t.ownerId,
      ) as TodoRs[];
      return HttpResponse.json(mine);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.post("/v1/todos/:todoId/result", async ({ params, request }) => {
    try {
      const { todoId } = params as { todoId: string };
      const body = (await request.json()) as {
        request: TodoResultRq;
        file?: File;
      };
      const newResult = {
        todoResultId: genId(),
        todoId: String(todoId),
        ...(body.request as any),
        createdAt: new Date().toISOString(),
      } as TodoResultRs;
      await dbService.add("todoResults", newResult);
      return HttpResponse.json({
        todoResultId: newResult.todoResultId,
      } as TodoResultIdRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/v1/todos/:todoId/result", async ({ params }) => {
    try {
      const { todoId } = params as { todoId: string };
      const results =
        (await dbService.getAll<DBTodoResult>("todoResults")) || [];
      const found = (results as DBTodoResult[]).find(
        (r) => r.todoId === String(todoId),
      );
      if (!found)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      return HttpResponse.json(found);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.delete("/v1/todos/result/:todoResultId", async ({ params }) => {
    try {
      const { todoResultId } = params as { todoResultId: string };
      await dbService.delete("todoResults", String(todoResultId));
      return HttpResponse.json(undefined, { status: 204 });
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.patch("/v1/todos/:todoId/completion", async ({ params }) => {
    try {
      const { todoId } = params as { todoId: string };
      const existing = (await dbService.get("todos", String(todoId))) as any;
      if (!existing)
        return HttpResponse.json({ message: "no data" }, { status: 404 });
      const updated = {
        ...existing,
        status: existing.status === "COMPLETE" ? "INCOMPLETE" : "COMPLETE",
      };
      await dbService.put("todos", updated);
      return HttpResponse.json({ todoId: updated.id } as TodoIdRs);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),
];

/* -------------------- 인증 API -------------------- */
const authHandlers = [
  http.post("/v1/auth/reissue", async ({ request }) => {
    return HttpResponse.json({
      accessToken: "mock-access",
      refreshToken: "mock-refresh",
    } as any);
  }),

  http.post("/v1/auth/logout", async () => {
    return HttpResponse.json(undefined, { status: 200 });
  }),
];

/* -------------------- 알림, 포인트, 응원, health -------------------- */
const miscHandlers = [
  http.get("/v1/points", async () => {
    try {
      const points = (await dbService.getAll("points")) || [];
      return HttpResponse.json(
        { point: 0 } as PointRs,
        // (points[0] as PointRs) || ({ point: 0 } as PointRs),
      );
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/v1/cheers", async ({ request }) => {
    try {
      const p = (await dbService.getAll("cheers")) || [];
      const url = new URL(request.url);
      const targetType = url.searchParams.get("targetType");
      const targetId = url.searchParams.get("targetId");
      if (!targetType)
        return HttpResponse.json({ cheerPhrase: "힘내세요!" } as CheerPhraseRs);
      const list = (p as any[]).filter(
        (c) => c.targetType === targetType && c.targetId === targetId,
      );
      return HttpResponse.json(list as any[]);
    } catch (e) {
      return HttpResponse.json(
        { message: `${e}` + "api error" },
        { status: 500 },
      );
    }
  }),

  http.get("/health", async () => {
    return HttpResponse.text("ok");
  }),

  http.get("/v1/notifications", async () => {
    return HttpResponse.json({
      content: [],
      /** @format int64 */
      totalCount: 0,
      /** @format int32 */
      totalPage: 1,
      /** @format int32 */
      page: 0,
      /** @format int32 */
      size: 1,
    });
  }),
];

/* -------------------- 합치기 및 export -------------------- */
const guestHandlers = [
  ...userHandlers,
  ...goalHandlers,
  ...subGoalHandlers,
  ...todoHandlers,
  ...authHandlers,
  ...miscHandlers,
];

export default guestHandlers;
