// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import ModalUpdatingSubGoal from "./ModalUpdatingSubGoal"; // 실제 컴포넌트 파일 임포트

const meta = {
  title: "Details/Modals/ModalUpdatingSubGoal", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: ModalUpdatingSubGoal,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'ModalUpdatingSubGoal',
  },
} satisfies Meta<typeof ModalUpdatingSubGoal>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    onClose: () => {},
    onUpdateSubGoal: async () => {},
    initSubGoal: "야호야호",
    // Primary 스토리에만 적용될 Props
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary ModalUpdatingSubGoal',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large ModalUpdatingSubGoal',
  },
};
*/
