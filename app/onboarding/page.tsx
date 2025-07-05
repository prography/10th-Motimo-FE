"use client";

import { useState } from "react";
import LoginScreen from "./_components/LoginScreen";
import GoalInputScreen from "./_components/GoalInputScreen";
import PeriodSelectionScreen from "./_components/PeriodSelectionScreen";
import CompletionScreen from "./_components/CompletionScreen";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    goal: "",
    periodType: "months" as "months" | "date",
    monthCount: 3,
    targetDate: null as Date | null,
  });

  const updateOnboardingData = (data: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LoginScreen onNext={nextStep} />;
      case 1:
        return (
          <GoalInputScreen
            goal={onboardingData.goal}
            onGoalChange={(goal: string) => updateOnboardingData({ goal })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <PeriodSelectionScreen
            periodType={onboardingData.periodType}
            monthCount={onboardingData.monthCount}
            targetDate={onboardingData.targetDate}
            onPeriodTypeChange={(periodType: "months" | "date") => updateOnboardingData({ periodType })}
            onMonthCountChange={(monthCount: number) => updateOnboardingData({ monthCount })}
            onTargetDateChange={(targetDate: Date | null) => updateOnboardingData({ targetDate })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <CompletionScreen
            goal={onboardingData.goal}
            periodType={onboardingData.periodType}
            monthCount={onboardingData.monthCount}
            targetDate={onboardingData.targetDate}
            onComplete={() => {
              // Navigate to main app
              window.location.href = "/";
            }}
          />
        );
      default:
        return <LoginScreen onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-normal">
      {renderStep()}
    </div>
  );
} 