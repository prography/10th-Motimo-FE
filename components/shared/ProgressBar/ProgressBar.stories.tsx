// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar from "./ProgressBar"; // 실제 컴포넌트 파일 임포트

const meta = {
  title: "Shared/ProgressBar", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: ProgressBar,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: "숫자 형식이면 0~100 범위 밖에서도 동작합니다.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'ProgressBar',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    percentage: {
      control: "number",
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    percentage: 50,
    // Primary 스토리에만 적용될 Props
  },
};

// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:

/** 100을 넘기면 100%로 간주합니다 */
export const overHundred: Story = {
  args: {
    percentage: 150,
  },
};

/** 0보다 작으면 0%로 간주합니다. */
export const UnderZero: Story = {
  args: {
    percentage: -50,
  },
};
