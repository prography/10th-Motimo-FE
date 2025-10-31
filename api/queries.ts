import type { SWRConfiguration } from "swr";
import { GetGroupChatParamsDirectionEnum } from "./generated/motimo/Api";

export const queryArgs = {
  // Todo API
  myTodos: (config?: SWRConfiguration) =>
    ["투두Api", "getMyTodos", [], undefined, config] as const,

  todoResult: (todoId: string | null, config?: SWRConfiguration) =>
    [
      "투두Api",
      "getTodoResult",
      todoId ? [todoId] : null,
      undefined,
      config,
    ] as const,

  // Goal API
  goals: (config?: SWRConfiguration) =>
    ["목표Api", "getGoalList", [], undefined, config] as const,

  goalDetail: (goalId: string | null, config?: SWRConfiguration) =>
    [
      "목표Api",
      "getGoalDetail",
      goalId ? [goalId] : null,
      undefined,
      config,
    ] as const,

  goalWithSubGoal: (goalId: string | null, config?: SWRConfiguration) =>
    [
      "목표Api",
      "getGoalWithSubGoal",
      goalId ? [goalId] : null,
      undefined,
      config,
    ] as const,

  goalsNotInGroup: (config?: SWRConfiguration) =>
    ["목표Api", "getGoalNotJoinGroup", [], undefined, config] as const,

  completedGoals: (config?: SWRConfiguration) =>
    ["목표Api", "getCompletedGoals", [], undefined, config] as const,

  // // Sub Goal API
  // subGoalTodos: (subGoalId: string | null, config?: SWRConfiguration) =>
  //   useApiQuery(
  //     "세부목표Api",
  //     "getIncompleteOrTodayTodos",
  //     subGoalId ? [subGoalId] : null,
  //     undefined,
  //     config,
  //   ),
  // Sub Goal API
  subGoalTodos: (
    subGoalId: string | null,
    offset: number = 0,
    size: number = 10,
    config?: SWRConfiguration,
  ) =>
    [
      "세부목표Api",
      "getIncompleteOrTodayTodosWithSlice",
      subGoalId ? [subGoalId, { offset, size }] : null,
      undefined,
      config,
    ] as const,

  // Sub Goal API - All todos (complete and incomplete)
  allSubGoalTodos: (
    subGoalId: string | null,
    offset: number = 0,
    size: number = 10,
    config?: SWRConfiguration,
  ) =>
    [
      "세부목표Api",
      "getTodosBySubGoalIdWithSlice",
      subGoalId ? [subGoalId, { offset, size }] : null,
      undefined,
      config,
    ] as const,

  // User API
  myProfile: (config?: SWRConfiguration) =>
    ["사용자Api", "getMyProfile", [], undefined, config] as const,

  // Group API
  groupMembers: (groupId: string | null, config?: SWRConfiguration) =>
    [
      "그룹Api",
      "getGroupMembers",
      groupId ? [groupId] : null,
      undefined,
      config,
    ] as const,

  groupChat: (
    groupId: string | null,
    limit?: string,
    cursor?: string,
    direction?: GetGroupChatParamsDirectionEnum,
    config?: SWRConfiguration,
  ) =>
    [
      "그룹Api",
      "getGroupChat",
      groupId ? [groupId, { limit, cursor, direction }] : null,
      undefined,
      config,
    ] as const,

  groupDetail: (groupId: string | null, config?: SWRConfiguration) =>
    [
      "그룹Api",
      "getGroupDetail",
      groupId ? [groupId] : null,
      undefined,
      config,
    ] as const,

  newGroupMessages: (
    groupId: string | null,
    latestCursor?: string,
    config?: SWRConfiguration,
  ) =>
    [
      "그룹Api",
      "getNewGroupMessages",
      groupId ? [groupId, { latestCursor }] : null,
      undefined,
      config,
    ] as const,

  joinedGroups: (config?: SWRConfiguration) =>
    ["그룹Api", "getJoinedGroups", [], undefined, config] as const,

  // Point & Cheer API
  points: (config?: SWRConfiguration) =>
    ["포인트Api", "getPoint", [], undefined, config] as const,

  cheerPhrase: (config?: SWRConfiguration) =>
    ["응원Api", "getCheerPhrase", [], undefined, config] as const,

  goalWithSubGoalAndTodos: (goalId: string | null, config?: SWRConfiguration) =>
    [
      "목표Api",
      "getGoalWithSubGoalAndTodos",
      goalId ? [goalId] : null,
      undefined,
      config,
    ] as const,

  // Health API
  health: (config?: SWRConfiguration) =>
    ["healthController", "health", [], undefined, config] as const,

  // Notification API
  notifications: (page: number = 0, size: number, config?: SWRConfiguration) =>
    [
      "알림Api",
      "getNotificationList",
      [{ page, size }],
      undefined,
      config,
    ] as const,
};
