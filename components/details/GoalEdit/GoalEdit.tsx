"use client";

import EditInfo from "../EditInfo/EditInfo";
import TextField from "@/components/shared/TextField/TextField";
import { Button } from "@/components/shared/Button/Button";

import TrashBin from "@/public/images/Trash_Full.svg";

import { useState } from "react";

interface GoalEditProps {
  initGoalTitle: string;
  initDurationValue?: unknown;
  initDurationType?: unknown;
}

const GoalEdit = ({
  initDurationValue,
  initDurationType,
  initGoalTitle,
}: GoalEditProps) => {
  const [goalTitle, setGoalTitle] = useState(initGoalTitle);
  return (
    <main>
      <EditInfo type="goal" />
      <section>
        <p>목표</p>
        <TextField
          name=""
          isError={false}
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
        />
      </section>
      <section className="w-80 h-10 inline-flex justify-start items-center gap-4">
        <div className="flex-1 flex justify-start items-center">
          <p className="justify-start text-neutral-900 text-sm font-semibold font-['Pretendard'] leading-none">
            기간 설정
          </p>
        </div>
        <button
          type="button"
          className="h-8 px-3 py-2 bg-background-assistive rounded flex justify-center items-center gap-2"
        >
          <p className="justify-start text-neutral-900 text-sm font-normal font-['Pretendard'] leading-none">
            {`${initDurationType} - ${initDurationValue}`}
          </p>
        </button>
      </section>
      <div>
        <Button
          icon={
            <div className="text-status-negative w-5 h-5 inline-flex justify-center items-center">
              <TrashBin />
            </div>
          }
          size="s"
          variant="text"
        >
          <p className="text-center justify-start text-status-negative text-sm font-semibold font-['Pretendard'] leading-tight">
            목표 삭제
          </p>
        </Button>
      </div>
    </main>
  );
};
export default GoalEdit;
