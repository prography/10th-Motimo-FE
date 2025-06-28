import type { Meta, StoryObj } from "@storybook/react";
import { GroupList, GroupData } from "./GroupList";

const meta: Meta<typeof GroupList> = {
  title: "Group/GroupList",
  component: GroupList,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof GroupList>;

const sampleGroups: GroupData[] = [
  {
    id: "1",
    isJoined: true,
    title: "아 그룹명뭐로하지",
    lastActivityDate: "2025.05.12",
    hasNotification: true,
  },
  {
    id: "2",
    isJoined: false,
    title: "목표 이름이 여기에",
  },
  {
    id: "3",
    isJoined: true,
    title: "프로그래밍 스터디 그룹",
    lastActivityDate: "2025.05.15",
    hasNotification: false,
  },
  {
    id: "4",
    isJoined: false,
    title: "건강한 생활 만들기",
  },
  {
    id: "5",
    isJoined: true,
    title: "독서 클럽",
    lastActivityDate: "2025.05.10",
    hasNotification: true,
  },
];

export const Default: Story = {
  args: {
    groups: sampleGroups,
    onJoinGroup: (groupId: string) => {
      console.log("Join group:", groupId);
    },
    onNotificationClick: (groupId: string) => {
      console.log("Notification clicked for group:", groupId);
    },
  },
};

export const JoinedGroupsOnly: Story = {
  args: {
    groups: sampleGroups.filter(group => group.isJoined),
    onNotificationClick: (groupId: string) => {
      console.log("Notification clicked for group:", groupId);
    },
  },
};

export const AvailableGroupsOnly: Story = {
  args: {
    groups: sampleGroups.filter(group => !group.isJoined),
    onJoinGroup: (groupId: string) => {
      console.log("Join group:", groupId);
    },
  },
};

export const SingleJoinedGroup: Story = {
  args: {
    groups: [
      {
        id: "1",
        isJoined: true,
        title: "UI/UX 디자인 스터디",
        lastActivityDate: "2025.05.18",
        hasNotification: true,
      },
    ],
    onNotificationClick: (groupId: string) => {
      console.log("Notification clicked for group:", groupId);
    },
  },
};

export const SingleAvailableGroup: Story = {
  args: {
    groups: [
      {
        id: "1",
        isJoined: false,
        title: "새로운 습관 만들기 챌린지",
      },
    ],
    onJoinGroup: (groupId: string) => {
      console.log("Join group:", groupId);
    },
  },
};

export const EmptyState: Story = {
  args: {
    groups: [],
  },
};

export const WithNotifications: Story = {
  args: {
    groups: [
      {
        id: "1",
        isJoined: true,
        title: "알림이 있는 그룹 1",
        lastActivityDate: "2025.05.20",
        hasNotification: true,
      },
      {
        id: "2",
        isJoined: true,
        title: "알림이 없는 그룹",
        lastActivityDate: "2025.05.19",
        hasNotification: false,
      },
      {
        id: "3",
        isJoined: true,
        title: "알림이 있는 그룹 2",
        lastActivityDate: "2025.05.18",
        hasNotification: true,
      },
    ],
    onNotificationClick: (groupId: string) => {
      console.log("Notification clicked for group:", groupId);
    },
  },
};

export const ManyGroups: Story = {
  args: {
    groups: [
      ...sampleGroups,
      {
        id: "6",
        isJoined: true,
        title: "운동 동기부여 그룹",
        lastActivityDate: "2025.05.20",
        hasNotification: false,
      },
      {
        id: "7",
        isJoined: false,
        title: "코딩 테스트 준비",
      },
      {
        id: "8",
        isJoined: true,
        title: "창업 아이디어 공유",
        lastActivityDate: "2025.05.14",
        hasNotification: true,
      },
    ],
    onJoinGroup: (groupId: string) => {
      console.log("Join group:", groupId);
    },
    onNotificationClick: (groupId: string) => {
      console.log("Notification clicked for group:", groupId);
    },
  },
}; 