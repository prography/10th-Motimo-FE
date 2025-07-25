"use client";

import useToastStore from "@/stores/useToastStore";

const useToast = () => {
  const { toastInfo, updateToastInfo } = useToastStore();

  const setToast = (content: string | null) => {
    const newCreatedAt = new Date();
    updateToastInfo(content ? { content, createdAt: newCreatedAt } : null);
  };

  return {
    toastInfo,
    setToast,
  };
};
export default useToast;
