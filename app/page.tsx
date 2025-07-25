"use client";

import dynamic from "next/dynamic";
import GoalMenuContainer from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import GoalCard from "@/components/main/GoalCard/GoalCard";
import MainHeader from "@/components/main/MainHeader/MainHeader";
import { BottomTabBar } from "@/components/shared/BottomTabBar/BottomTabBar";
import { useMyProfile } from "@/api/hooks";
import { calcLeftDay } from "@/utils/calcLeftDay";

// AuthGuard는 클라이언트에서만 렌더링 (localStorage 접근 필요)
const AuthGuard = dynamic(() => import("./_components/AuthGuard"), {
  ssr: false,
});

export default function Main() {
  const { data } = useMyProfile();
  const tmpDaysOfServiceUse = calcLeftDay(
    new Date(),
    new Date(data?.createdAt ?? ""),
  );

  return (
    <AuthGuard>
      <section className="w-full h-full">
        <div
          data-icon="false"
          data-type="main"
          className="w-full h-full relative bg-white inline-flex flex-col flex-1 justify-start  gap-1"
        >
          <MainHeader daysOfServiceUse={tmpDaysOfServiceUse} />
          <GoalMenuContainer />
          <GoalCard />
        </div>
      </section>
      <BottomTabBar className="fixed z-40 bottom-0" type="1" />
    </AuthGuard>
  );
}
