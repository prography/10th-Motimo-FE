import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Shared/Button",
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
    children: "텍스트",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: "filled",
    size: "m",
    children: "텍스트",
  },
};

// 변형별 스토리
export const Filled: Story = {
  args: {
    variant: "filled",
    children: "텍스트",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "텍스트",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "텍스트",
  },
};

// 크기별 스토리
export const Small: Story = {
  args: {
    size: "s",
    children: "텍스트",
  },
};

export const Medium: Story = {
  args: {
    size: "m",
    children: "텍스트",
  },
};

export const Large: Story = {
  args: {
    size: "l",
    children: "텍스트",
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "텍스트",
  },
};

// Focused 상태 (자동으로 포커스되도록)
export const Focused: Story = {
  args: {
    variant: "filled",
    size: "s",
    children: "텍스트",
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  },
};

// 아이콘이 있는 버튼
export const WithIcon: Story = {
  args: {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3V17M3 10H17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    children: "텍스트",
  },
};

// Figma 디자인에 따른 모든 상태 보기
export const AllStatesAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Small size (32px) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Small (32px)</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="s">텍스트</Button>
          <Button variant="outlined" size="s">텍스트</Button>
          <Button variant="text" size="s">텍스트</Button>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="s" disabled>텍스트</Button>
          <Button variant="outlined" size="s" disabled>텍스트</Button>
          <Button variant="text" size="s" disabled>텍스트</Button>
        </div>
      </div>

      {/* Medium size (40px) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Medium (40px)</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="m">텍스트</Button>
          <Button variant="outlined" size="m">텍스트</Button>
          <Button variant="text" size="m">텍스트</Button>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="m" disabled>텍스트</Button>
          <Button variant="outlined" size="m" disabled>텍스트</Button>
          <Button variant="text" size="m" disabled>텍스트</Button>
        </div>
      </div>

      {/* Large size (48px) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Large (48px)</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="l">텍스트</Button>
          <Button variant="outlined" size="l">텍스트</Button>
          <Button variant="text" size="l">텍스트</Button>
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="l" disabled>텍스트</Button>
          <Button variant="outlined" size="l" disabled>텍스트</Button>
          <Button variant="text" size="l" disabled>텍스트</Button>
        </div>
      </div>

      {/* With Icons */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button 
            variant="filled" 
            size="m"
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          >
            텍스트
          </Button>
          <Button 
            variant="outlined" 
            size="m"
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          >
            텍스트
          </Button>
        </div>
      </div>

      {/* Focus States */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Focus States (Tab to focus)</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button variant="filled" size="s">Focus Me</Button>
          <Button variant="outlined" size="m">Focus Me</Button>
          <Button variant="text" size="l">Focus Me</Button>
        </div>
      </div>
    </div>
  ),
};
