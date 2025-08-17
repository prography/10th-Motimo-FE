"use client";

import Modal from "../_compound/Modal";

import ReactionCoolSvg from "../../public/reactions/Reaction_Cool.svg";

interface ModalCompletingGoalProps extends ModalCommon {
  onWait: () => void;
  onCompleteGoal: () => Promise<void>;
}

const ModalCompletingGoal = ({
  onClose,
  onWait,
  onCompleteGoal,
}: ModalCompletingGoalProps) => {
  return (
    <>
      <Modal
        backdropProps={{
          onClick: () => {
            onClose();
          },
        }}
        bodyNode={<ModalBody />}
        footerNode={[
          // <Modal.Button
          //   onClick={() => {
          //     onWait();
          //   }}
          //   key={"wait"}
          //   text="잠깐만요!"
          //   color="alternative"
          // />,
          <Modal.Button
            onClick={() => {
              onCompleteGoal();
            }}
            key={"success"}
            text="목표 달성!"
            // text="달성 성공!"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalCompletingGoal;

const ModalBody = () => {
  return (
    <div className="pt-4 pb-6 flex flex-col gap-4 items-center">
      <div className="flex justify-center items-center">
        <ReactionCoolSvg />
      </div>
      <div className="flex flex-col justify-center items-center gap-[6px] ">
        <p className="justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
          {/* 모든 세부 목표 달성에 성공했습니다! */}
          모든 투두를 달성했어요!
        </p>
        <p className="justify-start text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
          너무 수고 많으셨어요!
          {/* 목표를 최종 완료 처리 할까요? */}
        </p>
      </div>
    </div>
  );
};
