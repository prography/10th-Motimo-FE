import type { Meta, StoryObj } from "@storybook/react";
import JoinRandomGroupPage from "./page";

const meta: Meta<typeof JoinRandomGroupPage> = {
    title: "Pages/JoinRandomGroup",
    component: JoinRandomGroupPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        nextjs: {
            appDirectory: true,
        },
    },
};

export default meta;
type Story = StoryObj<typeof JoinRandomGroupPage>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/group/join-random",
                query: { goalId: "test-goal-id" },
            },
        },
    },
};

export const WithoutGoalId: Story = {
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/group/join-random",
            },
        },
    },
}; 