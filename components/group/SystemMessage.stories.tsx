import type { Meta, StoryObj } from "@storybook/react";
import { SystemMessage } from "./SystemMessage";

const meta = {
  title: "Components/Group/SystemMessage",
  component: SystemMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "표시할 시스템 메시지 텍스트",
    },
    className: {
      control: "text",
      description: "추가적인 CSS 클래스",
    },
  },
} satisfies Meta<typeof SystemMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: "000님이 그룹에 입장했습니다.",
  },
};

export const GroupJoin: Story = {
  args: {
    message: "김모티님이 그룹에 입장했습니다.",
  },
};

export const GroupLeave: Story = {
  args: {
    message: "이모티님이 그룹을 떠났습니다.",
  },
};

export const LongMessage: Story = {
  args: {
    message:
      "아주 긴 이름을 가진 사용자님이 그룹에 입장했습니다. 정말 매우 긴 메시지입니다.",
  },
};
