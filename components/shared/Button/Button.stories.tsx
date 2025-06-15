import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "text"],
      description: "버튼의 스타일 변형",
    },
    size: {
      control: "select",
      options: ["s", "m", "l"],
      description: "버튼의 크기",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Primary: Story = {
  args: {
    variant: "filled",
    size: "m",
    children: "Primary Button",
  },
};

// 변형별 스토리
export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Filled Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

// 크기별 스토리
export const Small: Story = {
  args: {
    size: "s",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "m",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "l",
    children: "Large Button",
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

// 아이콘이 있는 버튼 (예시 아이콘)
export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 2V14M2 8H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    children: "Add Item",
  },
};

// 모든 변형 한 번에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <Button variant="filled" size="s">Small Filled</Button>
        <Button variant="filled" size="m">Medium Filled</Button>
        <Button variant="filled" size="l">Large Filled</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="outlined" size="s">Small Outlined</Button>
        <Button variant="outlined" size="m">Medium Outlined</Button>
        <Button variant="outlined" size="l">Large Outlined</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="text" size="s">Small Text</Button>
        <Button variant="text" size="m">Medium Text</Button>
        <Button variant="text" size="l">Large Text</Button>
      </div>
      <div className="flex gap-4 items-center">
        <Button variant="filled" disabled>Disabled Filled</Button>
        <Button variant="outlined" disabled>Disabled Outlined</Button>
        <Button variant="text" disabled>Disabled Text</Button>
      </div>
    </div>
  ),
};
