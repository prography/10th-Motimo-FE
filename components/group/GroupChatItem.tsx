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
        checked ? "bg-[#33363D]" : "border border-[#33363D]"
      )}>
        {checked && <CheckIcon width={14} height={14} color="#FFFFFF" />}
      </div>
      <span className="font-SUIT_Variable font-normal text-sm leading-[1.5] tracking-[-0.01em] text-[#33363D]">
        {label}
      </span>
    </div>
  );
};

// Reaction illustration component
const ReactionIllustration = ({ 
  type = "최고!" 
}: { 
  type?: string;
}) => {
  return (
    <div className="w-20 h-20 bg-[#75E38D] rounded-full relative overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#75E38D] to-[#118029]" />
      
      {/* Text badge */}
      <div className="absolute left-[18px] top-[6px] w-11 h-[25px] bg-[#118029] rounded-full flex items-center justify-center">
        <span className="font-SUIT_Variable font-normal text-[13.7px] leading-[1.4] tracking-[-0.01em] text-white">
          {type}
        </span>
      </div>
      
      {/* Illustration placeholder */}
      <div className="absolute left-[18px] top-[37px] w-[45px] h-[43px] bg-[#118029] opacity-30" />
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
  reactionType = "최고!",
  className,
}: GroupChatItemProps) => {
  const isMe = type === "me";

  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-[328px]",
        isMe ? "items-end" : "items-start",
        className
      )}
    >
      {/* Username */}
      <div className={cn(
        "w-full",
        isMe 
          ? "font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#1E2124] text-right" 
          : "font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#1E2124] text-left"
      )}>
        {username}
      </div>

      {/* Container */}
      <div className={cn(
        "flex items-end gap-1 w-full",
        isMe ? "justify-end" : "justify-start"
      )}>
        {/* Icon Area - only show for me messages or when has reaction */}
        {((isMe && style !== "reaction") || hasReaction) && (
          <div className={cn(
            "bg-[#F7F7F8] rounded-lg p-2 flex items-center gap-1",
            isMe && !hasReaction && "order-2"
          )}>
            <HeartIcon 
              width={16} 
              height={16} 
              color={hasReaction ? "#EA3429" : "#33363D"} 
              filled={hasReaction} 
            />
            {hasReaction && (
              <span className="font-SUIT_Variable font-medium text-xs leading-[1.4] tracking-[-0.01em] text-black">
                {reactionCount}
              </span>
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div className={cn(
          "bg-[#F7F7F8] rounded-lg",
          style === "todo" && "py-3 px-4",
          style === "photo" && "p-3 w-[248px]",
          style === "diary" && "p-3 w-[248px]", 
          style === "reaction" && "py-3 px-4 w-[248px]",
          isMe && !hasReaction && "order-1"
        )}>
          {/* Main content */}
          <div className="flex flex-col gap-2">
            {/* Text content */}
            <div className="flex flex-col gap-1">
              {/* Main text */}
              <span className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                {mainText}
              </span>
              
              {/* Checkbox for todo, photo, and diary styles */}
              {(style === "todo" || style === "photo" || style === "diary") && checkboxLabel && (
                <ChatCheckbox checked={isChecked} label={checkboxLabel} />
              )}
            </div>

            {/* Photo for photo style */}
            {style === "photo" && photoUrl && (
              <div className="w-[116px] h-[116px] rounded-lg border border-[#CDD1D5] overflow-hidden">
                <Image 
                  src={photoUrl} 
                  alt="첨부 이미지" 
                  width={116} 
                  height={116}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Diary text for diary style */}
            {style === "diary" && diaryText && (
              <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#464C53]">
                {diaryText}
              </p>
            )}

            {/* Reaction illustration for reaction style */}
            {style === "reaction" && (
              <ReactionIllustration type={reactionType} />
            )}
          </div>
        </div>

        {/* Icon Area for member messages without reaction */}
        {(!isMe && !hasReaction && style !== "reaction") && (
          <div className="bg-[#F7F7F8] rounded-lg p-2">
            <HeartIcon 
              width={16} 
              height={16} 
              color="#33363D" 
              filled={false} 
            />
          </div>
        )}
      </div>
    </div>
  );
}; 