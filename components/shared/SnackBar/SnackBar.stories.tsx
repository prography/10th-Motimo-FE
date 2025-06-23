import type { Meta, StoryObj } from "@storybook/react";
import { SnackBar } from "./SnackBar";

const meta: Meta<typeof SnackBar> = {
  title: "Shared/SnackBar",
  component: SnackBar,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    showIcon: { control: "boolean" },
    actionText: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof SnackBar>;

export const Default: Story = {
  args: {
    text: "텍스트가 여기에",
    showIcon: false,
    actionText: "button",
  },
};

export const WithIcon: Story = {
  args: {
    text: "네트워크 오류",
    showIcon: true,
    actionText: "재시도",
  },
};

export const TextOnly: Story = {
  args: {
    text: "저장되었습니다",
    showIcon: false,
  },
};

export const WithIconOnly: Story = {
  args: {
    text: "경고 메시지입니다",
    showIcon: true,
  },
};

export const LongText: Story = {
  args: {
    text: "이것은 긴 텍스트 메시지입니다",
    showIcon: true,
    actionText: "확인",
  },
}; 