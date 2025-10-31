import {
  Api,
  HttpClient,
  HttpResponse,
  TokenResponse,
} from "./generated/motimo/Api";
import useAuthStore from "../stores/useAuthStore";
import useToastStore from "@/stores/useToastStore";
import { cookies } from "next/headers";
import { getToken } from "./getToken";
import { getRefreshToken } from "./getRefreshToken";
import { http } from "msw";
import { cache } from "react";
import { redirect } from "next/navigation";

// HTTP 클라이언트 생성 시 인증 헤더를 자동으로 추가하는 securityWorker 설정
const httpClient = new HttpClient({
  baseUrl: (() => {
    return process.env.API_URL || "";
    // return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
  })(),
  securityWorker: async () => {
    if (typeof window === "undefined") {
      const token = await getToken();
      //tset
      // console.log("베리어 넣기");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        format: "json",
      };
    }

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
  const timerDictionary: { [apiFullUrl: string]: number | undefined } = {};
  let rejectTimer: (reason?: any) => void;
  return (
    requestParams: Parameters<typeof httpClient.request<T, E>>[0],
  ): ReturnType<typeof httpClient.request<T>> => {
    const apiFullUrl = `${requestParams.path}?${requestParams.query}`;
    const timer = timerDictionary[apiFullUrl];

    if (timer) {
      clearTimeout(timer);
      rejectTimer();
      // rejectTimer("debouncing");
    }
    const apiRes: Promise<T> = new Promise((resolve, reject) => {
      rejectTimer =
        typeof window === "undefined"
          ? () => {
              console.error("Debouncing On Server");
              resolve(undefined as T); // 서버 환경에서 에러 무시
            }
          : () => reject("debouncing");
      timerDictionary[apiFullUrl] = Number(
        // timer = Number(
        setTimeout(async () => {
          try {
            const res = apiRequest(requestParams);
            timerDictionary[apiFullUrl] = undefined; // timer비워주기..
            resolve(res);
          } catch (error) {
            console.error(error);
            if (typeof window !== "undefined")
              showToast(`API ERROR`, new Date());
          }
        }, timeLimit),
      );
    });

    // 토큰 재발급 처리
    return tokenHandler(apiRes, requestParams, apiRequest);

    // return apiRes;
  };
};

/** 토큰 재발급 처리 */
export interface tokens {
  accessToken: string;
  refreshToken: string;
}
const getTokensStore: () => {
  newTokens: undefined | tokens;
  refreshTokenPromise: undefined | Promise<tokens>;
} = cache(() => {
  return { newTokens: undefined, refreshTokenPromise: undefined };
});

export const pushTokens = (tokens: tokens) => {
  getTokensStore().newTokens = tokens;
};
export const popTokens = () => {
  const tokens = getTokensStore().newTokens;
  getTokensStore().newTokens = undefined;
  return tokens;
};
export const getRefreshTokenPromise = () => {
  return getTokensStore().refreshTokenPromise;
};
export const setRefreshTokenPromise = (
  promise: Promise<tokens> | undefined,
) => {
  getTokensStore().refreshTokenPromise = promise;
};

// 토큰 처리
const tokenHandler = async <T, E>(
  apiRes: ReturnType<typeof httpClient.request<T, E>>,
  requestParams: Parameters<typeof httpClient.request<T, E>>[0],
  apiRequest: typeof httpClient.request<T, E>,
) => {
  return apiRes.catch(async (e) => {
    if (e.status === 401) {
      let refreshToken;
      if (typeof window === "undefined") {
        /** RSC환경에서 병렬 요청에 대해 race condition */

        refreshToken =
          getTokensStore().newTokens?.refreshToken || (await getRefreshToken());
      } else {
        refreshToken = useAuthStore.getState().refreshToken;
      }

      if (!refreshToken) {
        // api.authController.logout();
        // window.location.href = "/";
        if (typeof window === "undefined") {
          redirect("/onboarding");
        }
        throw new Error("no refresh token");
      }

      // 웹뷰용 처리
      // if (window.ReactNativeWebView) {
      //   handleWebViewReissueToken(token);
      //   return;
      // }

      // 웹용 처리
      try {
        let tokenRes;

        if (typeof window === "undefined") {
          let refreshTokenPromise = getRefreshTokenPromise();

          if (!refreshTokenPromise) {
            refreshTokenPromise = api.authController
              .reissue({
                refreshToken: refreshToken,
              })
              .then((newTokens) => {
                const nonNullableNewTokens = {
                  accessToken: "",
                  refreshToken: "",
                  ...newTokens,
                };
                pushTokens(nonNullableNewTokens);
                return nonNullableNewTokens;
              })
              .finally(() => {
                setRefreshTokenPromise(undefined);
              });
            setRefreshTokenPromise(refreshTokenPromise);
          }

          tokenRes = await refreshTokenPromise;
          pushTokens({
            accessToken: tokenRes.accessToken,
            refreshToken: tokenRes.refreshToken,
          });
        } else {
          // 클라이언트 환경에서.
          tokenRes = await api.authController.reissue({
            refreshToken: refreshToken || undefined,
          });
        }

        if (!tokenRes?.accessToken || !tokenRes?.refreshToken) {
          throw new Error("token reissue error");
        }

        return apiRequest({
          ...requestParams,
          secure: false,
          headers: {
            ...requestParams.headers,
            Authorization: `Bearer ${tokenRes.accessToken}`,
          },
        }).then((res) => {
          // if (typeof res === "object" && res && typeof window === "undefined") {
          //   return Object.assign(res, {
          //     newTokens: {
          //       accessToken: tokenRes.accessToken,
          //       refreshToken: tokenRes.refreshToken,
          //     },
          //   });
          // }
          if (typeof window !== "undefined") {
            // 클라 환경 or res가 object 아닐 경우
            useAuthStore.setState((states) => ({
              ...states,
              accessToken: tokenRes.accessToken,
              refreshToken: tokenRes.refreshToken,
            }));
          }

          return res;
        });
      } catch (e) {
        // 원래는 로그아웃 처리도 해야 한다는데? RSC에서는 뭘 해야하나
        console.error("token reisuue error:", e);
        if (typeof window !== "undefined")
          throw new Error("token reissue error On Client");
      }
    }
    throw e;
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
