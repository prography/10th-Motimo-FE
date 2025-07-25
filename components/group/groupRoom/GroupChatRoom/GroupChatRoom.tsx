"use client";
import {
  GetGroupChatParamsDirectionEnum,
  GroupMessageItemRs,
  TodoCompletedContent,
  TodoResultSubmittedContent,
  MessageReactionContent,
} from "@/api/generated/motimo/Api";
import { GroupChatItem } from "../../GroupChatItem";
import useModal from "@/hooks/useModal";
import ReactionModal from "../../ReactionModal";
import { useMyProfile } from "@/api/hooks";
import { SWRInfiniteKeyedMutator } from "swr/infinite";
import { groupApi } from "@/api/service";
import { useRef, useEffect } from "react";
import {
  GroupChatRs,
  GroupMessageContentTypeEnum,
} from "@/api/generated/motimo/Api";
import useGroupChatInfinite from "@/hooks/queries/useGroupChatInfinite";
import { useObservingExist } from "@/hooks/queries/useSubGoalTodosInfiniites";
import { UpsertGroupReactionParamsTypeEnum } from "@/api/generated/motimo/Api";
import ReactionTypes from "@/types/reactionTypes";

const reactionTypeMaps: {
  [componentType in UpsertGroupReactionParamsTypeEnum]: ReactionTypes;
} = {
  [UpsertGroupReactionParamsTypeEnum.GOOD]: "good",
  [UpsertGroupReactionParamsTypeEnum.COOL]: "cool",
  [UpsertGroupReactionParamsTypeEnum.CHEER_UP]: "cheerUp",
  [UpsertGroupReactionParamsTypeEnum.BEST]: "best",
  [UpsertGroupReactionParamsTypeEnum.LIKE]: "love",
};

interface GroupChatRoomProps {
  groupId: string;
}
const GroupChatRoom = ({ groupId }: GroupChatRoomProps) => {
  const { data: myProfile } = useMyProfile();
  const userId = myProfile?.id;
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // 방향은 일단 단방향만.
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
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [
    // 마지막 메시지 id
    data?.[data?.length - 1].messages[
      data?.[data?.length - 1].messages.length - 1
    ].messageId,
  ]);

  const chooseMessageItem = (
    messageInfo: GroupMessageItemRs,
    type: GroupMessageContentTypeEnum,
  ) => {
    switch (type) {
      case GroupMessageContentTypeEnum.JOIN:
      case GroupMessageContentTypeEnum.LEAVE:
        return <NotiMessage type={type} username={messageInfo.userName} />;
      case GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT:
      case GroupMessageContentTypeEnum.TODO_COMPLETE:
        return (
          <TodoMessage
            type={type}
            messageInfo={messageInfo}
            mutate={mutate}
            userId={userId ?? ""}
          />
        );

      case GroupMessageContentTypeEnum.MESSAGE_REACTION: {
        const content = (messageInfo.message as TodoReactionMessage).content;
        const refId = content.referenceMessageId;
        const refUserName =
          data?.reduce((acc, pageInfo) => {
            const found = pageInfo.messages.findIndex(
              (message) => message.messageId === refId,
            );
            if (found !== -1) {
              return pageInfo.messages[found].userName;
            }
            return acc;
          }, "") ?? "";

        return (
          <>
            <ReactionMessage
              messageInfo={messageInfo}
              userId={userId ?? ""}
              referUserName={refUserName}
              reactionType={
                reactionTypeMaps[
                  content.reactionType as unknown as UpsertGroupReactionParamsTypeEnum
                ]
              }
            />
          </>
        );
      }
      default:
        return <>존재해선 안되는 메시지</>;
    }
  };

  return (
    <>
      <section className="overflow-y-auto w-full flex flex-col items-center gap-5 pt-14">
        {observingFirstExist && (
          <div ref={observingFirstRef}>{/** 옵저버 */}</div>
        )}
        {data?.map((pageInfo, pageIdx) =>
          pageInfo.messages?.map((messageInfo, messageIdx) => {
            const type = messageInfo.message.content
              .type as GroupMessageContentTypeEnum;

            const isLastMessage =
              pageIdx === data?.length - 1 &&
              messageIdx === pageInfo.messages.length - 1;

            return (
              <div
                key={messageInfo.messageId}
                ref={isLastMessage ? lastMessageRef : undefined}
              >
                {chooseMessageItem(messageInfo as GroupMessageItemRs, type)}
              </div>
            );
          }),
        )}
      </section>
    </>
  );
};
export default GroupChatRoom;

interface EnterMessageProps {
  username: string;
  type: GroupMessageContentTypeEnum.JOIN | GroupMessageContentTypeEnum.LEAVE;
}
const NotiMessage = ({ username, type }: EnterMessageProps) => {
  return (
    <>
      <div className="px-3 py-2 mb-1 bg-background-assistive rounded inline-flex justify-center items-center gap-2">
        <p className="justify-center text-label-normal text-sm font-medium font-['SUIT_Variable'] leading-tight">
          {type === GroupMessageContentTypeEnum.JOIN
            ? `${username}님이 그룹에 입장했습니다.`
            : `${username}님이 그룹에서 퇴장했습니다.`}
        </p>
      </div>
    </>
  );
};

interface TodoMessageProps {
  type:
    | GroupMessageContentTypeEnum.TODO_COMPLETE
    | GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT;
  messageInfo: GroupMessageItemRs;
  userId: string;
  mutate: SWRInfiniteKeyedMutator<GroupChatRs[]>;
}
type TodoCompleteContent = {
  content: TodoCompletedContent;
};
type TodoResultMessage = {
  content: TodoResultSubmittedContent;
};
const TodoMessage = ({
  type,
  messageInfo,
  userId,
  mutate,
}: TodoMessageProps) => {
  const { openModal, closeModal } = useModal();

  const message =
    type === GroupMessageContentTypeEnum.TODO_COMPLETE
      ? (messageInfo.message as TodoCompleteContent)
      : (messageInfo.message as TodoResultMessage);
  const content = message.content;
  return (
    <>
      <GroupChatItem
        id={messageInfo.messageId}
        mainText={
          type === GroupMessageContentTypeEnum.TODO_COMPLETE
            ? "투두를 완료했어요!"
            : "투두 기록을 남겼어요!"
        }
        style="todo"
        type={messageInfo.userId === userId ? "me" : "member"}
        userName={messageInfo.userName}
        checkboxLabel={content?.todoTitle ?? ""}
        diaryText={
          type === GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT
            ? (message as TodoResultMessage).content.content
            : undefined
        }
        fileName={(message as TodoResultMessage).content.fileName}
        photoUrl={
          (message as TodoResultMessage).content.mimeType?.startsWith("image")
            ? (message as TodoResultMessage).content.fileUrl
            : undefined
        }
        hasUserReacted={messageInfo.hasUserReacted}
        reactionCount={messageInfo.reactionCount}
        onReactionClick={
          messageInfo.hasUserReacted
            ? undefined
            : () => {
                openModal(
                  <ReactionModal
                    onClose={() => closeModal()}
                    onLeaveReaction={async (selectedType) => {
                      const emotionEnumVal = Object.entries(
                        reactionTypeMaps,
                      ).find(
                        ([key, val]) => val === selectedType,
                      )![0] as unknown as UpsertGroupReactionParamsTypeEnum;

                      const res = await groupApi.upsertGroupReaction(
                        messageInfo.messageId,
                        {
                          type: emotionEnumVal,
                        },
                      );
                      if (res) {
                        closeModal();
                        mutate();
                      }
                    }}
                  />,
                );
              }
        }
      />
    </>
  );
};

// interface TodoResultMessageProps {
//   messageInfo: GroupMessageItemRs;
//   userId: string;
// }
// const TodoResultMessage = ({ messageInfo, userId }: TodoResultMessageProps) => {
//   const message = messageInfo.message as TodoResultMessage;
//   const content = message.content;
//   return (
//     <>
//       <GroupChatItem
//         id={messageInfo.messageId}
//         mainText="투두 기록을 남겼어요!"
//         style="todo"
//         type={messageInfo.userId === userId ? "me" : "member"}
//         userName={messageInfo.userName}
//         checkboxLabel={content.todoTitle}
//         diaryText={content.content}
//         // fileName={content["fileName"]}
//         // photoUrl=""
//         hasUserReacted={messageInfo.hasUserReacted}
//         reactionCount={messageInfo.reactionCount}
//       />
//     </>
//   );
// };

interface ReactionMessageProps {
  referUserName: string;
  messageInfo: GroupMessageItemRs;
  userId: string;
  reactionType: ReactionTypes;
}
type TodoReactionMessage = {
  content: MessageReactionContent;
};
const ReactionMessage = ({
  referUserName,
  messageInfo,
  userId,
  reactionType,
}: ReactionMessageProps) => {
  const isMe = userId === messageInfo.userId;

  return (
    <>
      <GroupChatItem
        reactionType={reactionType}
        mainText={`${isMe ? referUserName : messageInfo.userName}님의 투두에 반응을 남겼어요!`}
        id={messageInfo.messageId}
        style="reaction"
        type={isMe ? "me" : "member"}
        userName={messageInfo.userName}
      />
    </>
  );
};
