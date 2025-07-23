"use client";

import { useGoalDetail, useGoalWithSubGoalsAndTodos } from "@/api/hooks";
import { DoneItemDetail } from "@/components/mypage";
import { useParams } from "next/navigation";

export default function DoneItemDetailPage() {
  const params = useParams();
  const goalId = params.id as string;

  const { data } = useGoalWithSubGoalsAndTodos(goalId);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <DoneItemDetail goalDetail={data} />;
}

