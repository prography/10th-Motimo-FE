"use client";

import { SWRConfiguration } from "swr";
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
  offset: number,
  option?: SWRConfiguration,
) => {
  const { data, mutate, isLoading } = useInfiniteSWR<
    SubGoalTodoInfinite | undefined
  >(
    (pageIndex, previousPageData) => {
      if (!subGoalId || !previousPageData?.hasNext) return null;

      return [
        subGoalId,
        pageIndex,
        offset,
        // previousPageData ? (previousPageData.offset as number) + 1 : 0,
      ];
    },
    async () => {
      if (!subGoalId) return undefined;
      // subGoalApi.getIncompleteOrTodayTodosWithSlice(subGoalId, {
      //   offset,
      //   size: 10,
      // });
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
        targetDate: pageContent.date ? new Date(pageContent.date) : new Date(),
      })) ?? [],
  );
  const isReachedLast = data ? data[data?.length - 1]?.hasNext : false;

  return { data: todoItemList, mutate, isReachedLast, isLoading };
};

const useSubGoalTodosAllInfinite = (
  subGoalId: string,
  offset: number,
  option?: SWRConfiguration,
) => {
  const { data, mutate, isLoading } = useInfiniteSWR<
    SubGoalTodoInfinite | undefined
  >(
    (pageIndex, previousPageData) => {
      if (!subGoalId || (previousPageData && !previousPageData?.hasNext))
        return null;

      return [subGoalId, pageIndex, offset];
    },
    async (key) => {
      console.log("왜 안됨 - subGoalId: ", subGoalId, !subGoalId, key);
      if (!subGoalId) return undefined;
      // subGoalApi.getTodosBySubGoalIdWithSlice(subGoalId, {
      //   offset,
      //   size: 10,
      // });
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

  const isReachedLast = data ? data[data?.length - 1]?.hasNext : false;

  return { data: todoItemList, mutate, isReachedLast, isLoading };
};

const useObservingInfiniteOffset = (
  shouldStop: boolean,
  targetRef: RefObject<HTMLElement | null>,
  initOffset: number,
) => {
  const [curOffset, setCurOffset] = useState(initOffset);

  useEffect(() => {
    if (shouldStop) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurOffset((prev) => prev + 1);
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
  }, [shouldStop, setCurOffset]);

  //test
  console.log("curOffset, shouldStop in use훅: ", curOffset, shouldStop);

  return { curOffset };
};

export {
  useSubGoalTodosIncompleteOrTodayInfinite,
  useSubGoalTodosAllInfinite,
  useObservingInfiniteOffset,
};
export type { SubGoalTodoInfinite };
