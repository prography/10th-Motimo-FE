"use client";

import Modal from "../_compound/Modal";

interface ModalDeletingAccountProps {
  onClose: () => void;
  onDeleteAccount: () => Promise<void> | void;
}

const ModalDeletingAccount = ({
  onClose,
  onDeleteAccount,
}: ModalDeletingAccountProps) => {
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
            form="accountDeleting"
            text="취소"
            color="alternative"
          />,
          <Modal.Button
            onClick={() => {
              onDeleteAccount();
            }}
            key={"delete"}
            form="accountDeleting"
            text="삭제"
            color="negative"
          />,
        ]}
      />
    </>
  );
};

export default ModalDeletingAccount;

const ModalBody = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[6px] p-6">
      <p className="text-center justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
        계정을 삭제하시겠습니까?
      </p>
      <p className=" text-center justify-start text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
        삭제 시 설정한 목표가 전부 사라집니다.
      </p>
    </div>
  );
};
