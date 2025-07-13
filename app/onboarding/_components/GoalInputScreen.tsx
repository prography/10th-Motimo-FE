"use client";

import { useState } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import ToolTip from "@/components/shared/ToolTip/ToolTip";
import useAuthStore from "@/stores/useAuthStore";
import useOnboardingStore from "@/stores/useOnboardingStore";

interface GoalInputScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function GoalInputScreen({
  onNext,
  onBack,
}: GoalInputScreenProps) {
  const { goal, setGoal } = useOnboardingStore();
  const [isFocused, setIsFocused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(!goal);

  const handleGoalChange = (value: string) => {
    if (value.length <= 30) {
      setGoal(value);
      setShowTooltip(!value);
    }
  };

  const isNextEnabled = goal.length > 0;

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      <AppBar type="progress" progress={50} onBackClick={onBack} />

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        {/* Title and Description */}
        <div className="mb-[134px]">
          <h1 className="text-2xl font-bold text-label-strong mb-2">
            어떤 목표를 이루고 싶으신가요?
          </h1>
          <p className="text-base font-normal text-label-alternative leading-[1.4]">
            작은 목표도 괜찮아요.{"\n"}목표는 언제든 수정할 수 있어요.
          </p>
        </div>

        {/* Text Field */}
        <div className="relative mb-8">
          <div className="relative bg-background-alternative p-2 min-h-12">
            <div className="flex items-stretch gap-2 p-1 min-h-8">
              {isFocused && !goal && (
                <div className="w-[1px] bg-label-primary"></div>
              )}
              <input
                type="text"
                value={goal}
                onChange={(e) => handleGoalChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  !isFocused ? "목표를 한 문장으로 입력해주세요." : ""
                }
                className="flex-1 bg-transparent text-xl font-bold text-label-normal placeholder:text-label-disabled outline-none"
                maxLength={30}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-line-normal"></div>
          </div>

          {/* Tooltip */}
          {showTooltip && (
            <div className="mt-Number-16">
              <ToolTip
                content={`올해 책 100권 읽기, 체지방 감량, 포폴 완성,\n자격증 취득, 취뽀하기 등`}
              />
            </div>
          )}

          {/* Character Count Error */}
          {goal.length >= 30 && (
            <div className="mt-2 text-sm font-medium text-status-negative">
              목표는 최대 30자까지 입력이 가능합니다.
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="px-4 pb-14">
        <ButtonRound
          onClick={() => {
            if (isNextEnabled) {
              onNext();
            }
          }}
          disabled={!isNextEnabled}
        >
          다음
        </ButtonRound>
      </div>
    </div>
  );
}
