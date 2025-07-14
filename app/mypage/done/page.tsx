"use client";

import { DoneItems } from "@/components/mypage";

export default function DoneItemsPage() {
    // Mock data - in a real app, this would come from an API or state management
    const completedGoals = [
        {
            id: "1",
            title: "해외로 취업하자!",
            period: "6개월",
            totalTodos: 6,
            totalRecords: 2,
        },
        {
            id: "2",
            title: "건강한 생활 습관 만들기",
            period: "3개월",
            totalTodos: 40,
            totalRecords: 10,
        },
        {
            id: "3",
            title: "독서 습관 완성하기",
            period: "2025.05.01",
            totalTodos: 40,
            totalRecords: 10,
        },
    ];

    return <DoneItems goals={completedGoals} />;
} 