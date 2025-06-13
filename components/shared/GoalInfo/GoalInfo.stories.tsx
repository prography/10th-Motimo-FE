import GoalInfo from "./GoalInfo";
import { StoryFn, StoryObj } from "@storybook/react";

// meta는 공통 옵션.

const description = `
**개발 목표**  
외부에서 fetch한 데이터를 넘겨주면 됨.      
아마 useDeferredValue를 사용해서 최적화하고, 이 값을 넘겨줄 것 같음.
        
**유의 사항**  
leftDateNum랑 leftTodoNum의 최대값은 안정해놨는데, 길어지면 서로 밀어서 
컴포넌트 밖으로 빠져나감.
이럴 케이스가 거의 없지만, 추후 보강. 
`;

const meta = {
  title: "Shared/GoalInfo",
  component: GoalInfo,
  args: {},
  decorators: [
    (Story: StoryFn) => (
      <div onClick={(e) => e.preventDefault()}>
        <Story />
      </div>
    ),
  ],
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

export const Primary: Story = {
  argTypes: {
    leftDateNum: {
      control: "number",
    },
    leftTodoNum: {
      control: "number",
    },
  },
  args: {
    leftDateNum: 180,
    leftTodoNum: 24,
  },
};
