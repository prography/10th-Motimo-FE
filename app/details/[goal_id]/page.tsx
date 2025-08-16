"use client";

import { AppBar, BottomTabBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DetailBody from "./_components/DetailsBody/DetailBody";
import { useGoalDetail } from "@/api/hooks";

export default function Details() {
  const { goal_id: goalId } = useParams<{ goal_id: string }>();
  const { data } = useGoalDetail(goalId);
  const router = useRouter();
  return (
    <>
      <div className=" min-h-screen pb-14 flex flex-col flex-1">
        <header
          // pl-4는 필요 없음. AppBar가 주고 있으므로.
          className="flex justify-between items-center pr-4 bg-background-alternative"
        >
          <AppBar
            onBackClick={() => {
              router.back();
            }}
            type="back"
            title={data?.title ?? ""}
          />
          <button className="w-12 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2">
            <Link href={`/details/edit/${goalId}`}>
              <p className="flex-1 text-center justify-center text-label-alternative text-xs font-semibold font-['SUIT_Variable'] leading-none">
                편집
              </p>
            </Link>
          </button>
        </header>
        <DetailBody goalId={goalId} />
      </div>

      <BottomTabBar className="fixed z-40 bottom-0" type="1" />
    </>
  );
}
