// API 관련 상수
export const API_BASE_URL = "http://motimo.kro.kr:8080";
// export const API_BASE_URL = "http://localhost:8080";

// OAuth 관련 상수
export const OAUTH_ENDPOINTS = {
  GOOGLE_AUTHORIZE: `${API_BASE_URL}/oauth2/authorize/google`,
  KAKAO_AUTHORIZE: `${API_BASE_URL}/oauth2/authorize/kakao`,
} as const;

// 기타 상수
export const FRONTEND_BASE_URL = "http://localhost:3000";

