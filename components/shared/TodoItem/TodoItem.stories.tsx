import { FC, useState } from "react";
import TodoItem from "./TodoItem";
import { StoryObj } from "@storybook/react";
import { mockDateDecorator } from "storybook-mock-date-decorator";

const description = `
체크박스는 바텀시트랑 독립적임. 

**완료/미완료 비동기 동작에는 낙관적 업뎃을 사용해야 할 듯.**

네트워크 에러 등으로 에러날 때 원복 + 스낵바로 얼림 띄우기
`;

// meta는 공통 옵션.
const meta = {
  title: "Shared/TodoItem",
  component: TodoItem,
  args: {},
  decorators: [
    mockDateDecorator(new Date("2025-06-17")),
    (Story: FC) => {
      return (
        <div onClick={(e) => e.preventDefault()}>
          <Story />
        </div>
      );
    },
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

const PrimaryWrapper = ({ args }: { args: typeof Primary.args }) => {
  const [checked, setChecked] = useState<boolean>(args.checked ?? false);
  const dateObj = args?.targetDate ? new Date(args.targetDate) : new Date();

  const handleChecked = async () => {
    setTimeout(() => {
      console.log("비동기 체크");
      setChecked((prev) => !prev);
    }, 1000);
  };
  return (
    <>
      <TodoItem
        {...args}
        targetDate={dateObj}
        checked={checked}
        onChecked={handleChecked}
      />
    </>
  );
};

export const Primary: Story = {
  argTypes: {
    checked: {
      control: "boolean",
      description: "체크 여부",
    },
    targetDate: {
      control: "date",
      description: `어제일 경우 "어제"로 표기.
      날짜가 지났을 경우 negative 색상
      `,
    },
    // mood: {
    //   control: "select",
    //   description: ` 1이 non-mood, 2가 smile로 가정.
    //   `,
    //   options: [undefined, 1, 2, 3, 4, 5],
    // },
    reported: {
      control: "boolean",
      description: "제출/미제출로 변경됨.",
    },
    title: {
      control: "text",
      description: "투두 리스트 타이틀 길면 ...",
    },
    // children: {
    //   control: "text",
    //   description: "보통은 텍스트를 입력하겠지",
    //   table: {
    //     category: "이야호",
    //   },
    // },
  },
  args: {
    // onMoodClick: () => {
    //   console.log("기록 전에만 동작함.");
    // },
    onReportedClick: async () => {
      console.log("스토리 -- 제출 전에만 동작함.");
    },
    onChecked: async (prev) => {
      console.log("스토리 콘솔 -  prev:", prev);
    },
    targetDate: new Date(),
    title: "야호",
    // mood: 1,
    reported: false,
    checked: false,
  },
  render: (args) => <PrimaryWrapper args={args} key={`${args.checked}`} />,
  // (args) => {
  //   const [checked, setChecked] = useState(args.checked);
  //   const dateObj = args?.targetDate ? new Date(args.targetDate) : new Date();

  //   const handleChecked = () => {
  //     setTimeout(() => {
  //       console.log("비동기 체크");
  //       setChecked((prev) => !prev);
  //     }, 1000);
  //   };
  //   return (
  //     <>
  //       <TodoItem {...args} targetDate={dateObj} checked={checked} />
  //     </>
  //   );
  // },
};

// 미완료
export const IncompleteNonDate: Story = {
  args: {
    checked: false,
    title: "미완료에, 날짜도 없음.",
    onChecked: async () => {},
  },
};
export const IncompleteDate: Story = {
  args: {
    ...IncompleteNonDate.args,
    title: "미완료, 날짜는 오늘.",
    targetDate: new Date(),
  },
};
export const IncompleteDateLateYesterday: Story = {
  args: {
    ...IncompleteNonDate.args,
    title: "미완료에, 날짜는 어제.",
    targetDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
};
export const IncompleteDateLate: Story = {
  args: {
    ...IncompleteNonDate.args,
    title: "미완료에, 날짜는 이틀 전.",
    targetDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
};
// 완료 [결과물 제출 전]
export const CompleteNonSubmitNotDate: Story = {
  args: {
    ...IncompleteNonDate.args,
    checked: true,
    title: "완료 미제출, 날짜 없음",
    // mood: 1,
    reported: false,
  },
};
export const CompleteNonSubmit: Story = {
  args: {
    ...CompleteNonSubmitNotDate.args,
    title: "완료 미제출, 날짜 오늘",
    targetDate: new Date(),
  },
};
export const CompleteNonSubmitLateYesterday: Story = {
  args: {
    ...CompleteNonSubmitNotDate.args,
    title: "완료 미제출, 날짜 어제",
    targetDate: IncompleteDateLateYesterday.args.targetDate,
  },
};
export const CompleteNonSubmitLate: Story = {
  args: {
    ...CompleteNonSubmitNotDate.args,
    title: "완료 미제출, 날짜 이틀 전",
    targetDate: IncompleteDateLate.args.targetDate,
  },
};

// 완료 [결과물 제출 후]
export const CompleteSubmitNotDate: Story = {
  args: {
    ...CompleteNonSubmitNotDate.args,
    title: "완료 제출, 날짜 없음",
    // mood: 2,
    reported: true,
  },
};
export const CompleteSubmit: Story = {
  args: {
    ...CompleteSubmitNotDate.args,
    title: "완료 제출, 날짜 오늘",
    targetDate: new Date(),
  },
};
export const CompleteSubmitLateYesterday: Story = {
  args: {
    ...CompleteSubmitNotDate.args,
    title: "완료 제출, 날짜 어제",
    targetDate: IncompleteDateLateYesterday.args.targetDate,
  },
};
export const CompleteSubmitLate: Story = {
  args: {
    ...CompleteSubmitNotDate.args,
    title: "완료 제출, 날짜 이틀 전",
    targetDate: IncompleteDateLate.args.targetDate,
  },
};
