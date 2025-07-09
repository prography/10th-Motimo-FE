import { JoinedGroupRs } from "@/api/generated/motimo/Api";
import { templateFetch } from "../common/fetchTemplate";

export const getJoinedGroups = async () => {
    const result = await templateFetch<JoinedGroupRs[]>("/v1/groups/me", "GET");

    return result;
};