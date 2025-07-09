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
interface SubGoalEditProps {
  goalId: string;
}
const SubGoalEdit = ({ goalId }: SubGoalEditProps) => {
  const nullableContext = useContext(EditContext);
  const { editContents, setEditContents } = nullableContext || {};
  const { openModal, closeModal } = useModal();

  return (
    <>
      <main>
        <TodoList initTodoTotalLen={0} goalId={goalId} />
        <section>
          <Reorder.Group
            onReorder={(newOrderedSubGoals) => {
              const orderUpdated = newOrderedSubGoals as unknown as NonNullable<
                typeof editContents
              >;
              setEditContents &&
                setEditContents((prev) => ({
                  ...prev,
                  subGoals:
                    orderUpdated?.subGoals.map((subGoalInfo, idx) => ({
                      ...subGoalInfo,
                      order: idx + 1,
                    })) ?? [],
                }));
            }}
            values={editContents?.subGoals ?? []}
          >
            {(editContents?.subGoals ?? []).map((currentSubGoalInfo) => (
              <Reorder.Item
                value={currentSubGoalInfo}
                key={currentSubGoalInfo.id}
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
                        }}
                      />,
                    );
                  }}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </section>
      </main>
    </>
  );
};
export default SubGoalEdit;
