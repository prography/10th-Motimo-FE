"use client";
import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import TabMenu from "@/components/details/TabMenu/TabMenu";
import EditInfo from "@/components/details/EditInfo/EditInfo";
import {
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import useModal from "@/hooks/useModal";
import ModalExitingEdit from "@/components/details/Modals/ModalExitingEdit/ModalExitingEdit";
import { useParams, useRouter } from "next/navigation";
// import useGoalWithSubGoalTodo, {
//   ConvertedGoalWithSubGoalTodo,
// } from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import useGoalWithSubGoalTodo from "@/hooks/queries/useGoalWithSubGoalTodo";

import GoalEdit from "../GoalEdit/GoalEdit";
import SubGoalEdit from "../SubGoalEdit/SubGoalEdit";

import { date2StringWithSpliter } from "@/utils/date2String";
import { goalApi } from "@/api/service";
import useToast from "@/hooks/useToast";

// import { updateGoal } from "@/lib/fetching/goalFetching";

interface SubGoalEditItem {
  order: number;
  id: string | null;
  title: string;
}

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

interface EditBodyProps {
  goalId: string;
  tab: "goal" | "subGoal";
  initData: EditContents;
}

const EditBody = ({ goalId, initData, tab }: EditBodyProps) => {
  const router = useRouter();
  // const { closeModal, openModal } = useModal();
  const { mutate } = useGoalWithSubGoalTodo(goalId);
  const [editContents, setEditContents] = useState<EditContents>(initData);
  const { setToast } = useToast();
  return (
    <>
      <EditContext.Provider value={{ editContents, setEditContents }}>
        <form
          className="pt-6 pl-4 pr-4 flex flex-col flex-1"
          id="GoalInfoEdit"
          onSubmit={async (e) => {
            e.preventDefault();

            const res = await goalApi.updateGoal(goalId, {
              title: editContents.goalTitle,
              isPeriodByMonth: editContents.durationType === "month",
              month:
                editContents.durationType === "month"
                  ? (editContents.durationValue as number)
                  : undefined,
              dueDate:
                editContents.durationType === "month"
                  ? undefined
                  : date2StringWithSpliter(
                      editContents.durationValue as Date,
                      "-",
                    ),
              subGoals: editContents.subGoals.map((subGoalsInfo, idx) => ({
                // interface라, 임시로 넣은 필드 값 제거하기 위해서.
                order: idx + 1,
                title: subGoalsInfo.title,
                id: subGoalsInfo.id ? subGoalsInfo.id : undefined,
              })),
              deletedSubGoalIds:
                initData?.subGoals
                  ?.filter(({ id: initSubGoalId }) => {
                    // init에 있었지만 없어진 것들을 골라내기
                    return !editContents.subGoals.find(
                      (curSubGoal) =>
                        curSubGoal.id === initSubGoalId &&
                        curSubGoal.id !== null,
                    );
                  })
                  ?.map((item) => item.id || "") ?? [],
            });
            if (res) {
              mutate();
              setToast("변경이 완료되었습니다.");
              router.back();
            }
          }}
        >
          {tab === "goal" ? (
            <GoalEdit goalId={goalId} />
          ) : (
            <SubGoalEdit goalId={goalId} />
          )}
          {/** zustaond로 관리하는 것들 GoalEdit이랑 SubGoalEdit내용 넣기. tab에 따라 다르게 렌더링 시키고 */}
        </form>
      </EditContext.Provider>
    </>
  );
};
export default EditBody;

export { EditContext };
export type { EditContents };
