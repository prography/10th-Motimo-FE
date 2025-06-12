import { useState } from "react";
import Calendar from "./Calendar";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

// meta는 공통 옵션.
const meta = {
  title: "Shared/Calendar",
  component: Calendar,
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
         크기는 변동.
         onChange와 selected를 사용해서 상호작용하는 테스트를 추가해야 함.
        `,
      },
    },
  },
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const [date, setDate] = useState(new Date());
    return (
      <Calendar onChange={(newDate) => setDate(newDate)} selected={date} />
    );
  },
  argTypes: {
    selected: {
      description: `선택 값 주입. 제어 방식의 사용법과 같음.
        관련 상호작용 테스트를 추가해야 함.
        `,
    },
    onChange: {
      description: `유저의 상호작용으로 인한 클릭한 date확인 가능.
      관련 상호작용 테스트를 추가해야 함.
      `,
    },
  },
  args: {
    onChange: (date) => {
      console.log("date: ", date);
    },
    selected: new Date(),
  },
  play: () => {},
};
