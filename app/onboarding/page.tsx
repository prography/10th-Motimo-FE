"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "./_components/LoginScreen";
import GoalInputScreen from "./_components/GoalInputScreen";
import PeriodSelectionScreen from "./_components/PeriodSelectionScreen";
import CompletionScreen from "./_components/CompletionScreen";
import useAuthStore from "@/stores/useAuthStore";
import { useGoals } from "@/api/hooks";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { setHasCompletedOnboarding, isLoggedIn, hasCompletedOnboarding } =
    useAuthStore();

  // hasCompletedOnboarding이 true면 즉시 redirect
  useEffect(() => {
    if (hasCompletedOnboarding) {
      router.replace("/");
      return;
    }
  }, [hasCompletedOnboarding, router]);

  // 로그인된 상태에서만 goals를 가져옴
  const { data: { goals } = {}, isLoading } = useGoals();

  useEffect(() => {
    if (isLoggedIn && goals && goals.length > 0) {
      setHasCompletedOnboarding(true);
      router.replace("/");
    }
  }, [isLoggedIn, goals, setHasCompletedOnboarding, router]);

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
              router.replace("/");
            }}
          />
        );
      default:
        return <LoginScreen onNext={nextStep} />;
    }
  };

  if (isLoggedIn && isLoading) {
    return (
      <div className="min-h-screen bg-background-normal flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-normal">{renderStep()}</div>
  );
}
