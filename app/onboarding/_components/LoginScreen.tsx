"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GoogleIcon, KakaoIcon } from "@/components/icons";
import MOTIMO_LOGO_BLACK from "@/components/shared/public/MOTIMO_LOGO_BLACK.svg";
import {
  API_BASE_URL,
  OAUTH_ENDPOINTS,
  FRONTEND_BASE_URL,
} from "@/lib/constants";

interface LoginScreenProps {
  onNext: () => void;
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Service Worker 등록 및 메시지 리스너
  useEffect(() => {
    // Service Worker 등록
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker 등록 성공:", registration);

          // Service Worker가 이미 활성화되어 있으면 즉시 사용
          if (registration.active) {
            console.log("🚀 Service Worker 이미 활성화됨");
          }
        })
        .catch((error) => {
          console.error("❌ Service Worker 등록 실패:", error);
        });

      // Service Worker로부터 메시지 받기 (개선된 버전)
      const handleServiceWorkerMessage = (event: MessageEvent) => {
        console.log("📨 Service Worker로부터 메시지:", event.data);

        // 새로운 통합 토큰 메시지 처리
        if (event.data.type === "OAUTH_TOKENS_EXTRACTED") {
          const { tokens, source, url } = event.data;
          console.log("🎯 Service Worker에서 토큰 추출됨!");
          console.log("- 출처:", source);
          console.log("- URL:", url);
          console.log("- 토큰들:", tokens);

          if (tokens.access_token) {
            localStorage.setItem("access_token", tokens.access_token);
            console.log("✅ Access Token 저장됨 (SW):", tokens.access_token);
          }

          if (tokens.refresh_token) {
            localStorage.setItem("refresh_token", tokens.refresh_token);
            console.log("✅ Refresh Token 저장됨 (SW):", tokens.refresh_token);
          }

          // 토큰이 저장되면 로그인 성공 처리
          if (tokens.access_token || tokens.refresh_token) {
            localStorage.setItem("isLoggedIn", "true");
            console.log(
              "🎉 Service Worker를 통한 토큰 획득 성공! 다음 단계로 진행...",
            );
            onNext();
          }
        }

        // 기존 개별 토큰 메시지도 지원 (하위 호환성)
        if (event.data.type === "ACCESS_TOKEN") {
          localStorage.setItem("access_token", event.data.token);
          console.log("✅ Access Token 저장됨 (SW - 개별):", event.data.token);
        }

        if (event.data.type === "REFRESH_TOKEN") {
          localStorage.setItem("refresh_token", event.data.token);
          console.log("✅ Refresh Token 저장됨 (SW - 개별):", event.data.token);
        }
      };

      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage,
      );

      // 클린업 함수
      return () => {
        navigator.serviceWorker.removeEventListener(
          "message",
          handleServiceWorkerMessage,
        );
      };
    }
  }, [onNext]);

  // OAuth code를 토큰으로 교환하는 함수 (쿠키 + 헤더 방식)
  const exchangeCodeForTokens = async (code: string) => {
    try {
      console.log("🔄 토큰 교환 API 호출 중... (쿠키 + 헤더 방식)");
      console.log("💡 크로스 도메인 쿠키를 위한 백엔드 CORS 설정:");
      console.log(`
🔧 백엔드 CORS 설정 (Spring Boot):

 @CrossOrigin(
     origins = "${FRONTEND_BASE_URL}",
     allowCredentials = true,
     exposedHeaders = {"Authorization", "Refresh-Token", "Access-Token"}
 )
@GetMapping("/api/auth/google/callback")
public ResponseEntity<?> googleCallback(@RequestParam String code, HttpServletResponse response) {
    // 1. OAuth code로 토큰 획득
    String accessToken = googleOAuthService.getAccessToken(code);
    String refreshToken = googleOAuthService.getRefreshToken(code);
    
    // 2. 쿠키 설정 (크로스 도메인용)
    Cookie accessCookie = new Cookie("ACCESS_TOKEN", accessToken);
    accessCookie.setPath("/");
    accessCookie.setSecure(false); // 개발환경에서는 false, 프로덕션에서는 true
    accessCookie.setHttpOnly(false); // JavaScript에서 읽을 수 있도록 false
    accessCookie.setAttribute("SameSite", "None"); // 크로스 도메인 허용
    response.addCookie(accessCookie);
    
    Cookie refreshCookie = new Cookie("REFRESH_TOKEN", refreshToken);
    refreshCookie.setPath("/");
    refreshCookie.setSecure(false);
    refreshCookie.setHttpOnly(false);
    refreshCookie.setAttribute("SameSite", "None");
    response.addCookie(refreshCookie);
    
    // 3. 헤더에도 토큰 설정 (이중 안전장치)
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);
    headers.set("Refresh-Token", refreshToken);
    headers.set("Access-Token", accessToken);
    
    return ResponseEntity.ok().headers(headers).body(Map.of("success", true));
}
      `);

      const response = await fetch(
        `${OAUTH_ENDPOINTS.GOOGLE_CALLBACK}?code=${code}`,
        {
          method: "GET",
          credentials: "include", // 크로스 도메인 쿠키 포함
          headers: {
            Accept: "application/json",
          },
        },
      );

      console.log("📋 응답 상태:", response.status);
      console.log("📋 응답 헤더들:");

      // 모든 응답 헤더 출력
      for (let [key, value] of response.headers.entries()) {
        console.log(`${key}: ${value}`);
      }

      if (response.ok) {
        // 요청 후 쿠키 확인
        console.log("🍪 요청 후 현재 쿠키:", document.cookie);

        // 쿠키에서 토큰 읽기 (크로스 도메인 요청 후)
        const getCookieValue = (name: string): string | null => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return parts.pop()?.split(";").shift() || null;
          }
          return null;
        };

        const accessTokenFromCookie = getCookieValue("ACCESS_TOKEN");
        const refreshTokenFromCookie = getCookieValue("REFRESH_TOKEN");

        console.log("🍪 쿠키에서 읽은 토큰들:");
        console.log("- ACCESS_TOKEN:", accessTokenFromCookie);
        console.log("- REFRESH_TOKEN:", refreshTokenFromCookie);

        // 응답 헤더에서 토큰 꺼내기
        const authHeader = response.headers.get("Authorization");
        const refreshHeader = response.headers.get("Refresh-Token");
        const accessTokenHeader = response.headers.get("Access-Token");

        console.log("🔍 헤더에서 찾은 토큰들:");
        console.log("- Authorization:", authHeader);
        console.log("- Refresh-Token:", refreshHeader);
        console.log("- Access-Token:", accessTokenHeader);

        let accessToken = null;
        let refreshToken = null;

        // 토큰 우선순위: 쿠키 > 헤더
        accessToken = accessTokenFromCookie || accessTokenHeader;
        if (authHeader && authHeader.startsWith("Bearer ")) {
          accessToken = accessToken || authHeader.substring(7);
        }

        refreshToken = refreshTokenFromCookie || refreshHeader;

        // 토큰 저장
        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
          console.log("✅ Access Token 저장됨:", accessToken);
          console.log("📍 출처:", accessTokenFromCookie ? "쿠키" : "헤더");
        }

        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
          console.log("✅ Refresh Token 저장됨:", refreshToken);
          console.log("📍 출처:", refreshTokenFromCookie ? "쿠키" : "헤더");
        }

        // 응답 본문도 확인
        const responseData = await response.text();
        console.log("📄 응답 본문:", responseData);

        return !!(accessToken || refreshToken);
      } else {
        console.error("토큰 교환 실패:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("오류 내용:", errorText);
        return false;
      }
    } catch (error) {
      console.error("토큰 교환 오류:", error);
      return false;
    }
  };

  // OAuth 콜백 처리 (리다이렉트 방식)
  useEffect(() => {
    console.log("=== OAuth 콜백 처리 시작 ===");
    console.log("현재 URL:", window.location.href);
    console.log("현재 쿠키:", document.cookie);

    // postMessage 이벤트 리스너 추가 (중간 페이지에서 토큰 전달용)
    const handleMessage = (event: MessageEvent) => {
      // 보안을 위해 origin 검증
      if (event.origin !== API_BASE_URL) {
        return;
      }

      console.log("📨 postMessage로 데이터 수신:", event.data);

      if (event.data.type === "OAUTH_TOKENS") {
        const { access_token, refresh_token } = event.data;

        if (access_token) {
          localStorage.setItem("access_token", access_token);
          console.log("✅ Access Token 저장됨 (postMessage):", access_token);
        }

        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
          console.log("✅ Refresh Token 저장됨 (postMessage):", refresh_token);
        }

        localStorage.setItem("isLoggedIn", "true");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        onNext();
      }
    };

    window.addEventListener("message", handleMessage);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
    const token = urlParams.get("token");
    const state = urlParams.get("state");

    console.log("URL 파라미터들:");
    console.log("- code:", code);
    console.log("- error:", error);
    console.log("- token:", token);
    console.log("- state:", state);

    // 쿠키에서 토큰 읽기 함수 (HttpOnly가 아닌 경우에만 작동)
    const getCookieValue = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift() || null;
      }
      return null;
    };

    // URL 파라미터에서 토큰 읽기
    const accessTokenFromUrl =
      urlParams.get("access_token") || urlParams.get("ACCESS_TOKEN");
    const refreshTokenFromUrl =
      urlParams.get("refresh_token") || urlParams.get("REFRESH_TOKEN");

    console.log("URL에서 찾은 토큰들:");
    console.log("- access_token:", accessTokenFromUrl);
    console.log("- refresh_token:", refreshTokenFromUrl);

    // 쿠키에서 토큰 읽기 (HttpOnly 쿠키는 읽을 수 없음)
    const accessTokenFromCookie =
      getCookieValue("access_token") || getCookieValue("ACCESS_TOKEN");
    const refreshTokenFromCookie =
      getCookieValue("refresh_token") || getCookieValue("REFRESH_TOKEN");

    console.log("쿠키에서 찾은 토큰들:");
    console.log("- access_token:", accessTokenFromCookie);
    console.log("- refresh_token:", refreshTokenFromCookie);

    // HttpOnly 쿠키 문제 안내
    if (
      !accessTokenFromCookie &&
      !refreshTokenFromCookie &&
      document.cookie === ""
    ) {
      console.warn(
        "⚠️ 쿠키가 비어있거나 HttpOnly로 설정되어 JavaScript에서 접근할 수 없습니다.",
      );
      console.warn(
        "⚠️ 도메인이 다르므로 (motimo.kro.kr:8080 vs localhost:3000) 쿠키에 접근할 수 없습니다.",
      );
      console.warn(
        "⚠️ 백엔드에서 토큰을 URL 파라미터로 전달하거나 중간 페이지를 통한 전달이 필요합니다.",
      );
    }

    // 모든 URL 파라미터 출력 (디버깅용)
    console.log("모든 URL 파라미터:");
    for (const [key, value] of urlParams.entries()) {
      console.log(`- ${key}: ${value}`);
    }

    if (error) {
      console.error("OAuth 인증 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      setIsLoading(false);
      return;
    }

    // OAuth code가 있는 경우 백엔드에서 토큰 교환 시도
    if (code && !accessTokenFromUrl && !accessTokenFromCookie) {
      console.log("🔄 OAuth code를 사용하여 토큰 교환을 시도합니다...");
      console.log("💡 백엔드에서 다음과 같이 구현해주세요:");
      console.log(`
🔧 백엔드 구현 가이드 (Spring Boot 예시):

@GetMapping("/api/auth/google/callback")
public ResponseEntity<?> googleCallback(@RequestParam String code, HttpServletResponse response) {
    // 1. Google OAuth code를 사용하여 토큰 획득
    String accessToken = googleOAuthService.getAccessToken(code);
    String refreshToken = googleOAuthService.getRefreshToken(code);
    
    // 2. 응답 헤더에 토큰 설정
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + accessToken);
    headers.set("Refresh-Token", refreshToken);
    // 또는
    headers.set("Access-Token", accessToken);
    
         // 3. CORS 설정 (중요!)
     headers.set("Access-Control-Allow-Origin", "${FRONTEND_BASE_URL}");
     headers.set("Access-Control-Expose-Headers", "Authorization,Refresh-Token,Access-Token");
    
    return ResponseEntity.ok()
        .headers(headers)
        .body(Map.of("success", true));
}
      `);

      // 비동기 함수를 즉시 실행
      (async () => {
        // 1. Service Worker가 이미 토큰을 가져왔는지 확인
        console.log("🔄 Step 1: Service Worker 토큰 확인...");
        const swAccessToken = localStorage.getItem("access_token");
        const swRefreshToken = localStorage.getItem("refresh_token");

        if (swAccessToken || swRefreshToken) {
          console.log("✅ Service Worker가 이미 토큰을 가져왔습니다!");
          console.log("- Access Token:", swAccessToken ? "있음" : "없음");
          console.log("- Refresh Token:", swRefreshToken ? "있음" : "없음");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("oauth_code", code);
          localStorage.removeItem("oauth_state");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
          onNext();
          return;
        }

        // 2. 응답 헤더를 통한 토큰 교환 시도
        console.log("🔄 Step 2: 응답 헤더를 통한 토큰 교환 시도...");
        const headerSuccess = await exchangeCodeForTokens(code);

        if (headerSuccess) {
          console.log("✅ 응답 헤더를 통한 토큰 교환 성공!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("oauth_code", code);
          localStorage.removeItem("oauth_state");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
          onNext();
          return;
        }

        // 3. iframe을 통한 쿠키 토큰 가져오기 시도
        console.log("🔄 Step 3: iframe을 통한 쿠키 토큰 가져오기 시도...");
        const iframeSuccess = await getCookieTokensViaIframe();

        if (iframeSuccess) {
          console.log("✅ iframe을 통한 토큰 가져오기 성공!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("oauth_code", code);
          localStorage.removeItem("oauth_state");
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
          onNext();
          return;
        }

        console.log("❌ 모든 토큰 가져오기 방법 실패");
        console.log("💡 백엔드에서 다음 중 하나를 구현해주세요:");
        console.log(
          "  1. Set-Cookie 헤더로 토큰 전달 (Service Worker가 자동 처리)",
        );
        console.log("  2. 응답 헤더로 토큰 전달");
        console.log("  3. 리다이렉트 시 URL 파라미터로 토큰 포함");
        console.log("  4. /api/oauth/get-tokens 엔드포인트 구현 (iframe용)");

        // 일단 code만으로도 진행
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("oauth_code", code);
        localStorage.removeItem("oauth_state");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        onNext();
      })();

      return; // useEffect 함수 종료
    }

    // 토큰이 있거나 code가 있으면 인증 성공으로 처리
    if (code || token || accessTokenFromUrl || accessTokenFromCookie) {
      console.log("인증 성공! 토큰 처리 시작...");

      // State 파라미터 검증 (CSRF 보호)
      const savedState = localStorage.getItem("oauth_state");
      if (state && savedState && state !== savedState) {
        console.error("State 파라미터가 일치하지 않습니다.");
        alert("보안 오류가 발생했습니다. 다시 시도해주세요.");
        setIsLoading(false);
        return;
      }

      // 인증 성공
      localStorage.setItem("isLoggedIn", "true");

      // OAuth code 저장
      if (code) {
        localStorage.setItem("oauth_code", code);
        console.log("OAuth code 저장됨:", code);
      }

      // 기존 token 파라미터 저장
      if (token) {
        localStorage.setItem("auth_token", token);
        console.log("Auth token 저장됨:", token);
      }

      // Access Token 저장 (URL 파라미터 우선, 그 다음 쿠키)
      const accessToken = accessTokenFromUrl || accessTokenFromCookie;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        console.log("✅ Access Token 저장됨:", accessToken);
      } else {
        console.log("❌ Access Token을 찾을 수 없음");
        if (code) {
          console.log(
            "💡 OAuth code는 있으므로 백엔드에서 토큰 교환이 필요합니다.",
          );
        }
      }

      // Refresh Token 저장 (URL 파라미터 우선, 그 다음 쿠키)
      const refreshToken = refreshTokenFromUrl || refreshTokenFromCookie;
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
        console.log("✅ Refresh Token 저장됨:", refreshToken);
      } else {
        console.log("❌ Refresh Token을 찾을 수 없음");
        if (code) {
          console.log(
            "💡 OAuth code는 있으므로 백엔드에서 토큰 교환이 필요합니다.",
          );
        }
      }

      // 임시 데이터 정리
      localStorage.removeItem("oauth_state");

      // URL 파라미터 제거 (토큰 정보 포함)
      window.history.replaceState({}, document.title, window.location.pathname);

      console.log("현재 로컬스토리지 상태:");
      console.log("- isLoggedIn:", localStorage.getItem("isLoggedIn"));
      console.log("- oauth_code:", localStorage.getItem("oauth_code"));
      console.log("- auth_token:", localStorage.getItem("auth_token"));
      console.log("- access_token:", localStorage.getItem("access_token"));
      console.log("- refresh_token:", localStorage.getItem("refresh_token"));

      // 다음 단계로 진행
      onNext();
    } else {
      console.log("❌ 인증 토큰을 찾을 수 없음 - 일반 페이지 로드");
    }

    console.log("=== OAuth 콜백 처리 완료 ===");

    // 클린업 함수
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onNext]);

  // 쿠키 방식으로 토큰 가져오기 (iframe 사용)
  const getCookieTokensViaIframe = () => {
    return new Promise((resolve) => {
      console.log("🔄 iframe을 통한 쿠키 토큰 가져오기 시도...");

      // 백엔드에서 쿠키를 읽어서 반환하는 엔드포인트 호출
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = OAUTH_ENDPOINTS.GET_TOKENS; // 백엔드에서 구현 필요

      iframe.onload = () => {
        try {
          // iframe에서 postMessage로 토큰 전달받기
          const handleIframeMessage = (event: MessageEvent) => {
            if (event.origin !== API_BASE_URL) return;

            console.log("📨 iframe으로부터 토큰 수신:", event.data);

            if (event.data.access_token) {
              localStorage.setItem("access_token", event.data.access_token);
              console.log(
                "✅ Access Token 저장됨 (iframe):",
                event.data.access_token,
              );
            }

            if (event.data.refresh_token) {
              localStorage.setItem("refresh_token", event.data.refresh_token);
              console.log(
                "✅ Refresh Token 저장됨 (iframe):",
                event.data.refresh_token,
              );
            }

            window.removeEventListener("message", handleIframeMessage);
            document.body.removeChild(iframe);
            resolve(true);
          };

          window.addEventListener("message", handleIframeMessage);

          // 5초 후 타임아웃
          setTimeout(() => {
            window.removeEventListener("message", handleIframeMessage);
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
            resolve(false);
          }, 5000);
        } catch (error) {
          console.error("❌ iframe 토큰 가져오기 실패:", error);
          document.body.removeChild(iframe);
          resolve(false);
        }
      };

      iframe.onerror = () => {
        console.error("❌ iframe 로드 실패");
        document.body.removeChild(iframe);
        resolve(false);
      };

      document.body.appendChild(iframe);
    });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);

    // 현재 페이지 상태 저장 (인증 후 돌아올 때 사용)
    const currentStep = "login";
    localStorage.setItem("oauth_return_step", currentStep);

    // CSRF 보호를 위한 state 파라미터 생성
    // const state = Math.random().toString(36).substring(2, 15);
    // localStorage.setItem("oauth_state", state);

    // Google OAuth 인증 페이지로 리다이렉트 (기본 방식으로 복원)
    const redirect_uri = `${FRONTEND_BASE_URL}/onboarding`;
    window.location.href = `${OAUTH_ENDPOINTS.GOOGLE_AUTHORIZE}?redirect_uri=${redirect_uri}`;
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
    <div className="min-h-screen bg-background-normal flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="text-sm font-medium text-label-normal">9:30</div>
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
                  <MOTIMO_LOGO_BLACK
                    size={219}
                    className="w-[219px] h-[36px]"
                  />
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
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-background-alternative border border-line-normal rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-label-normal border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <GoogleIcon size={24} />
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
            <KakaoIcon size={24} />
            <span className="text-sm font-semibold text-label-normal">
              카카오로 시작하기
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
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-label-normal rounded-full"></div>
      </div>
    </div>
  );
}
