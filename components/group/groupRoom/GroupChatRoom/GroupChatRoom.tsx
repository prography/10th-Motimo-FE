"use client";
import {
  TodoCompletedContent,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";
import { GroupChatItemProps, GroupChatItem } from "../../GroupChatItem";
import useModal from "@/hooks/useModal";
import ReactionModal from "../../ReactionModal";
import { useGroupChat, useMyProfile } from "@/api/hooks";
import useSWRInfinite from "swr/infinite";
import { groupApi } from "@/api/service";
import { useState } from "react";
import {
  GroupChatRs,
  GroupMessageContentTypeEnum,
} from "@/api/generated/motimo/Api";

interface GroupChatRoomProps {
  groupId: string;
}
const GroupChatRoom = ({ groupId }: GroupChatRoomProps) => {
  const { data: myProfile } = useMyProfile();
  const userId = myProfile?.id;
  const [page, setPage] = useState(1);

  const { data } = useSWRInfinite<GroupChatRs>(
    (pageIndex, prevPageData) => {
      //test
      console.log(
        "pageIndex, prevPageData: ",
        pageIndex,
        prevPageData,
        groupApi.getGroupChat,
      );
      return groupId;
    },
    async () => {
      console.log("비동기동작");
      return await groupApi.getGroupChat(groupId);
    },
    {
      refreshInterval: 1000 * 60 * 5, // 5분마다 갱신
    },
  );

  //test
  console.log("DATA in groupchatroom: ", data);

  // TODO : fileURL을 받으면 이걸로 HEAD로 이미지 타입 여부와 파일 이름을 알아내야 함.

  return (
    <>
      <section className="overflow-y-auto w-full flex flex-col items-center gap-5 ">
        {data?.map((pageInfo) =>
          pageInfo.messages?.map((messageInfo) => (
            <MessageItem
              // 임시
              key={messageInfo.messageId}
              messageType={messageInfo.message.content?.type || null}
              // messageType={GroupMessageItemRsMessageTypeEnum.TODO}
              contents={
                messageInfo.message.content?.type ===
                  GroupMessageContentTypeEnum.JOIN ||
                messageInfo.message.content?.type ===
                  GroupMessageContentTypeEnum.LEAVE
                  ? { username: messageInfo.userName }
                  : {
                      username: messageInfo.userName,
                      id: messageInfo.messageId,
                      mainText:
                        messageInfo.message.content?.type ===
                        GroupMessageContentTypeEnum.TODO_COMPLETE
                          ? "투두를 완료했어요!"
                          : "투두 기록을 남겼어요!",
                      style:
                        messageInfo.message.content?.type ===
                        GroupMessageContentTypeEnum.TODO_COMPLETE
                          ? "todo"
                          : (
                                messageInfo.message
                                  .content as TodoResultSubmittedContent &
                                  TodoCompletedContent
                              )?.fileUrl
                            ? "photo"
                            : "diary",
                      type: messageInfo.userId === userId ? "me" : "member",
                      diaryText:
                        (
                          messageInfo.message
                            .content as TodoResultSubmittedContent &
                            TodoCompletedContent
                        )?.content || undefined,
                      hasReaction: messageInfo.hasUserReacted,
                      reactionCount: messageInfo.reactionCount,
                      reactionType: "best", // 임시
                      photoUrl:
                        (
                          messageInfo.message
                            .content as TodoResultSubmittedContent &
                            TodoCompletedContent
                        )?.fileUrl || undefined,
                      checkboxLabel: (
                        messageInfo.message
                          .content as TodoResultSubmittedContent &
                          TodoCompletedContent
                      )?.todoTitle,
                    }
              }
            />
          )),
        )}
      </section>
    </>
  );
};
export default GroupChatRoom;

type GroupChatItemValueProps = Omit<GroupChatItemProps, "onReactionClick">;

interface GroupMessage {
  messageType: GroupMessageContentTypeEnum | null;
  contents: GroupChatItemValueProps | EnterMessageProps;
}

const MessageItem = ({ messageType, contents }: GroupMessage) => {
  switch (messageType) {
    case GroupMessageContentTypeEnum.JOIN: {
      // 이름을 바꿔야 함. userName말고 더 명확하게 보이도록.
      const { username } = contents as EnterMessageProps;
      //test
      console.log("contents: ", username);
      return (
        <>
          <EnterMessage username={username} />
        </>
      );
    }
    case GroupMessageContentTypeEnum.LEAVE: {
      return <>{/* <div>대충 나가는 메시지.</div> */}</>;
    }
    case GroupMessageContentTypeEnum.TODO_COMPLETE: {
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
    }
    case GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT: {
      const valueProps = contents as GroupChatItemValueProps;
      return (
        <>
          <GroupChatItem {...valueProps} />
        </>
      );
    }
    default:
      return <></>;
  }
};

interface EnterMessageProps {
  username: string;
}
const EnterMessage = ({ username }: EnterMessageProps) => {
  return (
    <>
      <div className="px-3 py-2 mb-1 bg-background-assistive rounded inline-flex justify-center items-center gap-2">
        <p className="justify-center text-label-normal text-sm font-medium font-['SUIT_Variable'] leading-tight">
          {`${username}님이 그룹에 입장했습니다.`}
        </p>
      </div>
    </>
  );
};
