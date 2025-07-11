"use client";
import { AppBar } from "@/components/shared";
import Banner from "@/components/shared/Banner/Banner";
import { useCheerPhrase, usePoints } from "@/api/hooks";

interface MainHeaderProps {
  daysOfServiceUse: number;
}
const MainHeader = ({ daysOfServiceUse }: MainHeaderProps) => {
  // SWR hooks from api/hooks.ts
  const { data: cheerData } = useCheerPhrase();
  const { data: pointData } = usePoints();
  const cheerPhrase = cheerData?.cheerPhrase ?? "";
  const points = `${(pointData?.point ?? 0).toLocaleString()}P`;

  return (
    <>
      <div
        className="flex justify-end w-full h-14" // Banner 여유 공간 확보
      >
        <div className="fixed top-0 z-20">
          <AppBar type="main" points={points} />
        </div>
      </div>
      <Banner
        title={cheerPhrase}
        tag={`모티모와 함께 한 지 ${daysOfServiceUse}일차`}
      />
    </>
  );
};

export default MainHeader;
