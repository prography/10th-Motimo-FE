import { AppBar } from "@/components/shared/AppBar/AppBar";
import { GroupEmptyState } from "./GroupEmptyState";
import { PendingGroupList, PendingGroup } from "./PendingGroupList";

interface GroupPageProps {
  pendingGroups: PendingGroup[];
  joinedGroups: any[]; // 추후 타입 정의
  onJoinGroup: (groupId: number) => void;
  onNotificationClick?: () => void;
  className?: string;
}

export function GroupPage({
  pendingGroups,
  joinedGroups,
  onJoinGroup,
  onNotificationClick,
  className = "",
}: GroupPageProps) {
  return (
    <div className={`min-h-screen bg-Color-gray-5 flex flex-col ${className}`}>
      {/* App Bar */}
      <AppBar
        title="그룹"
        type="main"
        hasNotification={true}
        onNotificationClick={onNotificationClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Empty State - No joined groups */}
        {joinedGroups.length === 0 && <GroupEmptyState />}

        {/* Pending Groups Section */}
        <PendingGroupList groups={pendingGroups} onJoinGroup={onJoinGroup} />
      </div>
    </div>
  );
}
