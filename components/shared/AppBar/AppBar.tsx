import { cn } from "@/lib/utils";
import { BellIcon } from "../../icons/BellIcon";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";

interface AppBarProps {
  type: "main" | "back" | "progress";
  title?: string;
  points?: string;
  hasNotification?: boolean;
  progress?: number; // 0-100 for progress type
  onBackClick?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

export const AppBar = ({
  type,
  title = "투두 추가",
  points = "1,000P",
  hasNotification = false,
  progress = 50,
  onBackClick,
  onNotificationClick,
  className,
}: AppBarProps) => {
  return (
    <div className={cn(
      "flex items-center relative w-[360px] h-14 bg-Color-white px-3 py-2",
      {
        "justify-end": type === "main",
        "justify-start": type === "back" || type === "progress",
      },
      className
    )}>
      {/* Back button - shown for back and progress types */}
      {(type === "back" || type === "progress") && (
        <button 
          className="flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer p-0 flex-shrink-0 hover:opacity-70"
          onClick={onBackClick}
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon />
        </button>
      )}

      {/* Title - shown for back type */}
      {type === "back" && (
        <div className="flex-1 ml-5">
          <h1 className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.02em] text-Color-black m-0">
            {title}
          </h1>
        </div>
      )}

      {/* Progress bar - shown for progress type */}
      {type === "progress" && (
        <div className="flex-1 ml-5 flex items-center">
          <div className="w-[232px] h-2 bg-Color-gray-10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-Color-primary-50 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Right area - shown for main type */}
      {type === "main" && (
        <div className="flex items-center gap-1 ml-auto">
          <div className="bg-Color-primary-5 rounded-full px-2 py-2 flex items-center justify-center">
            <span className="font-SUIT_Variable font-bold text-xs leading-[1.2] tracking-[-0.02em] text-Color-primary-50">
              {points}
            </span>
          </div>
          <button 
            className="flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer p-2 hover:opacity-70"
            onClick={onNotificationClick}
            aria-label="알림"
          >
            <BellIcon hasNotification={hasNotification} />
          </button>
        </div>
      )}
    </div>
  );
}; 