"use client";

import { HTMLAttributes, ReactNode } from "react";
import { create } from "zustand";
import { Overlay } from "vaul";

interface BottomSheetStore<TContentProps> {
  BottomSheetInfo: null | {
    ContentComponent: (params: TContentProps) => ReactNode;
    contentProps: TContentProps;
    // BackdropComponent: (params: TBackdropProps) => ReactNode;
    hasBackdrop: boolean;
    backdropProps: Parameters<typeof Overlay>[0];
    bottomSheetFixerStyle?: HTMLAttributes<HTMLDivElement>["style"];
  };
  updateBottomSheetInfo: (
    newBottomSheetInfoOrFunc:
      | BottomSheetStore<TContentProps>["BottomSheetInfo"]
      | ((
          prev: BottomSheetStore<TContentProps>["BottomSheetInfo"],
        ) => BottomSheetStore<TContentProps>["BottomSheetInfo"]),
  ) => void;
}

const useBottomSheetStore = create<BottomSheetStore<any>>((set) => ({
  BottomSheetInfo: null,
  updateBottomSheetInfo: (newBottomSheetInfoOrFunc) => {
    let newBottomSheetInfo = null;

    if (typeof newBottomSheetInfoOrFunc === "function") {
      newBottomSheetInfo = newBottomSheetInfoOrFunc(
        useBottomSheetStore.getState().BottomSheetInfo,
      );
    } else {
      newBottomSheetInfo = newBottomSheetInfoOrFunc;
    }

    set({ BottomSheetInfo: newBottomSheetInfo });
  },
}));

export default useBottomSheetStore;
export type { BottomSheetStore };
