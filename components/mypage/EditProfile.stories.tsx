import type { Meta, StoryObj } from "@storybook/react";
import { EditProfile } from "./EditProfile";

const meta: Meta<typeof EditProfile> = {
    title: "mypage/EditProfile",
    component: EditProfile,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        initialName: {
            control: "text",
            description: "Initial name value",
        },
        initialBio: {
            control: "text",
            description: "Initial bio value",
        },
        profileImageUrl: {
            control: "text",
            description: "Profile image URL",
        },
        onSave: {
            action: "saved",
            description: "Called when save button is clicked",
        },
        onDeleteAccount: {
            action: "delete account",
            description: "Called when delete account button is clicked",
        },
        onAddInterests: {
            action: "add interests",
            description: "Called when add interests button is clicked",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        initialName: "홍길동",
        initialBio: "",
        profileImageUrl: "/profile-default.png",
    },
};

export const WithBio: Story = {
    args: {
        initialName: "홍길동",
        initialBio: "안녕하세요! 열심히 목표를 달성하고 있습니다.",
        profileImageUrl: "/profile-default.png",
    },
};

export const EmptyProfile: Story = {
    args: {
        initialName: "",
        initialBio: "",
        profileImageUrl: "/profile-default.png",
    },
};

export const WithModalExample: Story = {
    args: {
        initialName: "홍길동",
        initialBio: "안녕하세요! 열심히 목표를 달성하고 있습니다.",
        profileImageUrl: "/profile-default.png",
        onDeleteAccount: () => {
            // Account deletion logic would go here
        },
    },
}; 