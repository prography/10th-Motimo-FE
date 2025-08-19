"use client";

import { useState, useEffect } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import OnboardingSubGoalEdit from "./OnboardingSubGoalEdit";
import useOnboardingStore from "@/stores/useOnboardingStore";
import { goalApi } from "@/api/service";
import { GoalCreateRq } from "@/api/generated/motimo/Api";

interface SubGoalSelectionScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SubGoalSelectionScreen({
  onNext,
  onBack,
}: SubGoalSelectionScreenProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { goal, periodType, monthCount, targetDate, subGoals, setSubGoals } =
    useOnboardingStore();

  // Cleanup duplicate "기본함" subGoals when this screen loads
  useEffect(() => {
    const defaultSubGoals = subGoals.filter(
      (subGoal) => subGoal.title === "기본함",
    );
    if (defaultSubGoals.length > 1) {
      const otherSubGoals = subGoals.filter(
        (subGoal) => subGoal.title !== "기본함",
      );
      setSubGoals([defaultSubGoals[0], ...otherSubGoals]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (subGoals.length > 0) {
        // Create goal with subgoals
        const goalData: GoalCreateRq = {
          title: goal,
          isPeriodByMonth: periodType === "months",
          ...(periodType === "months"
            ? { month: monthCount }
            : { dueDate: targetDate?.toISOString().split("T")[0] }),
          subGoals: subGoals.map((subGoal) => ({
            title: subGoal.title,
          })),
        };

        await goalApi.createGoal(goalData);
      }

      onNext();
    } catch (error) {
      console.error("Failed to create goal:", error);
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

      {/* Next/Setup Later Button */}
      <div className="px-4 pb-14">
        <ButtonRound onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting
            ? "처리 중..."
            : subGoals.length > 1
              ? "다음"
              : "나중에 설정하기"}
        </ButtonRound>
      </div>
    </div>
  );
}
