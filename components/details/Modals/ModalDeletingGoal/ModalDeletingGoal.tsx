"use client";

import Modal from "@/components/shared/Modal/_compound/Modal";

interface ModalDeletingGoalProps extends ModalCommon {
  onDeleteGoal: () => Promise<void>;
}

const ModalDeletingGoal = ({
  onClose,
  onDeleteGoal,
}: ModalDeletingGoalProps) => {
  return (
    <>
      <Modal
        backdropProps={{
          onClick: () => {
            onClose();
          },
        }}
        bodyNode={<Body />}
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
              onDeleteGoal();
            }}
            key={"delete"}
            text="삭제"
            color="negative"
          />,
        ]}
      />
    </>
  );
};
export default ModalDeletingGoal;

const Body = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[6px] p-6">
      <p className="text-center justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
        목표를 삭제하시겠습니까?
      </p>
      <p className=" text-center justify-start text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
        삭제 시 세부 목표와 작성된 투두도 함께 삭제됩니다.
      </p>
    </div>
  );
};
