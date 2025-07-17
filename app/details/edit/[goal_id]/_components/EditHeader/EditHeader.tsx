"use client";

import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

import { AppBar } from "@/components/shared";
import ModalExitingEdit from "@/components/details/Modals/ModalExitingEdit/ModalExitingEdit";
import { Button } from "@/components/shared/Button/Button";

const EditHeader = () => {
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  return (
    <>
      <header
        // AppBar에서 pl-4는 이미 처리 되어 있음.
        className="flex pr-4 justify-between items-center"
      >
        <AppBar
          type="back"
          title="편집"
          onBackClick={(e) => {
            e.preventDefault();
            openModal(
              <ModalExitingEdit
                onClose={closeModal}
                onExit={() => {
                  closeModal();
                  router.back();
                }}
              />,
            );
          }}
        />

        <Button
          // 너비가 충분치 않아 글씨가 제대로 안보여서 넓이 직접 수정
          className="w-[55px]"
          form="GoalInfoEdit"
          type="submit"
          size="s"
          variant="filled"
        >
          저장
        </Button>
      </header>
    </>
  );
};
export default EditHeader;
