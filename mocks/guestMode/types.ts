// ...existing code...

/**
 * DB 스토어별 타입 정의 (handlers.ts에서 사용하는 필드 기준)
 * 필요에 따라 필드 추가/수정하세요.
 */

export type ID = string;

export interface DBUser {
  id: ID;
  nickname?: string;
  email?: string;
  profileImageUrl?: string;
  interestTypes?: string[]; // onboarding 관심사 등
  // 기타 API에서 사용하는 필드 추가
}

export interface DBGoal {
  id: ID;
  title: string;
  dueDate?: string; // YYYY-MM-DD
  progress?: number;
  isCompleted?: boolean;
  isJoinedGroup?: boolean;
  subGoals?: ID[]; // subGoal id 리스트
  createdAt?: string;
  // 기타 필드
}

export interface DBSubGoal {
  id: ID;
  goalId?: ID;
  title: string;
  todos: ID[]; // todo id 리스트
  isCompleted?: boolean;
  createdAt?: string;
}

export type TodoStatus = "COMPLETE" | "INCOMPLETE";

export interface DBTodo {
  id: ID;
  subGoalId?: ID;
  title: string;
  date?: string; // YYYY-MM-DD (optional)
  status?: TodoStatus;
  todoResultId?: ID | undefined;
  ownerId?: ID; // 소유자 (예: "me")
  createdAt?: string;
}

export interface DBTodoResult {
  id: ID;
  todoId: ID;
  emotion?: string;
  content?: string;
  fileUrl?: string;
  createdAt?: string;
}

export interface DBGroup {
  id: ID;
  name?: string;
  goalId?: ID;
  createdAt?: string;
}

export interface DBGroupMember {
  id: ID;
  groupId: ID;
  userId: ID;
  nickname?: string;
  joinedAt?: string;
}

export interface DBGroupMessage {
  id: ID;
  groupId: ID;
  senderId?: ID;
  // message 형태는 Api 스펙에 따라 자유롭게 구성
  message?: {
    type?: string;
    content?: any;
  };
  createdAt?: string;
}

export interface DBReaction {
  id: ID;
  messageId: ID;
  userId?: ID;
  type?: string; // good, love 등
  createdAt?: string;
}

export interface DBCheer {
  id: ID;
  targetType?: string; // ex: "todo" | "subGoal"
  targetId?: ID;
  userId?: ID;
  phrase?: string;
  createdAt?: string;
}

export interface DBPoint {
  id: ID;
  userId?: ID;
  point: number;
  createdAt?: string;
}

/**
 * StoreName에 정의된 이름과 인터페이스 매핑용 유틸(선택)
 * - dbService.getAll<T>("storeName") 시 T에 맞게 사용하세요.
 */
export type StoreSchema = {
  users: DBUser;
  goals: DBGoal;
  subGoals: DBSubGoal;
  todos: DBTodo;
  todoResults: DBTodoResult;
  groups: DBGroup;
  cheers: DBCheer;
  points: DBPoint;
  // handlers에서 사용중인 추가 스토어
  reactions: DBReaction;
  groupMessages: DBGroupMessage;
  groupMembers: DBGroupMember;
};

// ...existing code...
