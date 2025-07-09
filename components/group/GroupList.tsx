import { cn } from "@/lib/utils";
import { GroupItem } from "./GroupItem";
import { JoinedGroupRs } from "@/api/generated/motimo/Api";

export interface GroupData {
  id: string;
  isJoined: boolean;
  title: string;
  lastActivityDate?: string;
  hasNotification?: boolean;
}

interface GroupListProps {
  groups: JoinedGroupRs[];
  onJoinGroup?: (groupId: string) => void;
  className?: string;
  isJoined: boolean;
}

export const GroupList = ({
  groups,
  onJoinGroup,
  className,
  isJoined,
}: GroupListProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {groups.map((group, i) => (
        <GroupItem
          key={`${group.title}-${i}`}
          isJoined={isJoined}
          title={group.title ?? ""}
          lastActivityDate={group.lastActiveDate}
          hasNotification={group.isNotificationActive}
          onJoinClick={() => {
            // todo: move to join random group page
          }}
        />
      ))}

      {groups.length === 0 && (
        <div className="flex items-center justify-center h-32 text-Color-gray-60">
          <span className="font-SUIT_Variable font-medium text-sm">
            참여할 수 있는 그룹이 없습니다
          </span>
        </div>
      )}
    </div>
  );
};
