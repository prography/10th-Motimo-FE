import useSWR, { SWRConfiguration } from "swr";
import {
  api,
  ApiGroup,
  ApiMethod,
  ApiMethodReturnType,
  ApiMethodParams,
} from "./service";

// SWR Key 타입
type SWRKey = readonly unknown[];

// Dynamic API Query Hook
export function useApiQuery<
  TApiGroup extends ApiGroup,
  TMethod extends ApiMethod<TApiGroup>,
>(
  apiGroup: TApiGroup,
  method: TMethod,
  params: ApiMethodParams<TApiGroup, TMethod> | null = null,
  swrKey?: SWRKey,
  config?: SWRConfiguration<ApiMethodReturnType<TApiGroup, TMethod>>,
) {
  // SWR 키 생성: swrKey가 제공되면 사용, 아니면 [apiGroup, method, ...params] 형태로 생성
  const key =
    swrKey || (params ? [apiGroup, method, ...params] : [apiGroup, method]);

  return useSWR<ApiMethodReturnType<TApiGroup, TMethod>>(
    // params가 null이면 요청하지 않음 (조건부 fetching)
    params === null ? null : key,
    params === null
      ? null
      : () => {
          const apiGroupInstance = api[apiGroup] as any;

          if (!apiGroupInstance) {
            throw new Error(`API group ${String(apiGroup)} not found`);
          }

          const methodFunction = apiGroupInstance[method] as any;

          if (typeof methodFunction !== "function") {
            throw new Error(
              `Method ${String(method)} not found in ${String(apiGroup)}`,
            );
          }

          // params가 배열이면 spread, 아니면 그대로 전달
          try {
            return Array.isArray(params) && params.length > 0
              ? methodFunction(...params)
              : methodFunction();
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(
              `Failed to call ${String(apiGroup)}.${String(method)}: ${errorMessage}`,
            );
          }
        },
    config,
  );
}
