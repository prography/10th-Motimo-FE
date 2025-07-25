"use client";

import { AppBar } from "@/components/shared";
import TextField from "@/components/shared/TextField/TextField";
import { date2StringWithSpliter } from "@/utils/date2String";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import GoalDurationBottomSheet from "@/components/details/BottomSheets/GoalDurationBottomSheet/GoalDurationBottomSheet";
import { goalApi } from "@/api/service";

export default function AddingGoal() {
  const router = useRouter();
  const [goalAddInfo, setGoalAddInfo] = useState<{
    goal: string;
    durationType: "month" | "date";
    durationValue: number | Date;
    subGoals: string[];
  }>({
    goal: "",
    durationType: "month",
    durationValue: 3,
    subGoals: [],
  });
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  return (
    <div className="h-screen flex flex-col items-center  ">
      <header className="bg-background-alternative">
        <AppBar
          type="back"
          title="목표 추가"
          onBackClick={() => router.back()}
        />
      </header>
      <form
        className="flex-1 flex flex-col w-full"
        id="goalAdding"
        onSubmit={async () => {
          const res = await goalApi.createGoal({
            isPeriodByMonth: goalAddInfo.durationType === "month",
            title: goalAddInfo.goal,
            dueDate:
              goalAddInfo.durationType === "month"
                ? undefined
                : date2StringWithSpliter(
                    goalAddInfo.durationValue as Date,
                    "-",
                  ),
            month:
              goalAddInfo.durationType === "month"
                ? (goalAddInfo.durationValue as number)
                : undefined,
            subGoals: goalAddInfo.subGoals.map((subGoalName) => ({
              title: subGoalName,
            })),
          });
          if (res) {
            router.back();
          }
        }}
      >
        <section className="pl-4 pr-4 pt-6 pb-6 h-auto  flex flex-col gap-[21px] bg-background-alternative">
          <div className="flex flex-col gap-1">
            <div className="self-stretch inline-flex justify-start ">
              <h3 className="justify-start text-label-strong text-sm font-bold font-['SUIT'] leading-tight">
                목표
              </h3>
              <p className="justify-start text-red-600 text-sm font-semibold font-['Pretendard'] leading-none">
                *
              </p>
            </div>
            <TextField
              value={goalAddInfo.goal}
              onChange={(e) =>
                setGoalAddInfo((prev) => ({ ...prev, goal: e.target.value }))
              }
              isError={false}
              placeholder="목표를 한 문장으로 입력해주세요."
            />
          </div>
          <div className="flex justify-between h-10  items-center  ">
            <div className="flex  items-center">
              <h3 className=" justify-start text-neutral-900 text-sm font-semibold font-['Pretendard'] leading-none">
                기간 설정
              </h3>
              <p className="justify-start text-red-600 text-sm font-semibold font-['Pretendard'] leading-none">
                *
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpenBottomSheet(true);
              }}
              className="h-8 px-3 py-2 bg-background-assistive rounded inline-flex justify-center items-center gap-2"
            >
              <p className="justify-start text-neutral-900 text-sm font-normal font-['Pretendard'] leading-none">
                {goalAddInfo.durationType === "month"
                  ? `개월 수 - ${goalAddInfo.durationValue}개월`
                  : `완료 날짜 - ${date2StringWithSpliter(goalAddInfo.durationValue as Date, "-")}`}
              </p>
            </button>
          </div>
        </section>

        <section className=" pl-4 pr-4 gap-4 flex flex-col mt-2 pt-6 flex-1 bg-background-alternative">
          <div className="flex flex-col gap-1">
            <h3 className="self-stretch justify-start text-label-strong text-sm font-semibold font-['Pretendard'] leading-none">
              세부 목표 설정
            </h3>
            <p
              className="self-stretch justify-start text-label-alternative text-sm font-normal font-['Pretendard'] leading-none"
              style={{
                // 한줄로 만들기 위해
                letterSpacing: "-1px",
              }}
            >
              세부 목표는 목표 상세페이지에서도 추가하실 수 있습니다.
            </p>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            {goalAddInfo.subGoals.map((subGoal, idx) => (
              <TextField
                key={`${idx}`}
                isError={false}
                value={subGoal}
                onChange={(e) => {
                  const newSubGoal = e.target.value;
                  const newSubGoalList = [...goalAddInfo.subGoals];
                  newSubGoalList[idx] = newSubGoal;
                  setGoalAddInfo((prev) => ({
                    ...prev,
                    subGoals: newSubGoalList,
                  }));
                }}
              />
            ))}
            <button
              onClick={() => {
                setGoalAddInfo((prev) => ({
                  ...prev,
                  subGoals: [...prev.subGoals, ""],
                }));
              }}
              type="button"
              className="self-stretch h-12 px-4 py-2 relative bg-background-normal rounded-lg inline-flex  justify-start items-center gap-2 overflow-hidden"
            >
              <div>
                <PlusSvg width={20} height={20} />
              </div>
              <p
                className="self-stretch flex items-center justify-start text-label-normal text-sm font-semibold font-['Pretendard'] leading-tight"
                style={{ lineHeight: "normal" }}
              >
                세부 목표 추가
              </p>
            </button>
          </div>
        </section>
      </form>
      <div className="fixed bottom-4 flex items-center">
        <button
          type="submit"
          form="goalAdding"
          // duration은 기본값 있으므로 무조건 값 존재
          disabled={!goalAddInfo.goal}
          className={`w-82 h-14 px-6 py-4 ${!goalAddInfo.goal ? "bg-background-disabled" : "bg-background-strong"}  rounded-[999px] inline-flex justify-center items-center gap-2 overflow-hidden`}
        >
          <p
            className={`flex-1 text-center justify-center ${!goalAddInfo.goal ? "text-label-disabled" : "text-label-inverse"}   text-xl font-bold font-['SUIT'] leading-normal`}
          >
            추가하기
          </p>
        </button>
      </div>

      <GoalDurationBottomSheet
        openBottomSheet={openBottomSheet}
        setopenBottomSheet={setOpenBottomSheet}
        onEdit={async ({ type, value }) => {
          setGoalAddInfo((prev) => ({
            ...prev,
            durationType: type,
            durationValue: value,
          }));
          // 닫기
          setOpenBottomSheet(false);
        }}
      />
    </div>
  );
}
