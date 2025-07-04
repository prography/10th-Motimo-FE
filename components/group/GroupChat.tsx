import { cn } from "@/lib/utils";
import { GroupChatItem } from "./GroupChatItem";
import ReactionTypes from "@/types/reactionTypes";

export interface ChatMessage {
  id: string;
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
  reactionType?: ReactionTypes;
  timestamp?: Date;
}

interface GroupChatProps {
  messages: ChatMessage[];
  className?: string;
  onReactionClick?: (messageId: string) => void;
}

export const GroupChat = ({ 
  messages, 
  className,
  onReactionClick
}: GroupChatProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-4 w-full",
      className
    )}>
      {messages.map((message) => (
        <GroupChatItem
          key={message.id}
          id={message.id}
          type={message.type}
          style={message.style}
          hasReaction={message.hasReaction}
          reactionCount={message.reactionCount}
          username={message.username}
          mainText={message.mainText}
          checkboxLabel={message.checkboxLabel}
          isChecked={message.isChecked}
          diaryText={message.diaryText}
          photoUrl={message.photoUrl}
          reactionType={message.reactionType}
          onReactionClick={onReactionClick}
        />
      ))}
    </div>
  );
}; 