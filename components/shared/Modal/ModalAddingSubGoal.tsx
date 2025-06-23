"use client";

import { useState } from "react";
import TextField from "../TextField/TextField";
import Modal from "./_compound/Modal";

import CloseSvg from "../public/Close_SM.svg";

interface ModalAddingSubGoalProps extends ModalCommon {
  onSubmit: (subGoal: string) => void;
}

const ModalAddingSubGoal = ({ onClose, onSubmit }: ModalAddingSubGoalProps) => {
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
                세부목표 추가
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
            <Body onSubmit={onSubmit} />
          </div>
        }
        footerNode={[
          <Modal.Button
            onClick={() => {
              onClose();
            }}
            form="subGoalAdding"
            text="추가하기"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalAddingSubGoal;

const Body = ({
  onSubmit,
}: {
  onSubmit: ModalAddingSubGoalProps["onSubmit"];
}) => {
  const [subGoal, setSubGoal] = useState("");
  return (
    <form
      id="subGoalAdding"
      className="w-full"
      onSubmit={() => onSubmit(subGoal)}
    >
      <TextField
        isError={false}
        onChange={(e) => setSubGoal(e.target.value)}
        value={subGoal}
      />
    </form>
  );
};
