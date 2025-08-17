"use client";

import { HTMLAttributes, ReactNode } from "react";
import { create } from "zustand";
import { Overlay } from "vaul";

interface BottomSheetStore<TContentProps> {
  BottomSheetInfoHistory: {
    id: string;
    ContentComponent: (params: TContentProps) => ReactNode;
    contentProps: TContentProps;
    hasBackdrop: boolean;
    backdropProps: Parameters<typeof Overlay>[0];
    bottomSheetFixerStyle?: HTMLAttributes<HTMLDivElement>["style"];
  }[];
  updateBottomSheetInfoHistory: (
    newBottomSheetInfoOrFunc:
      | BottomSheetStore<TContentProps>["BottomSheetInfoHistory"]
      | ((
          prev: BottomSheetStore<TContentProps>["BottomSheetInfoHistory"],
        ) => BottomSheetStore<TContentProps>["BottomSheetInfoHistory"]),
  ) => void;
}

const useBottomSheetStore = create<BottomSheetStore<any>>((set) => ({
  BottomSheetInfoHistory: [],
  updateBottomSheetInfoHistory: (newBottomSheetInfoHistoryOrFunc) => {
    if (typeof newBottomSheetInfoHistoryOrFunc === "function") {
      const prev = useBottomSheetStore.getState().BottomSheetInfoHistory;
      const newHistory = newBottomSheetInfoHistoryOrFunc(prev);
      set({ BottomSheetInfoHistory: newHistory });
      return;
    }

    set({ BottomSheetInfoHistory: newBottomSheetInfoHistoryOrFunc });
  },
}));

export default useBottomSheetStore;
export type { BottomSheetStore };
