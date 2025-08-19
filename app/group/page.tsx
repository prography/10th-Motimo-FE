"use client";

import dynamic from "next/dynamic";
import { GroupPage, PendingGroup } from "@/components/group";
import { useGoals, useGoalsNotInGroup, useJoinedGroups } from "@/api/hooks";
import useAuthStore from "@/stores/useAuthStore";
import GuestGroup from "@/components/group/Guest/GuestGroup/GuestGroup";
import { useRouter } from "next/navigation";

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

  // Guest처리
  const { isGuest, setIsGuest, logout, reset } = useAuthStore();
  const { push } = useRouter();

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // TODO: Implement notification logic
  };

  return (
    <>
      {isGuest ? (
        <>
          <GuestGroup
            onClickLogin={() => {
              // setIsGuest(false);
              // logout();
              reset();
              localStorage.removeItem("auth-storage");
              push("/onboarding");
            }}
          />
        </>
      ) : (
        <GroupPage
          pendingGroups={pendingGroups ?? []}
          joinedGroups={joinedGroups ?? []}
          onNotificationClick={handleNotificationClick}
        />
      )}

      {/* Bottom Tab Bar */}
      <BottomTabBar className="fixed bottom-0" type="2" />
    </>
  );
}
