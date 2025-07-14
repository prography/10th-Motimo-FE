import type { Meta, StoryObj } from "@storybook/react";
import { GroupList } from "./GroupList";
import { JoinedGroupRs, GoalNotInGroupRs } from "@/api/generated/motimo/Api";

const meta: Meta<typeof GroupList> = {
  title: "Group/GroupList",
  component: GroupList,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    isJoined: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof GroupList>;

// Mock data for joined groups
const sampleJoinedGroups: JoinedGroupRs[] = [
  {
    groupId: "1",
    name: "아 그룹명뭐로하지",
    lastActiveDate: "2025.05.12",
    isNotificationActive: true,
  },
  {
    groupId: "2",
    name: "프로그래밍 스터디 그룹",
    lastActiveDate: "2025.05.15",
    isNotificationActive: false,
  },
  {
    groupId: "3",
    name: "독서 클럽",
    lastActiveDate: "2025.05.10",
    isNotificationActive: true,
  },
];

// Mock data for pending groups
const samplePendingGroups: GoalNotInGroupRs[] = [
  {
    id: "1",
    title: "목표 이름이 여기에",
  },
  {
    id: "2",
    title: "건강한 생활 만들기",
  },
];

export const Primary: Story = {
  args: {
    groups: sampleJoinedGroups,
    isJoined: true,
  },
};

export const JoinedGroups: Story = {
  args: {
    groups: sampleJoinedGroups,
    isJoined: true,
  },
};

export const PendingGroups: Story = {
  args: {
    groups: samplePendingGroups,
    isJoined: false,
  },
};

export const SingleJoinedGroup: Story = {
  args: {
    groups: [
      {
        groupId: "1",
        name: "UI/UX 디자인 스터디",
        lastActiveDate: "2025.05.18",
        isNotificationActive: true,
      },
    ] as JoinedGroupRs[],
    isJoined: true,
  },
};

export const SinglePendingGroup: Story = {
  args: {
    groups: [
      {
        id: "1",
        title: "새로운 습관 만들기 챌린지",
      },
    ] as GoalNotInGroupRs[],
    isJoined: false,
  },
};

export const EmptyState: Story = {
  args: {
    groups: [],
    isJoined: true,
  },
};

export const WithNotifications: Story = {
  args: {
    groups: [
      {
        title: "알림이 있는 그룹 1",
        lastActiveDate: "2025.05.20",
        isNotificationActive: true,
      },
      {
        groupId: "2",
        name: "알림이 없는 그룹",
        lastActiveDate: "2025.05.19",
        isNotificationActive: false,
      },
      {
        title: "알림이 있는 그룹 2",
        lastActiveDate: "2025.05.18",
        isNotificationActive: true,
      },
    ] as JoinedGroupRs[],
    isJoined: true,
  },
};

export const ManyGroups: Story = {
  args: {
    groups: [
      ...sampleJoinedGroups,
      {
        title: "운동 동기부여 그룹",
        lastActiveDate: "2025.05.20",
        isNotificationActive: false,
      },
      {
        title: "창업 아이디어 공유",
        lastActiveDate: "2025.05.14",
        isNotificationActive: true,
      },
    ] as JoinedGroupRs[],
    isJoined: true,
  },
};
