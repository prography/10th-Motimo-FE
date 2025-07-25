"use client";

import dynamic from "next/dynamic";
import { FeedPage } from "@/components/feed";

// 클라이언트에서만 렌더링되는 BottomTabBar (SSR 제외)
const BottomTabBar = dynamic(
  () =>
    import("@/components/shared/BottomTabBar/BottomTabBar").then((mod) => ({
      default: mod.BottomTabBar,
    })),
  { ssr: false },
);

export default function FeedRoute() {
  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // TODO: Implement notification logic
  };

  return (
    <>
      <FeedPage onNotificationClick={handleNotificationClick} />

      {/* Bottom Tab Bar */}
      <BottomTabBar type="3" />
    </>
  );
}

