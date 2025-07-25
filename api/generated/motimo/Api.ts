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

export interface UserUpdateRq {
  /**
   * 변경할 유저 이름
   * @example "user name"
   */
  userName?: string;
  /**
   * 한줄 소개
   * @example "안녕하세요."
   */
  bio?: string;
  /**
   * 유저 관심사 목록
   * @uniqueItems true
   * @example ["HEALTH","PROGRAMMING","SPORTS"]
   */
  interests?: UserUpdateRqInterestsEnum[];
}

export interface UserIdRs {
  /**
   * 유저 아이디
   * @format uuid
   */
  userId?: string;
}

export interface ErrorResponse {
  /** @format int32 */
  statusCode?: number;
  message?: string;
}

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
  /** 수정/생성할 세부 목표 목록 */
  subGoals?: SubGoalUpdateRq[];
  /**
   * 삭제할 세부 목표 아이디 목록
   * @uniqueItems true
   */
  deletedSubGoalIds?: string[];
}

export interface SubGoalUpdateRq {
  /**
   * 수정할 세부 목표 아이디 / 새로 생성이면 null
   * @format uuid
   */
  id?: string;
  /**
   * 세부 목표 이름
   * @minLength 1
   * @maxLength 20
   * @example "책 한 권 읽기"
   */
  title: string;
  /**
   * 세부 목표 순서
   * @format int32
   */
  order: number;
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

export interface GroupJoinRq {
  /**
   * 그룹에 가입할 목표 아이디
   * @format uuid
   */
  goalId?: string;
}

export interface GroupIdRs {
  /**
   * 가입된 그룹 아이디
   * @format uuid
   */
  id: string;
}

export interface GroupMessageIdRs {
  /**
   * 영향을 받은 그룹 채팅 아이디
   * @format uuid
   */
  id: string;
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
}

export interface SubGoalIdRs {
  /**
   * 생성/수정된 세부 목표 아이디
   * @format uuid
   */
  id?: string;
}

export interface TokenReissueRq {
  refreshToken?: string;
}

export interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInterestsRq {
  /**
   * 유저 관심사 목록
   * @uniqueItems true
   * @example ["HEALTH","PROGRAMMING","SPORTS"]
   */
  interests?: UserInterestsRqInterestsEnum[];
}

export interface UserRs {
  /**
   * 유저 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id?: string;
  /** 유저 이메일 */
  email?: string;
  /** 유저 닉네임 */
  nickname?: string;
  /** 유저 한줄 소개 */
  bio?: string;
  /** 유저 프로필 이미지 url */
  profileImageUrl?: string;
  /**
   * 유저 관심사 목록
   * @uniqueItems true
   */
  interestTypes?: UserRsInterestTypesEnum[];
  /**
   * 유저 생성 날짜
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
   * 투두 진행 후 감정
   * @example "PROUD"
   */
  emotion?: TodoResultRsEmotionEnum;
  /**
   * 투두 설명
   * @example "영단어 10개 이상 외우기를 했다."
   */
  content?: string;
  /** 투두 기록 파일 url */
  fileUrl?: string;
  /** 투두 기록 파일 이름 */
  fileName?: string;
  /** 투두 기록 파일 데이터 종류 */
  fileMimeType?: string;
}

export interface TodoRs {
  /**
   * 투두 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id: string;
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
  /** 투두 기록 정보 */
  todoResult?: TodoResultRs;
  /**
   * 투두 생성 날짜
   * @format date-time
   */
  createdAt?: string;
}

export interface CustomSliceTodoRs {
  content?: TodoRs[];
  hasNext?: boolean;
  /** @format int32 */
  offset?: number;
  /** @format int32 */
  size?: number;
}

export interface PointRs {
  /**
   * 사용자가 현재 획득한 포인트
   * @format int32
   * @example 1000
   */
  point?: number;
}

export interface CustomPageNotificationItemRs {
  content?: NotificationItemRs[];
  /** @format int64 */
  totalCount?: number;
  /** @format int32 */
  totalPage?: number;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
}

export interface NotificationItemRs {
  /**
   * 알림 아이디입니다.
   * @format uuid
   */
  id?: string;
  /** 알림 내용 전체입니다. */
  content?: string;
  /** 알림 타입입니다. */
  type?: NotificationItemRsTypeEnum;
  /**
   * 알림과 연결되는 항목의 아이디입니다.
   * @format uuid
   */
  referenceId?: string;
  /** 읽음 여부입니다. */
  isRead?: boolean;
}

export interface GroupDetailRs {
  /**
   * 그룹 아이디
   * @format uuid
   */
  groupId: string;
  /** 그룹 이름 (현재는 목표와 동일) */
  name: string;
}

/** 새 메시지 카운트 및 최신 메세지 커서 응답 */
export interface NewMessageRs {
  /** 새 메시지 존재 여부 */
  hasNewMessages?: boolean;
  /**
   * 새 메시지 개수
   * @format int32
   */
  newMessageCount?: number;
  /**
   * 가장 최신 메시지 시각
   * @format date-time
   */
  latestMessageTime?: string;
  /**
   * 가장 최신 메시지 커서
   * @example "MDE5..."
   */
  latestMessageCursor?: string;
}

export interface GroupMemberRs {
  /**
   * 사용자 아이디
   * @format uuid
   */
  userId: string;
  /** 사용자 닉네임 */
  nickname: string;
  /**
   * 마지막 접속일
   * @format date-time
   */
  lastOnlineDate: string;
  /** 찌르기 활성화 여부, 본인이면 null */
  isActivePoke?: boolean;
}

export type GoalTitleUpdatedContent = GroupMessageContent & {
  /** @format uuid */
  goalId?: string;
  goalTitle?: string;
};

/** 그룹 메시지 응답 */
export interface GroupChatRs {
  /** 메시지 목록 */
  messages?: GroupMessageItemRs[];
  /** 이전 메시지 요청용 커서 */
  prevCursor?: string;
  /** 다음 메시지 요청용 커서 */
  nextCursor?: string;
  /** 이전 메시지 존재 여부 */
  hasBefore?: boolean;
  /** 다음 메시지 존재 여부 */
  hasAfter?: boolean;
}

export type GroupJoinContent = GroupMessageContent;

export type GroupLeaveContent = GroupMessageContent;

export interface GroupMessageContent {
  type?: GroupMessageContentTypeEnum;
}

/**
 *         그룹 메시지 내용
 *         - JOIN: 그룹 참여 메시지UUID
 *         - LEAVE: 그룹 탈퇴 메시지
 *         - TODO_COMPLETED: 할일 완료 메시지 (todoId, todoTitle 포함)
 *         - TODO_RESULT_SUBMITTED: 할일 결과 제출 메시지 (todoId, todoTitle, result(emotion, content, fileUrl) 포함)
 */
export type GroupMessageContentRs = BaseGroupMessageContentRs &
  (
    | BaseGroupMessageContentRsTypeMapping<"JOIN", GroupJoinContent>
    | BaseGroupMessageContentRsTypeMapping<"LEAVE", GroupLeaveContent>
    | BaseGroupMessageContentRsTypeMapping<
        "TODO_COMPLETED",
        TodoCompletedContent
      >
    | BaseGroupMessageContentRsTypeMapping<
        "TODO_RESULT_SUBMITTED",
        TodoResultSubmittedContent
      >
  );

export interface GroupMessageItemRs {
  /**
   * 메시지 아이디
   * @format uuid
   */
  messageId: string;
  /**
   * 보낸 사용자 아이디
   * @format uuid
   */
  userId: string;
  /** 보낸 사용자 닉네임 */
  userName: string;
  /** 메세지 내용 */
  message: GroupMessageContentRs;
  /**
   * 리액션 갯수
   * @format int32
   */
  reactionCount: number;
  /** 로그인한 사용자 리액션 여부 */
  hasUserReacted: boolean;
  /**
   * 메세지를 보낸 시간
   * @format date-time
   */
  sendAt: string;
}

export type MessageReactionContent = GroupMessageContent & {
  /** @format uuid */
  referenceMessageId?: string;
  reactionType?: MessageReactionContentReactionTypeEnum;
};

export type TodoCompletedContent = GroupMessageContent & {
  /** @format uuid */
  todoId?: string;
  todoTitle?: string;
};

export type TodoResultSubmittedContent = GroupMessageContent & {
  /** @format uuid */
  todoId?: string;
  todoTitle?: string;
  /** @format uuid */
  todoResultId?: string;
  emotion?: TodoResultSubmittedContentEmotionEnum;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  mimeType?: string;
};

export interface JoinedGroupRs {
  /**
   * 그룹 아이디
   * @format uuid
   */
  groupId: string;
  /** 그룹 이름 (현재는 목표와 동일) */
  name: string;
  /**
   * 그룹 마지막 활동 날짜
   * @format date-time
   */
  lastActiveDate?: string;
  /** 알림 활성화 여부 - 현재는 true 고정(미개발) */
  isNotificationActive: boolean;
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
  dueDate?: GoalDueDateRs;
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
  /**
   * 그룹 아이디
   * @format uuid
   */
  groupId?: string;
}

export interface GoalDueDateRs {
  /** 목표 완료 날짜 개월수로 설정 여부 */
  isMonth?: boolean;
  /**
   * 목표 완료 개월수
   * @format int32
   */
  month?: number;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate?: string;
}

export interface GoalWithSubGoalRs {
  /**
   * 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2aq"
   */
  id: string;
  /**
   * 목표 이름
   * @example "자격증 따기"
   */
  title: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate: string;
  /** 세부 목표 목록 */
  subGoals?: SubGoalRs[];
}

export interface SubGoalRs {
  /**
   * 세부 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id: string;
  /**
   * 세부 목표 이름
   * @example "책 한 권 끝내기"
   */
  title: string;
  /**
   * 세부 목표 완료 여부
   * @example false
   */
  isCompleted: boolean;
}

export interface GoalWithSubGoalTodoRs {
  /**
   * 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2aq"
   */
  id: string;
  /**
   * 목표 이름
   * @example "자격증 따기"
   */
  title: string;
  /**
   * 목표 완료 날짜
   * @format date
   */
  dueDate: string;
  /** 투두를 포함한 세부 목표 목록 */
  subGoals?: SubGoalWithTodosRs[];
}

export interface SubGoalWithTodosRs {
  /**
   * 세부 목표 Id
   * @format uuid
   * @example "0197157f-aea4-77bb-8581-3213eb5bd2ae"
   */
  id: string;
  /**
   * 세부 목표 이름
   * @example "책 한 권 끝내기"
   */
  title: string;
  /**
   * 세부 목표 완료 여부
   * @example false
   */
  isCompleted: boolean;
  /** 세부 목표에 해당하는 투두 목록 */
  todos?: TodoRs[];
}

export interface GoalNotInGroupRs {
  /**
   * 목표 아이디
   * @format uuid
   */
  id: string;
  /** 목표 제목 */
  title: string;
}

export interface CompletedGoalItemRs {
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
  dueDate?: GoalDueDateRs;
  /**
   * 전체 투두 개수
   * @format int64
   * @example 15
   */
  todoCount?: number;
  /**
   * 완료된 투두 결과 개수
   * @format int64
   * @example 15
   */
  todoResultCount?: number;
}

export interface CompletedGoalListRs {
  /** 완료된 목표 목록 */
  goals?: CompletedGoalItemRs[];
}

export interface CheerPhraseRs {
  /**
   * 응원 문구
   * @example "목표는 멀어도 나는 계속 가는중"
   */
  cheerPhrase?: string;
}

export enum UserUpdateRqInterestsEnum {
  HEALTH = "HEALTH",
  READING = "READING",
  STUDY = "STUDY",
  LANGUAGE = "LANGUAGE",
  SPORTS = "SPORTS",
  PROGRAMMING = "PROGRAMMING",
  CAREER = "CAREER",
  SELF_IMPROVEMENT = "SELF_IMPROVEMENT",
}

/**
 * 투두 진행 후 감정
 * @example "PROUD"
 */
export enum TodoResultRqEmotionEnum {
  PROUD = "PROUD",
  REGRETFUL = "REGRETFUL",
  IMMERSED = "IMMERSED",
  SELF_REFLECTION = "SELF_REFLECTION",
  ROUTINE = "ROUTINE",
}

export enum UserInterestsRqInterestsEnum {
  HEALTH = "HEALTH",
  READING = "READING",
  STUDY = "STUDY",
  LANGUAGE = "LANGUAGE",
  SPORTS = "SPORTS",
  PROGRAMMING = "PROGRAMMING",
  CAREER = "CAREER",
  SELF_IMPROVEMENT = "SELF_IMPROVEMENT",
}

export enum UserRsInterestTypesEnum {
  HEALTH = "HEALTH",
  READING = "READING",
  STUDY = "STUDY",
  LANGUAGE = "LANGUAGE",
  SPORTS = "SPORTS",
  PROGRAMMING = "PROGRAMMING",
  CAREER = "CAREER",
  SELF_IMPROVEMENT = "SELF_IMPROVEMENT",
}

/**
 * 투두 진행 후 감정
 * @example "PROUD"
 */
export enum TodoResultRsEmotionEnum {
  PROUD = "PROUD",
  REGRETFUL = "REGRETFUL",
  IMMERSED = "IMMERSED",
  SELF_REFLECTION = "SELF_REFLECTION",
  ROUTINE = "ROUTINE",
}

/**
 * 투두 상태
 * @example "COMPLETE"
 */
export enum TodoRsStatusEnum {
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE",
}

/** 알림 타입입니다. */
export enum NotificationItemRsTypeEnum {
  REACTION = "REACTION",
  POKE = "POKE",
  TODO_DUE_DAY = "TODO_DUE_DAY",
  GROUP_TODO_COMPLETED = "GROUP_TODO_COMPLETED",
  GROUP_TODO_RESULT_COMPLETED = "GROUP_TODO_RESULT_COMPLETED",
}

export enum GroupMessageContentTypeEnum {
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  TODO_COMPLETE = "TODO_COMPLETE",
  TODO_RESULT_SUBMIT = "TODO_RESULT_SUBMIT",
  GOAL_TITLE_UPDATE = "GOAL_TITLE_UPDATE",
  MESSAGE_REACTION = "MESSAGE_REACTION",
}

/**
 *         그룹 메시지 내용
 *         - JOIN: 그룹 참여 메시지UUID
 *         - LEAVE: 그룹 탈퇴 메시지
 *         - TODO_COMPLETED: 할일 완료 메시지 (todoId, todoTitle 포함)
 *         - TODO_RESULT_SUBMITTED: 할일 결과 제출 메시지 (todoId, todoTitle, result(emotion, content, fileUrl) 포함)
 */
interface BaseGroupMessageContentRs {
  /** 메시지 내용 */
  content:
    | GoalTitleUpdatedContent
    | GroupJoinContent
    | GroupLeaveContent
    | MessageReactionContent
    | TodoCompletedContent
    | TodoResultSubmittedContent;
}

type BaseGroupMessageContentRsTypeMapping<Key, Type> = {
  type: Key;
} & Type;

export enum MessageReactionContentReactionTypeEnum {
  GOOD = "GOOD",
  COOL = "COOL",
  CHEER_UP = "CHEER_UP",
  BEST = "BEST",
  LIKE = "LIKE",
}

export enum TodoResultSubmittedContentEmotionEnum {
  PROUD = "PROUD",
  REGRETFUL = "REGRETFUL",
  IMMERSED = "IMMERSED",
  SELF_REFLECTION = "SELF_REFLECTION",
  ROUTINE = "ROUTINE",
}

export enum UpsertGroupReactionParamsTypeEnum {
  GOOD = "GOOD",
  COOL = "COOL",
  CHEER_UP = "CHEER_UP",
  BEST = "BEST",
  LIKE = "LIKE",
}

/** 페이징 방향 */
export enum GetGroupChatParamsDirectionEnum {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://158.179.175.134:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
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

  사용자Api = {
    /**
     * @description 닉네임,소개글,관심사 및 프로필 이미지를 수정합니다. 유저 이름이 null이거나 빈 문자열(공백만 있는 경우 포함)이면 기존 이름을 사용합니다. 이미지 업로드가 없으면 기존 이미지를 유지합니다.
     *
     * @tags 사용자 API
     * @name UpdateMyProfile
     * @summary 프로필 수정
     * @request PUT:/v1/users
     * @secure
     * @response `200` `UserIdRs` 수정 성공
     * @response `400` `ErrorResponse` 잘못된 요청/파일 형식 오류
     * @response `401` `void` 인증되지 않은 사용자
     */
    updateMyProfile: (
      data: {
        request: UserUpdateRq;
        /**
         * 프로필 이미지 파일
         * @format binary
         */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<UserIdRs, ErrorResponse | void>({
        path: `/v1/users`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 사용자가 보유한 관심사를 수정합니다.
     *
     * @tags 사용자 API
     * @name UpdateMyInterests
     * @summary 나의 관심사 수정
     * @request PATCH:/v1/users/interests
     * @secure
     * @response `200` `UserIdRs` 관심사 수정 성공
     * @response `400` `ErrorResponse` 잘못된 요청 데이터
     * @response `401` `void` 인증되지 않은 사용자
     */
    updateMyInterests: (data: UserInterestsRq, params: RequestParams = {}) =>
      this.http.request<UserIdRs, ErrorResponse | void>({
        path: `/v1/users/interests`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description userId 로 특정 사용자의 프로필을 조회합니다.
     *
     * @tags 사용자 API
     * @name GetProfile
     * @summary 사용자 프로필 조회
     * @request GET:/v1/users/{userId}
     * @secure
     * @response `200` `UserRs` 조회 성공
     * @response `404` `ErrorResponse` 사용자를 찾을 수 없음
     */
    getProfile: (userId: string, params: RequestParams = {}) =>
      this.http.request<UserRs, ErrorResponse>({
        path: `/v1/users/${userId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 로그인한 사용자의 정보를 조회합니다.
     *
     * @tags 사용자 API
     * @name GetMyProfile
     * @summary 내 정보 조회
     * @request GET:/v1/users/me
     * @secure
     * @response `200` `UserRs` 유저 정보 조회 성공
     * @response `401` `void` 인증되지 않은 사용자
     */
    getMyProfile: (params: RequestParams = {}) =>
      this.http.request<UserRs, void>({
        path: `/v1/users/me`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
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
     * @response `401` `void` 인증되지 않은 사용자
     * @response `403` `ErrorResponse` 투두 수정에 대한 권한이 없는 사용자
     * @response `404` `ErrorResponse` 투두를 찾을 수 없음
     */
    updateTodo: (
      todoId: string,
      data: TodoUpdateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<TodoIdRs, void | ErrorResponse>({
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
     * @response `403` `ErrorResponse` 투두 삭제에 대한 권한이 없는 사용자
     * @response `404` `ErrorResponse` TODO를 찾을 수 없음
     */
    deleteById: (todoId: string, params: RequestParams = {}) =>
      this.http.request<void, void | ErrorResponse>({
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
     * @response `204` `void` 결과 없음
     * @response `404` `ErrorResponse` TODO를 찾을 수 없음
     */
    getTodoResult: (todoId: string, params: RequestParams = {}) =>
      this.http.request<TodoResultRs, ErrorResponse>({
        path: `/v1/todos/${todoId}/result`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 투두 수행 결과를 제출/수정합니다. 파일을 첨부할 수 있습니다.
     *
     * @tags 투두 API
     * @name UpsertTodoResult
     * @summary 투두 결과(기록) 제출/수정하기
     * @request POST:/v1/todos/{todoId}/result
     * @secure
     * @response `200` `TodoResultIdRs` TODO 결과 제출 성공
     * @response `400` `ErrorResponse` 잘못된 요청 데이터
     * @response `401` `void` 인증되지 않은 사용자
     * @response `404` `ErrorResponse` TODO를 찾을 수 없음
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
      this.http.request<TodoResultIdRs, ErrorResponse | void>({
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
     * @response `401` `void` 인증되지 않은 사용자
     * @response `403` `ErrorResponse` 투두 수정에 대한 권한이 없는 사용자
     * @response `404` `ErrorResponse` TODO를 찾을 수 없음
     */
    toggleTodoCompletion: (todoId: string, params: RequestParams = {}) =>
      this.http.request<TodoIdRs, void | ErrorResponse>({
        path: `/v1/todos/${todoId}/completion`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description 로그인한 사용자의 TODO 목록을 조회합니다.
     *
     * @tags 투두 API
     * @name GetMyTodos
     * @summary 나의 TODO 목록 조회
     * @request GET:/v1/todos/me
     * @secure
     * @response `200` `(TodoRs)[]` TODO 목록 조회 성공
     * @response `400` `ErrorResponse` 잘못된 요청 데이터
     * @response `401` `void` 인증되지 않은 사용자
     */
    getMyTodos: (params: RequestParams = {}) =>
      this.http.request<TodoRs[], ErrorResponse | void>({
        path: `/v1/todos/me`,
        method: "GET",
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
     * @response `403` `ErrorResponse` 투두 결과 삭제에 대한 권한이 없는 사용자
     * @response `404` `ErrorResponse` TODO 결과를 찾을 수 없음
     */
    deleteTodoResultById: (todoResultId: string, params: RequestParams = {}) =>
      this.http.request<void, void | ErrorResponse>({
        path: `/v1/todos/result/${todoResultId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  목표Api = {
    /**
     * @description 목표 상세 정보를 조회합니다.
     *
     * @tags 목표 API
     * @name GetGoalDetail
     * @summary 목표 상세 API
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
     * @description 목표를 수정합니다.
     *
     * @tags 목표 API
     * @name UpdateGoal
     * @summary 목표 수정 API
     * @request PUT:/v1/goals/{goalId}
     * @secure
     * @response `200` `GoalIdRs` OK
     */
    updateGoal: (
      goalId: string,
      data: GoalUpdateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<GoalIdRs, any>({
        path: `/v1/goals/${goalId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 목표를 삭제합니다. (세부목표, 투두, 투두결과가 함께 삭제됩니다.)
     *
     * @tags 목표 API
     * @name DeleteGoal
     * @summary 목표 삭제 API
     * @request DELETE:/v1/goals/{goalId}
     * @secure
     * @response `200` `void` OK
     */
    deleteGoal: (goalId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/goals/${goalId}`,
        method: "DELETE",
        secure: true,
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
     * No description
     *
     * @tags 목표 API
     * @name AddSubGoal
     * @request POST:/v1/goals/{goalId}/subGoal
     * @secure
     * @response `200` `SubGoalIdRs` OK
     */
    addSubGoal: (
      goalId: string,
      data: SubGoalCreateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<SubGoalIdRs, any>({
        path: `/v1/goals/${goalId}/subGoal`,
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
     * @response `400` `ErrorResponse` 목표 완료 조건이 충족되지 않음
     * @response `403` `ErrorResponse` 완료 처리 권한 없음
     * @response `404` `ErrorResponse` 목표를 찾을 수 없음
     */
    goalComplete: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalIdRs, ErrorResponse>({
        path: `/v1/goals/${goalId}/completion`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description 목표와 세부 목표 리스트를 조회합니다.
     *
     * @tags 목표 API
     * @name GetGoalWithSubGoal
     * @summary 목표와 세부목표 목록 API
     * @request GET:/v1/goals/{goalId}/sub-goals
     * @secure
     * @response `200` `GoalWithSubGoalRs` 목표아이디에 해당하는 모든 세부 목표목록을 반환
     * @response `401` `void` 인증되지 않은 사용자
     */
    getGoalWithSubGoal: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalWithSubGoalRs, void>({
        path: `/v1/goals/${goalId}/sub-goals`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 목표 ID에 해당하는 목표 정보와 모든 세부 목표 및 오늘의 미완료 투두 목록을 조회합니다.
     *
     * @tags 목표 API
     * @name GetGoalWithSubGoalAndTodos
     * @summary 목표 + 세부목표 + 오늘의 미완료 투두 조회 API
     * @request GET:/v1/goals/{goalId}/sub-goals/all
     * @secure
     * @response `200` `GoalWithSubGoalTodoRs` 목표, 세부목표, 오늘의 미완료 투두 목록 반환
     * @response `401` `void` 인증되지 않은 사용자
     * @response `404` `void` 해당 목표를 찾을 수 없음
     */
    getGoalWithSubGoalAndTodos: (goalId: string, params: RequestParams = {}) =>
      this.http.request<GoalWithSubGoalTodoRs, void>({
        path: `/v1/goals/${goalId}/sub-goals/all`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 그룹에 참여하지 않은 목표를 조회합니다.
     *
     * @tags 목표 API
     * @name GetGoalNotJoinGroup
     * @summary 그룹에 참여하지 않은 목표 목록 API
     * @request GET:/v1/goals/not-joined-group
     * @secure
     * @response `200` `(GoalNotInGroupRs)[]` OK
     */
    getGoalNotJoinGroup: (params: RequestParams = {}) =>
      this.http.request<GoalNotInGroupRs[], any>({
        path: `/v1/goals/not-joined-group`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 사용자의 완료된 목표 목록을 조회합니다.
     *
     * @tags 목표 API
     * @name GetCompletedGoals
     * @summary 완료된 목표 목록 조회 API
     * @request GET:/v1/goals/completed
     * @secure
     * @response `200` `CompletedGoalListRs` 완료된 목표 목록과 각 목표별 투두 개수, 투두 결과 개수 반환
     * @response `401` `void` 인증되지 않은 사용자
     */
    getCompletedGoals: (params: RequestParams = {}) =>
      this.http.request<CompletedGoalListRs, void>({
        path: `/v1/goals/completed`,
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
     * @response `400` `ErrorResponse` 잘못된 요청 데이터
     * @response `401` `void` 인증되지 않은 사용자
     */
    createTodo: (
      subGoalId: string,
      data: TodoCreateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<TodoIdRs, ErrorResponse | void>({
        path: `/v1/sub-goals/${subGoalId}/todo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 세부 목표 API
     * @name UpdateSubGoal
     * @request PATCH:/v1/sub-goals/{subGoalId}
     * @secure
     * @response `200` `SubGoalIdRs` OK
     */
    updateSubGoal: (
      subGoalId: string,
      data: SubGoalUpdateRq,
      params: RequestParams = {},
    ) =>
      this.http.request<SubGoalIdRs, any>({
        path: `/v1/sub-goals/${subGoalId}`,
        method: "PATCH",
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
     * @response `403` `ErrorResponse` 완료 처리 권한 없음
     * @response `404` `ErrorResponse` 세부 목표를 찾을 수 없음
     */
    subGoalCompleteToggle: (subGoalId: string, params: RequestParams = {}) =>
      this.http.request<SubGoalIdRs, ErrorResponse>({
        path: `/v1/sub-goals/${subGoalId}/completion/toggle`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 Sub‑Goal ID에 속한 모든 TODO를 슬라이스 방식(offset, size)으로 조회합니다.`hasNext` 플래그를 통해 다음 페이지 존재 여부를 판단합니다.
     *
     * @tags 세부 목표 API
     * @name GetTodosBySubGoalIdWithSlice
     * @summary 세부 목표의 모든 TODO 목록(슬라이스) 조회
     * @request GET:/v1/sub-goals/{subGoalId}/todos
     * @secure
     * @response `200` `CustomSliceTodoRs` 세부목표의 투두 리스트(완료, 미완료 모두)조회 성공
     * @response `400` `ErrorResponse` 잘못된 요청
     * @response `404` `ErrorResponse` 세부 목표를 찾을 수 없음
     */
    getTodosBySubGoalIdWithSlice: (
      subGoalId: string,
      query?: {
        /**
         * 시작 오프셋(0‑base)
         * @format int32
         * @default 0
         * @example 0
         */
        offset?: number;
        /**
         * 한 페이지 크기
         * @format int32
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<CustomSliceTodoRs, ErrorResponse>({
        path: `/v1/sub-goals/${subGoalId}/todos`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Sub‑GoalID 기준으로 상태가 미완료이거나 `date = 오늘` 인 TODO만 필터링하여 슬라이스로 반환합니다.
     *
     * @tags 세부 목표 API
     * @name GetIncompleteOrTodayTodosWithSlice
     * @summary 세부 목표별 미완료 또는 오늘 날짜 TODO 목록(슬라이스) 조회
     * @request GET:/v1/sub-goals/{subGoalId}/todos/incomplete-or-date
     * @secure
     * @response `200` `CustomSliceTodoRs` 세부 목표의 오늘이거나 완료되지 않은 TODO 목록 조회 성공
     * @response `400` `ErrorResponse` 잘못된 요청 데이터
     * @response `404` `ErrorResponse` 세부 목표를 찾을 수 없음
     */
    getIncompleteOrTodayTodosWithSlice: (
      subGoalId: string,
      query?: {
        /**
         * 시작 오프셋(0‑base)
         * @format int32
         * @default 0
         * @example 0
         */
        offset?: number;
        /**
         * 한 페이지 크기
         * @format int32
         * @default 10
         * @example 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<CustomSliceTodoRs, ErrorResponse>({
        path: `/v1/sub-goals/${subGoalId}/todos/incomplete-or-date`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  그룹Api = {
    /**
     * @description 특정 사용자에게 찌르기 알람을 보냅니다.
     *
     * @tags 그룹 API
     * @name SendPokeNotification
     * @summary 찌르기 API
     * @request POST:/v1/groups/{groupId}/members/{targetUserId}/poke
     * @secure
     * @response `204` `void` 알림 보내기 성공
     * @response `400` `void` 찌르기 알림 횟수 초과
     */
    sendPokeNotification: (
      groupId: string,
      targetUserId: string,
      params: RequestParams = {},
    ) =>
      this.http.request<void, void>({
        path: `/v1/groups/${groupId}/members/${targetUserId}/poke`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description 랜덤으로 그룹에 가입합니다.
     *
     * @tags 그룹 API
     * @name JoinRandomGroup
     * @summary 랜덤 그룹 가입 API
     * @request POST:/v1/groups/random-join
     * @secure
     * @response `200` `GroupIdRs` OK
     */
    joinRandomGroup: (data: GroupJoinRq, params: RequestParams = {}) =>
      this.http.request<GroupIdRs, any>({
        path: `/v1/groups/random-join`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 그룹 리액션을 생성/수정합니다.
     *
     * @tags 그룹 API
     * @name UpsertGroupReaction
     * @summary 그룹 리액션 API
     * @request POST:/v1/groups/message/{messageId}/reaction
     * @secure
     * @response `200` `GroupMessageIdRs` OK
     */
    upsertGroupReaction: (
      messageId: string,
      query: {
        type: UpsertGroupReactionParamsTypeEnum;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<GroupMessageIdRs, any>({
        path: `/v1/groups/message/${messageId}/reaction`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags 그룹 API
     * @name DeleteGroupReaction
     * @request DELETE:/v1/groups/message/{messageId}/reaction
     * @secure
     * @response `204` `void` No Content
     */
    deleteGroupReaction: (messageId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/groups/message/${messageId}/reaction`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description 그룹 아이디와 제목을 조회합니다.
     *
     * @tags 그룹 API
     * @name GetGroupDetail
     * @summary 그룹 상세 조회 API
     * @request GET:/v1/groups/{groupId}
     * @secure
     * @response `200` `GroupDetailRs` OK
     */
    getGroupDetail: (groupId: string, params: RequestParams = {}) =>
      this.http.request<GroupDetailRs, any>({
        path: `/v1/groups/${groupId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description  사용자가 마지막으로 읽은 커서 이후 새로 작성된 메시지 개수를 반환합니다.
     *
     * @tags 그룹 API
     * @name GetNewGroupMessages
     * @summary 그룹내 새 메시지 조회 API
     * @request GET:/v1/groups/{groupId}/new-chats
     * @secure
     * @response `200` `NewMessageRs` OK
     */
    getNewGroupMessages: (
      groupId: string,
      query?: {
        /** 마지막으로 읽은 커서 */
        latestCursor?: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<NewMessageRs, any>({
        path: `/v1/groups/${groupId}/new-chats`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 그룹 멤버 목록을 조회합니다.
     *
     * @tags 그룹 API
     * @name GetGroupMembers
     * @summary 그룹 멤버 조회 API
     * @request GET:/v1/groups/{groupId}/members
     * @secure
     * @response `200` `(GroupMemberRs)[]` OK
     */
    getGroupMembers: (groupId: string, params: RequestParams = {}) =>
      this.http.request<GroupMemberRs[], any>({
        path: `/v1/groups/${groupId}/members`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 커서,방향,limit 을 이용해 이전, 이후의 메시지 데이터를 가져옵니다.
     *
     * @tags 그룹 API
     * @name GetGroupChat
     * @summary 그룹 채팅 조회 API
     * @request GET:/v1/groups/{groupId}/chats
     * @secure
     * @response `200` `GroupChatRs` OK
     */
    getGroupChat: (
      groupId: string,
      query?: {
        /**
         * 한 번에 가져올 메시지 수
         * @min 1
         * @max 100
         */
        limit?: string;
        /** 커서 값 */
        cursor?: string;
        /** 페이징 방향 */
        direction?: GetGroupChatParamsDirectionEnum;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<GroupChatRs, any>({
        path: `/v1/groups/${groupId}/chats`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description 참여중인 그룹을 조회합니다.
     *
     * @tags 그룹 API
     * @name GetJoinedGroups
     * @summary 참여중인 그룹 목록 API
     * @request GET:/v1/groups/me
     * @secure
     * @response `200` `(JoinedGroupRs)[]` OK
     */
    getJoinedGroups: (params: RequestParams = {}) =>
      this.http.request<JoinedGroupRs[], any>({
        path: `/v1/groups/me`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 그룹에서 나가게 됩니다.
     *
     * @tags 그룹 API
     * @name ExitGroup
     * @summary 그룹 나가기 API
     * @request DELETE:/v1/groups/{groupId}/members/me
     * @secure
     * @response `204` `void` No Content
     */
    exitGroup: (groupId: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/v1/groups/${groupId}/members/me`,
        method: "DELETE",
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
  알림Api = {
    /**
     * @description 알림 목록을 조회합니다.
     *
     * @tags 알림 API
     * @name GetNotificationList
     * @summary 알림 목록 API
     * @request GET:/v1/notifications
     * @secure
     * @response `200` `CustomPageNotificationItemRs` OK
     */
    getNotificationList: (
      query: {
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /** @format int32 */
        size: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<CustomPageNotificationItemRs, any>({
        path: `/v1/notifications`,
        method: "GET",
        query: query,
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
