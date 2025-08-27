"use client";

import { useEffect, useRef } from "react";
import useAuthStore from "@/stores/useAuthStore";
import useOnboardingStore from "@/stores/useOnboardingStore";
import { MSWComponent } from "@/components/_mocks/MSWComponent";

const GuestModeHandler = () => {
  const { isGuest, isLoggedIn } = useAuthStore();
  const { resetOnboarding } = useOnboardingStore();
  const hasCleanedUp = useRef(false);

  // Ensure MSW is stopped and guest data is cleared when transitioning out of guest mode
  useEffect(() => {
    // Only cleanup when transitioning from guest mode to authenticated mode
    if (!isGuest && isLoggedIn && !hasCleanedUp.current) {
      // Add a small delay to ensure auth state is stable
      const timeoutId = setTimeout(async () => {
        try {
          // Stop MSW worker
          const { stopMsw } = await import("../../mocks/index");
          await stopMsw();

          // Clear guest mode onboarding data
          resetOnboarding();

          hasCleanedUp.current = true;
          console.log("Guest mode cleanup completed");
        } catch (error) {
          console.log("MSW cleanup error (likely already stopped):", error);
        }
      }, 100); // Small delay to let auth state stabilize

      return () => clearTimeout(timeoutId);
    }

    // Reset cleanup flag when entering guest mode again
    if (isGuest) {
      hasCleanedUp.current = false;
    }
  }, [isGuest, isLoggedIn, resetOnboarding]);

  return <>{isGuest && <MSWComponent />}</>;
};

export default GuestModeHandler;
