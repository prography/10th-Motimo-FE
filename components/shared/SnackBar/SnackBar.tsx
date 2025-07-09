import { cn } from "../utils/utils";
import { WarningIcon } from "../../icons/WarningIcon";

interface SnackBarProps {
  text: string;
  showIcon?: boolean;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SnackBar = ({
  text,
  showIcon = false,
  actionText,
  onActionClick,
  className,
}: SnackBarProps) => {
  return (
    <div
      className={cn(
        "flex items-center w-[328px] h-10 bg-Color-gray-80 rounded-lg pl-4 pr-2 py-2 gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-0.5 flex-1">
        {showIcon && (
          <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <WarningIcon />
          </div>
        )}
        <div className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-Color-white flex-1">
          {text}
        </div>
      </div>
      {actionText && (
        <div className="flex items-center justify-center h-8 px-1">
          <button
            className={cn(
              "font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-primary-20 bg-transparent border-none cursor-pointer p-0 transition-opacity duration-200",
              "hover:opacity-80",
              "focus:outline-2 focus:outline-Color-primary-20 focus:outline-offset-2 focus:rounded focus-visible:outline-2 focus-visible:outline-Color-primary-20 focus-visible:outline-offset-2",
            )}
            onClick={onActionClick}
          >
            {actionText}
          </button>
        </div>
      )}
    </div>
  );
};
