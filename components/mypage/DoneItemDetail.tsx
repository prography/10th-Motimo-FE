"use client";

import React from "react";
import { AppBar } from "../shared/AppBar/AppBar";
import { CheckIcon } from "../icons/CheckIcon";
import { useSafeRouter } from "../../hooks/useSafeRouter";
// import { useGoalDetail } from "@/api/hooks";
import {
  GoalWithSubGoalTodoRs,
  SubGoalWithTodosRs,
  TodoRs,
  TodoRsStatusEnum,
} from "@/api/generated/motimo/Api";
import Checkbox from "../shared/Checkbox/Checkbox";

interface CompletedTodo {
  id: string;
  title: string;
  completedDate: string;
  attachment?: {
    type: "image" | "file";
    url: string;
    name?: string;
  };
}

interface SubGoal {
  id: string;
  title: string;
  completedTodos: CompletedTodo[];
}

interface DoneGoalDetail {
  id: string;
  title: string;
  subGoals: SubGoal[];
}

interface DoneItemDetailProps {
  className?: string;
  goalDetail: GoalWithSubGoalTodoRs;
}

export const DoneItemDetail: React.FC<DoneItemDetailProps> = ({
  className = "",
  goalDetail,
}) => {
  const router = useSafeRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={`min-h-screen bg-Color-white flex flex-col w-[360px] ${className}`}
    >
      {/* AppBar */}
      <AppBar type="back" title={goalDetail.title} onBackClick={handleBack} />

      {/* Sub Goals List */}
      <div className="flex-1 space-y-0">
        {goalDetail.subGoals?.map((subGoal, index) => (
          <SubGoalSection key={subGoal.id} subGoal={subGoal} />
        ))}
      </div>

      {/* Gesture bar */}
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-Color-black rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

interface SubGoalSectionProps {
  subGoal: SubGoalWithTodosRs;
}

const SubGoalSection: React.FC<SubGoalSectionProps> = ({ subGoal }) => {
  return (
    <div className="bg-Color-white p-4 space-y-3">
      {/* Sub Goal Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-SUIT_Variable font-medium text-xs leading-[1.4] tracking-[-0.02em] text-Color-gray-60">
            세부목표
          </span>
        </div>
        <h3 className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.02em] text-Color-black">
          {subGoal.title}
        </h3>
      </div>

      {/* Completed Todos */}
      <div className="space-y-2">
        {subGoal.todos?.map((todo) => (
          <CompletedTodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

interface CompletedTodoItemProps {
  todo: TodoRs;
}

const CompletedTodoItem: React.FC<CompletedTodoItemProps> = ({ todo }) => {
  const checked = todo.status === TodoRsStatusEnum.COMPLETE;
  return (
    <div className="bg-Color-gray-5 rounded-lg p-3 space-y-2">
      {/* Todo Content */}
      <div className="flex flex-col space-y-2">
        {/* Checkbox and Title */}
        <div className="flex items-center gap-2 py-1">
          <div className="w-4 h-4 bg-Color-black rounded flex items-center justify-center">
            <Checkbox id="todoItem" readOnly checked={checked} />
          </div>
          <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.02em] text-Color-gray-60 flex-1">
            {todo.title}
          </span>
        </div>

        {todo.date && (
          <div className="pl-6 pb-1">
            <span className="font-SUIT_Variable font-medium text-xs leading-[1.2] tracking-[-0.02em] text-Color-gray-60">
              {todo.date}
            </span>
          </div>
        )}
      </div>

      {todo.todoResult?.fileUrl && (
        <div className="mt-2">
          {todo.todoResult.fileMimeType?.startsWith("image") ? (
            <div className="w-[116px] h-[116px] border border-Color-gray-30 rounded-lg overflow-hidden">
              <img
                src={todo.todoResult?.fileUrl}
                alt="첨부 이미지"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="bg-Color-gray-10 rounded-lg px-4 py-2 inline-block">
              <span className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.02em] text-Color-black">
                {todo.todoResult.fileName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
