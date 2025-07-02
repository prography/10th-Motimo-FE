"use client";

import { useState, useEffect } from "react";

interface LoginScreenProps {
  onNext: () => void;
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  // OAuth code를 토큰으로 교환하는 함수
  const exchangeCodeForTokens = async (code: string) => {
    try {
      console.log('🔄 토큰 교환 API 호출 중...');

      const response = await fetch('http://motimo.kro.kr:8080/api/oauth/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키 포함
        body: JSON.stringify({
          code: code,
          redirect_uri: 'http://localhost:3000/onboarding'
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          console.log('✅ Access Token 저장됨 (API):', data.access_token);
        }

        if (data.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
          console.log('✅ Refresh Token 저장됨 (API):', data.refresh_token);
        }

        return true;
      } else {
        console.error('토큰 교환 실패:', response.status);
        return false;
      }
    } catch (error) {
      console.error('토큰 교환 오류:', error);
      return false;
    }
  };

  // OAuth 콜백 처리 (리다이렉트 방식)
  useEffect(() => {
    console.log('=== OAuth 콜백 처리 시작 ===');
    console.log('현재 URL:', window.location.href);
    console.log('현재 쿠키:', document.cookie);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const token = urlParams.get('token');
    const state = urlParams.get('state');

    console.log('URL 파라미터들:');
    console.log('- code:', code);
    console.log('- error:', error);
    console.log('- token:', token);
    console.log('- state:', state);

    // 쿠키에서 토큰 읽기 함수 (HttpOnly가 아닌 경우에만 작동)
    const getCookieValue = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    };

    // URL 파라미터에서 토큰 읽기
    const accessTokenFromUrl = urlParams.get('access_token') || urlParams.get('ACCESS_TOKEN');
    const refreshTokenFromUrl = urlParams.get('refresh_token') || urlParams.get('REFRESH_TOKEN');

    console.log('URL에서 찾은 토큰들:');
    console.log('- access_token:', accessTokenFromUrl);
    console.log('- refresh_token:', refreshTokenFromUrl);

    // 쿠키에서 토큰 읽기 (HttpOnly 쿠키는 읽을 수 없음)
    const accessTokenFromCookie = getCookieValue('access_token') || getCookieValue('ACCESS_TOKEN');
    const refreshTokenFromCookie = getCookieValue('refresh_token') || getCookieValue('REFRESH_TOKEN');

    console.log('쿠키에서 찾은 토큰들:');
    console.log('- access_token:', accessTokenFromCookie);
    console.log('- refresh_token:', refreshTokenFromCookie);

    // HttpOnly 쿠키 문제 안내
    if (!accessTokenFromCookie && !refreshTokenFromCookie && document.cookie === '') {
      console.warn('⚠️ 쿠키가 비어있거나 HttpOnly로 설정되어 JavaScript에서 접근할 수 없습니다.');
      console.warn('⚠️ 백엔드에서 토큰을 URL 파라미터로 전달하도록 수정이 필요합니다.');
    }

    // 모든 URL 파라미터 출력 (디버깅용)
    console.log('모든 URL 파라미터:');
    for (const [key, value] of urlParams.entries()) {
      console.log(`- ${key}: ${value}`);
    }

    if (error) {
      console.error('OAuth 인증 오류:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
      return;
    }

    // OAuth code가 있는 경우 백엔드에서 토큰 교환 시도
    if (code && !accessTokenFromUrl && !accessTokenFromCookie) {
      console.log('🔄 OAuth code를 사용하여 토큰 교환을 시도합니다...');

      // 비동기 함수를 즉시 실행
      (async () => {
        const success = await exchangeCodeForTokens(code);
        if (success) {
          console.log('✅ 토큰 교환 성공!');
          // 토큰 교환 성공 후 다음 단계로 진행
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("oauth_code", code);
          localStorage.removeItem("oauth_state");
          window.history.replaceState({}, document.title, window.location.pathname);
          onNext();
        } else {
          console.log('❌ 토큰 교환 실패');
          console.log('💡 백엔드에서 리다이렉트 시 토큰을 URL 파라미터로 포함시키는 방법을 고려해보세요.');
        }
      })();

      return; // useEffect 함수 종료
    }

    // 토큰이 있거나 code가 있으면 인증 성공으로 처리
    if (code || token || accessTokenFromUrl || accessTokenFromCookie) {
      console.log('인증 성공! 토큰 처리 시작...');

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

      // OAuth code 저장
      if (code) {
        localStorage.setItem("oauth_code", code);
        console.log('OAuth code 저장됨:', code);
      }

      // 기존 token 파라미터 저장
      if (token) {
        localStorage.setItem("auth_token", token);
        console.log('Auth token 저장됨:', token);
      }

      // Access Token 저장 (URL 파라미터 우선, 그 다음 쿠키)
      const accessToken = accessTokenFromUrl || accessTokenFromCookie;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        console.log('✅ Access Token 저장됨:', accessToken);
      } else {
        console.log('❌ Access Token을 찾을 수 없음');
        if (code) {
          console.log('💡 OAuth code는 있으므로 백엔드에서 토큰 교환이 필요합니다.');
        }
      }

      // Refresh Token 저장 (URL 파라미터 우선, 그 다음 쿠키)
      const refreshToken = refreshTokenFromUrl || refreshTokenFromCookie;
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
        console.log('✅ Refresh Token 저장됨:', refreshToken);
      } else {
        console.log('❌ Refresh Token을 찾을 수 없음');
        if (code) {
          console.log('💡 OAuth code는 있으므로 백엔드에서 토큰 교환이 필요합니다.');
        }
      }

      // 임시 데이터 정리
      localStorage.removeItem("oauth_state");

      // URL 파라미터 제거 (토큰 정보 포함)
      window.history.replaceState({}, document.title, window.location.pathname);

      console.log('현재 로컬스토리지 상태:');
      console.log('- isLoggedIn:', localStorage.getItem("isLoggedIn"));
      console.log('- oauth_code:', localStorage.getItem("oauth_code"));
      console.log('- auth_token:', localStorage.getItem("auth_token"));
      console.log('- access_token:', localStorage.getItem("access_token"));
      console.log('- refresh_token:', localStorage.getItem("refresh_token"));

      // 다음 단계로 진행
      onNext();
    } else {
      console.log('❌ 인증 토큰을 찾을 수 없음 - 일반 페이지 로드');
    }

    console.log('=== OAuth 콜백 처리 완료 ===');
  }, [onNext]);

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // 현재 페이지 상태 저장 (인증 후 돌아올 때 사용)
    const currentStep = "login";
    localStorage.setItem("oauth_return_step", currentStep);

    // CSRF 보호를 위한 state 파라미터 생성
    // const state = Math.random().toString(36).substring(2, 15);
    // localStorage.setItem("oauth_state", state);

    // Google OAuth 인증 페이지로 리다이렉트 (현대적인 방식)
    const redirect_uri = "http://localhost:3000/onboarding";
    window.location.href = `http://motimo.kro.kr:8080/oauth2/authorize/google?redirect_uri=${redirect_uri} `;
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