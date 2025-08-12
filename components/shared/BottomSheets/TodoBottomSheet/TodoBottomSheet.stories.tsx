// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import TodoBottomSheet from "./TodoBottomSheet"; // 실제 컴포넌트 파일 임포트
import { Drawer } from "vaul";

const meta = {
  title: "Components/TodoBottomSheet", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: TodoBottomSheet,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component:
          "docs에서는 제대로 보이지 않습니다. portal을 사용해서요. 직접 스토리에 들어가서 확인하세요.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'TodoBottomSheet',
  },
  render: (args) => {
    return (
      <>
        {/* <Drawer.Root open>
          <Drawer.Content> */}
        <TodoBottomSheet {...args} />
        {/* </Drawer.Content>
        </Drawer.Root> */}
      </>
    );
  },
} satisfies Meta<typeof TodoBottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.
export const Primary: Story = {
  argTypes: {
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    // Primary 스토리에만 적용될 Props
    isActivated: true,
    setIsActivated: () => {},
    subGoals: [
      { title: "1", id: "1" },
      { title: "2", id: "2" },
    ],
    onSubmitTodo: async () => true,
  },
};

/**
 * todo 추가에서 네트워크 에러가 발생하면 모달 닫지 않는다?
 */
export const SubmitError: Story = {
  args: {
    ...Primary.args,
    onSubmitTodo: async () => false,
  },
  argTypes: {
    ...Primary.argTypes,
  },
};

/**
 * todo 추가에서 정상일 때 모달 초기화 시킨다.
 */
export const SubmitSuccess: Story = {
  args: {
    ...Primary.args,
    onSubmitTodo: async () => true,
  },
  argTypes: {
    ...Primary.argTypes,
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary TodoBottomSheet',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large TodoBottomSheet',
  },
};
*/
