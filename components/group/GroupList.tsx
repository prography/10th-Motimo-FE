import { cn } from "@/lib/utils";
import { GroupItem } from "./GroupItem";
import { GoalNotInGroupRs, JoinedGroupRs } from "@/api/generated/motimo/Api";
import { useRouter } from "next/navigation";

// 타입 가드 함수들
const isJoinedGroupRs = (group: JoinedGroupRs | GoalNotInGroupRs): group is JoinedGroupRs => {
  return 'lastActiveDate' in group || 'isNotificationActive' in group;
};

interface GroupListProps<T extends JoinedGroupRs | GoalNotInGroupRs> {
  groups: T[];
  onJoinGroup?: (groupId: string) => void;
  className?: string;
  isJoined: boolean;
}

export const GroupList = <T extends JoinedGroupRs | GoalNotInGroupRs>({
  groups,
  onJoinGroup,
  className,
  isJoined,
}: GroupListProps<T>) => {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {groups.map((group, i) => {
        // 타입에 따라 분기 처리
        if (isJoinedGroupRs(group)) { // TODO: should refactor
          // JoinedGroupRs 타입인 경우
          return (
            <GroupItem
              key={`${group.title}-${i}`}
              isJoined={isJoined}
              title={group.title ?? ""}
              lastActivityDate={group.lastActiveDate}
              hasNotification={group.isNotificationActive}
              onJoinClick={() => { }}
            />
          );
        } else {
          // GoalNotInGroupRs 타입인 경우
          return (
            <GroupItem
              key={`${group.title}-${i}`}
              isJoined={isJoined}
              title={group.title ?? ""}
              lastActivityDate={undefined} // GoalNotInGroupRs는 lastActiveDate가 없음
              hasNotification={false} // GoalNotInGroupRs는 isNotificationActive가 없음
              onJoinClick={() => {
                // todo: move to join random group page
                router.push("/group/join-random");
              }}
            />
          );
        }
      })}

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
