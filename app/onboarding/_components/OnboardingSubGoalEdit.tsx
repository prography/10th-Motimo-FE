"use client";
import { motion, Reorder } from "motion/react";
import { useState, useEffect, useRef } from "react";

import useModal from "@/hooks/useModal";

import SubGoalEditItem from "@/components/details/SubGoalEditItem/SubGoalEditItem";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";
import ModalDeletingSubGoal from "@/components/shared/Modal/ModalDeletingSubGoal/ModalDeletingSubGoal";
import ModalUpdatingSubGoal from "@/components/details/Modals/ModalUpdatingSubGoal/ModalUpdatingSubGoal";

import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import useToast from "@/hooks/useToast";
import useOnboardingStore from "@/stores/useOnboardingStore";

const OnboardingSubGoalEdit = () => {
  const { openModal, closeModal } = useModal();
  const { setToast } = useToast();
  const { subGoals, setSubGoals, addSubGoal } = useOnboardingStore();
  const hasInitialized = useRef(false);

  // Add default "기본함" subGoal when component mounts if it doesn't exist
  useEffect(() => {
    if (hasInitialized.current) return;
    
    const hasDefaultSubGoal = subGoals.some(subGoal => subGoal.title === "기본함");
    
    if (!hasDefaultSubGoal) {
      addSubGoal("기본함");
      hasInitialized.current = true;
    } else {
      // Remove duplicate "기본함" subGoals, keep only the first one
      const defaultSubGoals = subGoals.filter(subGoal => subGoal.title === "기본함");
      if (defaultSubGoals.length > 1) {
        const filteredSubGoals = subGoals.filter(subGoal => subGoal.title !== "기본함");
        filteredSubGoals.unshift(defaultSubGoals[0]); // Keep the first "기본함" at the beginning
        setSubGoals(filteredSubGoals);
      }
      hasInitialized.current = true;
    }
  }, [subGoals, addSubGoal, setSubGoals]);

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
                        addSubGoal(subGoal);
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
            const orderUpdated = newOrderedSubGoals as typeof subGoals;
            setSubGoals(
              orderUpdated.map((subGoalInfo, idx) => ({
                ...subGoalInfo,
                order: idx + 1,
              }))
            );
          }}
          values={subGoals}
        >
          <section className="flex flex-col gap-2">
            {subGoals.map((currentSubGoalInfo, idx) => (
              <Reorder.Item
                value={currentSubGoalInfo}
                key={
                  currentSubGoalInfo.id
                    ? `${currentSubGoalInfo.id}-${currentSubGoalInfo.title}`
                    : currentSubGoalInfo.tmpKey || currentSubGoalInfo.order
                }
              >
                <SubGoalEditItem
                  subGoalTitle={currentSubGoalInfo.title}
                  onEdit={
                    currentSubGoalInfo.title === "기본함"
                      ? undefined
                      : () => {
                          openModal(
                            <ModalUpdatingSubGoal
                              initSubGoal={currentSubGoalInfo.title}
                              onClose={closeModal}
                              onUpdateSubGoal={async (newSubGoalTitle) => {
                                const newSubGoals = subGoals.map((prevSubGoal) => {
                                  if (
                                    prevSubGoal.tmpKey === currentSubGoalInfo.tmpKey ||
                                    prevSubGoal.id === currentSubGoalInfo.id
                                  ) {
                                    return { ...prevSubGoal, title: newSubGoalTitle };
                                  }
                                  return prevSubGoal;
                                });

                                setSubGoals(newSubGoals);
                                setToast("세부 목표 텍스트 변경이 완료되었습니다.");
                              }}
                            />,
                          );
                        }
                  }
                  onDelete={
                    currentSubGoalInfo.title === "기본함"
                      ? undefined
                      : () => {
                          openModal(
                            <ModalDeletingSubGoal
                              onClose={closeModal}
                              onDeletSubGoale={async () => {
                                const newSubGoals = subGoals.filter(
                                  (prevSubGoal) =>
                                    prevSubGoal.tmpKey !== currentSubGoalInfo.tmpKey &&
                                    prevSubGoal.id !== currentSubGoalInfo.id
                                );

                                setSubGoals(newSubGoals);
                                closeModal();
                                setToast("세부 목표 삭제가 완료되었습니다.");
                              }}
                            />,
                          );
                        }
                  }
                />
              </Reorder.Item>
            ))}
          </section>
        </Reorder.Group>
      </main>
    </>
  );
};

export default OnboardingSubGoalEdit;