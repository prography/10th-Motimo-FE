"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useEffect, useState } from "react";

const MSWComponent = () => {
  const [mswReady, setMswReady] = useState(false);
  const { isGuest } = useAuthStore();

  useEffect(() => {
    if (!isGuest) return;
    const init = async () => {
      const initMsw = await import("../../mocks/index").then(
        (res) => res.initMsw,
      );
      await initMsw();
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }

    return () => {
      import("../../mocks/index").then((res) => res.closeMSW());
    };
  }, [mswReady]);

  return null;
};

export default MSWComponent;
