import TodoItem from "./TodoItem";
import { StoryFn, StoryObj } from "@storybook/react";

// meta는 공통 옵션.
const meta = {
  title: "Shared/TodoItem",
  component: TodoItem,
  args: {},
  decorators: [
    (Story: StoryFn) => (
      <div onClick={(e) => e.preventDefault()}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `컴포넌트 설명입니다. 일단 개발 요구사항 여기에 기록함.
        체크박스는 바텀시트랑 독립적임. 완료/미완료 비동기 동작에는 낙관적 업뎃을 사용해야 할 듯.
        네트워크 에러 등으로 에러날 때 원복 + 스낵바로 얼림 띄우기
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  argTypes: {
    checkedInitial: {
      control: "boolean",
      description: "체크 여부",
    },
    date: {
      control: "date",
      description: `어제일 경우 "어제"로 표기.
      날짜가 지났을 경우 negative 색상
      `,
    },
    moodInitial: {
      control: "number",
      description: `투두 제초 미완료시 감정 안보임.
      이 부분은 감정/자료/설명 추가할 수 있는 퀵 버튼임.
      `,
    },
    title: {
      control: "text",
      description: "투두 리스트 타이틀 길면 ...",
    },
    // children: {
    //   control: "text",
    //   description: "보통은 텍스트를 입력하겠지",
    //   table: {
    //     category: "이야호",
    //   },
    // },
  },
  args: {
    checkedInitial: false,
    date: new Date(),
    title: "",
    moodInitial: 0,
  },
};
