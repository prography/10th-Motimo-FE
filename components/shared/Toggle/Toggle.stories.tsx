// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import Toggle from "./Toggle"; // 실제 컴포넌트 파일 임포트
import { useState } from "react";

const meta = {
  title: "Shared/Toggle", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: Toggle,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component:
          "제어 컴포넌트입니다. 컴포넌트 직접 클릭하면 애니메이션 확인 가능합니다.",
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'Toggle',
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.

const Wrapper = ({ args }: { args: any }) => {
  const [isOn, setIsOn] = useState<boolean>(args.isOn);
  return (
    <>
      <Toggle isOn={isOn} onChange={(prevState) => setIsOn(!prevState)} />
    </>
  );
};

export const Primary: Story = {
  argTypes: {
    isOn: {
      control: "boolean",
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    isOn: false,
    onChange: () => {
      console.log("스토리-- onChange");
    },
    // Primary 스토리에만 적용될 Props
  },
  render: (args) => <Wrapper key={`${args.isOn}`} args={args} />,
};

// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const On: Story = {
  args: {
    ...Primary.args,
    isOn: true,
  },
};

export const Off: Story = {
  args: {
    ...Primary.args,
    isOn: false,
  },
};
