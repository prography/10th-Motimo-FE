// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import Banner from "./Banner"; // 실제 컴포넌트 파일 임포트

const meta = {
  title: "Components/Banner", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: Banner,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: "케이스가 2개 뿐인건지? 아니면 걍 아무 말이나 쓸 수 있는지.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'Banner',
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    title: {
      control: "text",
      description: "적당히 길이 넘치면 hidden",
    },
    tag: {
      control: "text",
      description: "적당히 길이 넘치면 hidden",
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    title: "아무말이나 쓸 수 있음?",
    tag: "모티모티모티모",
  },
};

// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Default: Story = {
  args: {
    title: "목표는 멀어도 나는 계속 가는 중",
    tag: "모티모와 함께 한 지 1일차",
  },
};

export const Group: Story = {
  args: {
    ...Default.args,
    title: "[그룹]에서 피드백을 남겼어요!",
  },
};
