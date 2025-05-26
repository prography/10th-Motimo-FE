// Test.stories.tsx
import Test from "./Test";
import { StoryObj } from "@storybook/react";

// meta는 공통 옵션.
const meta = {
  title: "Example/Test",
  component: Test,
  args: {
    children: "asdf",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Primary는 공통. argTypes를 사용해 상호작용 가능하도록 한다.
export const Primary: Story = {
  argTypes: {
    children: {
      control: "text",
      description: "보통은 텍스트를 입력하겠지",
      table: {
        category: "이야호",
      },
    },
  },
  args: {
    children: "버튼",
  },
};

// 기타 스토리들은 args를 기본으로 간단히 처리함
export const Ex1: Story = {
  args: {
    children: "기본값",
  },
};
