import type { Meta, StoryObj } from "@storybook/react";
import { UsersGroupIcon } from "./UsersGroupIcon";

const meta = {
  title: "Components/Icons/UsersGroupIcon",
  component: UsersGroupIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "color",
      description: "아이콘 색상",
    },
    width: {
      control: "number",
      description: "아이콘 너비",
    },
    height: {
      control: "number",
      description: "아이콘 높이",
    },
    className: {
      control: "text",
      description: "추가적인 CSS 클래스",
    },
  },
} satisfies Meta<typeof UsersGroupIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    width: 24,
    height: 24,
    color: "#464C53",
  },
};

export const Large: Story = {
  args: {
    width: 48,
    height: 48,
    color: "#464C53",
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <UsersGroupIcon color="#464C53" width={24} height={24} />
      <UsersGroupIcon color="#EA3429" width={24} height={24} />
      <UsersGroupIcon color="#007AFF" width={24} height={24} />
      <UsersGroupIcon color="#34C759" width={24} height={24} />
    </div>
  ),
};
