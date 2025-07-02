import { TodoInfoForSubmission } from "@/components/shared/BottomSheets/TodoBottomSheet/TodoBottomSheet";
import { create } from "zustand";

interface ActiveTodoBottomSheetStore {
  isActive: boolean;
  initContent?: TodoInfoForSubmission;
  setIsActive: (newState: boolean, initContent?: TodoInfoForSubmission) => void;
}

const useActiveTodoBottomSheet = create<ActiveTodoBottomSheetStore>((set) => ({
  isActive: false,
  initContent: undefined,
  setIsActive: (newState, initContent = undefined) =>
    set({
      isActive: newState,
      initContent: initContent,
    }),
}));

export default useActiveTodoBottomSheet;
