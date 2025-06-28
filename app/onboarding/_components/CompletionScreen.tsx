"use client";

interface CompletionScreenProps {
  goal: string;
  periodType: "months" | "date";
  monthCount: number;
  targetDate: Date | null;
  onComplete: () => void;
}

export default function CompletionScreen({
  goal,
  periodType,
  monthCount,
  targetDate,
  onComplete,
}: CompletionScreenProps) {
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
      {/* Status Bar */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="text-sm font-medium text-label-normal">9:30</div>
        <div className="flex items-center gap-4">
          <div className="w-[46px] h-[17px]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Check Icon Animation */}
        <div className="relative w-[140px] h-[140px] mb-8">
          <div className="absolute inset-0 bg-status-positive/20 rounded-full"></div>
          <div className="absolute top-[10px] left-[43.33px] w-[53.33px] h-[53.33px] bg-status-positive rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              className="text-background-alternative"
            >
              <path
                d="M2 8L8 14L22 2"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </svg>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-[97.86px] left-[39.07px] w-4 h-4 bg-orange-200 rounded-full opacity-50 blur-sm"></div>
          <div className="absolute top-[97.86px] right-[39.07px] w-4 h-4 bg-orange-200 rounded-full opacity-50 blur-sm"></div>
          
          {/* Background Pattern */}
          <div className="absolute top-[70px] left-[30px] w-20 h-15">
            <div className="relative">
              {/* Decorative circles and shapes */}
              <div className="absolute w-7 h-7 bg-background-normal/30 rounded-full"></div>
              <div className="absolute right-0 w-7 h-7 bg-background-normal/30 rounded-full"></div>
              <div className="absolute top-2 left-8 w-20 h-12 bg-background-alternative/50 rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-label-strong text-center mb-8">
          목표 설정이{"\n"}완료되었어요!
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
              <h3 className="text-base font-bold text-label-normal">목표 날짜</h3>
              <p className="text-sm font-medium text-label-strong">
                {formatPeriod()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="px-4 pb-14">
        <button
          onClick={onComplete}
          className="w-full h-14 bg-label-normal text-background-alternative rounded-full font-bold text-xl"
        >
          확인
        </button>
      </div>
    </div>
  );
} 