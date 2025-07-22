import type { Meta, StoryObj } from "@storybook/react";
import { GroupPage } from "./GroupPage";
import { JoinedGroupRs, GoalNotInGroupRs } from "@/api/generated/motimo/Api";

const meta: Meta<typeof GroupPage> = {
  title: "Group/GroupPage",
  component: GroupPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onNotificationClick: { action: "onNotificationClick" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPendingGroups: GoalNotInGroupRs[] = [
  {
    id: "1",
    title: "6개월 안에 책 50권 읽기",
  },
  {
    id: "2",
    title: "3개월 안에 10kg 감량하기",
  },
];

const mockJoinedGroups: JoinedGroupRs[] = [
  {
    groupId: "1",
    name: "프로그래밍 스터디 그룹",
    lastActiveDate: "2025-05-12T10:30:00Z",
    isNotificationActive: true,
  },
  {
    groupId: "2",
    name: "독서 클럽",
    lastActiveDate: "2025-05-15T14:20:00Z",
    isNotificationActive: false,
  },
];

export const Primary: Story = {
  args: {
    pendingGroups: mockPendingGroups,
    joinedGroups: [],
    onJoinGroup: () => console.log("Join group clicked"),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

export const WithJoinedGroups: Story = {
  args: {
    pendingGroups: mockPendingGroups,
    joinedGroups: mockJoinedGroups,
    onJoinGroup: () => console.log("Join group clicked"),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

export const WithManyPendingGroups: Story = {
  args: {
    pendingGroups: [
      ...mockPendingGroups,
      {
        id: "5",
        title: "올해 안에 토익 900점 달성하기",
      },
      {
        id: "6",
        title: "매일 30분 운동하기",
      },
      {
        id: "7",
        title: "주 3회 독서 모임 참여하기",
      },
    ],
    joinedGroups: [],
    onJoinGroup: () => console.log("Join group clicked"),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};

export const NoPendingGroups: Story = {
  args: {
    pendingGroups: [],
    joinedGroups: [],
    onJoinGroup: () => console.log("Join group clicked"),
    onNotificationClick: () => console.log("Notification clicked"),
  },
};
