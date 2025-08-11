"use client";

import React from "react";
import { useSafeRouter } from "../../hooks/useSafeRouter";
import { AppBar } from "../shared/AppBar/AppBar";
import { useCompletedGoals, useGoals } from "@/api/hooks";
import { CompletedGoalItemRs, GoalItemRs } from "@/api/generated/motimo/Api";

interface DoneItemsProps {
  goals?: CompletedGoalItemRs[];
  className?: string;
}

export const DoneItems: React.FC<DoneItemsProps> = ({ className = "" }) => {
  const router = useSafeRouter();
  const { data: { goals } = {} } = useCompletedGoals();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`min-h-screen bg-Color-white flex flex-col w-[360px] ${className}`}
    >
      {/* AppBar */}
      <AppBar
        type="back"
        title="완료한 목표/투두 보기"
        onBackClick={handleBack}
      />

      {/* Goals List */}
      <div className="flex-1 p-4 space-y-4">
        {goals && goals.length > 0 ? (
          goals.map((goal) => <DoneGoalCard key={goal.id} goal={goal} />)
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Gesture bar */}
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-Color-black rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

interface DoneGoalCardProps {
  goal: CompletedGoalItemRs;
}

const DoneGoalCard: React.FC<DoneGoalCardProps> = ({ goal }) => {
  const router = useSafeRouter();

  const handleClick = () => {
    router.push(`/mypage/done/${goal.id}`);
  };

  return (
    <div
      className="bg-Color-white border border-Color-gray-30 rounded-lg p-4 space-y-3 cursor-pointer hover:bg-Color-gray-5 transition-colors"
      onClick={handleClick}
    >
      {/* Goal Title */}
      <h3 className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.02em] text-Color-black">
        {goal.title}
      </h3>

      {/* Goal Details */}
      <div className="space-y-1">
        {/* Period */}
        <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.02em] text-Color-gray-70">
          목표 기간 : {goal.dueDate?.dueDate}
        </p>

        {/* Statistics */}
        <div className="flex items-center gap-1">
          <span className="flex-1 font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.02em] text-Color-gray-70">
            총 투두 : {goal.todoCount}개
          </span>
          <span className="flex-1 font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.02em] text-Color-gray-70">
            총 기록 : {goal.todoResultCount}개
          </span>
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-Color-gray-5 rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 8V16L20 20"
              stroke="#8A949E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="12" stroke="#8A949E" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <h3 className="font-SUIT_Variable font-bold text-base text-Color-black mb-2">
        완료한 목표가 없습니다
      </h3>
      <p className="font-SUIT_Variable font-medium text-sm text-Color-gray-70">
        목표를 완료하면 이곳에서 확인할 수 있습니다
      </p>
    </div>
  );
};
