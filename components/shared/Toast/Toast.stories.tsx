import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Shared/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    text: "세부 목표를 달성했습니다!",
  },
};

export const Success: Story = {
  args: {
    text: "성공적으로 저장되었습니다",
  },
};

export const Info: Story = {
  args: {
    text: "정보가 업데이트되었습니다",
  },
};

export const Short: Story = {
  args: {
    text: "완료!",
  },
};

export const Long: Story = {
  args: {
    text: "이것은 긴 토스트 메시지의 예시입니다",
  },
}; 