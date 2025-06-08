// Test.stories.tsx
import GoalMenu from "./GoalMenu";
import { StoryObj } from "@storybook/react";

// meta는 공통 옵션.
const meta = {
  title: "Shared/GoalMenu",
  component: GoalMenu,
};
export default meta;

type Story = StoryObj<typeof meta>;

// Primary는 공통. argTypes를 사용해 상호작용 가능하도록 한다.
export const Primary: Story = {
  argTypes: {
    goal: { control: "text", description: "목표 텍스트. 길면 ..." },
    percentage: {
      control: "number",
      description: "0~100까지",
    },
  },
  args: {
    goal: "목표",
    percentage: 10,
  },
};
