"use client";

import { useState, useEffect } from "react";

interface LoginScreenProps {
  onNext: () => void;
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  // OAuth 콜백 처리 (리다이렉트 방식)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const token = urlParams.get('token');
    const state = urlParams.get('state');

    if (error) {
      console.error('OAuth 인증 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
      return;
    }

    if (code || token) {
      // State 파라미터 검증 (CSRF 보호)
      const savedState = localStorage.getItem("oauth_state");
      if (state && savedState && state !== savedState) {
        console.error('State 파라미터가 일치하지 않습니다.');
        alert('보안 오류가 발생했습니다. 다시 시도해주세요.');
        setIsLoading(false);
        return;
      }

      // 인증 성공
      localStorage.setItem("isLoggedIn", "true");
      if (code) {
        localStorage.setItem("oauth_code", code);
      }
      if (token) {
        localStorage.setItem("auth_token", token);
      }

      // 임시 데이터 정리
      localStorage.removeItem("oauth_state");

      // URL 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);

      // 다음 단계로 진행
      onNext();
    }
  }, [onNext]);

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // 현재 페이지 상태 저장 (인증 후 돌아올 때 사용)
    const currentStep = "login";
    localStorage.setItem("oauth_return_step", currentStep);

    // CSRF 보호를 위한 state 파라미터 생성
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("oauth_state", state);

    // Google OAuth 인증 페이지로 리다이렉트 (현대적인 방식)
    window.location.href = `http://motimo.kro.kr:8080/oauth2/authorize/google?state=${state}`;
  };

  const handleKakaoLogin = () => {
    // TODO: Implement Kakao login
    localStorage.setItem("isLoggedIn", "true");
    onNext();
  };

  const handleBrowse = () => {
    // TODO: Handle browse without login
    localStorage.setItem("isLoggedIn", "true");
    onNext();
  };

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="text-sm font-medium text-label-normal">9:30</div>
        <div className="flex items-center gap-4">
          {/* Wifi, Signal, Battery icons would go here */}
          <div className="w-[46px] h-[17px]"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Image/Illustration Area */}
        <div className="h-[400px] bg-black/10 flex flex-col justify-center items-center mb-[52px]">
          <div className="text-center mb-[208px]">
            <h1 className="text-xl font-medium text-label-normal leading-[1.4] mb-14">
              MOTIMO는{"\n"}~~ 서비스입니다.
            </h1>
          </div>
          <div className="text-center">
            <p className="text-xl font-medium text-label-normal leading-[1.4]">
              지금 같은 목표를 가진 사람들과{"\n"}함께 시작해보세요.
            </p>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-2 px-4">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-background-alternative border border-line-normal rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-label-normal border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                G
              </div>
            )}
            <span className="text-sm font-semibold text-label-normal">
              {isLoading ? "로그인 중..." : "Google로 시작하기"}
            </span>
          </button>

          {/* Kakao Login */}
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-[#FEE500] rounded-lg"
          >
            <div className="w-6 h-6 bg-label-normal rounded flex items-center justify-center text-background-alternative text-xs">
              K
            </div>
            <span className="text-sm font-semibold text-label-normal">카카오로 시작하기</span>
          </button>

          {/* Browse Button */}
          <button
            onClick={handleBrowse}
            className="w-full flex items-center justify-center gap-2 py-2 px-2"
          >
            <span className="text-base font-semibold text-label-alternative">일단 둘러볼게요!</span>
          </button>
        </div>
      </div>
    </div>
  );
} 