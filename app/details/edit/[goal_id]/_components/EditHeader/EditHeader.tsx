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
      <header>
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

        <Button form="GoalInfoEdit" type="submit" size="s" variant="filled">
          저장
        </Button>
      </header>
    </>
  );
};
export default EditHeader;
