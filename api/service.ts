import { Api, HttpClient } from "./generated/motimo/Api";
import useAuthStore from "../stores/useAuthStore";

// HTTP 클라이언트 생성 시 인증 헤더를 자동으로 추가하는 securityWorker 설정
const httpClient = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  securityWorker: () => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        format: "json",
      };
    }

    return {};
  },
});

// API 클라이언트 인스턴스 생성
export const api = new Api(httpClient);

// API 클라이언트 타입 정의
export type ApiClient = typeof api;
export type ApiGroup = keyof ApiClient;
export type ApiMethod<T extends ApiGroup> = keyof ApiClient[T];

// API 메서드의 반환 타입 추출
export type ApiMethodReturnType<
  T extends ApiGroup,
  M extends ApiMethod<T>,
> = ApiClient[T][M] extends (...args: any[]) => Promise<infer R> ? R : never;

// API 메서드의 파라미터 타입 추출
export type ApiMethodParams<
  T extends ApiGroup,
  M extends ApiMethod<T>,
> = ApiClient[T][M] extends (...args: infer P) => any ? P : never;

// 개별 API 그룹들을 직접 export하여 사용하기 편하게 함
export const userApi = api.사용자Api;
export const todoApi = api.투두Api;
export const goalApi = api.목표Api;
export const subGoalApi = api.세부목표Api;
export const groupApi = api.그룹Api;
export const authApi = api.authController;
export const pointApi = api.포인트Api;
export const notificationApi = api.알림Api;
export const cheerApi = api.응원Api;
export const healthApi = api.healthController;

export default api;
