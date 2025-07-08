"use client";

import { useState, useEffect } from "react";
import { useSafeRouter } from "../../hooks/useSafeRouter";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { UserProfile } from "./UserProfile";
import { PointsDisplay } from "./PointsDisplay";
import { NavigationList } from "./NavigationList";
import { GuestLoginSection } from "./GuestLoginSection";
import useAuthStore from "@/stores/useAuthStore";
import dynamic from "next/dynamic";

// 클라이언트에서만 렌더링되는 BottomTabBar (SSR 제외)
const BottomTabBar = dynamic(
  () =>
    import("@/components/shared/BottomTabBar/BottomTabBar").then((mod) => ({
      default: mod.BottomTabBar,
    })),
  { ssr: false },
);

interface MyPageProps {
  className?: string;
}

export function MyPage({ className = "" }: MyPageProps) {
  const router = useSafeRouter();
  const { isLoggedIn, login } = useAuthStore();
  const [user, setUser] = useState({
    name: "몰입한 곰돌이",
    profileImage: "/profile-default.png",
    points: 1000,
  });

  const handleLogin = () => {
    login();
  };

  const navigationItems = isLoggedIn
    ? [
        {
          label: "완료한 목표/투두 보기",
          hasIcon: true,
          onClick: () => router.push("/mypage/done"),
        },
        {
          label: "알림 설정",
          hasIcon: true,
          onClick: () => router.push("/mypage/notifications"),
        },
        {
          label: "서비스 이용약관",
          hasIcon: true,
          onClick: () => router.push("/mypage/terms"),
        },
        {
          label: "버전 정보 v1.0",
          hasIcon: false,
          onClick: () => {},
        },
      ]
    : [
        {
          label: "서비스 이용약관",
          hasIcon: true,
          onClick: () => router.push("/mypage/terms"),
        },
        {
          label: "버전 정보 v1.0",
          hasIcon: false,
          onClick: () => {},
        },
      ];

  return (
    <div className={`min-h-screen bg-Color-gray-5 flex flex-col ${className}`}>
      {/* App Bar */}
      <AppBar
        title="마이페이지"
        type="main"
        hasNotification={false}
        onNotificationClick={() => console.log("Notification clicked")}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {isLoggedIn ? (
          <>
            {/* User Information Section */}
            <div className="bg-Color-white px-4 py-5">
              <UserProfile
                name={user.name}
                profileImage={user.profileImage}
                onAddInterests={() => console.log("Add interests")}
              />
            </div>

            {/* Points Display */}
            <PointsDisplay points={user.points} />

            {/* Navigation List */}
            <NavigationList items={navigationItems} />
          </>
        ) : (
          <>
            {/* Guest Login Section */}
            <GuestLoginSection onLogin={handleLogin} />

            {/* Limited Navigation List */}
            <NavigationList items={navigationItems} />
          </>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar type="4" />

      {/* Gesture Bar */}
      {/* <div className="h-6 flex justify-center items-center">
                <div className="w-[108px] h-1 bg-Color-gray-90 rounded-full"></div>
            </div> */}
    </div>
  );
}
