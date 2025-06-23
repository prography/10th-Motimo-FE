"use client";

import useModalStore from "@/stores/useModalStore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalRenderer = () => {
  const OpenedModal = useModalStore((state) => state.Modal);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // if (!mounted || !OpenedModal) return null;
  console.log("OpendModal: ", OpenedModal);
  return mounted && OpenedModal && createPortal(OpenedModal, document.body);
};
export default ModalRenderer;
