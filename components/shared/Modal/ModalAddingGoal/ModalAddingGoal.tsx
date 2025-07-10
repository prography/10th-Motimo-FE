"use client";

import Modal from "../_compound/Modal";

interface ModalAddingGoalProps extends ModalCommon {
  onAddGoal: () => Promise<void>;
}

const ModalAddingGoal = ({ onClose, onAddGoal }: ModalAddingGoalProps) => {
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
          <Modal.Button
            onClick={() => {
              onClose();
            }}
            key={"cancel"}
            text="취소"
            color="alternative"
          />,
          <Modal.Button
            onClick={() => {
              // 비동기 동작 추후에 처리해야 함. 아직 미정이지만.. 수정할 부분임.
              onAddGoal();
            }}
            key={"add"}
            text="추가"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalAddingGoal;

const ModalBody = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
        새로운 목표를 추가하시겠습니까?
      </div>
    </div>
  );
};
