"use client";

import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import LeftArrowSvg from "@/components/shared/public/Chevron_Left_MD.svg";
import TodoItem from "@/components/shared/TodoItem/TodoItem";
import { TodoItemsInfo } from "@/types/todoList";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import useModal from "@/hooks/useModal";
import ModalIncompletingSubGoal from "../Modals/ModalIncompletingSubGoal/ModalIncompletingSubGoal";
import { useEffect, useRef, useState } from "react";
import TodoResultBottomSheet from "@/components/shared/BottomSheets/TodoResultBottomSheet/TodoResultBottomSheet";
import { TodoResultRqEmotionEnum } from "@/api/generated/motimo/Api";
import { subGoalApi, todoApi } from "@/api/service";
import { postTodoResult } from "@/lib/fetching/postTodoResult";
import {
  useObservingExist,
  // useObservingInfiniteOffset,
  useSubGoalTodosAllInfinite,
} from "@/hooks/queries/useSubGoalTodosInfiniites";
import useToast from "@/hooks/useToast";
interface ListCardProps {
  subGoalInfo: {
    name?: string;
    id?: string;
    idx: number;
    totalSubGoalsLen: number;
    isCompleted?: boolean;
  };
  initTodoInfoList?: TodoItemsInfo[];
  // 좌우 이동으로 다른 subgoal로 이동하고, 이 때 key값으로 리마운트 시켜버려야겠다 걍.
  onLeft: () => void;
  onRight: () => void;
  applyOnGoalData: () => void;
}

const ListCard = ({
  subGoalInfo,
  initTodoInfoList,
  onLeft,
  onRight,
  applyOnGoalData,
}: ListCardProps) => {
  // 이 안에서도 subGoal에대한 todod들 가져오는 fetch있어야 함.

  const observingRef = useRef<HTMLDivElement | null>(null);

  const {
    data: fetchedTodoItemsInfo,
    mutate,
    isLoading,
    isReachedLast,
    size,
    setSize,
  } = useSubGoalTodosAllInfinite(subGoalInfo.id ?? "");

  const existObserver = useObservingExist(
    isLoading,
    isReachedLast,
    observingRef,
    () => {
      setSize(size + 1);
    },
  );

  const { closeModal, openModal } = useModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const todoItemsInfo = (fetchedTodoItemsInfo || initTodoInfoList) ?? [];
  const [todoIdForResult, setTodoIdForResult] = useState<null | string>(null);
  const { setToast } = useToast();

  const isTodoAllChecked =
    todoItemsInfo.filter((todo) => todo.checked).length ===
      todoItemsInfo.length &&
    todoItemsInfo.filter((todo) => todo.checked).length !== 0;

  const totalTodoLen = todoItemsInfo?.length ?? 0;
  const checkedTodoLen =
    todoItemsInfo?.filter((todo) => todo.checked).length ?? 0;

  return (
    <>
      <main className="w-full flex-1 p-4  inline-flex flex-col justify-start items-center gap-2 overflow-hidden">
        <section className="flex items-center gap-2 w-full justify-between">
          <button
            onClick={() => onLeft()}
            type="button"
            disabled={subGoalInfo.idx === 0}
            className="w-8 h-8 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div
              className={`w-6 h-6 relative overflow-hidden ${subGoalInfo.idx === 0 ? "text-label-assistive" : "text-label-normal"}`}
            >
              <LeftArrowSvg />
            </div>
          </button>
          <p className=" overflow-hidden  self-center truncate  text-center justify-center text-label-strong text-base font-medium font-['SUIT_Variable'] leading-snug">
            {subGoalInfo.name ?? ""}
          </p>

          <button
            onClick={() => onRight()}
            type="button"
            disabled={subGoalInfo.idx === subGoalInfo.totalSubGoalsLen - 1}
            className="w-8 h-8 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div
              className={`w-6 h-6 relative overflow-hidden ${subGoalInfo.idx === subGoalInfo.totalSubGoalsLen - 1 ? "text-label-assistive" : "text-label-normal"}`}
            >
              <RightArrowSvg />
            </div>
          </button>
        </section>
        <section className="self-stretch inline-flex justify-end items-center gap-0.5">
          <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            {`${checkedTodoLen} / ${totalTodoLen}`}
          </p>
        </section>
        {isTodoAllChecked && (
          <>
            <div className="w-80 h-12 px-3 py-0.5 bg-background-alternative rounded-lg  outline-1 outline-offset-[-1px] outline-Color-primary-50 inline-flex justify-start items-center gap-1">
              <div className="flex-1 flex justify-start items-center gap-0.5">
                <div className="justify-center text-label-normal text-sm font-semibold font-['SUIT_Variable'] leading-tight">
                  세부 목표 완료
                </div>
              </div>
              <Checkbox
                checked={subGoalInfo.isCompleted}
                onChange={async () => {
                  if (!subGoalInfo.isCompleted) {
                    // if (!subGoalCompleted) {
                    const res = await subGoalApi.subGoalCompleteToggle(
                      subGoalInfo.id ?? "",
                    );
                    if (res) {
                      // setSubGoalCompleted(!subGoalCompleted);
                      setToast("세부 목표를 달성했습니다!");
                      applyOnGoalData();
                    }
                  } else {
                    // 모달 후 처리
                    openModal(
                      <ModalIncompletingSubGoal
                        onClose={() => closeModal()}
                        onIncompleteSubGoal={async () => {
                          const res = await subGoalApi.subGoalCompleteToggle(
                            subGoalInfo.id ?? "",
                          );
                          if (res) {
                            // setSubGoalCompleted(!subGoalCompleted);
                            setToast("세부 목표를 미완료 처리했습니다.");
                            applyOnGoalData();
                            closeModal();
                          }
                        }}
                      />,
                    );
                  }
                }}
              />
            </div>
          </>
        )}
        <section className="flex-1 w-full h-full gap-2 flex flex-col">
          {todoItemsInfo.map((todoInfo) => {
            return (
              <TodoItem
                onChecked={async () => {
                  const res = await todoApi.toggleTodoCompletion(todoInfo.id);
                  if (res) mutate();
                }}
                title={todoInfo.title}
                checked={todoInfo.checked}
                key={todoInfo.id}
                onReportedClick={async () => {
                  // 일단 모달을 띄워야 함.
                  // postTodoResult(todoInfo.id);
                  setOpenBottomSheet(true);
                  setTodoIdForResult(todoInfo.id);
                }}
                reported={todoInfo.reported}
                targetDate={todoInfo.targetDate}
              />
            );
          })}
          {existObserver && (
            <div ref={observingRef} id="observingref" className="h-10">
              {/** observing ref */}
            </div>
          )}
        </section>
      </main>
      {openBottomSheet && (
        <TodoResultBottomSheet
          hasBottomTabBar={false}
          onSubmit={async (todoResult) => {
            if (todoIdForResult && todoResult.emotion !== null) {
              // (await todoApi.upsertTodoResult(todoIdForResult, {
              //   request: {
              //     emotion: todoResult.emotion as TodoResultRqEmotionEnum,
              //     content: todoResult.memo,
              //   },
              //   file: todoResult.file || undefined,
              // }));
              const res = await postTodoResult(
                todoIdForResult,
                todoResult.emotion as TodoResultRqEmotionEnum,
                todoResult.memo,
                todoResult.file || undefined,
              );

              if (!res) return;
              setOpenBottomSheet(false);
              mutate();
            }
          }}
          openBottomSheet={openBottomSheet}
          setOpenBottomSheet={setOpenBottomSheet}
        />
      )}
    </>
  );
};
export default ListCard;
