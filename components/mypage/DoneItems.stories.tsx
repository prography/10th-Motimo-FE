import type { Meta, StoryObj } from "@storybook/react";
import { DoneItems } from "./DoneItems";

const meta: Meta<typeof DoneItems> = {
    title: "mypage/DoneItems",
    component: DoneItems,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        goals: {
            description: "Array of completed goals",
        },
        className: {
            control: "text",
            description: "Additional CSS classes",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const WithCustomGoals: Story = {
    args: {
        goals: [
            {
                id: "1",
                title: "독서 습관 만들기",
                period: "1년",
                totalTodos: 365,
                totalRecords: 180,
            },
            {
                id: "2",
                title: "운동 루틴 완성",
                period: "2024.12.31",
                totalTodos: 100,
                totalRecords: 85,
            },
        ],
    },
};

export const EmptyState: Story = {
    args: {
        goals: [],
    },
};

export const LongGoalNames: Story = {
    args: {
        goals: [
            {
                id: "1",
                title: "아주 긴 목표 이름을 가진 목표로 텍스트 오버플로우를 테스트",
                period: "6개월",
                totalTodos: 50,
                totalRecords: 25,
            },
            {
                id: "2",
                title: "Short Goal",
                period: "1주일",
                totalTodos: 7,
                totalRecords: 7,
            },
        ],
    },
}; 