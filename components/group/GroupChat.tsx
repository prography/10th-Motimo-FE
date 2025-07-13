import { cn } from "@/lib/utils";
import { GroupChatItem } from "./GroupChatItem";
import ReactionTypes from "@/types/reactionTypes";
import { CustomSliceGroupMessageItemRs, GroupMessageItemRsMessageTypeEnum } from "@/api/generated/motimo/Api";

interface GroupChatProps {
  messages: CustomSliceGroupMessageItemRs;
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
      {messages?.content?.map((m) => {
        if (!m.senderId) {
          alert("senderId is null");

          return null;
        }

        if (!m.senderName) {
          alert("senderName is null");
          return null;
        }

        if (!m.message?.content) {
          alert("message is null");
          return null;
        }

        <GroupChatItem
          key={m.senderId}
          id={m.senderId}
          type={m.messageType ?? GroupMessageItemRsMessageTypeEnum["TODO"]}
          style={"todo"}
          hasReaction={m.hasReacted}
          reactionCount={m.reactionCount}
          username={m.senderName}
          mainText={m.message.content}
          checkboxLabel={"checkboxLabel"}
          isChecked={true}
          diaryText={"다이어리 텍스트"}
          photoUrl={"https://picsum.photos/200"}
          reactionType={"good"}
          onReactionClick={onReactionClick}
        />
      })}
    </div>
  );
}; 