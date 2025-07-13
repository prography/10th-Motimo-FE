"use client";

import { useState } from "react";
import LoginScreen from "./_components/LoginScreen";
import GoalInputScreen from "./_components/GoalInputScreen";
import PeriodSelectionScreen from "./_components/PeriodSelectionScreen";
import CompletionScreen from "./_components/CompletionScreen";
import useAuthStore from "@/stores/useAuthStore";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setHasCompletedOnboarding } = useAuthStore();

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <LoginScreen onNext={nextStep} />;
      case 1:
        return <GoalInputScreen onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <PeriodSelectionScreen onNext={nextStep} onBack={prevStep} />;
      case 3:
        return (
          <CompletionScreen
            onComplete={() => {
              // Navigate to main app
              setHasCompletedOnboarding(true);
              window.location.href = "/";
            }}
          />
        );
      default:
        return <LoginScreen onNext={nextStep} />;
    }
  };

  const { hasCompletedOnboarding } = useAuthStore();
  if (hasCompletedOnboarding) {
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-background-normal">{renderStep()}</div>
  );
}
