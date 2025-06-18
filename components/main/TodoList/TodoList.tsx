"use client";

import TodoItem, { TodoItemProps } from "@/components/shared/TodoItem/TodoItem";
import { Fragment, memo, useState } from "react";
import { motion, useMotionValue } from "motion/react";

import UpArrowSvg from "@/public/Caret_Up_MD.svg";
import PlusSvg from "../../shared/public/Add_Plus.svg";
import PencilSvg from "@/public/Edit_Pencil_01.svg";
import TrashCanSvg from "@/public/Trash_Full.svg";
import { animate } from "motion";

/** 임시 타입. 정확히는, 백엔드에서 전달해주는거 체크해야 함 */
type TmpTodoItemsInfo = TodoItemProps;

interface TodoListProps {
  /** 없다면, 다른 UI */
  subGoal?: string;
  /** todoCheckedLen도 낙관적 업뎃이 필요한지는 모르겠다. */
  todoCheckedLen: number;
  /** todoToalLen이 0이면 todoItemsInfo길이가 0인거긴 한데... */
  todoTotalLen: number;
  /** 길이가 0이라면, 다른 UI */
  todoItemsInfo: TmpTodoItemsInfo[];
}

const TodoList = ({
  subGoal,
  todoCheckedLen,
  todoTotalLen,
  todoItemsInfo,
}: TodoListProps) => {
  if (!subGoal)
    return (
      <>
        <div
          data-type="type5"
          className="w-80 p-3 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center gap-2 overflow-hidden"
        >
          <div className="self-stretch h-8 inline-flex justify-start items-center gap-1">
            <div className="flex-1 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-snug">
              세부 목표를 추가해주세요.
            </div>
            <div className="w-8 h-8 p-1.5 bg-background-primary rounded-[999px] flex justify-center items-center gap-2">
              <div className="w-5 h-5 relative overflow-hidden">
                <PlusSvg width={20} height={20} />
                {/* <div className="w-2.5 h-2.5 left-[5px] top-[5px] absolute outline-[1.50px] outline-offset-[-0.75px] outline-Color-white"></div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  const hasTodoItemsInfo = todoItemsInfo.length > 0;
  return (
    <>
      <div className="w-80 px-3 py-4 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center gap-2 overflow-hidden">
        <section className="self-stretch h-8 inline-flex justify-start items-center gap-1">
          <div className="w-5 h-5 relative overflow-hidden">
            <UpArrowSvg />
          </div>
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
        </section>
        <TodoArea
          todoItemsInfo={todoItemsInfo}
          hasTodoItemsInfo={hasTodoItemsInfo}
          todoCheckedLen={todoCheckedLen}
          todoTotalLen={todoTotalLen}
        />
      </div>
    </>
  );
};
export default TodoList;

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

const OptimizedTodoItem = memo(TodoItem);

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
  const [selectedTodoItem, setSelectedTodoItem] = useState<null | number>(null);
  // todo를 모두 완료했을 때.
  if (hasTodoItemsInfo && todoCheckedLen === todoTotalLen)
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

  // todoItem도 없을 때.
  if (!hasTodoItemsInfo)
    return (
      <>
        <div className="self-stretch py-6 bg-background-normal rounded-lg inline-flex flex-col justify-center items-center gap-3 overflow-hidden">
          <div className="flex flex-col justify-start items-center gap-0.5">
            <div className="text-center justify-center text-label-alternative text-sm font-bold font-['SUIT_Variable'] leading-tight">
              현재 등록된 할 일이 없어요!
            </div>
          </div>
        </div>
      </>
    );

  // 일반 케이스
  return (
    <>
      <div className="self-stretch h-80 flex flex-col justify-start items-start  gap-2  overflow-y-auto overflow-x-hidden">
        {todoItemsInfo.map((info, idx) => {
          const x = useMotionValue(0);
          /** idx를 todo의 id대신 임시로 사용 */

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
            <Fragment key={idx}>
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
                    x: selectedTodoItem === idx ? -88 : 0,
                  }}
                  onDragEnd={(_, info) => {
                    const newX = info.offset.x < -30 ? -88 : 0;
                    animate(x, newX);
                    if (newX === -88) setSelectedTodoItem(idx);
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <OptimizedTodoItem {...info} key={info.title} />
                </motion.div>
              </div>
            </Fragment>
            // <TodoItemContainer info={info} selectedTodoItem={selectedTodoItem} />
          );
        })}
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
