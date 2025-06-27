"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
  const router = useRouter();

  useEffect(() => {
    // 더미 로그인 상태 체크 (실제로는 localStorage, 쿠키, 또는 서버 API 호출)
    const checkLoginStatus = () => {
      // 더미 상태: localStorage에서 로그인 정보 확인
      const loginStatus = localStorage.getItem("isLoggedIn");
      const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
      
      if (!loginStatus || loginStatus !== "true" || !hasCompletedOnboarding) {
        // 로그인하지 않았거나 온보딩을 완료하지 않은 경우
        router.replace("/onboarding");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  // 로그인 상태 확인 중일 때 로딩 화면
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-label-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-label-alternative">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인된 사용자를 위한 메인 대시보드
  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-label-strong">MOTIMO</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("hasCompletedOnboarding");
            router.replace("/onboarding");
          }}
          className="text-sm text-label-alternative underline"
        >
          로그아웃
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-label-strong mb-4">
          환영합니다! 🎉
        </h2>
        <p className="text-label-alternative mb-8">
          온보딩이 완료되었습니다.<br />
          이곳에 메인 대시보드가 표시됩니다.
        </p>
        
        <div className="w-full max-w-[280px] space-y-4">
          <div className="p-4 bg-background-alternative rounded-lg border border-static-white">
            <h3 className="font-medium text-label-strong mb-2">설정된 목표</h3>
            <p className="text-sm text-label-alternative">
              {typeof window !== 'undefined' ? localStorage.getItem("userGoal") || "목표가 설정되지 않았습니다" : ""}
            </p>
          </div>
          
          <button
            onClick={() => {
              localStorage.removeItem("hasCompletedOnboarding");
              router.replace("/onboarding");
            }}
            className="w-full py-3 px-4 bg-background-alternative text-label-normal rounded-lg border border-static-white hover:bg-background-elevated transition-colors"
          >
            온보딩 다시 진행하기
          </button>
        </div>
      </div>
    </div>
  );
}
