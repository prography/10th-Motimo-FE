import { SWRConfiguration } from "swr";
import { useApiQuery } from "./useApiQuery";
import { GetGroupChatParamsDirectionEnum } from "./generated/motimo/Api";

export const useQuery = {
  // Todo API
  myTodos: (config?: SWRConfiguration) =>
    useApiQuery("투두Api", "getMyTodos", [], undefined, config),

  todoResult: (todoId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "투두Api",
      "getTodoResult",
      todoId ? [todoId] : null,
      undefined,
      config,
    ),

  // Goal API
  goals: (config?: SWRConfiguration) =>
    useApiQuery("목표Api", "getGoalList", [], undefined, config),

  goalDetail: (goalId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "목표Api",
      "getGoalDetail",
      goalId ? [goalId] : null,
      undefined,
      config,
    ),

  goalWithSubGoals: (goalId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "목표Api",
      "getGoalWithSubGoalAndTodo",
      goalId ? [goalId] : null,
      undefined,
      config,
    ),

  goalsNotInGroup: (config?: SWRConfiguration) =>
    useApiQuery("목표Api", "getGoalNotJoinGroup", [], undefined, config),

  // Sub Goal API
  subGoalTodos: (subGoalId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "세부목표Api",
      "getIncompleteOrTodayTodos",
      subGoalId ? [subGoalId] : null,
      undefined,
      config,
    ),

  // User API
  myProfile: (config?: SWRConfiguration) =>
    useApiQuery("사용자Api", "getMyProfile", [], undefined, config),

  // Group API
  groupMembers: (groupId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "그룹Api",
      "getGroupMembers",
      groupId ? [groupId] : null,
      undefined,
      config,
    ),

  groupChat: (
    groupId: string | null,
    limit?: string,
    cursor?: string,
    direction?: GetGroupChatParamsDirectionEnum,
    config?: SWRConfiguration,
  ) =>
    useApiQuery(
      "그룹Api",
      "getGroupChat",
      groupId ? [groupId, { limit, cursor, direction }] : null,
      undefined,
      config,
    ),

  groupDetail: (groupId: string | null, config?: SWRConfiguration) =>
    useApiQuery(
      "그룹Api",
      "getGroupDetail",
      groupId ? [groupId] : null,
      undefined,
      config,
    ),

  newGroupMessages: (
    groupId: string | null,
    latestCursor?: string,
    config?: SWRConfiguration,
  ) =>
    useApiQuery(
      "그룹Api",
      "getNewGroupMessages",
      groupId ? [groupId, { latestCursor }] : null,
      undefined,
      config,
    ),

  joinedGroups: (config?: SWRConfiguration) =>
    useApiQuery("그룹Api", "getJoinedGroups", [], undefined, config),

  // Point & Cheer API
  points: (config?: SWRConfiguration) =>
    useApiQuery("포인트Api", "getPoint", [], undefined, config),

  cheerPhrase: (config?: SWRConfiguration) =>
    useApiQuery("응원Api", "getCheerPhrase", [], undefined, config),

  // Notification API
  notifications: (offset: number, limit: number, config?: SWRConfiguration) =>
    useApiQuery(
      "알림Api",
      "getNotificationList",
      [{ offset, limit }],
      undefined,
      config,
    ),
};

// Legacy hooks for backward compatibility (이전 방식과 호환성 유지)
export const useTodos = useQuery.myTodos;
export const useTodoResult = useQuery.todoResult;
export const useGoals = useQuery.goals;
export const useGoalDetail = useQuery.goalDetail;
export const useGoalWithSubGoals = useQuery.goalWithSubGoals;
export const useGoalsNotInGroup = useQuery.goalsNotInGroup;
export const useSubGoalTodos = useQuery.subGoalTodos;
export const useMyProfile = useQuery.myProfile;
export const useGroupMembers = useQuery.groupMembers;
export const useGroupChat = useQuery.groupChat;
export const useGroupDetail = useQuery.groupDetail;
export const useNewGroupMessages = useQuery.newGroupMessages;
export const useJoinedGroups = useQuery.joinedGroups;
export const usePoints = useQuery.points;
export const useCheerPhrase = useQuery.cheerPhrase;
export const useNotifications = useQuery.notifications;
