"use client";

import { useParams } from "next/navigation";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import { useState } from "react";
import { ConvertedGoalWithSubGoalTodo } from "@/hooks/main/queries/useGoalWithSubGoalTodo";

import EditHeader from "./_components/EditHeader/EditHeader";
import EditBody from "./_components/EditBody/EditBody";
import TabMenu from "@/components/details/TabMenu/TabMenu";
import EditInfo from "@/components/details/EditInfo/EditInfo";
import { EditContents } from "./_components/EditBody/EditBody";

const makeInitEditContents = (
  serverData: Partial<ConvertedGoalWithSubGoalTodo>,
): EditContents => ({
  durationType: "date",
  durationValue: serverData.dueDate ? new Date(serverData.dueDate) : undefined,
  goalTitle: serverData.title ?? "",
  subGoals:
    serverData.subGoals?.map((subGoalInfo, idx) => {
      return {
        id: subGoalInfo.subGoalId ?? "",
        order: idx + 1,
        title: subGoalInfo.subGoal ?? "",
      };
    }) ?? [],
});

export default function Edit() {
  const { goal_id: goalId } = useParams<{ goal_id: string }>();
  // url에서 dynamic route가져와서 goalId알아내기.
  // 이를 통해 fetch해서 관련 데이터 가져오고, 밑의 useState의 init값으로 넣기.
  const { data } = useGoalWithSubGoalTodo(goalId);
  const initData = makeInitEditContents(data);
  const [tab, setTab] = useState<"goal" | "subGoal">("goal");
  return (
    <>
      <div>
        <EditHeader />
        <section>
          <section>
            <div>
              <TabMenu
                title="목표"
                isActive={tab === "goal"}
                onClick={() => setTab("goal")}
              />
              <TabMenu
                title="세부 목표"
                isActive={tab === "subGoal"}
                onClick={() => setTab("subGoal")}
              />
            </div>
            <EditInfo type={tab} />
          </section>
        </section>
        <EditBody
          key={data.subGoals?.map((s) => `${s.subGoal}`)?.join("") ?? ""}
          goalId={goalId}
          initData={initData}
          tab={tab}
        />
      </div>
    </>
  );
}
