"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GoogleIcon, KakaoIcon } from "@/components/icons";
import {
  API_BASE_URL,
  OAUTH_ENDPOINTS,
  FRONTEND_BASE_URL,
} from "@/lib/constants";
import MotimoLogoBlack from "@/components/shared/public/MOTIMO_LOGO_BLACK.svg";
import useAuthStore from "@/stores/useAuthStore";
import { DB_NAME } from "@/mocks/guestMode/db";

import Cookies from "js-cookie";

interface LoginScreenProps {
  onNext: () => void;
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const {
    oauthState,
    setOauthState,
    setOauthCode,
    setOauthReturnStep,
    setAccessToken,
    setRefreshToken,
    login,
    clearOauthData,
    setIsGuest,
    reset,
    setHasCompletedOnboarding,
  } = useAuthStore();

  // OAuth 콜백 처리 (URL 파라미터 방식)
  useEffect(() => {
    console.log("=== OAuth 콜백 처리 시작 ===");
    console.log("현재 URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    const token = urlParams.get("token");
    const state = urlParams.get("state");

    // URL 파라미터에서 토큰 직접 읽기
    const accessTokenFromUrl =
      urlParams.get("access_token") || urlParams.get("ACCESS_TOKEN");
    const refreshTokenFromUrl =
      urlParams.get("refresh_token") || urlParams.get("REFRESH_TOKEN");

    console.log("URL 파라미터들:");
    console.log("- code:", code);
    console.log("- error:", error);
    console.log("- token:", token);
    console.log("- state:", state);
    console.log("- access_token:", accessTokenFromUrl);
    console.log("- refresh_token:", refreshTokenFromUrl);

    // 모든 URL 파라미터 출력 (디버깅용)
    console.log("모든 URL 파라미터:");
    for (const [key, value] of urlParams.entries()) {
      console.log(`- ${key}: ${value}`);
    }

    if (error) {
      console.error("OAuth 인증 오류:", error);
      console.error("OAuth 로그인 실패");
      setIsGoogleLoading(false);
      setIsKakaoLoading(false);
      return;
    }

    // 토큰이 URL 파라미터에 있거나 code가 있으면 인증 성공으로 처리
    if (code || token || accessTokenFromUrl) {
      console.log("인증 성공! 토큰 처리 시작...");

      // State 파라미터 검증 (CSRF 보호)
      if (state && oauthState && state !== oauthState) {
        console.error("State 파라미터가 일치하지 않습니다.");
        console.error("OAuth state 파라미터 불일치");
        setIsGoogleLoading(false);
        setIsKakaoLoading(false);
        return;
      }

      // 인증 성공
      login();

      // OAuth code 저장
      if (code) {
        setOauthCode(code);
        console.log("OAuth code 저장됨:", code);
      }

      // URL 파라미터에서 토큰 저장
      if (accessTokenFromUrl) {
        setAccessToken(accessTokenFromUrl);

        Cookies.set("accessToken", accessTokenFromUrl);

        console.log("✅ Access Token 저장됨:", accessTokenFromUrl);
      }

      if (refreshTokenFromUrl) {
        setRefreshToken(refreshTokenFromUrl);
        Cookies.set("refreshToken", refreshTokenFromUrl);
        console.log("✅ Refresh Token 저장됨:", refreshTokenFromUrl);
      }

      // 임시 데이터 정리
      clearOauthData();

      // URL 파라미터 제거 (토큰 정보 포함)
      window.history.replaceState({}, document.title, window.location.pathname);

      console.log("현재 auth store 상태:");
      const authState = useAuthStore.getState();
      console.log("- isLoggedIn:", authState.isLoggedIn);
      console.log("- oauth_code:", authState.oauthCode);
      console.log("- access_token:", authState.accessToken);
      console.log("- refresh_token:", authState.refreshToken);

      // 다음 단계로 진행
      onNext();
    } else {
      console.log("❌ 인증 토큰을 찾을 수 없음 - 일반 페이지 로드");
      console.log(
        "💡 백엔드에서 리다이렉트 시 URL 파라미터로 토큰을 포함시켜야 합니다:",
      );
      console.log(
        `예: ${FRONTEND_BASE_URL}/onboarding?access_token=...&refresh_token=...`,
      );
    }

    console.log("=== OAuth 콜백 처리 완료 ===");
  }, [
    onNext,
    oauthState,
    login,
    setOauthCode,
    setAccessToken,
    setRefreshToken,
    clearOauthData,
  ]);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);

    // 현재 페이지 상태 저장 (인증 후 돌아올 때 사용)
    const currentStep = "login";
    setOauthReturnStep(currentStep);

    // CSRF 보호를 위한 state 파라미터 생성
    const state = Math.random().toString(36).substring(2, 15);
    setOauthState(state);

    // Google OAuth 인증 페이지로 리다이렉트
    const redirect_uri = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/onboarding`;
    window.location.href = `${OAUTH_ENDPOINTS.GOOGLE_AUTHORIZE}?redirect_uri=${redirect_uri}&state=${state}`;
  };

  const handleKakaoLogin = () => {
    setIsKakaoLoading(true);

    // 현재 페이지 상태 저장 (인증 후 돌아올 때 사용)
    const currentStep = "login";
    setOauthReturnStep(currentStep);

    // CSRF 보호를 위한 state 파라미터 생성
    const state = Math.random().toString(36).substring(2, 15);
    setOauthState(state);

    // Kakao OAuth 인증 페이지로 리다이렉트
    const redirect_uri = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/onboarding`;
    window.location.href = `${OAUTH_ENDPOINTS.KAKAO_AUTHORIZE}?redirect_uri=${redirect_uri}&state=${state}`;
  };

  const handleBrowse = async () => {
    // TODO: Handle browse without login
    reset();

    // 게스트모드 로그인 기록 확인
    const dbs = await indexedDB.databases();
    const hasGuestDB = dbs.find((db) => db.name === DB_NAME);
    if (hasGuestDB) setHasCompletedOnboarding(true);

    login();
    setIsGuest(true);

    if (!hasGuestDB) onNext();
  };

  return (
    <div className="min-h-screen bg-background-normal flex flex-col">
      {/* Status Bar -> just margin */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="flex items-center gap-4">
          {/* Wifi, Signal, Battery icons would go here */}
          <div className="w-[46px] h-[17px]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        <section className="mt-12">
          {/* Hero Image Section */}
          <div className="flex justify-center mt-[88px]">
            <div className="w-[148px] h-[148px] relative">
              <Image
                src="/motimo-hero-image.png"
                alt="Motimo Hero"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Brand Message Section */}
          <div className="px-4 ">
            <div className="bg-background-alternative rounded-lg p-6">
              <div className="flex flex-col items-center text-center gap-4">
                {/* Message */}
                <div>
                  <p className="text-sm font-medium text-label-normal leading-[1.4]">
                    그룹과 함께하는 목표 달성!
                  </p>
                </div>

                {/* Logo Icon */}
                <div className="flex justify-center">
                  <MotimoLogoBlack className="w-[219px] h-[36px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login Buttons Section */}
        <div className="flex flex-col gap-2 px-4 pb-8">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-background-alternative border border-line-normal rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <div className="w-6 h-6 border-2 border-label-normal border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <GoogleIcon size={24} />
            )}
            <span className="text-sm font-semibold text-label-normal">
              {isGoogleLoading ? "로그인 중..." : "Google로 시작하기"}
            </span>
          </button>

          {/* Kakao Login */}
          <button
            onClick={handleKakaoLogin}
            disabled={isKakaoLoading}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-[#FEE500] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isKakaoLoading ? (
              <div className="w-6 h-6 border-2 border-label-normal border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <KakaoIcon size={24} />
            )}
            <span className="text-sm font-semibold text-label-normal">
              {isKakaoLoading ? "로그인 중..." : "카카오로 시작하기"}
            </span>
          </button>

          {/* Browse Button */}
          <button
            onClick={handleBrowse}
            className="w-full flex items-center justify-center gap-2 py-2 px-2"
          >
            <span className="text-base font-semibold text-label-alternative">
              일단 둘러볼게요!
            </span>
          </button>
        </div>
      </div>

      {/* Gesture bar */}
      {/* <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-label-normal rounded-full"></div>
      </div> */}
    </div>
  );
}
