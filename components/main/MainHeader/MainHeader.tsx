"use client";
import { AppBar } from "@/components/shared";
import Banner from "@/components/shared/Banner/Banner";
import { useCheerPhrase, useMyProfile, usePoints } from "@/api/hooks";
import { ReactNode, Suspense } from "react";
import AsyncBanner from "./AsyncBanner";
import { calcLeftDay } from "@/utils/calcLeftDay";

interface MainHeaderProps {
  children: ReactNode;
  // daysOfServiceUse: number;
}
const MainHeader = ({ children }: MainHeaderProps) => {
  // const MainHeader = ({ daysOfServiceUse }: MainHeaderProps) => {
  // SWR hooks from api/hooks.ts

  const { data: cheerData } = useCheerPhrase();
  const { data: pointData } = usePoints();
  const cheerPhrase = cheerData?.cheerPhrase ?? "";
  const points = `${(pointData?.point ?? 0).toLocaleString()}P`;

  //
  // const { data } = useMyProfile();
  // const daysOfServiceUse = data?.createdAt
  //   ? calcLeftDay(new Date(), new Date(data.createdAt))
  //   : 0;

  return (
    <>
      <div
        className="flex justify-end w-full h-14" // Banner 여유 공간 확보
      >
        <div className="fixed top-0 z-20">
          <AppBar type="main" points={points} />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="w-full h-[88px] px-6 py-4 flex flex-row content-between gap-2 bg-gray-200 animate-pulse">
            <section className="flex-1 flex flex-col gap-2">
              <div className="w-full h-5 bg-gray-300"></div>
              <div className="w-full h-7 bg-gray-300"></div>
            </section>
            <div className="w-15 bg-gray-300"></div>
          </div>
        }
      >
        {/* 배너 */}
        {children}
        {/* <AsyncBanner tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`} /> */}
        {/* <Banner
        title={cheerPhrase}
        tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`}
      /> */}
      </Suspense>
    </>
  );
};

export default MainHeader;
