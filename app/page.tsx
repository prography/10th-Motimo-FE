"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppBar } from "@/components/shared";
import GoalInfo from "@/components/shared/GoalInfo/GoalInfo";
import TodoList from "@/components/main/TodoList/TodoList";
import GoalTitleArea from "@/components/main/GoalTitleArea/GoalTitleArea";

import GoalMenuContainer from "@/components/main/GoalMenuContainer/GoalMenuContainer";
import Banner from "@/components/shared/Banner/Banner";
import GoalCard from "@/components/main/GoalCard/GoalCard";
import MainHeader from "@/components/main/MainHeader/MainHeader";
import { BottomTabBar } from "@/components/shared";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading
  const router = useRouter();

  useEffect(() => {
    // 더미 로그인 상태 체크 (실제로는 localStorage, 쿠키, 또는 서버 API 호출)
    const checkLoginStatus = () => {
      // 더미 상태: localStorage에서 로그인 정보 확인
      const loginStatus = localStorage.getItem("isLoggedIn");
      const hasCompletedOnboarding = localStorage.getItem(
        "hasCompletedOnboarding",
      );

      if (!loginStatus || loginStatus !== "true" || !hasCompletedOnboarding) {
        // 로그인하지 않았거나 온보딩을 완료하지 않은 경우
        router.replace("/onboarding");
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  const tmpDaysOfServiceUse = 1;

  return (
    <>
      <section className="w-full h-full">
        <div
          data-icon="false"
          data-type="main"
          className="w-full h-full relative bg-white inline-flex flex-col flex-1 justify-start  gap-1"
        >
          <MainHeader daysOfServiceUse={tmpDaysOfServiceUse} />
          {/* <div className="flex justify-end w-full">
            <AppBar type="main" />
          </div>
          <Banner
            title="목표는 멀어도 나는 계속 가는 중"
            tag="모티모와 함께 한 지 1일차"
          /> */}
          <GoalMenuContainer />
          {/* <div className="w-full flex-1 p-4 bg-background-normal inline-flex flex-col justify-start items-start gap-2 ">
            <GoalTitleArea goalTitle="6개월 안에 책 50권 읽기" />
            <GoalInfo leftDateNum={180} leftTodoNum={0} />
            <TodoList initTodoItemsInfo={[]} todoTotalLen={0} />
          </div> */}
          <GoalCard />
          <div>
            <BottomTabBar className="bottom-0 fixed z-40" type="1" />
          </div>
        </div>
      </section>
    </>
  );
}
