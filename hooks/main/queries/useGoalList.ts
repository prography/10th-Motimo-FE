"use client";

import { GoalListRs } from "@/api/generated/motimo/Api";
import { GoalMenuInfo } from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import { getAllGoals } from "@/lib/fetching/goalFetching";
import useSWR, { SWRConfiguration } from "swr";

const useGoalList = (options?: SWRConfiguration) => {
  const { data, mutate } = useSWR("goalList", getAllGoals, options);
  const convertedData: GoalMenuInfo[] =
    data?.goals?.map((goalInfo) => ({
      goal: goalInfo.title ?? "",
      percentage: goalInfo.progress ?? 0,
      goalId: goalInfo.id ?? "",
    })) ?? [];

  // const mutateWithConversion = (newGoalList: GoalMenuInfo[]): GoalListRs => {
  //   return {goals:newGoalList.map(goal=>({
  //     dueDate:goal.,id,progress,title,
  //   }))}
  // };

  return { data: convertedData, mutate };
};
export default useGoalList;
