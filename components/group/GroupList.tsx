import { cn } from "@/lib/utils";
import { GroupItem } from "./GroupItem";

export interface GroupData {
  id: string;
  isJoined: boolean;
  title: string;
  lastActivityDate?: string;
  hasNotification?: boolean;
}

interface GroupListProps {
  groups: GroupData[];
  onJoinGroup?: (groupId: string) => void;
  onNotificationClick?: (groupId: string) => void;
  className?: string;
}

export const GroupList = ({
  groups,
  onJoinGroup,
  onNotificationClick,
  className,
}: GroupListProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 w-full",
      className
    )}>
      {groups.map((group) => (
        <GroupItem
          key={group.id}
          isJoined={group.isJoined}
          title={group.title}
          lastActivityDate={group.lastActivityDate}
          hasNotification={group.hasNotification}
          onJoinClick={() => onJoinGroup?.(group.id)}
          onNotificationClick={() => onNotificationClick?.(group.id)}
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