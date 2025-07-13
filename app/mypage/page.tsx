"use client";

import dynamic from "next/dynamic";

// MyPage를 클라이언트에서만 렌더링 (SSR 제외)
const MyPage = dynamic(
  () => import("@/components/mypage").then((mod) => ({ default: mod.MyPage })),
  { ssr: false },
);

export default function MyPageRoute() {
  return <MyPage />;
}
