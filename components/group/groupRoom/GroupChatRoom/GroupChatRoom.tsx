"use client";
import {
  GetGroupChatParamsDirectionEnum,
  GroupMessageContentRs,
  GroupMessageItemRs,
  TodoCompletedContent,
  TodoResultSubmittedContent,
  TodoResultSubmittedContentEmotionEnum,
  MessageReactionContent,
} from "@/api/generated/motimo/Api";
import { GroupChatItemProps, GroupChatItem } from "../../GroupChatItem";
import useModal from "@/hooks/useModal";
import ReactionModal from "../../ReactionModal";
import { useMyProfile } from "@/api/hooks";
import useSWRInfinite, { SWRInfiniteKeyedMutator } from "swr/infinite";
import { groupApi } from "@/api/service";
import { useState, useRef, Fragment } from "react";
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

  const chooseMessageItem = (
    messageInfo: GroupMessageItemRs,
    type: GroupMessageContentTypeEnum,
  ) => {
    switch (type) {
      case GroupMessageContentTypeEnum.JOIN:
      case GroupMessageContentTypeEnum.LEAVE:
        return <NotiMessage type={type} username={messageInfo.userName} />;
      case GroupMessageContentTypeEnum.TODO_COMPLETE:
        return (
          <TodoCompleteMessage
            messageInfo={messageInfo}
            mutate={mutate}
            userId={userId ?? ""}
          />
        );
      case GroupMessageContentTypeEnum.TODO_RESULT_SUBMIT:
        return (
          <TodoResultMessage messageInfo={messageInfo} userId={userId ?? ""} />
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
            ,
          </>
        );
      }
      default:
        return <>존재해선 안되는 메시지</>;
    }
  };

  return (
    <>
      <section className="overflow-y-auto w-full flex flex-col items-center gap-5 ">
        <div ref={observingFirstRef}>{/** 옵저버 */}</div>
        {data?.map((pageInfo) =>
          pageInfo.messages?.map((messageInfo) => {
            const type = messageInfo.message.content
              .type as GroupMessageContentTypeEnum;
            return (
              <Fragment key={messageInfo.messageId}>
                {chooseMessageItem(messageInfo as GroupMessageItemRs, type)}
              </Fragment>
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

interface TodoCompleteMessageProps {
  messageInfo: GroupMessageItemRs;
  userId: string;
  mutate: SWRInfiniteKeyedMutator<GroupChatRs[]>;
}
type TodoCompleteContent = {
  content: TodoCompletedContent;
};
const TodoCompleteMessage = ({
  messageInfo,
  userId,
  mutate,
}: TodoCompleteMessageProps) => {
  const { openModal, closeModal } = useModal();

  const message = messageInfo.message as TodoCompleteContent;
  const content = message.content;
  return (
    <>
      <GroupChatItem
        id={messageInfo.messageId}
        mainText={"투두를 완료했어요!"}
        style="todo"
        type={messageInfo.userId === userId ? "me" : "member"}
        username={messageInfo.userName}
        checkboxLabel={content?.todoTitle ?? ""}
        hasReaction={messageInfo.hasUserReacted}
        reactionCount={messageInfo.reactionCount}
        onReactionClick={() => {
          openModal(
            <ReactionModal
              onClose={() => closeModal()}
              onLeaveReaction={async (selectedType) => {
                const emotionEnumVal = Object.entries(reactionTypeMaps).find(
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
        }}
      />
    </>
  );
};

type TodoResultMessage = {
  content: TodoResultSubmittedContent;
};
interface TodoResultMessageProps {
  messageInfo: GroupMessageItemRs;
  userId: string;
}
const TodoResultMessage = ({ messageInfo, userId }: TodoResultMessageProps) => {
  const message = messageInfo.message as TodoResultMessage;
  const content = message.content;
  return (
    <>
      <GroupChatItem
        id={messageInfo.messageId}
        mainText="투두 기록을 남겼어요!"
        style="todo"
        type={messageInfo.userId === userId ? "me" : "member"}
        username={messageInfo.userName}
        checkboxLabel={content.todoTitle}
        diaryText={content.content}
        // fileName={content["fileName"]}
        // photoUrl=""
        hasReaction={messageInfo.hasUserReacted}
        reactionCount={messageInfo.reactionCount}
      />
    </>
  );
};

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
        username={messageInfo.userName}
      />
    </>
  );
};
