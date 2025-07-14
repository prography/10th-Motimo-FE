"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isLoggedIn, hasCompletedOnboarding } = useAuthStore();

  useEffect(() => {
    // 클라이언트에서만 실행되며, persist.rehydrate()가 이미 실행됨
    if (!isLoggedIn || !hasCompletedOnboarding) {
      router.replace("/onboarding");
    }
  }, [router, isLoggedIn, hasCompletedOnboarding]);

  // 인증되지 않은 경우 빈 화면 표시 (리다이렉트 중)
  if (!isLoggedIn || !hasCompletedOnboarding) {
    return null;
  }

  return <>{children}</>;
}
