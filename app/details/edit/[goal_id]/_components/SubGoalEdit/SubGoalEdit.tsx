"use client";
import { motion, Reorder } from "motion/react";
import { useState } from "react";

import useModal from "@/hooks/useModal";

import EditInfo from "../../../../../../components/details/EditInfo/EditInfo";
import TodoList from "@/components/main/TodoList/TodoList";
import SubGoalEditItem from "@/components/details/SubGoalEditItem/SubGoalEditItem";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";
import ModalDeletingSubGoal from "@/components/shared/Modal/ModalDeletingSubGoal/ModalDeletingSubGoal";

const SubGoalEdit = () => {
  const subgoalsInfo = [];
  const [subGoalOrder, setSubGoalOrder] = useState(
    subgoalsInfo.map((_, idx) => idx),
  );
  const { openModal, closeModal } = useModal();

  return (
    <>
      <main>
        <TodoList initTodoTotalLen={0} />
        <section>
          <Reorder.Group onReorder={setSubGoalOrder} values={subGoalOrder}>
            {subgoalsInfo.map((subGoal, idx) => (
              <>
                <Reorder.Item value={idx}>
                  <SubGoalEditItem
                    onEdit={() => {
                      openModal(
                        <ModalAddingSubGoal
                          onClose={closeModal}
                          onAddSubGoal={async () => {
                            console.log("fetch함수");
                          }}
                        />,
                      );
                    }}
                    onDelete={() => {
                      openModal(
                        <ModalDeletingSubGoal
                          onClose={closeModal}
                          onDeletSubGoale={async () => {
                            console.log("fetch 함수");
                          }}
                        />,
                      );
                    }}
                  />
                </Reorder.Item>
              </>
            ))}
          </Reorder.Group>
        </section>
      </main>
    </>
  );
};
export default SubGoalEdit;
