import { cn } from "@/lib/utils";
import { BellIcon } from "@/components/icons/BellIcon";

interface GroupItemProps {
  isJoined: boolean;
  title: string;
  lastActivityDate?: string;
  onJoinClick?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

export const GroupItem = ({
  isJoined,
  title,
  lastActivityDate,
  onJoinClick,
  onNotificationClick,
  className,
}: GroupItemProps) => {
  if (isJoined) {
    return (
      <div className={cn(
        "flex flex-col justify-center gap-1 p-3 w-[328px] bg-Color-white rounded border",
        className
      )}>
        {/* Title and notification icon */}
        <div className="flex justify-between items-center gap-4 w-full">
          <span className="flex-1 font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-black">
            {title}
          </span>
          <button 
            className="flex justify-center items-center gap-2 p-2.5 w-8 h-8 bg-Color-gray-05 rounded"
            onClick={onNotificationClick}
            aria-label="알림 설정"
          >
            <BellIcon width={20} height={20} color="#33363D" />
          </button>
        </div>

        {/* Last activity date */}
        {lastActivityDate && (
          <div className="flex gap-1">
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-60">
              최근 활동일 :
            </span>
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-60">
              {lastActivityDate}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col items-end gap-3 p-4 w-[328px] bg-Color-white rounded border",
      className
    )}>
      {/* Goal title */}
      <h3 className="w-full font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-gray-80 h-[19px]">
        {title}
      </h3>

      {/* Join button */}
      <button
        className={cn(
          "flex flex-col justify-center gap-2 px-3 py-1 h-8 bg-Color-gray-80 rounded-lg",
          "hover:bg-Color-gray-70 transition-colors duration-200",
          "focus:outline-2 focus:outline-Color-gray-80 focus:outline-offset-2"
        )}
        onClick={onJoinClick}
      >
        <div className="flex justify-center items-center gap-2 w-full">
          <span className="font-Pretendard font-semibold text-sm leading-[1.5] tracking-[-0.01em] text-Color-white">
            그룹 참여하기
          </span>
        </div>
      </button>
    </div>
  );
}; 