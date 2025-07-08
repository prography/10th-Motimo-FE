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

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  authToken: null,
  oauthCode: null,
  oauthState: null,
  oauthReturnStep: null,
  isLoggedIn: false,
  hasCompletedOnboarding: false,
  userGoal: null,
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

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
      setHasCompletedOnboarding: (status) => set({ hasCompletedOnboarding: status }),
      setUserGoal: (goal) => set({ userGoal: goal }),

      // Utility functions
      login: () => set({ isLoggedIn: true }),
      
      logout: () => set({
        accessToken: null,
        refreshToken: null,
        authToken: null,
        oauthCode: null,
        isLoggedIn: false,
      }),

      clearOauthData: () => set({
        oauthCode: null,
        oauthState: null,
        oauthReturnStep: null,
      }),

      reset: () => set(initialState),
    }),
    {
      name: "auth-storage", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist necessary fields
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        authToken: state.authToken,
        isLoggedIn: state.isLoggedIn,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        userGoal: state.userGoal,
        // Exclude temporary OAuth data from persistence
      }),
    }
  )
);

export default useAuthStore; 