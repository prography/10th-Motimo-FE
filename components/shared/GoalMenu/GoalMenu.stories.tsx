// Test.stories.tsx
import { useState } from "react";
import GoalMenu from "./GoalMenu";
import { StoryObj } from "@storybook/react";

const description = `
  스와이프 메뉴탭과 같이, 선택된 것은 검은색/ 선택되지않은 것은 흰색입니다

  탭으로써 기능함. 선택된 GoalMenu에 해당되는 목표들이 아래에 불러와지게 됨.

  선택은 1개만 가능하므로, 이들의 리스트에선 상태를 이용해 1개만 selected=true 주입해야 함.
`;

// meta는 공통 옵션.
const meta = {
  title: "Shared/GoalMenu",
  component: GoalMenu,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Primary는 공통. argTypes를 사용해 상호작용 가능하도록 한다.
export const Primary: Story = {
  argTypes: {
    goal: { control: "text", description: "목표 텍스트. 길면 ..." },
    percentage: {
      control: "number",
      description: "0~100까지만 bar가 참.",
    },
    selected: {
      control: false,
    },
  },
  args: {
    goal: "목표",
    percentage: 10,
    selected: false,
    onSelected: () => {
      console.log("스토리북 -- onSelected누름");
    },
  },
  render: (args) => {
    const [selected, setSelcted] = useState(false);
    return (
      <>
        <GoalMenu
          {...args}
          selected={selected}
          onSelected={() => setSelcted((prev) => !prev)}
        />
      </>
    );
  },
};

export const Unselected: Story = {
  args: {
    ...Primary.args,
    selected: false,
  },
};
export const Selected: Story = {
  args: {
    ...Primary.args,
    selected: true,
  },
};
