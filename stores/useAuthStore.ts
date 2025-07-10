"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  // Auth tokens
  accessToken: string | null;
  refreshToken: string | null;
  authToken: string | null;

  // OAuth related
  oauthCode: string | null;
  oauthState: string | null;
  oauthReturnStep: string | null;

  // User state
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  userGoal: string | null;
}

interface AuthActions {
  // Token setters
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setAuthToken: (token: string | null) => void;

  // OAuth setters
  setOauthCode: (code: string | null) => void;
  setOauthState: (state: string | null) => void;
  setOauthReturnStep: (step: string | null) => void;

  // User state setters
  setIsLoggedIn: (status: boolean) => void;
  setHasCompletedOnboarding: (status: boolean) => void;
  setUserGoal: (goal: string | null) => void;

  // Utility functions
  login: () => void;
  logout: () => void;
  clearOauthData: () => void;
  reset: () => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Default initial state - persist middleware will handle loading
      accessToken: null,
      refreshToken: null,
      authToken: null,
      oauthCode: null,
      oauthState: null,
      oauthReturnStep: null,
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      userGoal: null,

      // Token setters
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setAuthToken: (token) => set({ authToken: token }),

      // OAuth setters
      setOauthCode: (code) => set({ oauthCode: code }),
      setOauthState: (state) => set({ oauthState: state }),
      setOauthReturnStep: (step) => set({ oauthReturnStep: step }),

      // User state setters
      setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      setHasCompletedOnboarding: (status) =>
        set({ hasCompletedOnboarding: status }),
      setUserGoal: (goal) => set({ userGoal: goal }),

      // Utility functions
      login: () => set({ isLoggedIn: true }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          authToken: null,
          oauthCode: null,
          isLoggedIn: false,
        }),

      clearOauthData: () =>
        set({
          oauthCode: null,
          oauthState: null,
          oauthReturnStep: null,
        }),

      reset: () =>
        set({
          accessToken: null,
          refreshToken: null,
          authToken: null,
          oauthCode: null,
          oauthState: null,
          oauthReturnStep: null,
          isLoggedIn: false,
          hasCompletedOnboarding: false,
          userGoal: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // persist할 필드만 선택
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        authToken: state.authToken,
        isLoggedIn: state.isLoggedIn,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        userGoal: state.userGoal,
        // OAuth 임시 데이터는 제외
      }),
    },
  ),
);

// 클라이언트에서 즉시 hydration 실행
if (typeof window !== "undefined") {
  useAuthStore.persist.rehydrate();
}

export default useAuthStore;
