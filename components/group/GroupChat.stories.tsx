import type { Meta, StoryObj } from "@storybook/react";
import { GroupChat } from "./GroupChat";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import {
  GroupMessageContentTypeEnum,
  GroupMessageItemRs,
  GroupMessageContentRs,
  TodoResultSubmittedContentEmotionEnum,
} from "@/api/generated/motimo/Api";

const meta: Meta<typeof GroupChat> = {
  title: "Group/GroupChat",
  component: GroupChat,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    onReactionClick: { action: "reactionClicked" },
  },
};

export default meta;
type Story = StoryObj<typeof GroupChat>;

const sampleMessages: GroupMessageItemRs[] = [
  {
    messageId: "1",
    userId: "1",
    userName: "김민수",
    message: {
      type: "TODO_RESULT_SUBMITTED",
      todoId: "1",
      todoTitle: "투두를 완료했어요!",
      todoResultId: "1",
      emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
      content: "투두를 완료했어요!",
    } as GroupMessageContentRs,
    reactionCount: 0,
    hasUserReacted: false,
    sendAt: "2021-01-01T00:00:00Z",
  },
  {
    messageId: "2",
    userId: "2",
    userName: "나",
    message: {
      type: "TODO_RESULT_SUBMITTED",
      todoId: "1",
      todoTitle: "투두를 완료했어요!",
      todoResultId: "1",
      emotion: TodoResultSubmittedContentEmotionEnum.IMMERSED,
      content: "투두를 완료했어요!",
    } as GroupMessageContentRs,
    reactionCount: 0,
    hasUserReacted: false,
    sendAt: "2021-01-01T00:00:00Z",
  },
  {
    messageId: "3",
    userId: "3",
    userName: "이영희",
    message: {
      type: "TODO_RESULT_SUBMITTED",
      todoId: "1",
      todoTitle: "투두를 완료했어요!",
      todoResultId: "1",
      emotion: TodoResultSubmittedContentEmotionEnum.REGRETFUL,
      content: "투두를 완료했어요!",
    } as GroupMessageContentRs,
    reactionCount: 0,
    hasUserReacted: false,
    sendAt: "2021-01-01T00:00:00Z",
  },
  {
    messageId: "4",
    userId: "4",
    userName: "나",
    message: {
      type: "TODO_RESULT_SUBMITTED",
      todoId: "1",
      todoTitle: "투두를 완료했어요!",
      todoResultId: "1",
      emotion: TodoResultSubmittedContentEmotionEnum.REGRETFUL,
      content: "투두를 완료했어요!",
    } as GroupMessageContentRs,
    reactionCount: 0,
    hasUserReacted: false,
    sendAt: "2021-01-01T00:00:00Z",
  },
  {
    messageId: "5",
    userId: "5",
    userName: "박철수",
    message: {
      type: "TODO_RESULT_SUBMITTED",
      todoId: "1",
      todoTitle: "투두를 완료했어요!",
      todoResultId: "1",
      emotion: TodoResultSubmittedContentEmotionEnum.REGRETFUL,
      content: "투두를 완료했어요!",
    } as GroupMessageContentRs,
    reactionCount: 0,
    hasUserReacted: false,
    sendAt: "2021-01-01T00:00:00Z",
  },
];

export const Primary: Story = {
  args: {
    messages: sampleMessages,
    onReactionClick: action("reactionClicked"),
  },
};

export const TodoMessages: Story = {
  args: {
    messages: [
      {
        messageId: "1",
        userId: "1",
        userName: "김민수",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const PhotoMessages: Story = {
  args: {
    messages: [
      {
        messageId: "1",
        userId: "1",
        userName: "이영희",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const DiaryMessages: Story = {
  args: {
    messages: [
      {
        messageId: "1",
        userId: "1",
        userName: "김민수",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const ReactionMessages: Story = {
  args: {
    messages: [
      {
        messageId: "1",
        userId: "1",
        userName: "박철수",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const AllVariations: Story = {
  args: {
    messages: [
      // Todo messages
      {
        messageId: "1",
        userId: "1",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "3",
        userId: "3",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "4",
        userId: "4",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      // Photo messages
      {
        messageId: "5",
        userId: "5",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "6",
        userId: "6",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "7",
        userId: "7",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "8",
        userId: "8",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      // Diary messages
      {
        messageId: "9",
        userId: "9",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "10",
        userId: "10",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "11",
        userId: "11",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "12",
        userId: "12",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      // Reaction messages
      {
        messageId: "13",
        userId: "13",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "14",
        userId: "14",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "15",
        userId: "15",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "16",
        userId: "16",
        userName: "이름(닉네임)",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const Interactive = () => {
  const [messages, setMessages] = useState<GroupMessageItemRs[]>([
    {
      messageId: "1",
      userId: "1",
      userName: "김민수",
      message: {
        type: "TODO_RESULT_SUBMITTED",
        todoId: "1",
        todoTitle: "투두를 완료했어요!",
        todoResultId: "1",
        emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
        content: "투두를 완료했어요!",
      } as GroupMessageContentRs,
      reactionCount: 0,
      hasUserReacted: false,
      sendAt: "2021-01-01T00:00:00Z",
    },
    {
      messageId: "2",
      userId: "2",
      userName: "나",
      message: {
        type: "TODO_RESULT_SUBMITTED",
        todoId: "1",
        todoTitle: "투두를 완료했어요!",
        todoResultId: "1",
        emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
        content: "투두를 완료했어요!",
      } as GroupMessageContentRs,
      reactionCount: 0,
      hasUserReacted: false,
      sendAt: "2021-01-01T00:00:00Z",
    },
  ]);

  const handleReactionClick = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.messageId === messageId) {
          const hasReaction = message.hasUserReacted;
          const currentCount = message.reactionCount;

          if (hasReaction) {
            // 반응 제거
            const newCount = Math.max(0, currentCount - 1);
            return {
              ...message,
              hasUserReacted: newCount > 0,
              reactionCount: newCount,
            };
          } else {
            // 반응 추가
            return {
              ...message,
              hasUserReacted: true,
              reactionCount: currentCount + 1,
            };
          }
        }
        return message;
      }),
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h3 className="mb-4 font-bold">💡 하트 아이콘을 클릭해보세요!</h3>
      <GroupChat messages={messages} onReactionClick={handleReactionClick} />
    </div>
  );
};

export const AllReactionTypes: Story = {
  args: {
    messages: [
      {
        messageId: "1",
        userId: "1",
        userName: "김민수",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "2",
        userId: "2",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "3",
        userId: "3",
        userName: "이영희",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "4",
        userId: "4",
        userName: "나",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
      {
        messageId: "5",
        userId: "5",
        userName: "박철수",
        message: {
          type: "TODO_RESULT_SUBMITTED",
          todoId: "1",
          todoTitle: "투두를 완료했어요!",
          todoResultId: "1",
          emotion: TodoResultSubmittedContentEmotionEnum.PROUD,
          content: "투두를 완료했어요!",
        } as GroupMessageContentRs,
        reactionCount: 0,
        hasUserReacted: false,
        sendAt: "2021-01-01T00:00:00Z",
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    onReactionClick: action("reactionClicked"),
  },
};
