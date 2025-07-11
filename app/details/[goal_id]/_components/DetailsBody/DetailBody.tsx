"use client";

import GoalData from "@/components/details/GoalData/GoalData";
import ListCard from "@/components/details/ListCard/ListCard";
import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import useModal from "@/hooks/useModal";
import ModalCompletingGoal from "@/components/shared/Modal/ModalCompletingGoal/ModalCompletingGoal";
import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import { UserIcon } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckSvg from "@/components/shared/public/check.svg";
import { toggleGoalCompletion } from "@/lib/fetching/goalFetching";
interface DetailBodyProps {
  goalId: string;
}

const DetailBody = ({ goalId }: DetailBodyProps) => {
  const { data, mutate } = useGoalWithSubGoalTodo(goalId);
  const [targetSubGoalIdx, setTargetSubGoalIdx] = useState(0);
  const { openModal, closeModal } = useModal();
  // 모든 세부목표 완료 시에 모달
  const allSubGoalCompleted = true;
  const groupId = "";
  const openModalCompletingGoal = () => {
    openModal(
      <ModalCompletingGoal
        onClose={closeModal}
        onCompleteGoal={async () => {
          const res = await toggleGoalCompletion(goalId);
          if (res) {
            // 토스트
            closeModal();
          }
        }}
        onWait={closeModal}
      />,
    );
  };
  useEffect(() => {
    openModalCompletingGoal();
  }, [allSubGoalCompleted]);
  return (
    <>
      <GoalData goalId={goalId} />
      {groupId && (
        <>
          <div className="self-stretch h-10 px-2 py-0.5 bg-Color-primary-5 rounded-lg inline-flex justify-start items-center gap-1">
            <div
              data-property-1="Users_Group"
              className="w-5 h-5 relative overflow-hidden"
            >
              <>
                <UserIcon color="#5d5fef " />
              </>
            </div>
            <div className="flex-1 flex justify-start items-center gap-0.5">
              <p className="justify-center text-label-normal text-xs font-semibold font-['SUIT_Variable'] leading-none">
                그룹으로 이동
              </p>
            </div>
            <button
              type="button"
              className="w-6 h-6 relative overflow-hidden text-label-assistive"
            >
              <Link href={`/group/${groupId}`}>
                <RightArrowSvg />
              </Link>
            </button>
          </div>
        </>
      )}
      {allSubGoalCompleted && (
        <>
          <button
            type="button"
            onClick={() => {
              openModalCompletingGoal();
            }}
            data-leading-icon="true"
            data-status="enabled"
            data-type="filled"
            className="self-stretch px-4 py-2 relative bg-background-normal rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow-hidden"
          >
            <div className="self-stretch inline-flex justify-center items-center gap-2">
              <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center text-label-strong">
                <CheckSvg />
              </div>

              <p className="justify-start text-label-strong text-base font-semibold font-['Pretendard'] leading-normal">
                목표 완료 처리 하기
              </p>
            </div>
          </button>
        </>
      )}
      <ListCard
        initTodoInfoList={data.subGoals?.[targetSubGoalIdx].initTodoItemsInfo}
        onLeft={() =>
          setTargetSubGoalIdx((prev) => {
            if (prev > 0) return prev - 1;
            // 에러 방지
            return prev;
          })
        }
        onRight={() =>
          setTargetSubGoalIdx((prev) => {
            if (prev < (data.subGoals?.length ?? 0)) return prev + 1;
            // 에러방지
            return prev;
          })
        }
        subGoalInfo={{
          id: data.subGoals?.[targetSubGoalIdx].subGoalId,
          idx: targetSubGoalIdx,
          name: data.subGoals?.[targetSubGoalIdx].subGoalId,
          totalSubGoalsLen: data.subGoals?.length ?? 0,
        }}
        applyOnGoalData={() => mutate()}
      />
    </>
  );
};

export default DetailBody;
