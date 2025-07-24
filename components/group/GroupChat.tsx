import { cn } from "@/lib/utils";
import { GroupChatItem } from "./GroupChatItem";
import {
  GroupMessageItemRs,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";
import { useMyProfile } from "@/api/hooks";

interface GroupChatProps {
  messages: GroupMessageItemRs[];
  className?: string;
  onReactionClick?: (messageId: string) => void;
}

export const GroupChat = ({
  messages,
  className,
  onReactionClick,
}: GroupChatProps) => {
  const { data } = useMyProfile();

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {messages.map((m) => (
        <GroupChatItem
          key={m.messageId}
          id={m.messageId}
          // userId={m.userId}
          type={m.userId === data?.id ? "me" : "member"}
          style={"todo"}
          hasUserReacted={m.hasUserReacted}
          reactionCount={m.reactionCount}
          userName={m.userName}
          mainText={(m.message as TodoResultSubmittedContent).content ?? ""}
          checkboxLabel={"checkboxLabel"}
          isChecked={true}
          diaryText={"다이어리 텍스트"}
          photoUrl={"https://picsum.photos/200"}
          reactionType={"good"}
          onReactionClick={onReactionClick}
        />
      ))}
    </div>
  );
};
