"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "../shared/AppBar/AppBar";
import { CheckIcon } from "../icons/CheckIcon";

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
    goalDetail?: DoneGoalDetail;
    className?: string;
}

const defaultGoalDetail: DoneGoalDetail = {
    id: "1",
    title: "해외로 취업하자!",
    subGoals: [
        {
            id: "1",
            title: "포트폴리오 및 이력서 준비하기",
            completedTodos: [
                {
                    id: "1",
                    title: "투두 리스트 타이틀이 들어갑니다.",
                    completedDate: "2025.05.12",
                    attachment: {
                        type: "image",
                        url: "/placeholder-image.jpg",
                    },
                },
                {
                    id: "2",
                    title: "투두 리스트 타이틀이 들어갑니다.",
                    completedDate: "2025.05.12",
                    attachment: {
                        type: "file",
                        url: "/placeholder-file.pdf",
                        name: "파일명이 여기에.pdf",
                    },
                },
                {
                    id: "3",
                    title: "투두 리스트 타이틀이 들어갑니다.",
                    completedDate: "2025.05.12",
                },
            ],
        },
        {
            id: "2",
            title: "세부목표명이 여기에 들어갑니다.",
            completedTodos: [
                {
                    id: "4",
                    title: "투두 리스트 타이틀이 들어갑니다.",
                    completedDate: "2025.05.12",
                    attachment: {
                        type: "image",
                        url: "/placeholder-image.jpg",
                    },
                },
                {
                    id: "5",
                    title: "투두 리스트 타이틀이 들어갑니다.",
                    completedDate: "2025.05.12",
                },
            ],
        },
    ],
};

export const DoneItemDetail: React.FC<DoneItemDetailProps> = ({
    goalDetail = defaultGoalDetail,
    className = "",
}) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className={`min-h-screen bg-Color-white flex flex-col w-[360px] ${className}`}>
            {/* Status bar */}
            <div className="flex justify-between items-end px-6 py-2.5 h-[52px]">
                <span className="text-sm font-medium text-Color-black">9:30</span>
                <div className="flex items-center gap-4">
                    {/* Wifi, Signal, Battery icons would go here */}
                </div>
            </div>

            {/* AppBar */}
            <AppBar
                type="back"
                title={goalDetail.title}
                onBackClick={handleBack}
            />

            {/* Sub Goals List */}
            <div className="flex-1 space-y-0">
                {goalDetail.subGoals.map((subGoal, index) => (
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
    subGoal: SubGoal;
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
                <h3 className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.02em] text-Color-black text-center">
                    {subGoal.title}
                </h3>
            </div>

            {/* Completed Todos */}
            <div className="space-y-2">
                {subGoal.completedTodos.map((todo) => (
                    <CompletedTodoItem key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
};

interface CompletedTodoItemProps {
    todo: CompletedTodo;
}

const CompletedTodoItem: React.FC<CompletedTodoItemProps> = ({ todo }) => {
    return (
        <div className="bg-Color-gray-5 rounded-lg p-3 space-y-2">
            {/* Todo Content */}
            <div className="flex flex-col space-y-2">
                {/* Checkbox and Title */}
                <div className="flex items-center gap-2 py-1">
                    <div className="w-4 h-4 bg-Color-black rounded flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.02em] text-Color-gray-60 flex-1">
                        {todo.title}
                    </span>
                </div>

                {/* Date */}
                <div className="pl-6 pb-1">
                    <span className="font-SUIT_Variable font-medium text-xs leading-[1.2] tracking-[-0.02em] text-Color-gray-60">
                        {todo.completedDate}
                    </span>
                </div>
            </div>

            {/* Attachment */}
            {todo.attachment && (
                <div className="mt-2">
                    {todo.attachment.type === "image" ? (
                        <div className="w-[116px] h-[116px] border border-Color-gray-30 rounded-lg overflow-hidden">
                            <img
                                src={todo.attachment.url}
                                alt="첨부 이미지"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="bg-Color-gray-10 rounded-lg px-4 py-2 inline-block">
                            <span className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.02em] text-Color-black">
                                {todo.attachment.name}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}; 