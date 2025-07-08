"use client";
import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import TabMenu from "@/components/details/TabMenu/TabMenu";
import EditInfo from "@/components/details/EditInfo/EditInfo";
import { useState } from "react";
import useModal from "@/hooks/useModal";
import ModalExitingEdit from "@/components/details/Modals/ModalExitingEdit/ModalExitingEdit";
import { useRouter } from "next/navigation";
export default function Edit() {
  // goalId에 대해 데이터 받아서 자식으로 뿌리자 걍.
  const [tab, setTab] = useState<"goal" | "subGoal">("goal");
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  return (
    <>
      <header>
        <AppBar
          type="back"
          title="편집"
          onBackClick={() => {
            openModal(
              <ModalExitingEdit
                onClose={closeModal}
                onExit={() => {
                  router.back();
                }}
              />,
            );
          }}
        />
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
        <EditInfo type={tab} />
      </header>
      <form>
        {/** zustaond로 관리하는 것들 GoalEdit이랑 SubGoalEdit내용 넣기. tab에 따라 다르게 렌더링 시키고 */}
      </form>
    </>
  );
}
