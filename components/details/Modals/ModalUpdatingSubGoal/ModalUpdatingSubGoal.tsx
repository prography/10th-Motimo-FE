"use client";

import { useState } from "react";
import TextField from "@/components/shared/TextField/TextField";
import Modal from "@/components/shared/Modal/_compound/Modal";

import CloseSvg from "@/components/shared/public/Close_SM.svg";

interface ModalUpdatingSubGoalProps extends ModalCommon {
  onUpdateSubGoal: (subGoal: string) => Promise<void>;
  initSubGoal: string;
}

const ModalUpdatingSubGoal = ({
  onClose,
  onUpdateSubGoal,
  initSubGoal,
}: ModalUpdatingSubGoalProps) => {
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
                세부 목표 수정
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
            <Body
              onUpdateSubGoal={onUpdateSubGoal}
              initSubGoal={initSubGoal}
              onClose={onClose}
            />
          </div>
        }
        footerNode={[
          <Modal.Button
            // onClick={() => {
            //   onClose();
            // }}
            key={"update"}
            form="subGoalUpdating"
            type="submit"
            text="변경하기"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalUpdatingSubGoal;

const Body = ({
  onUpdateSubGoal,
  initSubGoal,
  onClose,
}: ModalUpdatingSubGoalProps) => {
  const [subGoal, setSubGoal] = useState(initSubGoal);
  return (
    <form
      id="subGoalUpdating"
      className="w-full"
      onSubmit={(e) => {
        // 새로고침 방지
        e.preventDefault();

        onUpdateSubGoal(subGoal);
        onClose();
      }}
    >
      <TextField
        isError={false}
        onChange={(e) => {
          setSubGoal(e.target.value);
        }}
        value={subGoal}
      />
    </form>
  );
};
