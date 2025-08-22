"use client";

import useAuthStore from "@/stores/useAuthStore";
import { MSWComponent } from "@/components/_mocks/MSWComponent";
const GuestModeHandler = () => {
  const { isGuest } = useAuthStore();
  return <>{isGuest && <MSWComponent />}</>;
};

export default GuestModeHandler;
