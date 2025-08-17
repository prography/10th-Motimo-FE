"use client";

import EditInfo from "../../../../../../components/details/EditInfo/EditInfo";
import TextField from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";
import ModalDeletingGoal from "@/components/details/Modals/ModalDeletingGoal/ModalDeletingGoal";
import GoalDurationBottomSheet from "@/components/details/BottomSheets/GoalDurationBottomSheet/GoalDurationBottomSheet";

import TrashBin from "@/public/images/Trash_Full.svg";

import { useContext, useState, useEffect } from "react";
import useModal from "@/hooks/useModal";
import { EditContext } from "../EditBody/EditBody";
import { date2StringWithSpliter } from "@/utils/date2String";
import { goalApi } from "@/api/service";
import { useRouter } from "next/navigation";
import { useGoals } from "@/api/hooks";

import useBottomSheet from "@/hooks/useBottomSheet";

interface GoalEditProps {
  // initGoalTitle: string;
  // // initDurationValue?: unknown;
  // // initDurationType?: unknown;
  goalId: string;
}

const GoalEdit = ({
  // initDurationValue,
  // initDurationType,
  // initGoalTitle,
  goalId,
}: GoalEditProps) => {
  const router = useRouter();
  const { mutate } = useGoals();

  // const [goalTitle, setGoalTitle] = useState(initGoalTitle);
  const nullableContext = useContext(EditContext);
  const { editContents, setEditContents } = nullableContext || {};

  const { closeModal, openModal } = useModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const durationSettingBtnText =
    editContents?.durationType === "month"
      ? `개월 수 - ${editContents?.durationValue ?? " "}개월`
      : `완료 날짜 - ${editContents?.durationValue ? date2StringWithSpliter(editContents?.durationValue as Date, "-") : ""}`;

  // GoalDurationBottomSheet 관리
  const {
    checkOpened,
    checkRendered,
    closeBottomSheet,
    openBottomSheet: openGoalDurationBottomSheet,
    updateBottomSheet: updateGoalDurationBottomSheet,
  } = useBottomSheet<Parameters<typeof GoalDurationBottomSheet>[0]>();
  useEffect(() => {
    if (!openBottomSheet) {
      closeBottomSheet();
    }

    const bottomSheetInfo: Parameters<typeof openGoalDurationBottomSheet>[0] = {
      backdropProps: {
        className: "fixed inset-0 z-20 bg-neutral-700/50 ",
        onClick: () => {
          setOpenBottomSheet(false);
        },
      },
      ContentComponent: GoalDurationBottomSheet,
      hasBackdrop: true,
      bottomSheetFixerStyle: {
        bottom: 0,
      },
      contentProps: {
        setopenBottomSheet: setOpenBottomSheet,
        onEdit: async ({ type, value }) => {
          setEditContents &&
            setEditContents((prev) => ({
              ...prev,
              durationType: type,
              durationValue: value,
            }));
          // 닫기
          setOpenBottomSheet(false);
        },
      },
    };
    const isOpended = checkOpened();
    if (openBottomSheet && !isOpended) {
      openGoalDurationBottomSheet(bottomSheetInfo);
      return;
    }

    if (openBottomSheet) updateGoalDurationBottomSheet(bottomSheetInfo);

    return () => {
      if (!openBottomSheet) closeBottomSheet();
    };
  }, [openBottomSheet]);

  return (
    <>
      <main className="flex flex-col gap-6 flex-1 items-center">
        <section className="w-full">
          <p>목표</p>
          <TextField
            name=""
            isError={false}
            value={editContents?.goalTitle ?? ""}
            onChange={(e) =>
              setEditContents &&
              setEditContents((prev) => ({
                ...prev,
                goalTitle: e.target.value,
              }))
            }
          />
        </section>
        <section className="w-full h-10 inline-flex justify-start items-center gap-4">
          <div className="flex-1 flex justify-start items-center">
            <p className="justify-start text-neutral-900 text-sm font-semibold font-['Pretendard'] leading-none">
              기간 설정
            </p>
          </div>
          <button
            onClick={() => {
              setOpenBottomSheet(true);
            }}
            type="button"
            className="h-8 px-3 py-2 bg-background-assistive rounded flex justify-center items-center gap-2"
          >
            <p className="justify-start text-neutral-900 text-sm font-normal font-['Pretendard'] leading-none">
              {/* {`${initDurationType} - ${initDurationValue}`} */}
              {durationSettingBtnText}
            </p>
          </button>
        </section>
        <div className="fixed bottom-4 w-screen flex justify-center">
          <Button
            icon={
              <div className="text-status-negative w-5 h-5 inline-flex justify-center items-center">
                <TrashBin />
              </div>
            }
            type="button"
            size="s"
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              openModal(
                <ModalDeletingGoal
                  onClose={closeModal}
                  onDeleteGoal={async () => {
                    await goalApi.deleteGoal(goalId);
                    closeModal();
                    mutate();
                    router.replace("/");
                  }}
                />,
              );
            }}
          >
            <p className="text-center justify-start text-status-negative text-sm font-semibold font-['Pretendard'] leading-tight">
              목표 삭제
            </p>
          </Button>
        </div>
      </main>

      {/* <GoalDurationBottomSheet
        openBottomSheet={openBottomSheet}
        setopenBottomSheet={setOpenBottomSheet}
        onEdit={async ({ type, value }) => {
          setEditContents &&
            setEditContents((prev) => ({
              ...prev,
              durationType: type,
              durationValue: value,
            }));
          // 닫기
          setOpenBottomSheet(false);
        }}
      /> */}
    </>
  );
};
export default GoalEdit;
