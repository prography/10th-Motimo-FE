"use client";

import { useState } from "react";
import TextField from "@/components/shared/TextField/TextField";
import Modal from "@/components/shared/Modal/_compound/Modal";

import CloseSvg from "@/components/shared/public/Close_SM.svg";

interface ModalAddingTodoProps extends ModalCommon {
  onAddTodo: (todo: string) => Promise<void>;
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
  return (
    <form
      id="todoAdding"
      className="w-full"
      onSubmit={(e) => {
        // 새로고침 방지
        e.preventDefault();

        onAddTodo(todo);
      }}
    >
      <TextField
        isError={false}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        value={todo}
      />
    </form>
  );
};
