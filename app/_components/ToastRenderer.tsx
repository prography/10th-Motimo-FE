"use client";

import { Toast } from "@/components/shared";
import useToast from "@/hooks/useToast";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const ToastRenderer = () => {
  const { toastInfo, setToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [ToastRendered, setToastRendered] = useState<ReactNode>(null);

  // 클라이언트에서 createPoratl이 적용되도록..
  // document는 클라이언트에서만 잡히므로.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const realToast = (
      <>
        <AnimatePresence initial={true}>
          {toastInfo?.content && (
            <motion.div
              key={toastInfo.createdAt.getTime()}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              // animate: 컴포넌트가 마운트된 후 도달할 상태
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // exit: 컴포넌트가 언마운트될 때의 종료 상태
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              // transition: 애니메이션의 속도 및 타이밍
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full   flex justify-center"
            >
              <Toast
                className=" fixed bottom-[74px] z-50"
                text={toastInfo.content}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
    setToastRendered(realToast);

    const timer = setTimeout(() => {
      setToast(null);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [toastInfo]);

  return (
    <>{mounted && document && createPortal(ToastRendered, document.body)}</>
  );
};

export default ToastRenderer;
