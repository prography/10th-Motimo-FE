"use client";

import { GoalListRs } from "@/api/generated/motimo/Api";
import { GoalMenuInfo } from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import { getAllGoals } from "@/lib/main/goalFetching";
import { getJoinedGroups } from "@/lib/main/groupFetching";
import useSWR, { SWRConfiguration } from "swr";

export default function useGroupsMe(options?: SWRConfiguration) {
    const { data, mutate } = useSWR("groupsMe", getJoinedGroups, options);

    return { data, mutate };
};

