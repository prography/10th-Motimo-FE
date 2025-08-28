import { Api, HttpClient, HttpResponse } from "./generated/motimo/Api";
import useAuthStore from "../stores/useAuthStore";
import useToastStore from "@/stores/useToastStore";

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

    const isGuest = useAuthStore.getState().isGuest;
    // 게스트거나 토큰 만료의 경우
    if (isGuest || !token) {
      return { format: "json" };
    }

    // 임의의 경우를 위해 남겨둠.
    return {};
  },
});

// 비동기 에러 시 toast 띄우기
const showToast = (content: string, createdAt: Date) => {
  useToastStore.getState().updateToastInfo({ content, createdAt });
};

// Debouncer 감싸도 될 것 같은데?
const debounceer = <T, E>(apiRequest: typeof httpClient.request<T, E>) => {
  const timeLimit = 300;
  const timerDictionary: { [apiFullUrl: string]: number } = {};
  let rejectTimer: (reason?: any) => void;
  return (
    requestParams: Parameters<typeof httpClient.request<T, E>>[0],
  ): ReturnType<typeof httpClient.request<T>> => {
    const apiFullUrl = `${requestParams.path}?${requestParams.query}`;
    const timer = timerDictionary[apiFullUrl];

    if (timer) {
      clearTimeout(timer);
      rejectTimer("debouncing");
    }
    const apiRes: Promise<T> = new Promise((resolve, reject) => {
      rejectTimer = reject;
      timerDictionary[apiFullUrl] = Number(
        // timer = Number(
        setTimeout(async () => {
          try {
            const res = apiRequest(requestParams);
            resolve(res);
          } catch (error) {
            console.error(error);
            showToast(`API ERROR`, new Date());
          }
        }, timeLimit),
      );
    });

    // 토큰 재발급 처리
    tokenHandler(apiRes);

    return apiRes;
  };
};
// 토큰 처리
const tokenHandler = async <T, E>(
  apiRes: ReturnType<typeof httpClient.request<T, E>>,
) => {
  return apiRes.catch(async (e) => {
    if (e.status === 401) {
      const token = useAuthStore.getState().refreshToken;

      if (!token) {
        // api.authController.logout();
        // window.location.href = "/";
        throw new Error("no refresh token");
      }
      const tokenRes = await api.authController.reissue({
        refreshToken: token,
      });

      if (!tokenRes?.accessToken || !tokenRes?.refreshToken) {
        throw new Error("token reissue error");
      }

      useAuthStore.setState((states) => ({
        ...states,
        accessToken: tokenRes.accessToken,
        refreshToken: tokenRes.refreshToken,
      }));
    }
  });
};
httpClient.request = debounceer(httpClient.request);

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
