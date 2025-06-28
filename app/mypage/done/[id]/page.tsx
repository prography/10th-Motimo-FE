"use client";

import { DoneItemDetail } from "@/components/mypage";
import { useParams } from "next/navigation";

export default function DoneItemDetailPage() {
    const params = useParams();
    const goalId = params.id as string;

    // Mock data - in a real app, this would come from an API based on goalId
    const getGoalDetailById = (id: string) => {
        const goalDetails = {
            "1": {
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
                                    type: "image" as const,
                                    url: "https://picsum.photos/200",
                                },
                            },
                            {
                                id: "2",
                                title: "투두 리스트 타이틀이 들어갑니다.",
                                completedDate: "2025.05.12",
                                attachment: {
                                    type: "file" as const,
                                    url: "https://picsum.photos/200",
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
                                    type: "image" as const,
                                    url: "https://picsum.photos/200",
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
            },
            "2": {
                id: "2",
                title: "건강한 생활 습관 만들기",
                subGoals: [
                    {
                        id: "3",
                        title: "매일 운동하기",
                        completedTodos: [
                            {
                                id: "6",
                                title: "헬스장 등록하기",
                                completedDate: "2025.03.01",
                            },
                            {
                                id: "7",
                                title: "운동 계획표 작성",
                                completedDate: "2025.03.02",
                                attachment: {
                                    type: "file" as const,
                                    url: "/workout-plan.pdf",
                                    name: "운동계획표.pdf",
                                },
                            },
                        ],
                    },
                ],
            },
        };

        return goalDetails[id as keyof typeof goalDetails] || goalDetails["1"];
    };

    const goalDetail = getGoalDetailById(goalId);

    return <DoneItemDetail goalDetail={goalDetail} />;
} 