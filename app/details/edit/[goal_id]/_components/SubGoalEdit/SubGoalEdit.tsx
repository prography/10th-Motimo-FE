"use client";
import { motion, Reorder } from "motion/react";
import { useContext, useState } from "react";

import useModal from "@/hooks/useModal";

import EditInfo from "../../../../../../components/details/EditInfo/EditInfo";
import TodoList from "@/components/main/TodoList/TodoList";
import SubGoalEditItem from "@/components/details/SubGoalEditItem/SubGoalEditItem";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";
import ModalDeletingSubGoal from "@/components/shared/Modal/ModalDeletingSubGoal/ModalDeletingSubGoal";
import { EditContext } from "../EditBody/EditBody";
import ModalUpdatingSubGoal from "@/components/details/Modals/ModalUpdatingSubGoal/ModalUpdatingSubGoal";

import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import useToast from "@/hooks/useToast";

interface SubGoalEditProps {
  goalId: string;
}
const SubGoalEdit = ({ goalId }: SubGoalEditProps) => {
  const nullableContext = useContext(EditContext);
  const { editContents, setEditContents } = nullableContext || {};
  const { openModal, closeModal } = useModal();
  const { setToast } = useToast();

  return (
    <>
      <main className="flex flex-col gap-2">
        <>
          <div
            data-type="type5"
            className="w-full p-3 bg-white rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-center gap-2 overflow-hidden"
          >
            <div className="self-stretch h-8 inline-flex justify-start items-center gap-1">
              <div className="flex-1 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-snug">
                세부 목표를 추가해주세요.
              </div>
              <button
                onClick={() => {
                  openModal(
                    <ModalAddingSubGoal
                      onClose={() => closeModal()}
                      onAddSubGoal={async (subGoal: string) => {
                        // 동기적으로 처리
                        setEditContents &&
                          setEditContents((prev) => ({
                            ...prev,
                            subGoals: [
                              ...prev.subGoals,
                              {
                                id: null,
                                order: (editContents?.subGoals.length ?? 0) + 1,
                                title: subGoal,
                                tmpKey: new Date().getTime(),
                              },
                            ],
                          }));
                        closeModal();
                      }}
                    />,
                  );
                }}
                type="button"
                className="w-8 h-8 p-1.5 bg-background-primary rounded-[999px] flex justify-center items-center gap-2"
              >
                <div className="w-5 h-5 relative overflow-hidden text-white">
                  <PlusSvg width={20} height={20} />
                </div>
              </button>
            </div>
          </div>
        </>
        <Reorder.Group
          onReorder={(newOrderedSubGoals) => {
            const orderUpdated = newOrderedSubGoals as unknown as NonNullable<
              typeof editContents
            >["subGoals"];
            setEditContents &&
              setEditContents((prev) => ({
                ...prev,
                subGoals:
                  orderUpdated.map((subGoalInfo, idx) => ({
                    ...subGoalInfo,
                    // order: idx + 1,
                  })) ?? [],
              }));
          }}
          values={editContents?.subGoals ?? []}
        >
          <section className="flex flex-col gap-2">
            {(editContents?.subGoals ?? []).map((currentSubGoalInfo, idx) => (
              <Reorder.Item
                value={currentSubGoalInfo}
                key={
                  currentSubGoalInfo.id
                    ? `${currentSubGoalInfo.id}-${currentSubGoalInfo.title}`
                    : currentSubGoalInfo.order
                }
              >
                <SubGoalEditItem
                  subGoalTitle={currentSubGoalInfo.title}
                  onEdit={() => {
                    openModal(
                      <ModalUpdatingSubGoal
                        initSubGoal={currentSubGoalInfo.title}
                        onClose={closeModal}
                        onUpdateSubGoal={async (newSubGoalTitle) => {
                          // 비동기 안쓰긴 함.

                          // 이름 바뀐 부분 수정해 새로 만들기
                          const newSubGoals = (
                            editContents?.subGoals ?? []
                          ).map((prevSubGoal) => {
                            if (prevSubGoal.id === currentSubGoalInfo.id) {
                              return { ...prevSubGoal, title: newSubGoalTitle };
                            }
                            return prevSubGoal;
                          });

                          setEditContents &&
                            setEditContents((prev) => ({
                              ...prev,
                              subGoals: newSubGoals,
                            }));

                          setToast("세부 목표 텍스트 변경이 완료되었습니다.");
                        }}
                      />,
                    );
                  }}
                  onDelete={() => {
                    openModal(
                      <ModalDeletingSubGoal
                        onClose={closeModal}
                        onDeletSubGoale={async () => {
                          // 비동기 필요 없긴 함.

                          const newSubGoals =
                            editContents?.subGoals.filter(
                              (prevSubGoal) =>
                                prevSubGoal.id !== currentSubGoalInfo.id,
                            ) ?? [];

                          setEditContents &&
                            setEditContents((prev) => ({
                              ...prev,
                              subGoals: newSubGoals,
                            }));
                          closeModal();
                          setToast("세부 목표가 삭제되었습니다.");
                        }}
                      />,
                    );
                  }}
                />
              </Reorder.Item>
            ))}
          </section>
        </Reorder.Group>
      </main>
    </>
  );
};
export default SubGoalEdit;
