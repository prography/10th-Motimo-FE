"use client";

import { SWRConfiguration } from "swr";
import { SWRInfiniteConfiguration } from "swr/infinite";
import useInfiniteSWR from "swr/infinite";
import { TodoRs, TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import { TodoItemsInfo } from "@/types/todoList";
import { templateFetch } from "@/lib/fetching/template/fetchTemplate";
import { Ref, RefObject, useEffect, useState } from "react";
import { subGoalApi } from "@/api/service";

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
        subGoalId,
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
  const { data, mutate, isLoading, size, setSize } = useInfiniteSWR<
    SubGoalTodoInfinite | undefined
  >(
    (pageIndex, previousPageData) => {
      if (!subGoalId || (previousPageData && !previousPageData?.hasNext))
        return null;

      return [
        subGoalId,
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

export {
  useSubGoalTodosIncompleteOrTodayInfinite,
  useSubGoalTodosAllInfinite,
  useObservingExist,
};
export type { SubGoalTodoInfinite };
