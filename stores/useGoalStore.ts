"use client";

import { create } from "zustand";

/**
 * 어떤 Goal이 선택되었는지 전역에서 관리.
 */

interface GoalStore {
  goalId: string | null;
  updateGoalId: (newGoalId: GoalStore["goalId"]) => void;
}

const useGoalStore = create<GoalStore>((set) => ({
  goalId: null,
  updateGoalId: (newGoalId: string | null) => {
    set({ goalId: newGoalId });
  },
}));

export default useGoalStore;
