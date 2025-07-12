"use client";

import { GoalListRs } from "@/api/generated/motimo/Api";
import { GoalMenuInfo } from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import { getAllGoals, getGoal } from "@/lib/fetching/goalFetching";
import useSWR, { SWRConfiguration } from "swr";

const useGoalDetail = (goalId: string, options?: SWRConfiguration) => {
  const { data, mutate } = useSWR(["goalDetail", goalId], getGoal, options);

  // const mutateWithConversion = (newGoalList: GoalMenuInfo[]): GoalListRs => {
  //   return {goals:newGoalList.map(goal=>({
  //     dueDate:goal.,id,progress,title,
  //   }))}
  // };

  return { data, mutate };
};
export default useGoalDetail;
