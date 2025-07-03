"use client";
import { GroupMessageItemRsMessageTypeEnum } from "@/api/generated/motimo/Api";
import { GroupChatItemProps, GroupChatItem } from "../../GroupChatItem";
import useModal from "@/hooks/useModal";
import ReactionModal from "../../ReactionModal";

const GroupChatRoom = () => {
  return (
    <>
      <section className="overflow-y-auto w-full flex flex-col items-center gap-4">
        <MessageItem
          // 임시
          messageType={GroupMessageItemRsMessageTypeEnum.TODO}
          contents={{
            username: "asdf",
            id: "qwe",
            mainText: "yaho",
            style: "diary",
            type: "me",
          }}
        />
      </section>
    </>
  );
};
export default GroupChatRoom;

type GroupChatItemValueProps = Omit<GroupChatItemProps, "onReactionClick">;

interface GroupMessage {
  messageType: GroupMessageItemRsMessageTypeEnum;
  contents: GroupChatItemValueProps | EnterMessageProps;
}

const MessageItem = ({ messageType, contents }: GroupMessage) => {
  switch (messageType) {
    case GroupMessageItemRsMessageTypeEnum.ENTER:
      // 이름을 바꿔야 함. userName말고 더 명확하게 보이도록.
      const { userName } = contents as EnterMessageProps;
      return (
        <>
          <EnterMessage />
        </>
      );
    case GroupMessageItemRsMessageTypeEnum.TODO:
      const valueProps = contents as GroupChatItemValueProps;
      const isReaction = valueProps.style === "reaction";
      const { openModal, closeModal } = useModal();
      return (
        <>
          <GroupChatItem
            {...valueProps}
            onReactionClick={
              !isReaction
                ? () => {
                    openModal(
                      <ReactionModal
                        onClose={() => closeModal()}
                        onLeaveReaction={async () => {}}
                      />,
                    );
                  }
                : undefined
            }
          />
        </>
      );
    default:
      return <></>;
  }
};

interface EnterMessageProps {
  userName: string;
}
const EnterMessage = ({ userName }: EnterMessageProps) => {
  return (
    <>
      <div className="px-3 py-2 bg-background-assistive rounded inline-flex justify-center items-center gap-2">
        <p className="justify-center text-label-normal text-sm font-medium font-['SUIT_Variable'] leading-tight">
          {`${userName}님이 그룹에 입장했습니다.`}
        </p>
      </div>
    </>
  );
};
