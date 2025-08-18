"use client";

import { useState } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import OnboardingSubGoalEdit from "./OnboardingSubGoalEdit";

interface SubGoalSelectionScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SubGoalSelectionScreen({
  onNext,
  onBack,
}: SubGoalSelectionScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSetupLater = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      onNext();
    } catch (error) {
      console.error("Failed to proceed:", error);
      setIsSubmitting(false);
    }
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
            세부 목표를 설정하지 않았다면,{"\n"}기본함에 자동으로 투두가
            들어가요.
          </p>
        </div>

        {/* SubGoal Edit Component */}
        <div className="mb-8">
          <OnboardingSubGoalEdit />
        </div>
      </div>

      {/* Setup Later Button */}
      <div className="px-4 pb-14">
        <ButtonRound onClick={handleSetupLater} disabled={isSubmitting}>
          {isSubmitting ? "처리 중..." : "나중에 설정하기"}
        </ButtonRound>
      </div>
    </div>
  );
}

