"use client";

import dynamic from "next/dynamic";
import { GroupPage, PendingGroup } from "@/components/group";
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

export default function GroupRoute() {
  const { isLoggedIn } = useAuthStore();
  const [pendingGroups] = useState(mockPendingGroups);
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
        onJoinGroup={handleJoinGroup}
        onNotificationClick={handleNotificationClick}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar type="2" />
    </>
  );
}
