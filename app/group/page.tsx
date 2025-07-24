"use client";

import dynamic from "next/dynamic";
import { GroupPage, PendingGroup } from "@/components/group";
import { useGoals, useGoalsNotInGroup, useJoinedGroups } from "@/api/hooks";

// 클라이언트에서만 렌더링되는 BottomTabBar (SSR 제외)
const BottomTabBar = dynamic(
  () =>
    import("@/components/shared/BottomTabBar/BottomTabBar").then((mod) => ({
      default: mod.BottomTabBar,
    })),
  { ssr: false },
);

export default function GroupRoute() {
  // const [joinedGroups] = useState([]); // 현재는 빈 배열
  // const { data: joinedGroups } = useGroupsMe();
  const { data: joinedGroups } = useJoinedGroups();
  const { data: pendingGroups } = useGoalsNotInGroup();

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // TODO: Implement notification logic
  };

  return (
    <>
      <GroupPage
        pendingGroups={pendingGroups ?? []}
        joinedGroups={joinedGroups ?? []}
        onNotificationClick={handleNotificationClick}
      />

      {/* Bottom Tab Bar */}
      <BottomTabBar type="2" />
    </>
  );
}
