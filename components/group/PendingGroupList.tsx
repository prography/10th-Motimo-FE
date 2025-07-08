import { PendingGroupCard } from "./PendingGroupCard";

export interface PendingGroup {
  id: number;
  goalName: string;
  memberCount?: number;
}

interface PendingGroupListProps {
  groups: PendingGroup[];
  onJoinGroup: (groupId: number) => void;
  className?: string;
}

export function PendingGroupList({
  groups,
  onJoinGroup,
  className = "",
}: PendingGroupListProps) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <div className={`px-4 pb-4 ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-Color-gray-90 font-SUIT">
          참여 대기 중인 목표 ({groups.length})
        </h2>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <PendingGroupCard
            key={group.id}
            id={group.id}
            goalName={group.goalName}
            memberCount={group.memberCount}
            onJoin={onJoinGroup}
          />
        ))}
      </div>
    </div>
  );
}
