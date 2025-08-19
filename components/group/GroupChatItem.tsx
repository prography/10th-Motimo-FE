import { cn } from "@/lib/utils";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";
import Image from "next/image";

// SVG imports
import ReactionBest from "@/components/shared/public/reactions/Reaction_Best.svg";
import ReactionGood from "@/components/shared/public/reactions/Reaction_Good.svg";
import ReactionCool from "@/components/shared/public/reactions/Reaction_Cool.svg";
import ReactionCheerUp from "@/components/shared/public/reactions/Reaction_CheerUp.svg";
import ReactionLove from "@/components/shared/public/reactions/Reaction_Love.svg";
import ReactionTypes from "@/types/reactionTypes";
import { useMyProfile } from "@/api/hooks";
import {
  GroupMessageContentRs,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";

interface GroupChatItemProps {
  type: "me" | "member";
  style: "todo" | "reaction";
  hasUserReacted?: boolean;
  reactionCount?: number;
  userName: string;
  // userId: string;
  mainText: string;
  checkboxLabel?: string;
  isChecked?: boolean;
  diaryText?: string;
  // fileUrl?: string;
  fileName?: string;
  photoUrl?: string;
  reactionType?: ReactionTypes;
  className?: string;
  onReactionClick?: (messageId: string) => void;
  id: string;
}

// Checkbox component for todo items
const ChatCheckbox = ({
  checked,
  label,
}: {
  checked: boolean;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-1 py-1">
      <div
        className={cn(
          "w-4 h-4 rounded-[4px] flex items-center justify-center",
          checked ? "bg-[#33363D]" : "border border-[#33363D]",
        )}
      >
        {checked && <CheckIcon width={14} height={14} color="#FFFFFF" />}
      </div>
      <span className="font-SUIT_Variable font-normal text-sm leading-[1.5] tracking-[-0.01em] text-[#33363D]">
        {label}
      </span>
    </div>
  );
};

// Reaction illustration component
const ReactionIllustration = ({ type = "best" }: { type?: ReactionTypes }) => {
  const reactionConfig = {
    best: {
      Component: ReactionBest,
      label: "최고!",
    },
    good: {
      Component: ReactionGood,
      label: "좋아!",
    },
    cool: {
      Component: ReactionCool,
      label: "멋져!",
    },
    cheerUp: {
      Component: ReactionCheerUp,
      label: "화이팅!",
    },
    love: {
      Component: ReactionLove,
      label: "사랑해!",
    },
  };

  const config = reactionConfig[type] || reactionConfig.best;
  const { Component, label } = config;

  return (
    <div className="w-20 h-20 rounded-full relative overflow-hidden">
      {/* Reaction SVG Component */}
      <Component className="w-full h-full object-cover" aria-label={label} />
    </div>
  );
};

export const GroupChatItem = ({
  style,
  hasUserReacted: hasReaction = false,
  reactionCount = 2,
  userName: username,
  mainText,
  checkboxLabel = "프레이머 공부하기",
  isChecked = true,
  diaryText,
  photoUrl,
  fileName,
  reactionType = "best",
  className,
  onReactionClick,
  id,
  type,
  // userId: senderId,
}: GroupChatItemProps) => {
  const { data: myProfile } = useMyProfile();
  // const isMe = myProfile?.id === senderId;
  const isMe = type === "me";

  return (
    <div
      className={cn(
        "flex flex-col gap-1 w-full",
        // "flex flex-col gap-1 w-[328px]",
        isMe ? "items-end" : "items-start",
        className,
      )}
    >
      {/* Username */}
      <div
        className={cn(
          "w-full",
          isMe
            ? "font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#1E2124] text-right"
            : "font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#1E2124] text-left",
        )}
      >
        {username}
      </div>

      {/* Container */}
      <div
        className={cn(
          "flex items-end gap-1 w-full",
          isMe ? "justify-end" : "justify-start",
        )}
      >
        {/* Icon Area for me messages - render first to appear on the left */}
        {isMe && style !== "reaction" && (
          <button
            className="bg-[#F7F7F8] rounded-lg p-2 flex items-center gap-1 hover:bg-[#E6E8EA] transition-colors cursor-pointer"
            onClick={() => onReactionClick?.(id)}
            aria-label={hasReaction ? "반응 취소" : "반응 추가"}
          >
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
          </button>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "bg-[#F7F7F8] rounded-lg",
            style === "todo" &&
              `py-3 px-4 ${diaryText || photoUrl ? "w-[248px]" : ""}`,
            // style === "photo" && "p-3 w-[248px]",
            // style === "diary" && "p-3 w-[248px]",
            style === "reaction" && "py-3 px-4 w-[248px]",
          )}
        >
          {/* Main content */}
          <div className="flex flex-col gap-2">
            {/* Text content */}
            <div className="flex flex-col gap-1">
              {/* Main text */}
              <span className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                {mainText}
              </span>

              {/* Checkbox for todo, photo, and diary styles */}
              {/* {(style === "todo" || style === "photo" || style === "diary") && */}
              {style === "todo" && checkboxLabel && (
                <ChatCheckbox checked={isChecked} label={checkboxLabel} />
              )}
            </div>

            {/* Photo for photo style */}
            {/* {style === "photo" && photoUrl && ( */}
            {style === "todo" && photoUrl && (
              <div className="w-[116px] h-[116px] rounded-lg border border-[#CDD1D5] overflow-hidden">
                {photoUrl.startsWith("http") ? (
                  <Image
                    src={photoUrl}
                    alt="첨부 이미지"
                    width={116}
                    height={116}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="font-['SUIT_Variable']"> Invalid URL path</p>
                )}
              </div>
            )}

            {/* Diary text for diary style */}
            {/* {style === "diary" && diaryText && ( */}
            {style === "todo" && diaryText && (
              <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#464C53]">
                {diaryText}
              </p>
            )}

            {style === "todo" && fileName && (
              <div
                className="pl-4 pr-3 py-2 relative bg-background-assistive rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow
            -hidden"
              >
                <p className="justify-start text-label-normal text-sm font-bold font-['SUIT_Variable'] leading-tight">
                  {fileName}
                </p>
              </div>
            )}

            {/* Reaction illustration for reaction style */}
            {style === "reaction" && (
              <ReactionIllustration type={reactionType} />
            )}
          </div>
        </div>

        {/* Icon Area for member messages - render last to appear on the right */}
        {!isMe && style !== "reaction" && (
          <button
            className="bg-[#F7F7F8] rounded-lg p-2 flex items-center gap-1 hover:bg-[#E6E8EA] transition-colors cursor-pointer"
            onClick={() => onReactionClick?.(id)}
            aria-label={hasReaction ? "반응 취소" : "반응 추가"}
          >
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
          </button>
        )}
      </div>
    </div>
  );
};
