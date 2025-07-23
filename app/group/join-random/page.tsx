"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { Button } from "@/components/shared/Button/Button";
import { useEffect, useState, Suspense } from "react";
import { useGoalDetail } from "@/api/hooks";
import { api } from "@/api/service";
import { Loading } from "@/components/shared";

// Component that uses useSearchParams
function JoinRandomGroupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goalId = searchParams.get("goalId");

  // 목표 정보 가져오기
  const { data: goalDetail, isLoading } = useGoalDetail(goalId);
  const [isJoining, setIsJoining] = useState(false);

  // 기본값 설정
  const goalInfo = {
    title: goalDetail?.title || "무제",
    period: goalDetail?.dueDate?.dueDate
      ? calculatePeriod(goalDetail.dueDate.dueDate)
      : "3개월",
  };

  // 목표 기간 계산 함수
  function calculatePeriod(dueDate: string): string {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - now.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return `${diffMonths}개월`;
  }

  const handleBack = () => {
    router.back();
  };

  const handleJoinRandomGroup = async () => {
    if (!goalId) {
      console.error("Goal ID is required for joining a group");
      return;
    }

    try {
      setIsJoining(true);
      console.log("Joining random group with goalId:", goalId);

      const response = await api.그룹Api.joinRandomGroup({ goalId });
      const id = response.id;
      if (!id) {
        console.error("Failed to get group ID from response");
        return;
      }

      // 성공 시 그룹 페이지로 이동
      router.push(`/group/${id}`);
    } catch (error) {
      console.error("Failed to join random group:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // goalId가 없으면 그룹 페이지로 리다이렉트
  useEffect(() => {
    if (!goalId) {
      console.error("Goal ID is required for joining a group");
      router.push("/group");
    }
  }, [goalId, router]);

  // Show loading while goal data is being fetched
  if (isLoading) {
    return <Loading text="목표 정보를 불러오고 있어요!" size="lg" />;
  }

  if (isJoining) {
    return <Loading text="그룹 참여 중..." size="lg" />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* App Bar */}
      <AppBar title="그룹 참여" type="back" onBackClick={handleBack} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 pt-6">
        {/* Illustration */}
        <div className="relative w-[140px] h-[87px] mb-8">
          {/* Background circles with thumbs up icons */}
          <div className="absolute top-0 left-[18px] w-[52px] h-[52px] bg-Color-primary-50 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="absolute top-[32px] right-[13px] w-[52px] h-[52px] bg-Color-gray-80 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Description Text */}
        <p className="text-center text-Color-gray-80 font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] mb-8 px-4">
          선택한 목표와 목표 기간이 같은 사람들과
          <br />
          랜덤으로 매칭됩니다.
        </p>

        {/* Goal Info Card */}
        <div className="w-full max-w-[328px] bg-Color-gray-5 rounded-lg p-4 mb-12 text-center">
          <div className="space-y-4">
            {/* Selected Goal */}
            <div className="space-y-1">
              <h3 className="font-SUIT font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-gray-80">
                선택한 목표
              </h3>
              <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-90 whitespace-pre-line">
                {goalInfo.title}
              </p>
            </div>

            {/* Goal Period */}
            <div className="space-y-1">
              <h3 className="font-SUIT font-bold text-base leading-[1.2] tracking-[-0.01em] text-Color-gray-80">
                목표 기간
              </h3>
              <p className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-Color-gray-90">
                {goalInfo.period}
              </p>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <div className="w-full max-w-[328px] pb-8">
          <Button
            variant="filled"
            size="l"
            onClick={handleJoinRandomGroup}
            className="w-full"
            disabled={isLoading || !goalId || isJoining}
          >
            {isLoading
              ? "목표 정보 로딩 중..."
              : isJoining
                ? "그룹 참여 중..."
                : "그룹 랜덤 참여하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary for useSearchParams
export default function JoinRandomGroupPage() {
  return (
    <Suspense fallback={<Loading text="페이지를 불러오고 있어요!" size="lg" />}>
      <JoinRandomGroupContent />
    </Suspense>
  );
}
