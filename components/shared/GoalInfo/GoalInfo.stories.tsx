import GoalInfo from "./GoalInfo";
import { StoryFn, StoryObj } from "@storybook/react";

// meta는 공통 옵션.
const meta = {
  title: "Shared/GoalInfo",
  component: GoalInfo,
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
        데이터 fethcing해서 보여주기만 하는 컴포넌트.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  argTypes: {},
  args: {},
};
