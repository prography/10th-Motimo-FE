import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading";

const meta: Meta<typeof Loading> = {
  title: "shared/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Size of the loading animation",
    },
    text: {
      control: "text",
      description: "Loading text to display",
    },
    showText: {
      control: "boolean",
      description: "Whether to show loading text",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    text: "로딩 중...",
    showText: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    text: "잠시만요...",
    showText: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    text: "데이터를 불러오고 있어요",
    showText: true,
  },
};

export const NoText: Story = {
  args: {
    size: "md",
    showText: false,
  },
};

export const CustomText: Story = {
  args: {
    size: "md",
    text: "그룹 참여 중...",
    showText: true,
  },
};

export const InContainer: Story = {
  args: {
    size: "lg",
    text: "페이지를 불러오고 있어요",
    showText: true,
    className: "min-h-[200px] bg-Color-gray-5 rounded-lg",
  },
};