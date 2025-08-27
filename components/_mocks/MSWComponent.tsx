"use client";

import { useEffect, useRef } from "react";

export const MSWComponent = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const init = async () => {
      const { initMsw } = await import("../../mocks/index");
      await initMsw();
      hasInitialized.current = true;
    };

    init();

    // Cleanup is handled by GuestModeHandler to avoid duplicate stops
  }, []);

  return null;
};

// export default MSWComponent;
