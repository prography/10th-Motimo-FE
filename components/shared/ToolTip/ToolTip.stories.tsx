// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "./ToolTip"; // 실제 컴포넌트 파일 임포트

const description = `모티 svg는 shared와 프로젝트 루트에 동일한 것이 각각 존재.  
모노레포 구조라서.
`;

const meta = {
  title: "Shared/ToolTip", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: ToolTip,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: description,
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
} satisfies Meta<typeof ToolTip>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    content: {
      control: "text",
      description: `줄바꿈, 공백 그대로 출력됨.  
말 줄임표는 사용되지 않을꺼라 가정.`,
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    content: `올해 책 100권 읽기, 체지방 감량, 포폴 완성,
자격증 취득, 취뽀하기 등`,
    // Primary 스토리에만 적용될 Props
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary ToolTip',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large ToolTip',
  },
};
*/
