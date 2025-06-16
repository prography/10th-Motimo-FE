// plop-templates/story.tsx.hbs
import type { Meta, StoryObj } from "@storybook/react";
import TextField from "./TextField"; // 실제 컴포넌트 파일 임포트
import { Ref, useEffect, useRef, useState } from "react";

const meta = {
  title: "Shared/TextField", // Storybook 사이드바 경로 (프로젝트 규칙에 맞게 수정)
  component: TextField,
  parameters: {
    // Canvas 레이아웃을 중앙으로 정렬하거나 패딩을 추가할 수 있습니다.
    layout: "centered",
    docs: {
      description: {
        component: `Focus는 페이지에 1곳만 존재할 수 있기 때문에, **직접 클릭**을 통해 각 경우에서의 focus를 확인할 수 있도록 했습니다.`,
      },
    },
  },
  // Docs 탭 자동 생성을 위해 필요합니다.
  tags: ["autodocs"],
  // Controls Addon에서 Props를 어떻게 제어할지, 설명을 추가합니다.
  // 모든 스토리에 적용될 기본 Props (선택 사항)
  args: {
    // 예시: label: 'TextField',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

// 가장 기본적인 Primary 스토리
// argTypes를 Primary는 기본으로 가집니다.

const Wrapper = ({ args }: { args: any }) => {
  const [value, setValue] = useState(args.value);
  return (
    <>
      <TextField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onReset={() => {
          setValue("");
          console.log("왜안됨");
        }}
      />
    </>
  );
};

export const Primary: Story = {
  argTypes: {
    value: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    // 예시: backgroundColor: { control: 'color', description: '컴포넌트 배경색' },
  },
  args: {
    onReset: () => {
      console.log("스토리 -- 리셋버튼");
    },
    isError: false,
    value: "입력",
    onChange: () => {
      console.log("스토리 -- onChange");
    },
    description: "설명칸",
    placeholder: "플레이스홀더",
    // Primary 스토리에만 적용될 Props
  },
  render: (args) => <Wrapper key={`${args.value}`} args={args} />,
};

const FocusWrapperFactory = (args: any) => {
  const FocusWrapper = ({ args }: { args: any }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (inputRef.current !== null) {
        (inputRef.current as HTMLInputElement).focus();
      }
    }, []);
    return <TextField ref={inputRef} {...args} />;
  };
  return (
    <>
      <FocusWrapper args={args} />
    </>
  );
};

/** focus는 직접 입력창 클릭해 확인 가능합니다 */
export const NormalInactiveOrFocus: Story = {
  args: {
    value: "",
    isError: false,
    onChange: () => {},
    placeholder: "플레이스홀더",
    description: "부가적인 설명이 들어갑니다",
  },
};

/** Active Focus는 직접 입력창 클릭해 확인 가능합니다. */
export const NormalActiveOrAtiveFocus: Story = {
  args: {
    ...NormalInactiveOrFocus.args,
    value: "내용이 여기에",
    onReset: () => {
      console.log("스토리--onReset");
    },
  },
};

/** 입력창 클릭해도 Focus되지 않습니다. */
export const DisableInactive: Story = {
  args: {
    ...NormalInactiveOrFocus.args,
    disabled: true,
  },
};

/** 입력창 클릭해도 Focus되지 않습니다. */
export const DisableActive: Story = {
  args: {
    ...NormalActiveOrAtiveFocus.args,
    disabled: true,
  },
};
export const ErrorInactiveOrFocus: Story = {
  args: {
    ...NormalInactiveOrFocus.args,
    isError: true,
  },
};
export const ErrorActiveOrActiveFocus: Story = {
  args: {
    ...NormalActiveOrAtiveFocus.args,
    isError: true,
  },
};

/*
// UI variatns들을 스토리로 생성합니다.
// 추가적인 스토리 예시:
export const Secondary: Story = {
  args: {
    label: 'Secondary TextField',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large TextField',
  },
};
*/
