import type { Meta, StoryObj } from "@storybook/react";
import GroupMemberList from "./GroupMemberList";

const meta: Meta<typeof GroupMemberList> = {
  title: "Components/Group/GroupMemberList",
  component: GroupMemberList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof GroupMemberList>;

const currentDate = new Date();
const threeDaysAgo = new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000);
const tenDaysAgo = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000);
const fifteenDaysAgo = new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000);
const oneDayAgo = new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000);
const twentyDaysAgo = new Date(currentDate.getTime() - 20 * 24 * 60 * 60 * 1000);

export const MembersWithin7Days: Story = {
  args: {
    groupId: "test-group",
    myNickname: "현재사용자",
    members: [
      {
        userId: "user1",
        nickname: "현재사용자",
        lastOnlineDate: currentDate.toISOString(),
      },
      {
        userId: "user2",
        nickname: "활발한멤버",
        lastOnlineDate: threeDaysAgo.toISOString(),
      },
      {
        userId: "user3",
        nickname: "최근접속멤버",
        lastOnlineDate: oneDayAgo.toISOString(),
      },
    ],
  },
};

export const MembersMoreThan7DaysAgo: Story = {
  args: {
    groupId: "test-group",
    myNickname: "현재사용자",
    members: [
      {
        userId: "user1",
        nickname: "현재사용자",
        lastOnlineDate: currentDate.toISOString(),
      },
      {
        userId: "user2",
        nickname: "비활성멤버1",
        lastOnlineDate: tenDaysAgo.toISOString(),
      },
      {
        userId: "user3",
        nickname: "비활성멤버2",
        lastOnlineDate: fifteenDaysAgo.toISOString(),
      },
    ],
  },
};

export const MixedActivityMembers: Story = {
  args: {
    groupId: "test-group",
    myNickname: "현재사용자",
    members: [
      {
        userId: "user1",
        nickname: "현재사용자",
        lastOnlineDate: currentDate.toISOString(),
      },
      {
        userId: "user2",
        nickname: "활발한멤버",
        lastOnlineDate: threeDaysAgo.toISOString(),
      },
      {
        userId: "user3",
        nickname: "비활성멤버1",
        lastOnlineDate: tenDaysAgo.toISOString(),
      },
      {
        userId: "user4",
        nickname: "비활성멤버2",
        lastOnlineDate: twentyDaysAgo.toISOString(),
      },
      {
        userId: "user5",
        nickname: "최근접속멤버",
        lastOnlineDate: oneDayAgo.toISOString(),
      },
    ],
  },
};

export const SingleMemberActive: Story = {
  args: {
    groupId: "test-group",
    myNickname: "현재사용자",
    members: [
      {
        userId: "user1",
        nickname: "현재사용자",
        lastOnlineDate: currentDate.toISOString(),
      },
    ],
  },
};

export const SingleMemberInactive: Story = {
  args: {
    groupId: "test-group", 
    myNickname: "다른사용자",
    members: [
      {
        userId: "user1",
        nickname: "비활성멤버",
        lastOnlineDate: fifteenDaysAgo.toISOString(),
      },
    ],
  },
};