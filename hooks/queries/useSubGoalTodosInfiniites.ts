"use client";

import { SWRConfiguration } from "swr";
import { SWRInfiniteConfiguration } from "swr/infinite";
import useInfiniteSWR from "swr/infinite";
import { TodoRs, TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import { TodoItemsInfo } from "@/types/todoList";
import { templateFetch } from "@/lib/fetching/template/fetchTemplate";
import { Ref, RefObject, useEffect, useState } from "react";

type SubGoalTodoInfinite = {
  content: TodoRs[];
  hasNext: boolean;
  offset: number;
  size: number;
};

const useSubGoalTodosIncompleteOrTodayInfinite = (
  subGoalId: string,
  option?: SWRInfiniteConfiguration,
) => {
  const { data, mutate, isLoading, size, setSize } = useInfiniteSWR<
    SubGoalTodoInfinite | undefined
  >(
    (pageIndex, previousPageData) => {
      if (!subGoalId) return null;

      return [
        // subGoalId,
        `/v1/sub-goals/${subGoalId}/todos/incomplete-or-date`,
        pageIndex,

        // previousPageData?.offset ? previousPageData.offset + 1 : 0,
        previousPageData
          ? (previousPageData.offset as number) + previousPageData.size
          : 0,
      ];
    },
    async (key) => {
      if (!subGoalId) return undefined;
      const offset = key[2];
      return await templateFetch<SubGoalTodoInfinite | undefined>({
        apiUrl: `/v1/sub-goals/${subGoalId}/todos/incomplete-or-date?offset=${offset}&size=10`,
        method: "GET",
        options: {
          credentials: "same-origin",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        },
      });
    },

    {
      ...option,
    },
  );

  const todoItemList: TodoItemsInfo[] | undefined = data?.flatMap(
    (pageInfo) =>
      pageInfo?.content?.map((pageContent) => ({
        id: pageContent.id,
        title: pageContent.title ?? "",
        checked: pageContent.status === TodoRsStatusEnum.COMPLETE,
        reported: !!pageContent.todoResult,
        targetDate: pageContent.date ? new Date(pageContent.date) : undefined,
      })) ?? [],
  );

  const isReachedLast = data ? !data[data.length - 1]?.hasNext : true;

  return {
    data: todoItemList,
    mutate,
    isReachedLast,
    isLoading,
    size,
    setSize,
  };
};

const useSubGoalTodosAllInfinite = (
  subGoalId: string,
  option?: SWRInfiniteConfiguration,
) => {
  const { data, mutate, isLoading, size, setSize, isValidating } =
    useInfiniteSWR<SubGoalTodoInfinite | undefined>(
      (pageIndex, previousPageData) => {
        if (!subGoalId || (previousPageData && !previousPageData?.hasNext))
          return null;

        return [
          `/v1/sub-goals/${subGoalId}/todos`,
          // subGoalId,
          pageIndex,
          previousPageData
            ? (previousPageData.offset as number) + previousPageData.size
            : 0,
        ] as const;
      },
      async (key) => {
        if (!subGoalId) return undefined;
        // subGoalApi.getTodosBySubGoalIdWithSlice(subGoalId, {
        //   offset,
        //   size: 10,
        // });
        const offset = key[2];
        return await templateFetch<SubGoalTodoInfinite | undefined>({
          apiUrl: `/v1/sub-goals/${subGoalId}/todos?offset=${offset}&size=10`,
          method: "GET",
          options: {
            credentials: "same-origin",
            redirect: "follow",
            referrerPolicy: "no-referrer",
          },
        });
      },

      {
        ...option,
      },
    );

  const todoItemList: TodoItemsInfo[] | undefined = data?.flatMap(
    (pageInfo) =>
      pageInfo?.content?.map((pageContent) => ({
        id: pageContent.id,
        title: pageContent.title ?? "",
        checked: pageContent.status === TodoRsStatusEnum.COMPLETE,
        reported: !!pageContent.todoResult,
        targetDate: pageContent.date ? new Date(pageContent.date) : new Date(),
      })) ?? [],
  );

  const isReachedLast = !!data && !data[data.length - 1]?.hasNext;

  return {
    data: todoItemList,
    mutate,
    isReachedLast,
    isLoading,
    size,
    setSize,
    isValidating,
  };
};

const useObservingExist = (
  isLoading: boolean,
  isReachedLast: boolean,
  targetRef: RefObject<HTMLElement | null>,
  fetchNextPage: () => void,
) => {
  const exist = !isReachedLast && !isLoading;

  useEffect(() => {
    if (!exist) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        // 임시
        root: null, // 뷰포트를 기준으로 (기본값)
        rootMargin: "0px", // 타겟이 뷰포트에 들어오는 즉시 트리거
        threshold: 1.0, // 타겟이 100% 뷰포트에 들어왔을 때 트리거
      },
    );
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.disconnect();
      }
    };
  }, [exist, targetRef.current]);

  return exist;
};

const makeSubgoalInfiniteOptimisticData =
  (todoId: string) =>
  (currentCache: (SubGoalTodoInfinite | undefined)[] | undefined) => {
    if (!currentCache) return [];

    const res = currentCache.map((cache) => {
      if (!cache) return cache;
      const targetTodoIdx = cache.content.findIndex(
        (todoInfo) => todoInfo.id === todoId,
      );
      // 못찾았다면
      if (targetTodoIdx < 0) return cache;

      // 찾았다면
      const mutatedContent = cache.content.map((info, idx) => {
        if (idx !== targetTodoIdx) return info;
        return {
          ...info,
          status:
            info.status === TodoRsStatusEnum.COMPLETE
              ? TodoRsStatusEnum.INCOMPLETE
              : TodoRsStatusEnum.COMPLETE,
        };
      });

      return { ...cache, content: mutatedContent };
    });

    return res;
  };

export {
  // useMutateSubGoalInfinite,
  makeSubgoalInfiniteOptimisticData,
  useSubGoalTodosIncompleteOrTodayInfinite,
  useSubGoalTodosAllInfinite,
  useObservingExist,
};
export type { SubGoalTodoInfinite };
