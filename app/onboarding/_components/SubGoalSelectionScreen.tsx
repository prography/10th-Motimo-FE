"use client";

import { useState } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import { PlusIcon } from "@/components/icons/PlusIcon";
import useModal from "@/hooks/useModal";
import ModalAddingSubGoal from "@/components/shared/Modal/ModalAddingSubGoal/ModalAddingSubGoal";
import useOnboardingStore from "@/stores/useOnboardingStore";

interface SubGoalSelectionScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SubGoalSelectionScreen({
  onNext,
  onBack,
}: SubGoalSelectionScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal, closeModal } = useModal();
  const { subGoals, addSubGoal, removeSubGoal } = useOnboardingStore();

  const handleSetupLater = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      onNext();
    } catch (error) {
      console.error('Failed to proceed:', error);
      setIsSubmitting(false);
    }
  };

  const handleAddSubGoal = () => {
    openModal(
      <ModalAddingSubGoal
        onClose={closeModal}
        onAddSubGoal={async (subGoalTitle: string) => {
          addSubGoal(subGoalTitle);
          closeModal();
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      <AppBar type="progress" progress={100} onBackClick={onBack} />
      <div className="py-[8px]" />
      
      {/* Content */}
      <div className="flex-1 px-6">
        {/* Title and Description */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-label-strong mb-2">
            세부 목표를 설정할 수 있어요.
          </h1>
          <p className="text-base font-normal text-label-alternative leading-[1.4]">
            세부 목표를 설정하지 않았다면,{"\n"}기본함에 자동으로 투두가 들어가요.
          </p>
        </div>

        {/* Add Sub-goal Card */}
        <div className="mb-6">
          <button
            onClick={handleAddSubGoal}
            disabled={isSubmitting}
            className={`w-full bg-background-normal rounded-lg p-3 shadow-sm border border-border-normal ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-background-assistive"
            }`}
          >
            <div className="flex items-center gap-1">
              <span className="flex-1 text-base font-bold text-label-normal text-left">
                세부 목표 추가하기
              </span>
              <div className="w-8 h-8 bg-label-primary rounded-full flex items-center justify-center">
                <PlusIcon className="w-5 h-5 text-background-alternative" />
              </div>
            </div>
          </button>
        </div>

        {/* Sub-goals List */}
        {subGoals.length > 0 && (
          <div className="mb-6 space-y-2">
            {subGoals.map((subGoal) => (
              <div
                key={subGoal.tmpKey}
                className="bg-background-normal border border-border-normal rounded-lg p-3 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-label-normal">
                  {subGoal.title}
                </span>
                <button
                  onClick={() => subGoal.tmpKey && removeSubGoal(subGoal.tmpKey)}
                  disabled={isSubmitting}
                  className={`text-label-alternative hover:text-label-normal ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Default Box Item */}
        <div className="mb-8">
          <div className="bg-background-normal border border-border-normal rounded-lg p-2">
            <div className="flex items-center gap-1 p-1">
              <span className="text-sm font-medium text-label-primary">
                기본함
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Later Button */}
      <div className="px-4 pb-14">
        <ButtonRound
          onClick={handleSetupLater}
          disabled={isSubmitting}
        >
          {isSubmitting ? "처리 중..." : "나중에 설정하기"}
        </ButtonRound>
      </div>
    </div>
  );
}