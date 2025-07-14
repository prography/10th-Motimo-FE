import type { Meta, StoryObj } from "@storybook/react";
import ModalDeletingAccount from "./ModalDeletingAccount";

const meta: Meta<typeof ModalDeletingAccount> = {
    title: "Modal/ModalDeletingAccount",
    component: ModalDeletingAccount,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    argTypes: {
        onClose: {
            action: "closed",
            description: "Called when modal is closed",
        },
        onDeleteAccount: {
            action: "account deleted",
            description: "Called when delete account button is clicked",
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
}; 