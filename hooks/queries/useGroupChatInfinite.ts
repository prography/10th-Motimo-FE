import { groupApi } from "@/api/service";
import {
  GetGroupChatParamsDirectionEnum,
  GroupJoinContent,
  GroupLeaveContent,
  GroupMessageContentRs,
  GroupMessageContentTypeEnum,
  TodoCompletedContent,
  TodoResultSubmittedContent,
} from "@/api/generated/motimo/Api";
import useInfiniteSWR from "swr/infinite";

type CustomMessageType = {
  type: GroupMessageContentTypeEnum;
  content:
    | GroupJoinContent
    | GroupLeaveContent
    | TodoCompletedContent
    | TodoResultSubmittedContent;
};

const useGroupChatInfinite = (
  groupId: string,
  direction: GetGroupChatParamsDirectionEnum,
) => {
  const { data, error, isLoading, mutate, setSize, size } = useInfiniteSWR(
    (pageIndex, prevPageData) => {
      if (!groupId) return null;
      const directedCursor =
        direction === GetGroupChatParamsDirectionEnum.BEFORE
          ? (prevPageData?.prevCursor as string) || null
          : (prevPageData?.nextCursor as string) || null;

      return [groupId, prevPageData ? directedCursor : null];
    },
    async (key) => {
      const directedCursor = key[1];
      const res = await groupApi.getGroupChat(groupId, {
        cursor: directedCursor || undefined,
        direction: direction,
        limit: "10", // 임시 값
      });

      return res;
    },
    {
      refreshInterval: 1000 * 60 * 5,
    },
  );

  const sortedChatData = data
    // 날짜별로 정렬
    ?.sort(
      (dataA, dataB) =>
        new Date(dataA.messages?.[0]?.sendAt || 0).getTime() -
        new Date(dataB.messages?.[0]?.sendAt || 0).getTime(),
    )
    .map((info) => ({
      ...info,
      messages: (info.messages ?? []).sort(
        (dataA, dataB) =>
          new Date(dataA.sendAt).getTime() - new Date(dataB.sendAt).getTime(),
      ),
    }))
    // 타입 다시 처리 (generate로는 에러 나서)
    .map((info) => ({
      ...info,
      messages: info.messages?.map((messageInfo) => {
        const typedMessage = messageInfo.message as CustomMessageType;
        return {
          ...messageInfo,
          message: { type: typedMessage.type, content: typedMessage.content },
        };
      }),
    }));

  const isReachedLast = data ? !data[data.length - 1]?.hasAfter : true;
  const isReachedFirst = data ? !data[data.length - 1]?.hasBefore : true;

  return {
    data: sortedChatData,
    error,
    isLoading,
    mutate,
    setSize,
    size,
    isReachedFirst,
    isReachedLast,
  };
};

export default useGroupChatInfinite;
