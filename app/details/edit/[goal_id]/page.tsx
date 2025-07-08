"use client";
import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import TabMenu from "@/components/details/TabMenu/TabMenu";
import { useState } from "react";
export default function Edit() {
  // goalId에 대해 데이터 받아서 자식으로 뿌리자 걍.
  const [tab, setTab] = useState<"goal" | "subGoal">();
  return (
    <>
      <header>
        <AppBar type="back" title="편집" />
        <Button type="button" size="s" variant="filled">
          저장
        </Button>
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
      </header>
      <form></form>
    </>
  );
}
