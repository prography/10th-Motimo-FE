"use client";

import EditInfo from "../../../../../../components/details/EditInfo/EditInfo";
import TextField from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";
import ModalDeletingGoal from "@/components/details/Modals/ModalDeletingGoal/ModalDeletingGoal";
import GoalDurationBottomSheet from "@/components/details/BottomSheets/GoalDurationBottomSheet/GoalDurationBottomSheet";

import TrashBin from "@/public/images/Trash_Full.svg";

import { useContext, useState } from "react";
import useModal from "@/hooks/useModal";
import { EditContext } from "../../page";
import { date2StringWithSpliter } from "@/utils/date2String";

interface GoalEditProps {
  // initGoalTitle: string;
  // // initDurationValue?: unknown;
  // // initDurationType?: unknown;
}

const GoalEdit = (
  {
    // initDurationValue,
    // initDurationType,
    // initGoalTitle,
  }: GoalEditProps,
) => {
  // const [goalTitle, setGoalTitle] = useState(initGoalTitle);
  const nullableContext = useContext(EditContext);
  const { editContents, setEditContents } = nullableContext || {};

  const { closeModal, openModal } = useModal();
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const durationSettingBtnText =
    editContents?.durationType === date
      ? `개월 수 - ${editContents?.durationValue ?? " "}개월`
      : `완료 날짜 - ${editContents?.durationValue ? date2StringWithSpliter(editContents?.durationValue, "-") : ""}`;

  return (
    <>
      <main>
        <section>
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
        <section className="w-80 h-10 inline-flex justify-start items-center gap-4">
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
        <div>
          <Button
            icon={
              <div className="text-status-negative w-5 h-5 inline-flex justify-center items-center">
                <TrashBin />
              </div>
            }
            size="s"
            variant="text"
            onClick={() => {
              openModal(
                <ModalDeletingGoal
                  onClose={closeModal}
                  onDeleteGoal={async () => {
                    console.log("삭제");
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
      <GoalDurationBottomSheet
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
      />
    </>
  );
};
export default GoalEdit;
