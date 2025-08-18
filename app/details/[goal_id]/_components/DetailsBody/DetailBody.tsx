"use client";

import GoalData from "@/components/main/GoalData/GoalData";
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
import TodoBottomSheet, {
  TodoBottomSheetProps,
} from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";
import { date2StringWithSpliter } from "@/utils/date2String";
import useToast from "@/hooks/useToast";
import useBottomSheet from "@/hooks/useBottomSheet";
import { TodoInfoForSubmission } from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";

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

  const todoTotalLen =
    data.subGoals?.reduce((acc, cur) => {
      return acc + cur.initTodoTotalLen;
    }, 0) ?? 0;
  const allTodoCompleted =
    data.subGoals &&
    data.subGoals.reduce((acc, cur) => {
      const count =
        cur.initTodoItemsInfo?.filter((info) => info.checked).length ?? 0;
      return count + acc;
    }, 0) === todoTotalLen &&
    todoTotalLen !== 0;
  // const allSubGoalCompleted =
  //   data.subGoals &&
  //   data.subGoals?.filter((subgoalInfo) => subgoalInfo.isCompleted).length ===
  //     data.subGoals?.length &&
  //   // 0개 달성이면 안됨.
  //   data.subGoals?.filter((subgoalInfo) => subgoalInfo.isCompleted).length !==
  //     0;

  const groupId = goalDetail?.groupId;

  const fixedProgress = goalDetail?.progress
    ? goalDetail?.progress === 0 || goalDetail?.progress === 100
      ? goalDetail?.progress
      : Number(goalDetail?.progress?.toFixed(2))
    : 0;

  const leftDay = goalDetail?.dueDate?.dueDate
    ? calcLeftDay(goalDetail?.dueDate.dueDate)
    : NaN;

  // 모든 세부목표 완료 시에 모달
  const openModalCompletingGoal = () => {
    openModal(
      <ModalCompletingGoal
        onClose={closeModal}
        onCompleteGoal={async () => {
          const subGoalCompletingFeftches = data.subGoals?.map(
            (subGoalInfo) => {
              return subGoalApi.subGoalCompleteToggle(
                subGoalInfo?.subGoalId ?? "",
              );
            },
          );

          const subGoalCompletion = await Promise.all(
            subGoalCompletingFeftches ?? [],
          ).then(
            (resList) => resList.filter((res) => res).length === resList.length,
          );
          if (!subGoalCompletion) {
            setToast("세부 목표 달성에 실패했습니다!");
            return;
          }
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
    if (allTodoCompleted && !goalDetail?.isCompleted) openModalCompletingGoal();
  }, [allTodoCompleted, goalDetail?.isCompleted]);

  // // 바텀시트 관리
  // const {
  //   checkRendered,
  //   openBottomSheet,
  //   updateBottomSheet,
  //   closeBottomSheet,
  // } = useBottomSheet<TodoBottomSheetProps>();

  // const shouldBottomSheetOpened =
  //   // modal이 등장하면 bottomSheet는 닫기.
  //   !isModalOpened && data.subGoals !== undefined && data.subGoals.length > 0;

  // useEffect(() => {
  //   const isRendered = checkRendered();

  //   if (!shouldBottomSheetOpened && isRendered) {
  //     closeBottomSheet();
  //     return;
  //   }

  //   const bottomSheetInfo: Parameters<typeof openBottomSheet>[0] = {
  //     backdropProps: {
  //       onClick: () => {
  //         // 내용물을 초기화 해야 함. -> key값 바꿔도 애니메이션이나 바텀시트 높이 정상적일까?

  //         setIsActive(false);
  //         updateBottomSheet((prev) => {
  //           return { ...prev, hasBackdrop: false };
  //         });
  //       },
  //       className: "fixed inset-0 bg-black/20 z-20",
  //     },
  //     ContentComponent: TodoBottomSheet,
  //     contentProps: {
  //       isActivated: isActive,
  //       initTodoInfo: initContent,
  //       setIsActivated: setIsActive,
  //       subGoals:
  //         data.subGoals?.map((subGoalInfo) => ({
  //           id: subGoalInfo.subGoalId ?? "",
  //           title: subGoalInfo.subGoal ?? "",
  //         })) ?? [],
  //       onSubmitTodo: async (newTodoInfo) => {
  //         const afterSubmit = () => {
  //           mutate();
  //           // 바텀시트 리셋
  //           setIsActive(false);
  //         };
  //         const res = await handleTodoBottomSheetSubmit(
  //           newTodoInfo,
  //           afterSubmit,
  //         );
  //         return res;
  //       },
  //     },

  //     hasBackdrop: isActive,
  //     bottomSheetFixerStyle: { bottom: "0px" },
  //   };

  //   if (shouldBottomSheetOpened && !isRendered) {
  //     openBottomSheet(bottomSheetInfo);
  //     return;
  //   }

  //   updateBottomSheet(bottomSheetInfo);

  //   return () => {
  //     closeBottomSheet();
  //   };
  // }, [isActive, initContent, data.subGoals?.length, shouldBottomSheetOpened]);

  return (
    <>
      <div className="flex flex-col flex-1">
        {/* <GoalData
          goalName={data.title ?? ""}
          progress={fixedProgress}
          dDay={dDay}
          isCompleted={goalDetail?.isCompleted ?? false}
        /> */}
        <section className="w-full px-4 pt-3 pb-4 bg-background-alternative inline-flex flex-col justify-start items-start gap-4">
          <div className="flex gap-1">
            <h3 className="justify-center text-label-alternative text-base font-bold font-['SUIT_Variable'] leading-tight">
              남은 기간
            </h3>
            <p className="justify-center text-label-primary text-base font-bold font-['SUIT_Variable'] leading-tight">
              {Number.isNaN(leftDay)
                ? ""
                : `D${leftDay >= 0 ? "-" : "+"}${leftDay !== 0 ? Math.abs(leftDay) : "Day"}`}
            </p>
          </div>
          <div className="w-full self-stretch inline-flex justify-start items-center gap-2">
            <div className="flex-1 h-2 relative bg-background-normal rounded-[999px] overflow-hidden">
              <div
                className={` h-2 left-0 top-[0.50px] absolute bg-background-primary rounded-[999px]`}
                style={{ width: `${goalDetail?.progress ?? 0}%` }}
              ></div>
            </div>
            <p className="flex justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-none">
              {`${goalDetail?.progress ?? 0}%`}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 pl-4 pr-4 pb-4 bg-background-alternative">
          {/* {allSubGoalCompleted && !goalDetail?.isCompleted && (
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
          )} */}
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
        <section className="mt-2  bg-background-alternative h-full">
          {data.subGoals?.map((subGoalInfo) => (
            <ListCard
              onTodoCheck={async (todoId) => {
                const res = await todoApi.toggleTodoCompletion(todoId);
                if (res) {
                  mutate();
                  mutateForSubgoalCompleted();
                }
              }}
              key={subGoalInfo.subGoalId}
              initTodoInfoList={subGoalInfo?.initTodoItemsInfo}
              subGoalInfo={{
                id: subGoalInfo?.subGoalId,
                // idx: targetSubGoalIdx,
                name: subGoalInfo?.subGoal,
                // totalSubGoalsLen: data.subGoals?.length ?? 0,
                isCompleted: subGoalInfo?.isCompleted,
              }}
            />
          ))}
          {/* <ListCard
            initTodoInfoList={
              data.subGoals?.[targetSubGoalIdx]?.initTodoItemsInfo
            }
            // onLeft={() =>
            //   setTargetSubGoalIdx((prev) => {
            //     if (prev > 0) return prev - 1;
            //     // 에러 방지
            //     return prev;
            //   })
            // }
            // onRight={() =>
            //   setTargetSubGoalIdx((prev) => {
            //     if (prev < (data.subGoals?.length ?? 0)) return prev + 1;
            //     // 에러방지
            //     return prev;
            //   })
            // }
            subGoalInfo={{
              id: data?.subGoals?.[targetSubGoalIdx]?.subGoalId,
              idx: targetSubGoalIdx,
              name: data.subGoals?.[targetSubGoalIdx]?.subGoal,
              totalSubGoalsLen: data.subGoals?.length ?? 0,
              isCompleted: data.subGoals?.[targetSubGoalIdx]?.isCompleted,
            }}
            // applyOnGoalData={() => {
            //   mutateForGoalProgress();
            //   mutateForSubgoalCompleted();
            // }}
          /> */}
        </section>
      </div>
      {/* 
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
      /> */}
    </>
  );
};

export default DetailBody;

const handleTodoBottomSheetSubmit: (
  newTodoInfo: TodoInfoForSubmission,
  afterSubmit: () => void,
) => Promise<boolean> = async (newTodoInfo, afterSubmit: () => void) => {
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
    afterSubmit();
  }

  return isFetchOk;
};
