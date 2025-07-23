"use client";

import {
  Dispatch,
  Fragment,
  memo,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useOptimistic,
  startTransition,
  useRef,
  useEffect,
  RefObject,
} from "react";
import { KeyedMutator } from "swr";
import { motion, useMotionValue } from "motion/react";
import { animate } from "motion";

import UpArrowSvg from "@/public/images/Caret_Up_MD.svg";
import DownArrowSvg from "@/public/images/Caret_Down_MD.svg";
import PlusSvg from "../../shared/public/Add_Plus.svg";
import PencilSvg from "@/public/images/Edit_Pencil_01.svg";
import TrashCanSvg from "@/public/images/Trash_Full.svg";

import { TodoItemsInfo } from "@/types/todoList";

import TodoItem from "@/components/shared/TodoItem/TodoItem";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";

import useModal from "@/hooks/useModal";
import { useGoalWithSubGoals } from "@/api/hooks";
import useOptimisticToggle from "@/hooks/main/useOptimisticToggle";
import useActiveTodoBottomSheet from "@/stores/useActiveTodoBottomSheet";

import { todoApi, goalApi } from "@/api/service";
import { TodoRs, TodoRsStatusEnum } from "@/api/generated/motimo/Api";
import Link from "next/link";
import {
  useObservingExist,
  useSubGoalTodosIncompleteOrTodayInfinite,
} from "@/hooks/queries/useSubGoalTodosInfiniites";
import { SubGoalTodoInfinite } from "@/hooks/queries/useSubGoalTodosInfiniites";
import { SWRInfiniteKeyedMutator } from "swr/dist/infinite";

// import { useObservingInfiniteOffset } from "@/hooks/queries/useSubGoalTodosInfiniites";
/** api generator로부터 받은 타입을 사용 */

interface TodoListProps {
  /** 없다면, 다른 UI */
  subGoal?: string;
  /** todoCheckedLen도 낙관적 업뎃이 필요한지는 모르겠다. */
  initTodoCheckedLen?: number;
  /** todoToalLen이 0이면 todoItemsInfo길이가 0인거긴 한데... */
  initTodoTotalLen: number;
  /** 길이가 0이라면, 다른 UI */
  initTodoItemsInfo?: TodoItemsInfo[];
  /** subGoal의 id */
  subGoalId?: string;
  /** goal의 id */
  goalId?: string;
  /** 외부에서 todoItem의 report관련 클릭 처리 */
  onReportedClick?: (todoId: string) => void;
}

const TodoListContext = createContext<{
  subGoalTitle?: string;
  subGoalId?: string;

  mutate?: SWRInfiniteKeyedMutator<(SubGoalTodoInfinite | undefined)[]>;
  updateOptimisticCheckedLen?: (action: number) => void;
  onReportedClick?: TodoListProps["onReportedClick"];
  goalId?: string;
  existObserver?: boolean;
  observingRef: RefObject<HTMLDivElement | null>;
} | null>(null);

const TodoList = ({
  subGoal,
  initTodoCheckedLen = 0,
  initTodoTotalLen,
  initTodoItemsInfo,
  subGoalId,
  goalId,
  onReportedClick,
}: TodoListProps) => {
  // 펼친 상태가 기본
  const [isFolded, setIsFolded] = useState(false);

  // 아래는 무한 스크롤 관련
  const observingRef = useRef<HTMLDivElement | null>(null);

  const { data, mutate, isLoading, isReachedLast, size, setSize } =
    useSubGoalTodosIncompleteOrTodayInfinite(subGoalId ?? "", {
      fallbackData: [{ content: initTodoItemsInfo || [] }],
    });

  const existObserver = useObservingExist(
    isLoading,
    isReachedLast,
    observingRef,
    () => {
      setSize(size + 1);
    },
  );

  // 데이터 추가 가공
  const todoItemsInfo = data ?? [];

  const todoCheckedLen =
    todoItemsInfo?.filter((todoItem) => todoItem.checked).length ??
    initTodoCheckedLen;

  const [optimisticCheckedLen, updateOptimisticCheckedLen] = useOptimistic(
    todoCheckedLen,
    (cur: number, delta: number) => {
      return cur + delta;
    },
  );

  const todoTotalLen = todoItemsInfo ? todoItemsInfo.length : initTodoTotalLen;

  if (!subGoal || !subGoalId)
    return (
      <>
        <NoSubGoal goalId={goalId} />
      </>
    );
  const hasTodoItemsInfo = todoItemsInfo ? todoItemsInfo.length > 0 : false;

  return (
    <>
      <div
        className={` w-full  px-3 py-4 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center ${isFolded ? "gap-0" : "gap-2"} overflow-hidden`}
      >
        {/**  TodoList Header */}
        <header className="self-stretch h-8 inline-flex justify-start items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setIsFolded((prev) => !prev);
            }}
            className="w-5 h-5 relative overflow-hidden"
          >
            {isFolded ? <DownArrowSvg /> : <UpArrowSvg />}
          </button>
          <div className="flex-1 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
            {subGoal}
          </div>
          {hasTodoItemsInfo && (
            <div className="flex justify-end items-center gap-0.5">
              <div className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
                {`${optimisticCheckedLen}/${todoTotalLen}`}
              </div>
            </div>
          )}
        </header>

        <div
          className={`transition-all duration-300 grid w-full pt-2`}
          style={{ gridTemplateRows: isFolded ? "0fr" : "1fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <TodoListContext.Provider
              value={{
                mutate,
                subGoalId,
                subGoalTitle: subGoal,
                updateOptimisticCheckedLen,
                onReportedClick,
                goalId,
                existObserver,
                observingRef,
              }}
            >
              <TodoArea
                todoItemsInfo={todoItemsInfo ?? []}
                hasTodoItemsInfo={hasTodoItemsInfo}
                todoCheckedLen={todoCheckedLen}
                todoTotalLen={todoTotalLen}
              />
            </TodoListContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
};
export default TodoList;
export type { TodoListProps };

/** TodoList 재료들
 * - NoSubGoal
 * - TodoArea
 */

interface NoSubGoalProps {
  goalId?: string;
}

const NoSubGoal = ({ goalId }: NoSubGoalProps) => {
  const { closeModal, openModal } = useModal();
  const { mutate } = useGoalWithSubGoals(goalId ?? "");

  return (
    <>
      <div
        data-type="type5"
        className="w-full p-3 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center gap-2 overflow-hidden"
      >
        <div className="self-stretch h-8 inline-flex justify-start items-center gap-1">
          <div className="flex-1 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-snug">
            세부 목표를 추가해주세요.
          </div>
          <button
            onClick={() => {
              openModal(
                <ModalAddingSubGoal
                  onClose={() => closeModal()}
                  onAddSubGoal={async (subGoal: string) => {
                    // mutateResult가 네트워크 fail에서는 undefined가 나와야 함.
                    if (!goalId) return;

                    const mutateResult = await goalApi.addSubGoal(goalId, {
                      title: subGoal,
                    });
                    if (mutateResult) {
                      mutate && mutate();
                      closeModal();
                    }
                  }}
                />,
              );
            }}
            type="button"
            className="w-8 h-8 p-1.5 bg-background-primary rounded-[999px] flex justify-center items-center gap-2"
          >
            <div className="w-5 h-5 relative overflow-hidden text-white">
              <PlusSvg width={20} height={20} />
              {/* <div className="w-2.5 h-2.5 left-[5px] top-[5px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-Color-white"></div> */}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

const TodoArea = ({
  todoItemsInfo,
  hasTodoItemsInfo,
  todoCheckedLen,
  todoTotalLen,
}: {
  todoItemsInfo: TodoItemsInfo[];
  hasTodoItemsInfo: boolean;
  todoCheckedLen: number;
  todoTotalLen: number;
}) => {
  const nullableContext = useContext(TodoListContext);
  const { existObserver, observingRef } = nullableContext || {};

  const [selectedTodoItem, setSelectedTodoItem] = useState<null | string>(null);
  // todo를 모두 완료했을 때.
  if (hasTodoItemsInfo && todoCheckedLen > 0 && todoCheckedLen === todoTotalLen)
    return (
      <>
        <AllTodoFinished />
      </>
    );

  // todoItem도 없을 때.
  if (!hasTodoItemsInfo)
    return (
      <>
        <NoTodo />
      </>
    );

  // 일반 케이스
  return (
    <>
      <div className="self-stretch max-h-80  flex flex-col justify-start items-start  gap-2  overflow-y-auto overflow-x-hidden">
        {todoItemsInfo.map((info) => {
          return (
            <TodoItemContainer
              key={info.id}
              info={info}
              selectedTodoItem={selectedTodoItem}
              setSelectedTodoItem={setSelectedTodoItem}
            />
          );
        })}
        {existObserver && (
          <div ref={observingRef} className=" w-full h-1"></div>
        )}
      </div>
    </>
  );
};

/** TodoArea 재료들 */

const TodoItemContainer = ({
  info,
  selectedTodoItem,
  setSelectedTodoItem,
}: {
  info: TodoItemsInfo;
  selectedTodoItem: null | string;
  setSelectedTodoItem: Dispatch<SetStateAction<typeof selectedTodoItem>>;
}) => {
  const x = useMotionValue(0);
  const contextContent = useContext(TodoListContext);
  const {
    mutate,
    subGoalId,
    subGoalTitle,
    updateOptimisticCheckedLen,
    onReportedClick,
  } = contextContent || {};

  const [checked, toggleChecekdOptimistically] = useOptimisticToggle(
    info.checked ?? false,
  );
  const { setIsActive } = useActiveTodoBottomSheet();
  /**
   * 여기에 todoItemProp에 들어갈 onChecked, onMoodClick에 대해 처리해야 하나?
   * 그럼 Edit, Delete버튼에 대해 모달 띄우는거는?
   *
   * 모달 띄우는게 onMoodClick, Edit, Delete에 대해.
   * onChecked는 바로 fetch를 보내야 하는데,
   *
   * =>
   * 그냥 이 안에서 클릭 이벤트에 대한 동작을 다 넣자.
   * 모달이 사용된다면 모달 훅이랑 함께, 모달 안에 넣을 함수도 만들자.
   */

  return (
    <Fragment key={info.id}>
      <div className="flex items-center relative w-full overflow-hidden min-h-14">
        <motion.div
          className="cursor-grab active:cursor-grabbing  w-full z-10"
          drag="x"
          style={{ x }}
          dragConstraints={{ left: -88, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          animate={{
            x: selectedTodoItem === info.id ? -88 : 0,
          }}
          onDragEnd={(_, dragInfo) => {
            const newX = dragInfo.offset.x < -30 ? -88 : 0;
            animate(x, newX);
            if (newX === -88) setSelectedTodoItem(info.id ?? null);
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <OptimizedTodoItem
            {...info}
            checked={checked}
            onChecked={async () => {
              toggleChecekdOptimistically();
              const res = await todoApi.toggleTodoCompletion(info.id);

              if (res) {
                mutate && mutate();
              }

              updateOptimisticCheckedLen &&
                updateOptimisticCheckedLen(checked ? -1 : +1);
            }}
            onReportedClick={async () => {
              onReportedClick && onReportedClick(info.id);
            }}
          />
        </motion.div>
        <div className="gap-1 flex  right-0 min-w-0 absolute z-0">
          <EditButton
            onEdit={() => {
              /** 임시. 여기에 바텀 시트 관련 들어가야 함 */
              const initTodoInfo = {
                date: info?.targetDate,
                subGoalId: subGoalId ?? "",
                subGoalTitle: subGoalTitle ?? "",
                todo: info?.title,
                id: info?.id,
              };
              setIsActive(true, initTodoInfo);
            }}
          />
          <DeleteButton
            onDelete={async () => {
              await todoApi.deleteById(info.id);
              mutate && mutate();
            }}
          />
        </div>
      </div>
    </Fragment>
    // <TodoItemContainer info={info} selectedTodoItem={selectedTodoItem} />
  );
};

const OptimizedTodoItem = memo(TodoItem);

const AllTodoFinished = () => {
  const nullableContext = useContext(TodoListContext);
  const { goalId } = nullableContext || {};
  return (
    <>
      <div className="w-full self-stretch py-6 bg-background-normal rounded-lg inline-flex flex-col justify-center items-center gap-3 overflow-hidden">
        <div className="flex flex-col justify-start items-center gap-0.5">
          <div className="text-center justify-center text-label-alternative text-sm font-bold font-['SUIT_Variable'] leading-tight">
            투두를 모두 완료했어요!
          </div>
          <p
            className=" whitespace-pre-wrap  text-center justify-center text-label-alternative text-xs font-medium font-['SUIT_Variable'] leading-none "
            style={{ lineHeight: "140%" }}
          >
            {"새로운 투두를 추가하시거나\n세부 목표를 달성하실 수 있어요."}
          </p>
        </div>
        <Link href={`/details/${goalId}`}>
          <div className="px-4 py-2 relative bg-background-primary rounded-lg flex flex-col justify-center items-start gap-2 overflow-hidden">
            <div className="self-stretch inline-flex justify-center items-center gap-2">
              <p className="justify-start text-white text-sm font-semibold font-['Pretendard'] leading-tight">
                목표 상세페이지로 이동
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const NoTodo = () => {
  return (
    <>
      <div className="w-full self-stretch py-6 bg-background-normal rounded-lg inline-flex flex-col justify-center items-center gap-3 overflow-hidden">
        <div className="flex flex-col justify-start items-center gap-0.5">
          <div className="text-center justify-center text-label-alternative text-sm font-bold font-['SUIT_Variable'] leading-tight">
            현재 등록된 할 일이 없어요!
          </div>
        </div>
      </div>
    </>
  );
};

/** 재료들 */

interface EditButtonProps {
  /** 밖에서 처리하도록 하기 */
  onEdit: () => void;
}

const EditButton = ({ onEdit }: EditButtonProps) => {
  return (
    <>
      <button
        onClick={() => {
          onEdit();
        }}
        type="button"
        className="w-10 h-14 px-1 py-2 bg-background-strong rounded-lg inline-flex flex-col justify-center items-center gap-0.5"
      >
        <div className="w-5 h-5 relative overflow-hidden">
          <PencilSvg />
        </div>
        <div className="justify-center text-label-inverse text-xs font-medium font-['SUIT_Variable'] leading-none">
          수정
        </div>
      </button>
    </>
  );
};

interface DeleteButtonProps {
  /** 밖에서 처리하도록 하기 */
  onDelete: () => Promise<void>;
}

const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
  return (
    <>
      <button
        onClick={() => onDelete()}
        type="button"
        className="w-10 h-14 px-1 py-2 bg-status-negative rounded-lg inline-flex flex-col justify-center items-center gap-0.5"
      >
        <div className="w-5 h-5 relative overflow-hidden text-white">
          <TrashCanSvg />
        </div>
        <div className="justify-center text-label-inverse text-xs font-medium font-['SUIT_Variable'] leading-none">
          삭제
        </div>
      </button>
    </>
  );
};
