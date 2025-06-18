// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox"; // 실제 컴포넌트 파일 임포트

const meta = {
  title: "Shared/Checkbox", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: Checkbox,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: "호버링 체크는 마우스를 직접 호버링 시켜야 합니다.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    checked: {
      control: "boolean",
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {},
};

/** 마우스 호버링 시 outline 색이 변합니다. */
export const UnChecked: Story = {
  args: {
    checked: false,
  },
};

/** 마우스 호버링 시 배경 색이 변합니다. */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary Checkbox',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Checkbox',
  },
};
*/
