"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  // Auth tokens
  accessToken: string | null;
  refreshToken: string | null;

  // OAuth related
  oauthCode: string | null;
  oauthState: string | null;
  oauthReturnStep: string | null;

  // User state
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;

  // Guest
  isGuest: boolean;
}

interface AuthActions {
  // Token setters
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;

  // OAuth setters
  setOauthCode: (code: string | null) => void;
  setOauthState: (state: string | null) => void;
  setOauthReturnStep: (step: string | null) => void;

  // User state setters
  setIsLoggedIn: (status: boolean) => void;
  setHasCompletedOnboarding: (status: boolean) => void;

  // Utility functions
  login: () => void;
  logout: () => void;
  clearOauthData: () => void;
  reset: () => void;

  // Guest
  setIsGuest: (status: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Default initial state - persist middleware will handle loading
      accessToken: null,
      refreshToken: null,
      oauthCode: null,
      oauthState: null,
      oauthReturnStep: null,
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      isGuest: false,

      // Token setters
      setAccessToken: (token) => set((state) => ({ 
        accessToken: token,
        isGuest: token ? false : state.isGuest
      })),
      setRefreshToken: (token) => set({ refreshToken: token }),

      // OAuth setters
      setOauthCode: (code) => set({ oauthCode: code }),
      setOauthState: (state) => set({ oauthState: state }),
      setOauthReturnStep: (step) => set({ oauthReturnStep: step }),

      // User state setters
      setIsLoggedIn: (status) => set((state) => ({ 
        isLoggedIn: status, 
        isGuest: status ? false : state.isGuest 
      })),
      setHasCompletedOnboarding: (status) =>
        set({ hasCompletedOnboarding: status }),

      // Utility functions
      login: () => set({ isLoggedIn: true, isGuest: false }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          oauthCode: null,
          oauthState: null,
          oauthReturnStep: null,
          isLoggedIn: false,
          hasCompletedOnboarding: false,
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
          oauthCode: null,
          oauthState: null,
          oauthReturnStep: null,
          isLoggedIn: false,
          hasCompletedOnboarding: false,
          // guest
          isGuest: false,
        }),

      // Guest
      setIsGuest: (newVal) => set({ isGuest: newVal }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // persist할 필드만 선택
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        // OAuth 임시 데이터는 제외

        // Guest
        isGuest: state.isGuest,
      }),
    },
  ),
);

// 클라이언트에서 즉시 hydration 실행
if (typeof window !== "undefined") {
  useAuthStore.persist.rehydrate();
}

export default useAuthStore;
