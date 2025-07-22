"use client";
import {
  GetGroupChatParamsDirectionEnum,
  GroupMessageContentRs,
  GroupMessageItemRs,
  TodoCompletedContent,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";
import { GroupChatItemProps, GroupChatItem } from "../../GroupChatItem";
import useModal from "@/hooks/useModal";
import ReactionModal from "../../ReactionModal";
import { useMyProfile } from "@/api/hooks";
import useSWRInfinite from "swr/infinite";
import { groupApi } from "@/api/service";
import { useState, useRef } from "react";
import {
  GroupChatRs,
  GroupMessageContentTypeEnum,
} from "@/api/generated/motimo/Api";
import useGroupChatInfinite from "@/hooks/queries/useGroupChatInfinite";
import { useObservingExist } from "@/hooks/queries/useSubGoalTodosInfiniites";
import { UpsertGroupReactionParamsTypeEnum } from "@/api/generated/motimo/Api";
import ReactionTypes from "@/types/reactionTypes";
interface GroupChatRoomProps {
  groupId: string;
}
const GroupChatRoom = ({ groupId }: GroupChatRoomProps) => {
  const { data: myProfile } = useMyProfile();
  const userId = myProfile?.id;
  const [page, setPage] = useState(1);

  // 방향은 임시
  const {
    data,
    isLoading,
    isReachedFirst,
    isReachedLast,
    setSize,
    size,
    mutate,
  } = useGroupChatInfinite(groupId, GetGroupChatParamsDirectionEnum.BEFORE);
  const observingFirstRef = useRef(null);
  const observingFirstExist = useObservingExist(
    isLoading,
    isReachedFirst,
    observingFirstRef,
    () => {
      setSize(size + 1);
    },
  );

  return (
    <>
      <section className="overflow-y-auto w-full flex flex-col items-center gap-5 ">
        <div ref={observingFirstRef}>{/** 옵저버 */}</div>
        {data?.map((pageInfo) =>
          pageInfo.messages?.map((messageInfo) => {
            if (
              messageInfo.message.type ===
              GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT
            ) {
              console.log(
                "일단 주소 postman으로 찍어보자.: ",
                (messageInfo.message.content as TodoResultSubmittedContent)
                  .fileUrl,
              );
            }
            return (
              <MessageItem
                // 임시
                key={messageInfo.messageId}
                messageType={messageInfo.message.content?.type || null}
                id={messageInfo.messageId}
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
                        style: "todo",

                        type: messageInfo.userId === userId ? "me" : "member",

                        diaryText:
                          (
                            messageInfo.message
                              .content as TodoResultSubmittedContent &
                              TodoCompletedContent
                          )?.content || undefined,
                        hasReaction: messageInfo.hasUserReacted,
                        reactionCount: messageInfo.reactionCount,
                        reactionType: GroupMessageContentTypeEnum.TODO_COMPLETE
                          ? undefined
                          : (
                              messageInfo.message
                                .content as TodoResultSubmittedContent
                            ).emotion,
                        // fileName:'',

                        // photoUrl:
                        //   (
                        //     messageInfo.message
                        //       .content as TodoResultSubmittedContent &
                        //       TodoCompletedContent
                        //   )?.fileUrl || undefined,
                        checkboxLabel: (
                          messageInfo.message
                            .content as TodoResultSubmittedContent &
                            TodoCompletedContent
                        )?.todoTitle,
                      }
                }
              />
            );
          }),
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
  id: string;
}

const MessageItem = ({ messageType, contents, id }: GroupMessage) => {
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
      const reactionTypeMaps: {
        [componentType: ReactionTypes]: UpsertGroupReactionParamsTypeEnum;
      } = {
        good: "GOOD",
        cool: "COOL",
        cheerUp: "CHEER_UP",
        best: "BEST",
        love: "LIKE",
      };
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
                        onLeaveReaction={async (selectedType) => {
                          const res = await groupApi.upsertGroupReaction(id, {
                            type: reactionTypeMaps[selectedType],
                          });
                          if (res) {
                            closeModal();
                            mutate();
                          }
                        }}
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
