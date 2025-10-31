"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import { tokens } from "@/api/service";
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: React.ReactNode;
  reissuedTokens?: tokens;
}

export default function AuthGuard({
  children,
  reissuedTokens,
}: AuthGuardProps) {
  const router = useRouter();
  const {
    isLoggedIn,
    hasCompletedOnboarding,
    setAccessToken,
    setRefreshToken,
  } = useAuthStore();

  useEffect(() => {
    // 클라이언트에서만 실행되며, persist.rehydrate()가 이미 실행됨
    if (!isLoggedIn || !hasCompletedOnboarding) {
      router.replace("/onboarding");
    }
  }, [router, isLoggedIn, hasCompletedOnboarding]);

  useEffect(() => {
    if (!reissuedTokens) return;

    setAccessToken(reissuedTokens.accessToken);
    Cookies.set("accessToken:", reissuedTokens.accessToken);

    setRefreshToken(reissuedTokens.refreshToken);
    Cookies.set("refreshToken:", reissuedTokens.refreshToken);
  }, [reissuedTokens]);

  // 인증되지 않은 경우 빈 화면 표시 (리다이렉트 중)
  if (!isLoggedIn || !hasCompletedOnboarding) {
    return null;
  }

  return <>{children}</>;
}
