/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TodoUpdateRq {
  /**
   * 새로운 투두 타이틀
   * @example "영단어 외우기"
   */
  title?: string;
  /**
   * 새로운 투두 완료 날짜
   * @format date
   */
  date?: string;
}

export interface TodoIdRs {
  /**
   * 투두 아이디
   * @format uuid
   */
  todoId?: string;
}

export interface GoalUpdateRq {
  /**
   * 목표 이름
   * @minLength 1
   * @maxLength 20
   * @example "자격증 따기"
   */
  title: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate: string;
  /** 세부 목표 목록 */
  subGoals?: SubGoalUpdateRq[];
}

export interface SubGoalUpdateRq {
  /** 수정할 세부 목표 아이디 */
  id?: string;
  /**
   * 세부 목표 이름
   * @minLength 1
   * @maxLength 20
   * @example "책 한 권 읽기"
   */
  title: string;
  /**
   * 세부 목표 중요도 (상: 1, 하:3)
   * @format int32
   * @min 1
   * @max 3
   */
  importance?: number;
}

export interface GoalIdRs {
  /**
   * 생성/수정된 목표 아이디
   * @format uuid
   */
  id?: string;
}

export interface TodoResultRq {
  /**
   * 투두 진행 후 감정
   * @example "PROUD"
   */
  emotion: TodoResultRqEmotionEnum;
  /**
   * 투두 내용
   * @example "영어 단어를 10개를 외웠다."
   */
  content?: string;
}

export interface TodoResultIdRs {
  /**
   * 투두 결과 아이디
   * @format uuid
   */
  todoResultId?: string;
}

export interface TodoCreateRq {
  /**
   * 투두 제목
   * @minLength 1
   * @maxLength 20
   * @example "영단어 10개 이상 외우기"
   */
  title: string;
  /**
   * 투두 완료 날짜
   * @format date
   */
  date?: string;
}

export interface GoalCreateRq {
  /**
   * 목표 이름
   * @minLength 1
   * @maxLength 20
   * @example "자격증 따기"
   */
  title: string;
  /** 개월 수로 기간 설정 여부 */
  isPeriodByMonth: boolean;
  /**
   * 목표 개월 수
   * @format int32
   * @min 1
   * @max 12
   */
  month?: number;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate?: string;
  /** 세부 목표 목록 */
  subGoals?: SubGoalCreateRq[];
}

export interface SubGoalCreateRq {
  /**
   * 세부 목표 이름
   * @minLength 1
   * @maxLength 20
   * @example "책 한 권 읽기"
   */
  title: string;
  /**
   * 세부 목표 중요도 (상: 1, 하:3)
   * @format int32
   * @min 1
   * @max 3
   */
  importance?: number;
}

export interface TokenReissueRq {
  refreshToken?: string;
}

export interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export interface SubGoalIdRs {
  /**
   * 생성/수정된 세부 목표 아이디
   * @format uuid
   */
  id?: string;
}

export interface CustomSlice {
  content?: object[];
  hasNext?: boolean;
}

export interface TodoRs {
  /**
   * 투두 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id?: string;
  /**
   * 투두 제목
   * @example "영단어 10개 이상 외우기"
   */
  title?: string;
  /**
   * 투두 완료 날짜
   * @format date
   */
  date?: string;
  /**
   * 투두 상태
   * @example "COMPLETE"
   */
  status?: TodoRsStatusEnum;
  /**
   * 투두 기록 아이디
   * @format uuid
   * @example "0203157f-aea4-77bb-8581-3213eb6bd2ae"
   */
  todoResultId?: string;
  /**
   * 투두 생성 날짜
   * @format date-time
   */
  createdAt?: string;
}

export interface TodoResultRs {
  /**
   * 투두 결과 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  todoResultId?: string;
  /**
   * 투두 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  todoId?: string;
  /**
   * 투두 진행 후 감정
   * @example "뿌듯"
   */
  emotion?: TodoResultRsEmotionEnum;
  /**
   * 투두 설명
   * @example "영단어 10개 이상 외우기를 했다."
   */
  content?: string;
  /** 투두 관련 파일 url */
  fileUrl?: string;
}

export interface PointRs {
  /**
   * 사용자가 현재 획득한 포인트
   * @format int32
   * @example 1000
   */
  point?: number;
}

export interface GoalItemRs {
  /**
   * 목표 아이디
   * @format uuid
   */
  id?: string;
  /**
   * 목표 이름
   * @example "자격증 따기"
   */
  title?: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate?: string;
  /**
   * 목표 달성률 (%)
   * @format float
   * @example 24.5
   */
  progress?: number;
}

export interface GoalListRs {
  /** 목표 목록 */
  goals?: GoalItemRs[];
}

export interface GoalDetailRs {
  /**
   * 목표 아이디
   * @format uuid
   */
  id?: string;
  /**
   * 목표 이름
   * @example "자격증 따기"
   */
  title?: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate?: string;
  /**
   * 목표 달성률 (%)
   * @format float
   * @example 24.5
   */
  progress?: number;
  /** 목표 완료 여부 */
  isCompleted?: boolean;
  /** 그룹 참여 여부 */
  isJoinedGroup?: boolean;
}

export interface GoalWithSubGoalTodoRs {
  /**
   * 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2aq"
   */
  id?: string;
  /**
   * 목표 이름
   * @example "자격증 따기"
   */
  title?: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate?: string;
  /** 세부 목표 목록 */
  subGoals?: SubGoalRs[];
}

export interface SubGoalRs {
  /**
   * 세부 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id?: string;
  /**
   * 세부 목표 이름
   * @example "책 한 권 끝내기"
   */
  title?: string;
  /** 세부 목표에 해당하는 투두 목록 */
  todos?: TodoRs[];
}

export interface CheerPhraseRs {
  /**
   * 응원 문구
   * @example "목표는 멀어도 나는 계속 가는중"
   */
  cheerPhrase?: string;
}

/**
 * 투두 진행 후 감정
 * @example "PROUD"
 */
export enum TodoResultRqEmotionEnum {
  PROUD = "PROUD",
  REGRETFUL = "REGRETFUL",
  IMMERSED = "IMMERSED",
  GROWN = "GROWN",
}

/**
 * 투두 상태
 * @example "COMPLETE"
 */
export enum TodoRsStatusEnum {
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE",
}

/**
 * 투두 진행 후 감정
 * @example "뿌듯"
 */
export enum TodoResultRsEmotionEnum {
  PROUD = "PROUD",
  REGRETFUL = "REGRETFUL",
  IMMERSED = "IMMERSED",
  GROWN = "GROWN",
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://158.179.175.134:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Motimo API List
 * @version 1.0.0
 * @baseUrl http://158.179.175.134:8080
 *
 * 모티모 API 목록입니다.
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  투두Api = {
    /**
     * @description 투두 내용을 수정합니다.
     *
     * @tags 투두 API
     * @name UpdateTodo
     * @summary 투두 업데이트
     * @request PUT:/v1/todos/{todoId}
     * @secure
     * @response `204` `TodoIdRs` 투두 내용 수정 성공
     * @response `401` `TodoIdRs` 인증되지 않은 사용자
     * @response `403` `TodoIdRs` 투두 수정에 대한 권한이 없는 사용자
     * @response `404` `TodoIdRs` 투두를 찾을 수 없음
     */
    updateTodo: (
      todoId: string,
      data: TodoUpdateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<TodoIdRs, TodoIdRs>({
        path: `/v1/todos/${todoId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 특정 투두를 삭제합니다.
     *
     * @tags 투두 API
     * @name DeleteById
     * @summary 투두 삭제
     * @request DELETE:/v1/todos/{todoId}
     * @secure
     * @response `204` `void` TODO 삭제 성공
     * @response `401` `void` 인증되지 않은 사용자
     * @response `403` `void` 투두 삭제에 대한 권한이 없는 사용자
     * @response `404` `void` TODO를 찾을 수 없음
     */
    deleteById: (todoId: string, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/v1/todos/${todoId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 투두의 결과(기록)를 조회합니다.
     *
     * @tags 투두 API
     * @name GetTodoResult
     * @summary 투두 결과(기록) 조회
     * @request GET:/v1/todos/{todoId}/result
     * @secure
     * @response `200` `TodoResultRs` TODO 결과 조회 성공
     * @response `204` `TodoResultRs` 결과 없음
     * @response `404` `TodoResultRs` TODO를 찾을 수 없음
     */
    getTodoResult: (todoId: string, params: RequestParams = {}) =>
      this.http.request<TodoResultRs, TodoResultRs>({
        path: `/v1/todos/${todoId}/result`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 투두 수행 결과를 제출합니다. 파일을 첨부할 수 있습니다.
     *
     * @tags 투두 API
     * @name UpsertTodoResult
     * @summary 투두 결과(기록) 제출하기
     * @request POST:/v1/todos/{todoId}/result
     * @secure
     * @response `200` `TodoResultIdRs` TODO 결과 제출 성공
     * @response `400` `TodoResultIdRs` 잘못된 요청 데이터
     * @response `401` `TodoResultIdRs` 인증되지 않은 사용자
     * @response `404` `TodoResultIdRs` TODO를 찾을 수 없음
     */
    upsertTodoResult: (
      todoId: string,
      data: {
        request: TodoResultRq;
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<TodoResultIdRs, TodoResultIdRs>({
        path: `/v1/todos/${todoId}/result`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 투두 완료 상태를 토글합니다.
     *
     * @tags 투두 API
     * @name ToggleTodoCompletion
     * @summary 투두 완료 상태 변경
     * @request PATCH:/v1/todos/{todoId}/completion
     * @secure
     * @response `204` `TodoIdRs` TODO 완료 상태 변경 성공
     * @response `401` `TodoIdRs` 인증되지 않은 사용자
     * @response `403` `TodoIdRs` 투두 수정에 대한 권한이 없는 사용자
     * @response `404` `TodoIdRs` TODO를 찾을 수 없음
     */
    toggleTodoCompletion: (todoId: string, params: RequestParams = {}) =>
      this.http.request<TodoIdRs, TodoIdRs>({
        path: `/v1/todos/${todoId}/completion`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 투두 결과를 삭제합니다.
     *
     * @tags 투두 API
     * @name DeleteTodoResultById
     * @summary 투두 결과 삭제
     * @request DELETE:/v1/todos/result/{todoResultId}
     * @secure
     * @response `204` `void` TODO 결과 삭제 성공
     * @response `401` `void` 인증되지 않은 사용자
     * @response `403` `void` 투두 결과 삭제에 대한 권한이 없는 사용자
     * @response `404` `void` TODO 결과를 찾을 수 없음
     */
    deleteTodoResultById: (todoResultId: string, params: RequestParams = {}) =>
      this.http.request<void, void>({
        path: `/v1/todos/result/${todoResultId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  목표Api = {
    /**
     * @description 목표를 수정합니다.
     *
     * @tags 목표 API
     * @name UpdateGoal
     * @summary 목표 수정 API
     * @request PUT:/v1/goals/{id}
     * @secure
     * @response `200` `GoalIdRs` OK
     */
    updateGoal: (id: string, data: GoalUpdateRq, params: RequestParams = {}) =>
      this.http.request<GoalIdRs, any>({
        path: `/v1/goals/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 목표 목록을 조회합니다.
     *
     * @tags 목표 API
     * @name GetGoalList
     * @summary 목표 목록 API
     * @request GET:/v1/goals
     * @secure
     * @response `200` `GoalListRs` OK
     */
    getGoalList: (params: RequestParams = {}) =>
      this.http.request<GoalListRs, any>({
        path: `/v1/goals`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 목표를 생성합니다.
     *
     * @tags 목표 API
     * @name CreateGoal
     * @summary 목표 생성 API
     * @request POST:/v1/goals
     * @secure
     * @response `201` `GoalIdRs` Created
     */
    createGoal: (data: GoalCreateRq, params: RequestParams = {}) =>
      this.http.request<GoalIdRs, any>({
        path: `/v1/goals`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 목표를 완료합니다.
     *
     * @tags 목표 API
     * @name GoalComplete
     * @summary 목표 완료 API
     * @request PATCH:/v1/goals/{goalId}/completion
     * @secure
     * @response `200` `GoalIdRs` 완료 처리 성공
     * @response `400` `GoalIdRs` 목표 완료 조건이 충족되지 않음
     * @response `403` `GoalIdRs` 완료 처리 권한 없음
     * @response `404` `GoalIdRs` 목표를 찾을 수 없음
     */
    goalComplete: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalIdRs, GoalIdRs>({
        path: `/v1/goals/${goalId}/completion`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 목표 API
     * @name GetGoalDetail
     * @request GET:/v1/goals/{goalId}
     * @secure
     * @response `200` `GoalDetailRs` OK
     */
    getGoalDetail: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalDetailRs, any>({
        path: `/v1/goals/${goalId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 목표에 해당하는 세부 목표와 투두 목록을 조회합니다.
     *
     * @tags 목표 API
     * @name GetTodoListByGoal
     * @summary 목표 투두 목록 API
     * @request GET:/v1/goals/{goalId}/sub-goals/all
     * @secure
     * @response `200` `GoalWithSubGoalTodoRs` OK
     */
    getTodoListByGoal: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalWithSubGoalTodoRs, any>({
        path: `/v1/goals/${goalId}/sub-goals/all`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  세부목표Api = {
    /**
     * @description 세부 목표에 새로운 TODO를 생성합니다.
     *
     * @tags 세부 목표 API
     * @name CreateTodo
     * @summary TODO 생성
     * @request POST:/v1/sub-goals/{subGoalId}/todo
     * @secure
     * @response `201` `TodoIdRs` TODO 생성 성공
     * @response `400` `TodoIdRs` 잘못된 요청 데이터
     * @response `401` `TodoIdRs` 인증되지 않은 사용자
     */
    createTodo: (
      subGoalId: string,
      data: TodoCreateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<TodoIdRs, TodoIdRs>({
        path: `/v1/sub-goals/${subGoalId}/todo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 세부 목표를 완료/완료 취소 합니다.
     *
     * @tags 세부 목표 API
     * @name SubGoalCompleteToggle
     * @summary 세부 목표 완료/완료 취소 API
     * @request PATCH:/v1/sub-goals/{subGoalId}/completion/toggle
     * @secure
     * @response `200` `SubGoalIdRs` 완료/취소 처리 성공
     * @response `403` `SubGoalIdRs` 완료 처리 권한 없음
     * @response `404` `SubGoalIdRs` 세부 목표를 찾을 수 없음
     */
    subGoalCompleteToggle: (subGoalId: string, params: RequestParams = {}) =>
      this.http.request<SubGoalIdRs, SubGoalIdRs>({
        path: `/v1/sub-goals/${subGoalId}/completion/toggle`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 세부 목표의 TODO 목록을 조회합니다.
     *
     * @tags 세부 목표 API
     * @name GetIncompleteOrTodayTodos
     * @summary 세부 목표별 TODO 목록 조회
     * @request GET:/v1/sub-goals/{subGoalId}/todos/incomplete-or-date
     * @secure
     * @response `200` `CustomSlice` TODO 목록 조회 성공
     * @response `400` `(TodoRs)[]` 잘못된 요청 데이터
     */
    getIncompleteOrTodayTodos: (
      subGoalId: string,
      params: RequestParams = {},
    ) =>
      this.http.request<CustomSlice, TodoRs[]>({
        path: `/v1/sub-goals/${subGoalId}/todos/incomplete-or-date`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  authController = {
    /**
     * @description refresh token을 통한 토큰 재발급 API
     *
     * @tags auth-controller
     * @name Reissue
     * @summary 토큰 재발급
     * @request POST:/v1/auth/reissue
     * @secure
     * @response `200` `TokenResponse` OK
     */
    reissue: (data: TokenReissueRq, params: RequestParams = {}) =>
      this.http.request<TokenResponse, any>({
        path: `/v1/auth/reissue`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자 로그아웃 API
     *
     * @tags auth-controller
     * @name Logout
     * @summary 로그아웃
     * @request POST:/v1/auth/logout
     * @secure
     * @response `200` `void` OK
     */
    logout: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  사용자Api = {
    /**
     * @description 로그인한 사용자의 TODO 목록을 조회합니다.
     *
     * @tags 사용자 API
     * @name GetMyTodos
     * @summary 나의 TODO 목록 조회
     * @request GET:/v1/users/me/todos
     * @secure
     * @response `200` `CustomSlice` TODO 목록 조회 성공
     * @response `400` `(TodoRs)[]` 잘못된 요청 데이터
     * @response `401` `(TodoRs)[]` 인증되지 않은 사용자
     */
    getMyTodos: (params: RequestParams = {}) =>
      this.http.request<CustomSlice, TodoRs[]>({
        path: `/v1/users/me/todos`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  포인트Api = {
    /**
     * @description 사용자가 획득한 포인트를 조회합니다.
     *
     * @tags 포인트 API
     * @name GetPoint
     * @summary 현재 획득한 포인트 조회 API
     * @request GET:/v1/points
     * @secure
     * @response `200` `PointRs` OK
     */
    getPoint: (params: RequestParams = {}) =>
      this.http.request<PointRs, any>({
        path: `/v1/points`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  응원Api = {
    /**
     * @description 응원 문구를 랜덤 조회합니다.
     *
     * @tags 응원 API
     * @name GetCheerPhrase
     * @summary 응원 문구 조회 API
     * @request GET:/v1/cheers
     * @secure
     * @response `200` `CheerPhraseRs` OK
     */
    getCheerPhrase: (params: RequestParams = {}) =>
      this.http.request<CheerPhraseRs, any>({
        path: `/v1/cheers`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  healthController = {
    /**
     * No description
     *
     * @tags health-controller
     * @name Health
     * @request GET:/health
     * @secure
     * @response `200` `string` OK
     */
    health: (params: RequestParams = {}) =>
      this.http.request<string, any>({
        path: `/health`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
