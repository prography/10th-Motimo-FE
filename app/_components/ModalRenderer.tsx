"use client";

import useModalStore from "@/stores/useModalStore";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalRenderer = () => {
  const OpenedModal = useModalStore((state) => state.Modal);
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서 createPoratl이 적용되도록..
  // document는 클라이언트에서만 잡히므로.
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && OpenedModal && createPortal(OpenedModal, document.body);
};
export default ModalRenderer;
