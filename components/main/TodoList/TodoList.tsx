"use client";

import TodoItem from "@/components/shared/TodoItem/TodoItem";
import { Dispatch, Fragment, memo, SetStateAction, useState } from "react";
import { motion, useMotionValue } from "motion/react";
import { animate } from "motion";

import UpArrowSvg from "@/public/images/Caret_Up_MD.svg";
import DownArrowSvg from "@/public/images/Caret_Down_MD.svg";
import PlusSvg from "../../shared/public/Add_Plus.svg";
import PencilSvg from "@/public/images/Edit_Pencil_01.svg";
import TrashCanSvg from "@/public/images/Trash_Full.svg";

import { TodoItemsInfo } from "@/types/todoList";
import useModal from "@/hooks/useModal";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";

/** api generator로부터 받은 타입을 사용 */

interface TodoListProps {
  /** 없다면, 다른 UI */
  subGoal?: string;
  /** todoCheckedLen도 낙관적 업뎃이 필요한지는 모르겠다. */
  todoCheckedLen?: number;
  /** todoToalLen이 0이면 todoItemsInfo길이가 0인거긴 한데... */
  todoTotalLen: number;
  /** 길이가 0이라면, 다른 UI */
  todoItemsInfo: TodoItemsInfo[];
}

const TodoList = ({
  subGoal,
  todoCheckedLen = 0,
  todoTotalLen,
  todoItemsInfo,
}: TodoListProps) => {
  // 펼친 상태가 기본
  const [isFolded, setIsFolded] = useState(false);

  if (!subGoal)
    return (
      <>
        <NoSubGoal />
      </>
    );
  const hasTodoItemsInfo = todoItemsInfo.length > 0;
  return (
    <>
      <div
        className={` w-80  px-3 py-4 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center gap-${isFolded ? 0 : 2} overflow-hidden`}
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
                {`${todoCheckedLen}/${todoTotalLen}`}
              </div>
            </div>
          )}
        </header>
        {
          <div
            className={`transition-all duration-300 grid w-full`}
            style={{ gridTemplateRows: isFolded ? "0fr" : "1fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <TodoArea
                todoItemsInfo={todoItemsInfo}
                hasTodoItemsInfo={hasTodoItemsInfo}
                todoCheckedLen={todoCheckedLen}
                todoTotalLen={todoTotalLen}
              />
            </div>
          </div>
        }
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

const NoSubGoal = () => {
  const { closeModal, openModal } = useModal();
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
            onClick={() =>
              openModal(
                <ModalAddingSubGoal
                  onClose={() => closeModal()}
                  onAddSubGoal={async (subGoal: string) => {
                    // 대충 subgoal관련 비동기 동작
                    // 비동기 성공적으로 끝나야 closeModal시키기
                    // 실패 시 toast띄우기
                  }}
                />,
              )
            }
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
  todoItemsInfo: TodoListProps["todoItemsInfo"];
  hasTodoItemsInfo: boolean;
  todoCheckedLen: number;
  todoTotalLen: number;
}) => {
  const [selectedTodoItem, setSelectedTodoItem] = useState<null | string>(null);
  // todo를 모두 완료했을 때.
  if (hasTodoItemsInfo && todoCheckedLen === todoTotalLen)
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
      <div className="self-stretch h-80 flex flex-col justify-start items-start  gap-2  overflow-y-auto overflow-x-hidden">
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
  info: TodoListProps["todoItemsInfo"][0];
  selectedTodoItem: null | string;
  setSelectedTodoItem: Dispatch<SetStateAction<typeof selectedTodoItem>>;
}) => {
  const x = useMotionValue(0);

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
      <div className="flex items-center relative">
        <div className="gap-1 flex  z-0 absolute right-0">
          <EditButton />
          <DeleteButton />
        </div>
        <motion.div
          className="cursor-grab active:cursor-grabbing z-10 "
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
          <OptimizedTodoItem {...info} onChecked={async () => {}} />
        </motion.div>
      </div>
    </Fragment>
    // <TodoItemContainer info={info} selectedTodoItem={selectedTodoItem} />
  );
};

const OptimizedTodoItem = memo(TodoItem);

const AllTodoFinished = () => {
  return (
    <>
      <div className="self-stretch py-6 bg-background-normal rounded-lg inline-flex flex-col justify-center items-center gap-3 overflow-hidden">
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
        <div
          data-leading-icon="false"
          data-status="enabled"
          data-type="filled"
          className="px-4 py-2 relative bg-background-primary rounded-lg flex flex-col justify-center items-start gap-2 overflow-hidden"
        >
          <div className="self-stretch inline-flex justify-center items-center gap-2">
            <button
              type="button"
              className="justify-start text-white text-sm font-semibold font-['Pretendard'] leading-tight"
            >
              목표 상세페이지로 이동
            </button>
          </div>
          <div
            data-type="normal"
            className="w-40 h-9 left-0 top-0 absolute"
          ></div>
        </div>
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

const EditButton = () => {
  return (
    <>
      <div className="w-10 h-14 px-1 py-2 bg-background-strong rounded-lg inline-flex flex-col justify-center items-center gap-0.5">
        <div className="w-5 h-5 relative overflow-hidden">
          <PencilSvg />
        </div>
        <div className="justify-center text-label-inverse text-xs font-medium font-['SUIT_Variable'] leading-none">
          수정
        </div>
      </div>
    </>
  );
};

const DeleteButton = () => {
  return (
    <>
      <div className="w-10 h-14 px-1 py-2 bg-status-negative rounded-lg inline-flex flex-col justify-center items-center gap-0.5">
        <div className="w-5 h-5 relative overflow-hidden">
          <TrashCanSvg />
        </div>
        <div className="justify-center text-label-inverse text-xs font-medium font-['SUIT_Variable'] leading-none">
          삭제
        </div>
      </div>
    </>
  );
};

// const TodoItemContainer = ({
//   info,
//   selectedTodoItem,
// }: {
//   info: TmpTodoItemsInfo;
//   /** todo의 id. 아무것도 선택 안되면 null */
//   selectedTodoItem: null | number;
// }) => {
//   //   const [dragXOffset, setDragXOffset] = useState(0);
//   //   //tset
//   //   console.log("dragXOffset: ", dragXOffset);

//   /**
//    * 여기에 todoItemProp에 들어갈 onChecked, onMoodClick에 대해 처리해야 하나?
//    * 그럼 Edit, Delete버튼에 대해 모달 띄우는거는?
//    *
//    * 모달 띄우는게 onMoodClick, Edit, Delete에 대해.
//    * onChecked는 바로 fetch를 보내야 하는데,
//    *
//    * =>
//    * 그냥 이 안에서 클릭 이벤트에 대한 동작을 다 넣자.
//    * 모달이 사용된다면 모달 훅이랑 함께, 모달 안에 넣을 함수도 만들자.
//    */

//   const x = useMotionValue(0);
//   return (
//     <>
//       <div className="flex items-center relative">
//         <div className="gap-1 flex  z-0 absolute right-0">
//           <EditButton />
//           <DeleteButton />
//         </div>
//         <motion.div
//           className="cursor-grab active:cursor-grabbing z-10 "
//           drag="x"
//           style={{ x }}
//           dragConstraints={{ left: -88, right: 0 }}
//           dragElastic={0}
//           dragMomentum={false}
//           onDragEnd={(_, info) => {
//             const newX = info.offset.x < -30 ? -88 : 0;
//             animate(x, newX);
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 30,
//           }}
//         >
//           <OptimizedTodoItem {...info} key={info.title} />
//         </motion.div>
//       </div>
//     </>
//   );
// };
