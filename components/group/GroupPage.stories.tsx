import type { Meta, StoryObj } from "@storybook/react";
import { GroupPage } from "./GroupPage";
import { PendingGroup } from "./PendingGroupList";

const meta: Meta<typeof GroupPage> = {
  title: "Group/GroupPage",
  component: GroupPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onJoinGroup: { action: "onJoinGroup" },
    onNotificationClick: { action: "onNotificationClick" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPendingGroups: PendingGroup[] = [
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
];

export const Primary: Story = {
  args: {
    pendingGroups: mockPendingGroups,
    joinedGroups: [],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

export const WithManyPendingGroups: Story = {
  args: {
    pendingGroups: [
      ...mockPendingGroups,
      {
        id: 3,
        goalName: "올해 안에 토익 900점 달성하기",
        memberCount: 12,
      },
      {
        id: 4,
        goalName: "매일 30분 운동하기",
        memberCount: 20,
      },
      {
        id: 5,
        goalName: "주 3회 독서 모임 참여하기",
        memberCount: 7,
      },
    ],
    joinedGroups: [],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

export const NoPendingGroups: Story = {
  args: {
    pendingGroups: [],
    joinedGroups: [],
    onJoinGroup: (id: number) => console.log(`Joining group ${id}`),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};
