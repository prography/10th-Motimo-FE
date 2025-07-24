import { AppBar } from "@/components/shared/AppBar/AppBar";
import { GroupEmptyState } from "./GroupEmptyState";
import { PendingGroupList, PendingGroup } from "./PendingGroupList";
import { GroupList } from "./GroupList";
import { GoalNotInGroupRs, JoinedGroupRs } from "@/api/generated/motimo/Api";

interface GroupPageProps {
  pendingGroups: GoalNotInGroupRs[];
  joinedGroups: JoinedGroupRs[]; // 추후 타입 정의
  onNotificationClick?: () => void;
  className?: string;
}

export function GroupPage({
  pendingGroups,
  joinedGroups,
  onNotificationClick,
  className = "",
}: GroupPageProps) {
  return (
    <div className={`min-h-screen bg-Color-gray-5 flex flex-col ${className}`}>
      {/* App Bar */}
      <AppBar
        title="그룹"
        type="main"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center">
        {/* Empty State - No joined groups */}
        {joinedGroups.length === 0 ? (
          <GroupEmptyState />
        ) : (
          <div className="w-full px-4">
            <div className="py-4">
              <h1 className="text-xl font-bold text-Color-gray-90 font-SUIT leading-[1.2em] tracking-[-0.01em]">
                참여 중인 그룹 ({joinedGroups.length})
              </h1>
            </div>
            <GroupList groups={joinedGroups} isJoined={true} />
          </div>
        )}

        {/* Pending Groups Section */}
        {/* <PendingGroupList groups={pendingGroups} onJoinGroup={onJoinGroup} /> */}
        <div className="w-full px-4">
          <div className="py-4">
            <h1 className="text-xl font-bold text-Color-gray-90 font-SUIT leading-[1.2em] tracking-[-0.01em]">
              참여 대기 중인 목표 ({pendingGroups.length})
            </h1>
          </div>
          <GroupList groups={pendingGroups} isJoined={false} />
        </div>
      </div>
    </div>
  );
}
