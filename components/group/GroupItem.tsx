import { cn } from "@/lib/utils";
import { BellIcon } from "@/components/icons/BellIcon";
import { useNewGroupMessages } from "@/api/hooks";
import formatDate from "@/lib/date";

interface GroupItemProps {
  isJoined: boolean;
  groupId: string;
  title: string;
  lastActivityDate?: string;
  isNotificationActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const GroupItem = ({
  isJoined,
  groupId,
  title,
  lastActivityDate,
  isNotificationActive = true,
  onClick,
  className,
}: GroupItemProps) => {
  const { data: { hasNewMessages } = { hasNewMessages: false } } =
    useNewGroupMessages(groupId);
  console.log("msg", hasNewMessages);
  if (isJoined) {
    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-1 p-3 w-[328px] bg-Color-white rounded hover:cursor-pointer",
          className,
        )}
        onClick={onClick}
      >
        {/* Title and notification icon */}
        <div className="flex justify-between items-center gap-4 w-full">
          <span className="flex-1 font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-black">
            {title}
          </span>
          <div className="flex justify-center items-center gap-2 p-2.5 w-8 h-8 bg-Color-gray-05 rounded">
            <BellIcon
              width={20}
              height={20}
              color="#33363D"
              isNotificationActive={isNotificationActive}
              hasNewMessages={hasNewMessages}
            />
          </div>
        </div>

        {/* Last activity date */}
        {lastActivityDate && (
          <div className="flex gap-1">
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-60">
              최근 활동일 :
            </span>
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-60">
              {formatDate(lastActivityDate)}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-end gap-3 p-4 w-[328px] bg-Color-white rounded",
        className,
      )}
    >
      {/* Goal title */}
      <h3 className="w-full font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-gray-80 h-[19px]">
        {title}
      </h3>

      {/* Join button */}
      <button
        className={cn(
          "flex flex-col justify-center gap-2 px-3 py-1 h-8 bg-Color-gray-80 rounded-lg",
          "hover:bg-Color-gray-70 transition-colors duration-200",
          "focus:outline-2 focus:outline-Color-gray-80 focus:outline-offset-2",
        )}
        onClick={onClick}
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
