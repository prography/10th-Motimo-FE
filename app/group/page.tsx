"use client";

import dynamic from "next/dynamic";
import { GroupData, GroupPage, PendingGroup } from "@/components/group";
import useAuthStore from "@/stores/useAuthStore";
import { useState } from "react";

// 클라이언트에서만 렌더링되는 BottomTabBar (SSR 제외)
const BottomTabBar = dynamic(
  () =>
    import("@/components/shared/BottomTabBar/BottomTabBar").then((mod) => ({
      default: mod.BottomTabBar,
    })),
  { ssr: false },
);

// Mock data for pending groups
const pendingGroups: GroupData[] = [
  {
    hasNotification: true,
    id: "1",
    isJoined: true,
    lastActivityDate: "2025.05.12",
    title: "아 그룹명뭐로하지",
  },
  {
    id: "2",
    isJoined: false,
    title: "목표 이름이 여기에",
  },
  {
    hasNotification: false,
    id: "3",
    isJoined: true,
    lastActivityDate: "2025.05.15",
    title: "프로그래밍 스터디 그룹",
  },
  {
    id: "4",
    isJoined: false,
    title: "건강한 생활 만들기",
  },
  {
    hasNotification: true,
    id: "5",
    isJoined: true,
    lastActivityDate: "2025.05.10",
    title: "독서 클럽",
  },
];

export default function GroupRoute() {
  const [joinedGroups] = useState([]); // 현재는 빈 배열
  const handleJoinGroup = (groupId: number) => {
    console.log(`Joining group ${groupId}`);
    // TODO: Implement group join logic
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // TODO: Implement notification logic
  };

  return (
    <>
      <GroupPage
        pendingGroups={pendingGroups}
        joinedGroups={joinedGroups}
        onJoinGroup={() => {}}
        onNotificationClick={handleNotificationClick}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar type="2" />
    </>
  );
}
