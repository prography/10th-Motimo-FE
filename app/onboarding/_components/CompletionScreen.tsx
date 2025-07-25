"use client";

import { ButtonRound } from "@/components/shared/ButtonRound/ButtonRound";
import MotiCheck from "@/components/shared/public/moti-check.svg";
import Link from "next/link";
import useOnboardingStore from "@/stores/useOnboardingStore";

interface CompletionScreenProps {
  onComplete: () => void;
}

export default function CompletionScreen({
  onComplete,
}: CompletionScreenProps) {
  const { goal, periodType, monthCount, targetDate } = useOnboardingStore();

  const formatPeriod = () => {
    if (periodType === "months") {
      return `${monthCount}개월`;
    } else if (targetDate) {
      const today = new Date();
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일 (${diffDays}일)`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Check Icon Animation */}
        <MotiCheck
          className="w-[140px] h-[140px] object-cover"
          aria-label={"moti-check"}
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-label-strong text-center mb-8 mt-Number-16 whitespace-pre-line">
          {`목표 설정이\n완료되었어요!`}
        </h1>

        {/* Goal Summary Card */}
        <div className="w-full max-w-[312px] bg-background-normal rounded-lg p-4 mb-8">
          <div className="space-y-4">
            {/* Goal */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-label-normal">목표</h3>
              <p className="text-sm font-medium text-label-strong leading-[1.4]">
                {goal || "설정한 목표가 여기에 나오게됩니다."}
              </p>
            </div>

            {/* Period */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-label-normal">
                목표 날짜
              </h3>
              <p className="text-sm font-medium text-label-strong">
                {formatPeriod()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 pb-14">
        <Link href={"/"}>
          <ButtonRound onClick={onComplete}>확인</ButtonRound>
        </Link>
      </div>
    </div>
  );
}
