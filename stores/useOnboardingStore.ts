import { create } from "zustand";

interface OnboardingState {
  // Goal input data
  goal: string;

  // Period selection data
  periodType: "months" | "date";
  monthCount: number;
  targetDate: Date | null;

  // Actions
  setGoal: (goal: string) => void;
  setPeriodType: (type: "months" | "date") => void;
  setMonthCount: (count: number) => void;
  setTargetDate: (date: Date | null) => void;

  // Reset function
  resetOnboarding: () => void;
}

const initialState = {
  goal: "",
  periodType: "months" as const,
  monthCount: 3,
  targetDate: null,
};

const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setGoal: (goal) => set({ goal }),
  setPeriodType: (periodType) => set({ periodType }),
  setMonthCount: (monthCount) => set({ monthCount }),
  setTargetDate: (targetDate) => set({ targetDate }),

  resetOnboarding: () => set(initialState),
}));

export default useOnboardingStore;
