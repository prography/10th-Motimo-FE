import { cn } from "@/lib/utils";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import Image from "next/image";

interface GroupChatItemProps {
  type: "me" | "member";
  style: "todo" | "photo" | "diary" | "reaction";
  hasReaction?: boolean;
  reactionCount?: number;
  username: string;
  mainText: string;
  checkboxLabel?: string;
  isChecked?: boolean;
  diaryText?: string;
  photoUrl?: string;
  reactionType?: string;
  className?: string;
}

// Checkbox component for todo items
const ChatCheckbox = ({ 
  checked, 
  label 
}: { 
  checked: boolean; 
  label: string;
}) => {
  return (
    <div className="flex items-center gap-1 py-1">
      <div className={cn(
        "w-4 h-4 rounded-[4px] flex items-center justify-center",
        checked ? "bg-Color-gray-80" : "border border-Color-gray-80"
      )}>
        {checked && <CheckIcon width={13} height={13} />}
      </div>
      <span className="font-SUIT_Variable font-normal text-sm leading-[1.5] tracking-[-0.01em] text-Color-gray-80">
        {label}
      </span>
    </div>
  );
};

// Reaction badge component
const ReactionBadge = ({ 
  count 
}: { 
  count: number;
}) => {
  return (
    <div className="flex items-center gap-1 p-2">
      <HeartIcon width={16} height={16} color="#EA3429" filled />
      <span className="font-SUIT_Variable font-medium text-xs leading-[1.4] tracking-[-0.01em] text-Color-black">
        {count}
      </span>
    </div>
  );
};

// Reaction illustration component
const ReactionIllustration = ({ 
  type = "최고" 
}: { 
  type?: string;
}) => {
  return (
    <div className="w-20 h-20 bg-[#75E38D] rounded-full relative flex items-center justify-center">
      {/* Simplified illustration - in real app would use actual graphics */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-sm text-Color-white">{type}</span>
      </div>
    </div>
  );
};

export const GroupChatItem = ({
  type,
  style,
  hasReaction = false,
  reactionCount = 2,
  username,
  mainText,
  checkboxLabel = "프레이머 공부하기",
  isChecked = true,
  diaryText,
  photoUrl,
  reactionType = "최고",
  className,
}: GroupChatItemProps) => {
  const isMe = type === "me";

  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-[328px]",
        isMe && "items-end",
        className
      )}
    >
      {/* Username */}
      <div className={cn(
        "font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-90 w-full",
        isMe ? "text-right" : "text-left"
      )}>
        {username}
      </div>

      {/* Chat container */}
      <div className={cn(
        "flex gap-1 items-end w-full",
        isMe && "flex-row-reverse"
      )}>
        {/* Message bubble */}
        <div className={cn(
          "bg-Color-gray-05 rounded-lg",
          style === "todo" ? "p-3" : "p-3",
          style === "photo" ? "max-w-[248px]" : style === "reaction" ? "max-w-[248px]" : "max-w-fit"
        )}>
          {/* Main content */}
          <div className="flex flex-col gap-2">
            {/* Text and checkbox */}
            <div className="flex flex-col gap-1">
              <span className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-80">
                {mainText}
              </span>
              
              {(style === "todo" || style === "photo" || style === "diary") && checkboxLabel && (
                <ChatCheckbox checked={isChecked} label={checkboxLabel} />
              )}
            </div>

            {/* Photo */}
            {style === "photo" && photoUrl && (
              <div className="w-[116px] h-[116px] rounded-lg border border-Color-gray-30 overflow-hidden">
                <Image 
                  src={photoUrl} 
                  alt="첨부 이미지" 
                  width={116} 
                  height={116}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Diary text */}
            {style === "diary" && diaryText && (
              <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-60">
                {diaryText}
              </p>
            )}

            {/* Reaction illustration */}
            {style === "reaction" && (
              <ReactionIllustration type={reactionType} />
            )}
          </div>
        </div>

        {/* Reaction badge */}
        {hasReaction && (
          <div className="bg-Color-gray-05 rounded-lg">
            <ReactionBadge count={reactionCount} />
          </div>
        )}
      </div>
    </div>
  );
}; 