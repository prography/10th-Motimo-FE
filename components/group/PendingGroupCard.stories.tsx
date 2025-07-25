import type { Meta, StoryObj } from "@storybook/react";
import { PendingGroupCard } from "./PendingGroupCard";

const meta: Meta<typeof PendingGroupCard> = {
  title: "Group/PendingGroupCard",
  component: PendingGroupCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onJoin: { action: "onJoin" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: 1,
    goalName: "6개월 안에 책 50권 읽기",
    memberCount: 5,
    onJoin: (id: number) => console.log(`Joining group ${id}`),
  },
};

export const LongGoalName: Story = {
  args: {
    id: 2,
    goalName:
      "올해 안에 토익 900점 달성하고 영어로 프레젠테이션 할 수 있게 되기",
    memberCount: 12,
    onJoin: (id: number) => console.log(`Joining group ${id}`),
  },
};

export const WithoutMemberCount: Story = {
  args: {
    id: 3,
    goalName: "3개월 안에 10kg 감량하기",
    onJoin: (id: number) => console.log(`Joining group ${id}`),
  },
};
