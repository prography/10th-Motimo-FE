// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import ModalCompletingGoal from "./ModalCompletingGoal"; // 실제 컴포넌트 파일 임포트

const meta = {
  title: "Shared/Modals/ModalCompletingGoal", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: ModalCompletingGoal,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: "다른 모달과 동일한데, onWait에 대해 아직 확정 안 됨.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'ModalCompletingGoal',
  },
  // 모달 docs용 렌더 옵션 -- 이렇게 안하면 docs에선 쪼그라져 보임. w-full 때매.
  render: (args) => {
    return (
      <>
        <div style={{ minWidth: "320px", height: "300px" }}>
          <ModalCompletingGoal {...args} />
        </div>
      </>
    );
  },
} satisfies Meta<typeof ModalCompletingGoal>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
    onWait: {
      description: "이게 onClose랑 동일한지 다른지 확인하고 수정하기",
    },
  },
  args: {
    onClose: () => {
      console.log("스토리북 -- close");
    },
    onCompleteGoal: async () => {
      console.log("스토리북 -- CompleteGoal 비동기는 외부에");
    },
    onWait: async () => {
      console.log("스토리북 -- onWait이 비동기라면 외부에");
    },
    // Primary 스토리에만 적용될 Props
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary ModalCompletingGoal',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large ModalCompletingGoal',
  },
};
*/
