"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useEffect, lazy } from "react";

// import { MSWComponent } from "@/components/_mocks/MSWComponent";
const MSWComponent = lazy(() => import("@/components/_mocks/MSWComponent"));

const GuestModeHandler = () => {
  const { isGuest } = useAuthStore();

  return <>{isGuest && <MSWComponent />}</>;
};

export default GuestModeHandler;
