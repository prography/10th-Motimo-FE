import type { Meta, StoryObj } from "@storybook/react";
import { PendingGroupList, PendingGroup } from "./PendingGroupList";

const meta: Meta<typeof PendingGroupList> = {
  title: "Group/PendingGroupList",
  component: PendingGroupList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onJoinGroup: { action: "onJoinGroup" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGroups: PendingGroup[] = [
  {
    id: 1,
    goalName: "6개월 안에 책 50권 읽기",
    memberCount: 5,
  },
  {
    id: 2,
    goalName: "3개월 안에 10kg 감량하기",
    memberCount: 8,
  },
  {
    id: 3,
    goalName: "올해 안에 토익 900점 달성하기",
    memberCount: 12,
  },
];

export const Primary: Story = {
  args: {
    groups: mockGroups,
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
  },
};

export const SingleGroup: Story = {
  args: {
    groups: [mockGroups[0]],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
  },
};

export const ManyGroups: Story = {
  args: {
    groups: [
      ...mockGroups,
      {
        id: 4,
        goalName: "매일 운동하기",
        memberCount: 15,
      },
      {
        id: 5,
        goalName: "주 3회 독서 모임 참여하기",
        memberCount: 7,
      },
    ],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
  },
};

export const EmptyList: Story = {
  args: {
    groups: [],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
  },
};
