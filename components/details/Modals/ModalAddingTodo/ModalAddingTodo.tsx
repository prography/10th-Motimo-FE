"use client";

import { useRef, useState } from "react";
import TextField from "@/components/shared/TextField/TextField";
import Modal from "@/components/shared/Modal/_compound/Modal";

import CalendarSvg from "@/components/shared/public/Calendar.svg";

import CloseSvg from "@/components/shared/public/Close_SM.svg";
import Calendar from "@/components/shared/Calendar/Calendar";
import { date2StringWithSpliter } from "@/utils/date2String";

interface ModalAddingTodoProps extends ModalCommon {
  onAddTodo: (title: string, date?: Date) => Promise<void>;
}

const ModalAddingTodo = ({ onClose, onAddTodo }: ModalAddingTodoProps) => {
  return (
    <>
      <Modal
        backdropProps={{
          onClick: () => {
            onClose();
          },
        }}
        bodyNode={
          <div className="w-full p-5 flex flex-col gap-4">
            <div className="w-full inline-flex justify-between items-center">
              <p className="justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
                투두 추가
              </p>
              <button
                type="button"
                className="w-6 h-6 relative overflow-hidden"
                onClick={() => {
                  onClose();
                }}
              >
                <CloseSvg />
              </button>
            </div>
            <ModalBody onAddTodo={onAddTodo} />
          </div>
        }
        footerNode={[
          <Modal.Button
            // onClick={() => {
            //   onClose();
            // }}
            key={"add"}
            form="todoAdding"
            type="submit"
            text="추가하기"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalAddingTodo;

const ModalBody = ({
  onAddTodo,
}: {
  onAddTodo: ModalAddingTodoProps["onAddTodo"];
}) => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const ref = useRef<HTMLInputElement>(null);
  const handleDateCLick = () => {
    if (!ref.current) return;
    ref.current.showPicker();
  };

  return (
    <form
      id="todoAdding"
      className="w-full"
      onSubmit={(e) => {
        // 새로고침 방지
        e.preventDefault();
        if (!todo) {
          setError(true);
          return;
        }
        setError(false);
        onAddTodo(todo, date);
      }}
    >
      <div className="flex flex-col gap-3">
        <TextField
          isError={error}
          description={error ? "투두를 입력해주세요" : ""}
          placeholder="투두를 입력해주세요"
          onChange={(e) => {
            if (e.target.value) setError(false);
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <label
          className="w-full h-8 px-2 py-1 bg-background-alternative rounded-lg  outline-1 outline-offset-[-1px] outline-Color-gray-10 inline-flex justify-start items-center gap-0.5"
          htmlFor="date"
          onClick={handleDateCLick}
          // onClick={() => setShowDate(true)}
        >
          <div className="flex gap-[2px] items-center">
            <CalendarSvg />
            <p>
              {date ? date2StringWithSpliter(date, ".") : "날짜를 선택해주세요"}
            </p>
          </div>
        </label>
        <input
          id="date"
          type="date"
          className="invisible h-0"
          ref={ref}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>
    </form>
  );
};
