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
    args: {},
};

export const WithBio: Story = {
    args: {},
};

export const EmptyProfile: Story = {
    args: {},
};

export const WithModalExample: Story = {
    args: {
        onDeleteAccount: () => {
            // Account deletion logic would go here
        },
    },
}; 