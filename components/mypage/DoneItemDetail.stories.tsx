import type { Meta, StoryObj } from "@storybook/react";
import { DoneItemDetail } from "./DoneItemDetail";

const meta: Meta<typeof DoneItemDetail> = {
  title: "mypage/DoneItemDetail",
  component: DoneItemDetail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    goalDetail: {
      description: "Complete goal detail with sub-goals and completed todos",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    goalDetail: {
      id: "1",
      title: "기본 목표",
      dueDate: "2025-12-31",
      subGoals: [
        {
          id: "1",
          title: "기본 세부목표",
          todos: [
            {
              id: "1",
              title: "기본 할 일",
              date: "2025.01.15",
              status: "COMPLETE" as const,
            },
          ],
        },
      ],
    },
  },
};

export const WithCustomData: Story = {
  args: {
    goalDetail: {
      id: "1",
      title: "독서 습관 만들기",
      subGoals: [
        {
          id: "1",
          title: "매일 30분 책 읽기",
          completedTodos: [
            {
              id: "1",
              title: "소설 '데미안' 읽기",
              completedDate: "2025.01.15",
              attachment: {
                type: "image",
                url: "https://picsum.photos/200",
              },
            },
            {
              id: "2",
              title: "독서 노트 작성하기",
              completedDate: "2025.01.16",
              attachment: {
                type: "file",
                url: "/reading-note.pdf",
                name: "독서노트_데미안.pdf",
              },
            },
            {
              id: "3",
              title: "독서 후기 SNS 게시",
              completedDate: "2025.01.17",
            },
          ],
        },
        {
          id: "2",
          title: "독서 리스트 작성",
          completedTodos: [
            {
              id: "4",
              title: "올해 읽을 책 10권 선정",
              completedDate: "2024.12.31",
              attachment: {
                type: "file",
                url: "/book-list.pdf",
                name: "2025년_독서목록.pdf",
              },
            },
          ],
        },
      ],
    },
  },
};

export const WithOnlyTextTodos: Story = {
  args: {
    goalDetail: {
      id: "1",
      title: "운동 루틴 완성",
      subGoals: [
        {
          id: "1",
          title: "헬스장 운동 계획",
          completedTodos: [
            {
              id: "1",
              title: "월요일 상체 운동 완료",
              completedDate: "2025.01.20",
            },
            {
              id: "2",
              title: "화요일 하체 운동 완료",
              completedDate: "2025.01.21",
            },
            {
              id: "3",
              title: "수요일 유산소 운동 완료",
              completedDate: "2025.01.22",
            },
          ],
        },
      ],
    },
  },
};
