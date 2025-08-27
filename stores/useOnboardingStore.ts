import { create } from "zustand";

interface SubGoal {
  id: number | null;
  title: string;
  order: number;
  tmpKey?: number;
}

interface OnboardingState {
  // Goal input data
  goal: string;

  // Period selection data
  periodType: "months" | "date";
  monthCount: number;
  targetDate: Date | null;

  // Sub-goals data
  subGoals: SubGoal[];

  // Actions
  setGoal: (goal: string) => void;
  setPeriodType: (type: "months" | "date") => void;
  setMonthCount: (count: number) => void;
  setTargetDate: (date: Date | null) => void;
  setSubGoals: (subGoals: SubGoal[]) => void;
  addSubGoal: (title: string) => void;
  removeSubGoal: (tmpKey: number) => void;
  updateSubGoal: (tmpKey: number, title: string) => void;

  // Reset function
  resetOnboarding: () => void;
}

const initialState = {
  goal: "",
  periodType: "months" as const,
  monthCount: 3,
  targetDate: null,
  subGoals: [] as SubGoal[],
};

const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setGoal: (goal) => set({ goal }),
  setPeriodType: (periodType) => set({ periodType }),
  setMonthCount: (monthCount) => set({ monthCount }),
  setTargetDate: (targetDate) => set({ targetDate }),
  setSubGoals: (subGoals) => set({ subGoals }),
  addSubGoal: (title) =>
    set((state) => {
      // Prevent adding duplicate "기본함" subGoals
      if (title === "기본함" && state.subGoals.some(subGoal => subGoal.title === "기본함")) {
        return state; // Don't add if "기본함" already exists
      }
      
      return {
        subGoals: [
          ...state.subGoals,
          {
            id: null,
            title,
            order: state.subGoals.length + 1,
            tmpKey: Date.now() + Math.random(),
          },
        ],
      };
    }),
  removeSubGoal: (tmpKey) =>
    set((state) => ({
      subGoals: state.subGoals.filter((subGoal) => subGoal.tmpKey !== tmpKey),
    })),
  updateSubGoal: (tmpKey, title) =>
    set((state) => ({
      subGoals: state.subGoals.map((subGoal) =>
        subGoal.tmpKey === tmpKey ? { ...subGoal, title } : subGoal,
      ),
    })),

  resetOnboarding: () => set(initialState),
}));

export default useOnboardingStore;
