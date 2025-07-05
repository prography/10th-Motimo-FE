// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import TodoList, { TodoListProps } from "./TodoList"; // 실제 컴포넌트 파일 임포트
import {
  Primary as TodoItemPrimary,
  CompleteNonSubmit,
  IncompleteDateLate,
  CompleteSubmitLateYesterday,
} from "@/components/shared/TodoItem/TodoItem.stories";
import { TodoItemProps } from "@/components/shared/TodoItem/TodoItem";

const description = `
스와이프는 상태로 만들지 않을 것 같으므로 Primary에서 확인할 것.
각 TodoItem에 대해서나 세부목표 추가나 모달이 존재해야 함.
모달을 어떻게 연결해놓을지 고민해야 함.  
또한, 각 TodoList의 id와 todoItem의 id를 받아야 관련해서 mutate작업이 가능함.  
**ㄴ> 백엔드에 문의**

스와이프로 수정 및 삭제 드러날 때, zindex로 가려놓으면 Accessibility에서 악영향일진 체크해 봐야 함.

고려사항
- 체크박스 비동기 동작으로 인해 todoCheckedLen는 어떻게 처리할지
  (낙관적? 혹은 deferred? 혹은 fallback?)
- todo 수정, 제출할 때 request 타입 구체적 명시, 
`;

const meta = {
  title: "Main/TodoList", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: TodoList,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: description,
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'TodoList',
  },
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.

/** 타입 변환 작업. (todoItemProps와 TodoListProps사이 괴리) */

type TodoItemsInfoType = NonNullable<TodoListProps["initTodoItemsInfo"]>[0];
const validTypes: (keyof TodoItemsInfoType)[] = [
  "checked",
  "id",
  "reported",
  "targetDate",
  "title",
];

const isTodoItemsInfoType = (
  field: string,
): field is keyof TodoItemsInfoType => {
  return validTypes.includes(field as keyof TodoItemsInfoType);
};
const convert2ValidTodoItemsInfoType = (
  todoItemsInfo: (TodoItemProps | TodoItemsInfoType)[],
) => {
  return todoItemsInfo.map((info, idx) =>
    Object.entries(info).reduce(
      (acc, [key, value]) => {
        if (isTodoItemsInfoType(key)) return { ...acc, [key]: value };
        return acc;
      },
      { id: idx } as unknown as TodoItemsInfoType,
    ),
  );
};

const todoItemsInfo = convert2ValidTodoItemsInfoType([
  TodoItemPrimary.args,
  CompleteNonSubmit.args,
  IncompleteDateLate.args,
  CompleteSubmitLateYesterday.args,
]);

export const Primary: Story = {
  argTypes: {
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    subGoal: "세부 목표입니다",
    initTodoCheckedLen: 2,
    initTodoTotalLen: todoItemsInfo.length,
    initTodoItemsInfo: todoItemsInfo,

    // Primary 스토리에만 적용될 Props
  },
};

export const NoSubGoal: Story = {
  args: {
    ...Primary.args,
    subGoal: undefined,
    goalId: "골아이디",
  },
};
const todoItemsInfo4NoTotalTodo: (typeof Primary.args)["initTodoItemsInfo"] =
  [];
export const NoTotalTodo: Story = {
  args: {
    ...Primary.args,
    initTodoTotalLen: todoItemsInfo4NoTotalTodo.length,
    initTodoItemsInfo: todoItemsInfo4NoTotalTodo,
  },
};
export const NotFinishedTodos: Story = {
  args: {
    ...Primary.args,
  },
};
/** 높이 312px안에서 투두 스크롤 가능해야함.
 * 보여지는 순서가정해져 있으므로, 자세한건 figma에서 확인. 백엔드에서 소팅해줄 듯.
 */
const todoItemsInfo4NotFinishedTodosLong: (typeof Primary.args)["initTodoItemsInfo"] =
  convert2ValidTodoItemsInfoType([
    ...(Primary.args.initTodoItemsInfo ?? []),
    TodoItemPrimary.args,
    TodoItemPrimary.args,
    TodoItemPrimary.args,
    TodoItemPrimary.args,
  ]);
export const NotFinishedTodosLong: Story = {
  args: {
    ...Primary.args,
    initTodoItemsInfo: todoItemsInfo4NotFinishedTodosLong,
    initTodoTotalLen: todoItemsInfo4NotFinishedTodosLong.length,
  },
};
export const FinishedTodos: Story = {
  args: {
    ...Primary.args,
    initTodoCheckedLen: Primary.args.initTodoTotalLen,
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary TodoList',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large TodoList',
  },
};
*/
