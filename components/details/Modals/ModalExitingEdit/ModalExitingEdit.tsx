"use client";

import Modal from "@/components/shared/Modal/_compound/Modal";

interface ModalExitingEditProps extends ModalCommon {
  onExit: () => void;
}

const ModalExitingEdit = ({ onClose, onExit }: ModalExitingEditProps) => {
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
              onExit();
            }}
            key={"exit"}
            text="나가기"
            color="primary"
          />,
        ]}
      />
    </>
  );
};
export default ModalExitingEdit;
const comment = `편집화면에서 나가시겠습니까?\n수정된 사항은 저장되지 않습니다.`;
const Body = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[6px] p-6">
      <p className="whitespace-pre-wrap text-center justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
        {comment}
      </p>
    </div>
  );
};
