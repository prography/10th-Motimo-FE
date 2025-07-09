"use client";
import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import TabMenu from "@/components/details/TabMenu/TabMenu";
import EditInfo from "@/components/details/EditInfo/EditInfo";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import useModal from "@/hooks/useModal";
import ModalExitingEdit from "@/components/details/Modals/ModalExitingEdit/ModalExitingEdit";
import { useParams, useRouter } from "next/navigation";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";

import GoalEdit from "./_components/GoalEdit/GoalEdit";
import SubGoalEdit from "./_components/SubGoalEdit/SubGoalEdit";

import { updateGoal } from "@/lib/fetching/goalFetching";

type SubGoalEditItem = {
  order: number;
  id: string;
  title: string;
};

type EditContents = {
  goalTitle: string;
  durationType: "month" | "date";
  durationValue?: number | Date;
  subGoals: SubGoalEditItem[];
};

const EditContext = createContext<{
  editContents: EditContents;
  setEditContents: Dispatch<SetStateAction<EditContents>>;
} | null>(null);

export { EditContext };

export default function Edit() {
  const [tab, setTab] = useState<"goal" | "subGoal">("goal");
  const { closeModal, openModal } = useModal();
  const router = useRouter();
  const { goal_id: goalId } = useParams<{ goal_id: string }>();
  // url에서 dynamic route가져와서 goalId알아내기.
  // 이를 통해 fetch해서 관련 데이터 가져오고, 밑의 useState의 init값으로 넣기.
  const { data } = useGoalWithSubGoalTodo(goalId);
  const initEditContents: EditContents = {
    durationType: "date",
    durationValue: data.dueDate ? new Date(data.dueDate) : undefined,
    goalTitle: data.title ?? "",
    subGoals: data.subGoals.map((subGoalInfo, idx) => {
      return {
        id: subGoalInfo.subGoalId ?? "",
        order: idx + 1,
        title: subGoalInfo.subGoal ?? "",
      };
    }),
  };
  const [editContents, setEditContents] =
    useState<EditContents>(initEditContents);

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
        <Button
          onClick={async () => {
            updateGoal(goalId, {
              title: editContents.goalTitle,
              isPeriodByMonth: editContents.durationType === "month",
              month:
                editContents.durationType === "month"
                  ? editContents.durationValue
                  : undefined,
              dueDate:
                editContents.durationType === "month"
                  ? undefined
                  : editContents.durationValue,
              subGoals: editContents.subGoals,
              deletedSubGoalIds: initEditContents.subGoals.filter(
                ({ id: initSubGoalId }) => {
                  // init에 있었지만 없어진 것들을 골라내기
                  return !editContents.subGoals.find(
                    (curSubGoal) => curSubGoal.id === initSubGoalId,
                  );
                },
              ),
            });
            router.back();
          }}
          type="button"
          size="s"
          variant="filled"
        >
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
      <EditContext.Provider value={{ editContents, setEditContents }}>
        <form>
          {tab === "goal" ? <GoalEdit /> : <SubGoalEdit />}
          {/** zustaond로 관리하는 것들 GoalEdit이랑 SubGoalEdit내용 넣기. tab에 따라 다르게 렌더링 시키고 */}
        </form>
      </EditContext.Provider>
    </>
  );
}
