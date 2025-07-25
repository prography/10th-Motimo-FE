"use client";

import { create } from "zustand";

type ToastInfo = {
  content: string;
  createdAt: Date;
};

interface ModalStore {
  toastInfo: null | ToastInfo;
  updateToastInfo: (newToastInfo: ModalStore["toastInfo"]) => void;
}

const useToastStore = create<ModalStore>((set) => ({
  toastInfo: null,
  updateToastInfo: (newToastInfo) => set({ toastInfo: newToastInfo }),
}));

export default useToastStore;
