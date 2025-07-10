import { Api, HttpClient } from './api/generated/motimo/Api';
import useAuthStore from './stores/useAuthStore';
import useSWR, { SWRConfiguration } from 'swr';

// HTTP 클라이언트 생성 시 인증 헤더를 자동으로 추가하는 securityWorker 설정
const httpClient = new HttpClient({
  baseUrl: 'http://158.179.175.134:8080',
  securityWorker: () => {
    const token = useAuthStore.getState().accessToken;
    
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    
    return {};
  },
});

// API 클라이언트 인스턴스 생성
export const api = new Api(httpClient);

// 개별 API 그룹들을 직접 export하여 사용하기 편하게 함
export const todoApi = api.투두Api;
export const goalApi = api.목표Api;
export const subGoalApi = api.세부목표Api;
export const groupApi = api.그룹Api;
export const pokeApi = api.찌르기Api;
export const authApi = api.authController;
export const userApi = api.사용자Api;
export const pointApi = api.포인트Api;
export const cheerApi = api.응원Api;
export const healthApi = api.healthController;

// API 클라이언트 타입 정의
type ApiClient = typeof api;
type ApiGroup = keyof ApiClient;
type ApiMethod<T extends ApiGroup> = keyof ApiClient[T];

// API 메서드의 반환 타입 추출
type ApiMethodReturnType<
  T extends ApiGroup,
  M extends ApiMethod<T>
> = ApiClient[T][M] extends (...args: any[]) => Promise<infer R> ? R : never;

// API 메서드의 파라미터 타입 추출
type ApiMethodParams<
  T extends ApiGroup,
  M extends ApiMethod<T>
> = ApiClient[T][M] extends (...args: infer P) => any ? P : never;

// SWR Key 타입
type SWRKey = readonly unknown[];

// Dynamic API Query Hook
export function useApiQuery<
  TApiGroup extends ApiGroup,
  TMethod extends ApiMethod<TApiGroup>
>(
  apiGroup: TApiGroup,
  method: TMethod,
  params: ApiMethodParams<TApiGroup, TMethod> | null = null,
  swrKey?: SWRKey,
  config?: SWRConfiguration<ApiMethodReturnType<TApiGroup, TMethod>>
) {
  // SWR 키 생성: swrKey가 제공되면 사용, 아니면 [apiGroup, method, ...params] 형태로 생성
  const key = swrKey || (params ? [apiGroup, method, ...params] : [apiGroup, method]);
  
  return useSWR<ApiMethodReturnType<TApiGroup, TMethod>>(
    // params가 null이면 요청하지 않음 (조건부 fetching)
    params === null ? null : key,
    params === null ? null : async () => {
      const apiGroupInstance = api[apiGroup] as any;
      const methodFunction = apiGroupInstance[method] as any;
      
      if (typeof methodFunction !== 'function') {
        throw new Error(`Method ${String(method)} not found in ${String(apiGroup)}`);
      }
      
      // params가 배열이면 spread, 아니면 그대로 전달
      return Array.isArray(params) && params.length > 0 
        ? methodFunction(...params)
        : methodFunction();
    },
    config
  );
}

// Convenience hooks for common patterns
export const useQuery = {
  // Todo API
  myTodos: (config?: SWRConfiguration) => 
    useApiQuery('투두Api', 'getMyTodos', [], undefined, config),
  
  todoResult: (todoId: string | null, config?: SWRConfiguration) => 
    useApiQuery('투두Api', 'getTodoResult', todoId ? [todoId] : null, undefined, config),

  // Goal API  
  goals: (config?: SWRConfiguration) => 
    useApiQuery('목표Api', 'getGoalList', [], undefined, config),
    
  goalDetail: (goalId: string | null, config?: SWRConfiguration) => 
    useApiQuery('목표Api', 'getGoalDetail', goalId ? [goalId] : null, undefined, config),
    
  goalWithSubGoals: (goalId: string | null, config?: SWRConfiguration) => 
    useApiQuery('목표Api', 'getGoalWithSubGoalAndTodo', goalId ? [goalId] : null, undefined, config),
    
  goalsNotInGroup: (config?: SWRConfiguration) => 
    useApiQuery('목표Api', 'getGoalNotJoinGroup', [], undefined, config),

  // Sub Goal API
  subGoalTodos: (subGoalId: string | null, config?: SWRConfiguration) => 
    useApiQuery('세부목표Api', 'getIncompleteOrTodayTodos', subGoalId ? [subGoalId] : null, undefined, config),

  // User API
  myProfile: (config?: SWRConfiguration) => 
    useApiQuery('사용자Api', 'getMyProfile', [], undefined, config),

  // Group API
  groupMembers: (groupId: string | null, config?: SWRConfiguration) => 
    useApiQuery('그룹Api', 'getGroupMembers', groupId ? [groupId] : null, undefined, config),
    
  groupChat: (groupId: string | null, page: number, size: number, config?: SWRConfiguration) => 
    useApiQuery('그룹Api', 'getGroupChat', groupId ? [groupId, { page, size }] : null, undefined, config),
    
  joinedGroups: (config?: SWRConfiguration) => 
    useApiQuery('그룹Api', 'getJoinedGroup', [], undefined, config),

  // Point & Cheer API
  points: (config?: SWRConfiguration) => 
    useApiQuery('포인트Api', 'getPoint', [], undefined, config),
    
  cheerPhrase: (config?: SWRConfiguration) => 
    useApiQuery('응원Api', 'getCheerPhrase', [], undefined, config),
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
export const useJoinedGroups = useQuery.joinedGroups;
export const usePoints = useQuery.points;
export const useCheerPhrase = useQuery.cheerPhrase;

export default api; 