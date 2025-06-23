import { ReactElement, ReactNode, ReactPortal } from "react";
import { create } from "zustand";

interface ModalStore {
  Modal: null | ReactNode;
  updateModal: (newModal: ModalStore["Modal"]) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  Modal: null,
  updateModal: (newModal) => set({ Modal: newModal }),
}));

export default useModalStore;
