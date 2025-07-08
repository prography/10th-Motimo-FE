import type { Meta, StoryObj } from "@storybook/react";
import { GroupPage } from "./GroupPage";
import { GroupData } from "./GroupList";

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

const mockPendingGroups: GroupData[] = [
  {
    id: "1",
    isJoined: false,
    title: "6개월 안에 책 50권 읽기",
  },
  {
    id: "2",
    isJoined: false,
    title: "3개월 안에 10kg 감량하기",
  },
];

const mockJoinedGroups: GroupData[] = [
  {
    hasNotification: true,
    id: "3",
    isJoined: true,
    lastActivityDate: "2025.05.12",
    title: "프로그래밍 스터디 그룹",
  },
  {
    hasNotification: false,
    id: "4",
    isJoined: true,
    lastActivityDate: "2025.05.15",
    title: "독서 클럽",
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
        isJoined: false,
        title: "올해 안에 토익 900점 달성하기",
      },
      {
        id: "6",
        isJoined: false,
        title: "매일 30분 운동하기",
      },
      {
        id: "7",
        isJoined: false,
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
