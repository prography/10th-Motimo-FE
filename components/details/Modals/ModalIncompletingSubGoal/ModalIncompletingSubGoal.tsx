"use client";

import { useState } from "react";
import TextField from "@/components/shared/TextField/TextField";
import Modal from "@/components/shared/Modal/_compound/Modal";

import CloseSvg from "@/components/shared/public/Close_SM.svg";

interface ModalIncompletingSubGoalProps extends ModalCommon {
  onIncompleteSubGoal: () => Promise<void>;
}

const ModalIncompletingSubGoal = ({
  onClose,
  onIncompleteSubGoal,
}: ModalIncompletingSubGoalProps) => {
  return (
    <>
      <Modal
        backdropProps={{
          onClick: () => {
            onClose();
          },
        }}
        bodyNode={
          <>
            <section className="flex flex-col gap-[6px] p-6 items-center justify-center">
              <h2 className="text-center justify-start text-label-strong text-base font-bold font-['SUIT'] leading-tight">
                세부 목표
              </h2>
              <p className="text-center justify-start text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
                세부 목표를 미완료 처리하시겠습니까?
              </p>
            </section>
          </>
        }
        footerNode={[
          <Modal.Button
            onClick={() => {
              onClose();
            }}
            key={"cancel"}
            type="button"
            text="취소"
            color="alternative"
          />,
          <Modal.Button
            onClick={() => {
              onIncompleteSubGoal;
            }}
            key={"incomplete"}
            type="button"
            text="확인"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalIncompletingSubGoal;
