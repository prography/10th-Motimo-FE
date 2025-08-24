"use client";

import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import LeftArrowSvg from "@/components/shared/public/Chevron_Left_MD.svg";
import PlusSvg from "@/components/shared/public/Add_Plus.svg";
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
  makeSubgoalInfiniteOptimisticData,
  useObservingExist,
  // useObservingInfiniteOffset,
  useSubGoalTodosAllInfinite,
} from "@/hooks/queries/useSubGoalTodosInfiniites";
import useToast from "@/hooks/useToast";
import ModalAddingTodo from "../Modals/ModalAddingTodo/ModalAddingTodo";

import { TodoInfoForSubmission } from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";

import { date2StringWithSpliter } from "@/utils/date2String";

import useBottomSheet from "@/hooks/useBottomSheet";
import useGoalWithSubGoalTodo from "@/hooks/queries/useGoalWithSubGoalTodo";
import { AnimatePresence, motion } from "motion/react";
interface ListCardProps {
  subGoalInfo: {
    name?: string;
    id?: string;
    // idx: number;
    // totalSubGoalsLen: number;
    isCompleted?: boolean;
  };
  initTodoInfoList?: TodoItemsInfo[];
  // 좌우 이동으로 다른 subgoal로 이동하고, 이 때 key값으로 리마운트 시켜버려야겠다 걍.
  // onLeft: () => void;
  // onRight: () => void;
  // applyOnGoalData: () => void;
  onTodoCheck?: (todoId: string) => Promise<void>;
}

const ListCard = ({
  subGoalInfo,
  initTodoInfoList,
  // onLeft,
  // onRight,
  // applyOnGoalData,
  onTodoCheck,
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
    isValidating,
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

  // const isTodoAllChecked =
  //   todoItemsInfo.filter((todo) => todo.checked).length ===
  //     todoItemsInfo.length &&
  //   todoItemsInfo.filter((todo) => todo.checked).length !== 0;

  // const totalTodoLen = todoItemsInfo?.length ?? 0;
  // const checkedTodoLen =
  //   todoItemsInfo?.filter((todo) => todo.checked).length ?? 0;

  const [checkedMore, setCheckedMore] = useState(false);

  // TodoResultBottomSheet 관리
  const {
    checkRendered,
    checkOpened,
    openBottomSheet: openTodoRootBottomSheet,
    updateBottomSheet: updateTodoResultBottomSheet,
    closeBottomSheet,
  } = useBottomSheet<Parameters<typeof TodoResultBottomSheet>[0]>();
  useEffect(() => {
    const isRendered = checkRendered();
    if (!openBottomSheet && isRendered) {
      closeBottomSheet();
      return;
    }
    const bottomSheetInfo: Parameters<typeof openTodoRootBottomSheet>[0] = {
      bottomSheetFixerStyle: { bottom: "0px" },
      backdropProps: {
        onClick: () => {
          // 내용물을 초기화 해야 함. -> key값 바꿔도 애니메이션이나 바텀시트 높이 정상적일까?

          closeBottomSheet();
        },
        className: "fixed inset-0 bg-black/10 z-20",
      },
      hasBackdrop: false,
      ContentComponent: TodoResultBottomSheet,
      contentProps: {
        onSubmit: async (todoResult) => {
          if (todoIdForResult && todoResult.emotion !== null) {
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
        },
        openBottomSheet: openBottomSheet,
        setOpenBottomSheet: setOpenBottomSheet,
      },
    };
    const isOpened = checkOpened();
    if (openBottomSheet && !isOpened) {
      openTodoRootBottomSheet(bottomSheetInfo);
      return;
    }

    if (isRendered) updateTodoResultBottomSheet(bottomSheetInfo);

    return () => {
      if (isOpened && !openBottomSheet) {
        closeBottomSheet();
      }
    };
  }, [openBottomSheet, todoIdForResult]);

  return (
    <>
      <main
        className={`w-full flex-1 p-4  inline-flex flex-col justify-start items-center gap-5 overflow-hidden ${isLoading ? "opacity-50" : ""}`}
      >
        {/* <section className="flex items-center gap-2 w-full justify-between">
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
            // disabled={subGoalInfo.idx === subGoalInfo.totalSubGoalsLen - 1}
            className="w-8 h-8 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div
              // className={`w-6 h-6 relative overflow-hidden ${subGoalInfo.idx === subGoalInfo.totalSubGoalsLen - 1 ? "text-label-assistive" : "text-label-normal"}`}
            >
              <RightArrowSvg />
            </div>
          </button>
        </section>
        <section className="self-stretch inline-flex justify-end items-center gap-0.5">
          <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            {`${checkedTodoLen} / ${totalTodoLen}`}
          </p>
        </section> */}
        {/* {isTodoAllChecked && (
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
        )} */}

        <section className="flex gap-1 w-full">
          <div className="flex flex-col gap-1 items-start w-full flex-1">
            <p className="self-stretch justify-center text-label-assistive text-xs font-medium font-['SUIT_Variable'] leading-none">
              세부목표
            </p>
            <h3 className="self-stretch justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
              {subGoalInfo.name}
            </h3>
          </div>
          <div className="w-8 h-8">
            <button
              onClick={() => {
                openModal(
                  <ModalAddingTodo
                    onAddTodo={async (newTodo, date) => {
                      if (!subGoalInfo.id) return;

                      const res = await subGoalApi.createTodo(subGoalInfo.id, {
                        title: newTodo,
                        date: date
                          ? date2StringWithSpliter(date, "-")
                          : undefined,
                      });

                      if (res) {
                        closeModal();
                        mutate();
                      }
                    }}
                    onClose={closeModal}
                  />,
                );
              }}
              className="w-full h-full rounded-full bg-background-normal flex justify-center items-center"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 10H10M10 10H15M10 10V15M10 10V5"
                  stroke="#464C53"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </section>

        <section
          className={`flex-1 w-full h-full gap-2 flex flex-col transition-opacity duration-300 ${isValidating ? "opacity-50" : ""}`}
        >
          <AnimatePresence>
            {(!checkedMore ? todoItemsInfo.slice(0, 5) : todoItemsInfo).map(
              (todoInfo) => {
                const optimisticDataCallback =
                  makeSubgoalInfiniteOptimisticData(todoInfo.id);

                return (
                  <motion.div
                    key={todoInfo.id}
                    layout
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, scale: 0.8 }} // 나타날 때 시작 상태
                    animate={{ opacity: 1, scale: 1 }} // 나타날 때 최종 상태
                    exit={{ opacity: 0, scale: 0.8 }} // 사라질 때 최종 상태
                  >
                    <TodoItem
                      onChecked={async () => {
                        await mutate(
                          optimisticDataCallback,
                          // undefined,

                          {
                            // optimisticData: optimisticDataCallback,
                            populateCache: false,
                            revalidate: false,
                            rollbackOnError: true,
                          },
                        );

                        onTodoCheck && onTodoCheck(todoInfo.id);

                        // const res = await todoApi.toggleTodoCompletion(todoInfo.id);
                        // if (res) mutate();
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
                  </motion.div>
                );
              },
            )}
          </AnimatePresence>
          {!checkedMore && todoItemsInfo.length > 5 && (
            <button
              type="button"
              className="w-full h-8 px-2 py-1 flex justify-center items-center"
              onClick={() => {
                setCheckedMore(true);
              }}
            >
              <p className="text-center justify-start text-label-alternative text-sm font-semibold font-['Pretendard'] leading-tight">
                더보기
              </p>
            </button>
          )}

          {checkedMore && existObserver && (
            <div ref={observingRef} id="observingref" className="h-10">
              {/** observing ref */}
            </div>
          )}
        </section>
      </main>
      {/* {openBottomSheet && (
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
      )} */}
    </>
  );
};
export default ListCard;
