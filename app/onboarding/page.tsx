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
  const [hasHydrated, setHasHydrated] = useState(false);
  const { setHasCompletedOnboarding, isLoggedIn, hasCompletedOnboarding } =
    useAuthStore();
  
  // 클라이언트 사이드에서만 hydration 체크
  useEffect(() => {
    // 짧은 지연 후 hydration 완료로 간주 
    const timer = setTimeout(() => {
      setHasHydrated(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  console.log("hasHydrated:", hasHydrated);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("hasCompletedOnboarding:", hasCompletedOnboarding);

  // hasCompletedOnboarding이 true면 즉시 redirect (hydration 후에만)
  useEffect(() => {
    if (hasHydrated && hasCompletedOnboarding) {
      router.replace("/");
      return;
    }
  }, [hasHydrated, hasCompletedOnboarding, router]);

  // 로그인된 상태에서만 goals를 가져옴
  const { data: { goals } = {}, isLoading } = useGoals();

  useEffect(() => {
    if (hasHydrated && isLoggedIn && goals && goals.length > 0) {
      setHasCompletedOnboarding(true);
      router.replace("/");
    }
  }, [hasHydrated, isLoggedIn, goals, setHasCompletedOnboarding, router]);

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

  // hydration이 완료되지 않았거나 로그인된 상태에서 goals 로딩 중이면 스피너 표시
  if (!hasHydrated || (isLoggedIn && isLoading)) {
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
