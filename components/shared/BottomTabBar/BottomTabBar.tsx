"use client";

import { cn } from "@/lib/utils";
import { HomeIcon } from "../../icons/HomeIcon";
import { UserIcon } from "../../icons/UserIcon";
import { ChatIcon } from "../../icons/ChatIcon";
import Link from "next/link";
import useAuthStore from "@/stores/useAuthStore";

interface BottomTabBarProps {
  type: "1" | "2" | "3" | "4";
  className?: string;
}

export const BottomTabBar = ({ type, className }: BottomTabBarProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Define the tab configuration with consistent order
  const tabs = [
    {
      id: "goal",
      label: "목표",
      icon: HomeIcon,
      activeInTypes: ["1"],
      href: "/",
    },
    {
      id: "group",
      label: "그룹",
      icon: UserIcon,
      activeInTypes: ["2"],
      href: "/group",
    },
    {
      id: "feed",
      label: "피드",
      icon: ChatIcon,
      activeInTypes: ["3"],
      href: "/feed",
    },
    {
      id: "mypage",
      label: "마이페이지",
      icon: UserIcon,
      activeInTypes: ["4"],
      href: "/mypage",
    },
  ];

  return (
    <>
      {isLoggedIn && (
        <div
          className={cn(
            "flex items-center justify-between",
            "w-[360px] h-14 bg-Color-white px-9 py-1",
            className,
          )}
        >
          {tabs.map((tab) => {
            const isActive = tab.activeInTypes.includes(type);
            const IconComponent = tab.icon;

            return (
              <Link href={tab.href} key={tab.id}>
                <div
                  key={tab.id}
                  className="flex flex-col items-center justify-center w-12 h-12"
                >
                  <div className="flex items-center justify-center w-8 h-8 mb-0">
                    <IconComponent
                      className="w-6 h-6"
                      color={isActive ? "#5D5FEF" : "#8A949E"}
                    />
                  </div>
                  <div
                    className={cn(
                      "text-[11px] leading-[1.5] tracking-[-0.01em] text-center mt-0",
                      "font-SUIT_Variable",
                      isActive
                        ? "font-semibold text-Color-gray-90"
                        : "font-medium text-Color-gray-70",
                    )}
                  >
                    {tab.label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};
