"use client";

import GoalData from "@/components/details/GoalData/GoalData";
import ListCard from "@/components/details/ListCard/ListCard";
// import useGoalWithSubGoalTodo from "@/hooks/main/queries/useGoalWithSubGoalTodo";
import useModal from "@/hooks/useModal";
import ModalCompletingGoal from "@/components/shared/Modal/ModalCompletingGoal/ModalCompletingGoal";
import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import { UserIcon } from "@/components/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckSvg from "@/components/shared/public/check.svg";
// import { toggleGoalCompletion } from "@/lib/fetching/goalFetching";
import { calcLeftDay } from "@/utils/calcLeftDay";
// import useGoalDetail from "@/hooks/main/queries/useGoalDetail";
import PeopleSvg from "@/public/images/People.svg";
import { useGoalDetail, useGoalWithSubGoals } from "@/api/hooks";
import useGoalWithSubGoalTodo from "@/hooks/queries/useGoalWithSubGoalTodo";
import { goalApi, subGoalApi, todoApi } from "@/api/service";
import TodoResultBottomSheet from "@/components/shared/BottomSheets/TodoResultBottomSheet/TodoResultBottomSheet";
import { useSubGoalTodosAllInfinite } from "@/hooks/queries/useSubGoalTodosInfiniites";
import { postTodoResult } from "@/lib/fetching/postTodoResult";
import { TodoResultRqEmotionEnum } from "@/api/generated/motimo/Api";
import TodoBottomSheet from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";
import { date2StringWithSpliter } from "@/utils/date2String";
import useToast from "@/hooks/useToast";
interface DetailBodyProps {
  goalId: string;
}

const DetailBody = ({ goalId }: DetailBodyProps) => {
  const { data, mutate: mutateForSubgoalCompleted } =
    useGoalWithSubGoalTodo(goalId);
  const { data: goalDetail, mutate: mutateForGoalProgress } =
    useGoalDetail(goalId);
  const [targetSubGoalIdx, setTargetSubGoalIdx] = useState(0);
  const { openModal, closeModal, isOpened: isModalOpened } = useModal();

  const { mutate } = useSubGoalTodosAllInfinite(
    data.subGoals?.[targetSubGoalIdx]?.subGoalId ?? "",
  );

  const { isActive, setIsActive, initContent } = useActiveTodoBottomSheet();
  const { setToast } = useToast();
  const dDay = calcLeftDay(data?.dueDate ?? new Date());

  const allSubGoalCompleted =
    data.subGoals?.filter((subgoalInfo) => subgoalInfo.isCompleted).length ===
      data.subGoals?.length &&
    // 0개 달성이면 안됨.
    data.subGoals?.filter((subgoalInfo) => subgoalInfo.isCompleted).length !==
      0;

  const groupId = goalDetail?.groupId;

  const fixedProgress = goalDetail?.progress
    ? goalDetail?.progress === 0 || goalDetail?.progress === 100
      ? goalDetail?.progress
      : Number(goalDetail?.progress?.toFixed(2))
    : 0;

  // 모든 세부목표 완료 시에 모달
  const openModalCompletingGoal = () => {
    openModal(
      <ModalCompletingGoal
        onClose={closeModal}
        onCompleteGoal={async () => {
          const res = await goalApi.goalComplete(goalId);
          if (res) {
            setToast("목표를 모두 달성했습니다! 🎉");
            closeModal();
            mutateForGoalProgress();
          }
        }}
        onWait={closeModal}
      />,
    );
  };
  useEffect(() => {
    if (allSubGoalCompleted && !goalDetail?.isJoinedGroup)
      openModalCompletingGoal();
  }, [allSubGoalCompleted, goalDetail?.isJoinedGroup]);
  return (
    <>
      <div className="flex flex-col flex-1">
        <GoalData
          goalName={data.title ?? ""}
          progress={fixedProgress}
          dDay={dDay}
          isCompleted={goalDetail?.isCompleted ?? false}
        />
        <section className="flex flex-col gap-4 pl-4 pr-4 pb-4 bg-background-alternative">
          {allSubGoalCompleted && !goalDetail?.isCompleted && (
            <>
              <button
                type="button"
                onClick={() => {
                  openModalCompletingGoal();
                }}
                data-leading-icon="true"
                data-status="enabled"
                data-type="filled"
                className="self-stretch w-full px-4 py-2 relative bg-background-normal rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow-hidden"
              >
                <div className="self-stretch inline-flex justify-center items-center gap-2">
                  <div className="w-6 h-6 relative overflow-hidden flex justify-center items-center text-label-strong">
                    <CheckSvg width={24} height={24} />
                  </div>

                  <p className="justify-start text-label-strong text-base font-semibold font-['Pretendard'] leading-normal">
                    목표 완료 처리 하기
                  </p>
                </div>
              </button>
            </>
          )}
          {groupId && (
            <>
              <div className="self-stretch w-full h-10 px-2 py-0.5 bg-Color-primary-5 rounded-lg inline-flex justify-start items-center gap-1">
                <div
                  data-property-1="Users_Group"
                  className="w-5 h-5 relative overflow-hidden"
                >
                  <PeopleSvg />
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
                  <Link href={`/group/${groupId}?from=details`}>
                    <RightArrowSvg />
                  </Link>
                </button>
              </div>
            </>
          )}
        </section>
        <section className="mt-2 mb-8 bg-background-alternative h-full">
          <ListCard
            initTodoInfoList={
              data.subGoals?.[targetSubGoalIdx]?.initTodoItemsInfo
            }
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
              id: data?.subGoals?.[targetSubGoalIdx]?.subGoalId,
              idx: targetSubGoalIdx,
              name: data.subGoals?.[targetSubGoalIdx]?.subGoal,
              totalSubGoalsLen: data.subGoals?.length ?? 0,
              isCompleted: data.subGoals?.[targetSubGoalIdx]?.isCompleted,
            }}
            applyOnGoalData={() => {
              mutateForGoalProgress();
              mutateForSubgoalCompleted();
            }}
          />
        </section>
      </div>

      <TodoBottomSheet
        hasBottomTabBar={false}
        isActivated={isActive}
        initTodoInfo={initContent}
        setIsActivated={setIsActive}
        subGoals={
          data.subGoals?.map((subGoalInfo) => ({
            id: subGoalInfo.subGoalId ?? "",
            title: subGoalInfo.subGoal ?? "",
          })) ?? []
        }
        // modal이 등장하면 bottomSheet는 닫기.
        openBottomSheet={
          !isModalOpened &&
          data.subGoals !== undefined &&
          data.subGoals.length > 0
        }
        onSubmitTodo={async (newTodoInfo) => {
          const isCreating = newTodoInfo.id ? false : true;
          let fetchRes;
          if (isCreating) {
            fetchRes = await subGoalApi.createTodo(newTodoInfo.subGoalId, {
              title: newTodoInfo.todo,
              date: newTodoInfo?.date
                ? date2StringWithSpliter(newTodoInfo?.date, "-")
                : undefined,
            });
          } else {
            fetchRes = await todoApi.updateTodo(newTodoInfo.id ?? "", {
              date: newTodoInfo.date
                ? date2StringWithSpliter(newTodoInfo.date, "-")
                : undefined,
              title: newTodoInfo.todo,
            });
          }

          const isFetchOk = fetchRes ? true : false;
          if (isFetchOk) {
            mutate();
          }

          return isFetchOk;
        }}
      />
    </>
  );
};

export default DetailBody;
