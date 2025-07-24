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
import { useApiQuery } from "@/api/useApiQuery";
import { useMyProfile } from "@/api/hooks";

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
  const { isLoggedIn, login, logout } = useAuthStore();
  const { data: user, isLoading, error } = useMyProfile();

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
        {
          label: "로그아웃",
          hasIcon: false,
          onClick: () => {
            logout();
            router.push("/");
          },
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
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {isLoggedIn ? (
          <>
            {/* User Information Section */}
            <div className="bg-Color-white px-4 py-5">
              <UserProfile
                name={user?.nickname ?? ""}
                profileImage={user?.profileImageUrl}
                onAddInterests={() => console.log("Add interests")}
              />
            </div>

            {/* TODO: Points Display */}
            <PointsDisplay points={0} />

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
