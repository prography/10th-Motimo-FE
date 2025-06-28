import type { Meta, StoryObj } from "@storybook/react";
import { GroupChat, ChatMessage } from "./GroupChat";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

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

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    type: "member",
    style: "todo",
    username: "김민수",
    mainText: "투두를 완료했어요!",
    checkboxLabel: "프레이머 공부하기",
    isChecked: true,
    hasReaction: false,
  },
  {
    id: "2", 
    type: "me",
    style: "todo",
    username: "나",
    mainText: "투두를 완료했어요!",
    checkboxLabel: "디자인 시스템 정리하기",
    isChecked: true,
    hasReaction: true,
    reactionCount: 2,
  },
  {
    id: "3",
    type: "member",
    style: "photo",
    username: "이영희",
    mainText: "투두 기록을 남겼어요!",
    checkboxLabel: "운동하기",
    isChecked: true,
    photoUrl: "https://via.placeholder.com/116",
    hasReaction: true,
    reactionCount: 3,
  },
  {
    id: "4",
    type: "me",
    style: "diary",
    username: "나",
    mainText: "투두 기록을 남겼어요!",
    checkboxLabel: "책 읽기",
    isChecked: true,
    diaryText: "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
    hasReaction: false,
  },
  {
    id: "5",
    type: "member",
    style: "reaction",
    username: "박철수",
    mainText: "홍길동님의 투두에 반응을 남겼어요!",
    reactionType: "최고!",
    hasReaction: false,
  },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
    onReactionClick: action("reactionClicked"),
  },
};

export const TodoMessages: Story = {
  args: {
    messages: [
      {
        id: "1",
        type: "member",
        style: "todo",
        username: "김민수",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        hasReaction: false,
      },
      {
        id: "2",
        type: "me",
        style: "todo",
        username: "나",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "리액트 공부하기",
        isChecked: true,
        hasReaction: true,
        reactionCount: 5,
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const PhotoMessages: Story = {
  args: {
    messages: [
      {
        id: "1",
        type: "member",
        style: "photo",
        username: "이영희",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "운동하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: false,
      },
      {
        id: "2",
        type: "me",
        style: "photo",
        username: "나",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "요리하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: true,
        reactionCount: 2,
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const DiaryMessages: Story = {
  args: {
    messages: [
      {
        id: "1",
        type: "member",
        style: "diary",
        username: "김민수",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "일기 쓰기",
        isChecked: true,
        diaryText: "오늘은 정말 의미있는 하루였다. 새로운 것을 배우고 성장하는 느낌이 들었다.",
        hasReaction: true,
        reactionCount: 4,
      },
      {
        id: "2",
        type: "me",
        style: "diary",
        username: "나",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "회고하기",
        isChecked: true,
        diaryText: "이번 프로젝트를 통해 많은 것을 배웠다. 특히 협업의 중요성을 깨달았다.",
        hasReaction: false,
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const ReactionMessages: Story = {
  args: {
    messages: [
      {
        id: "1",
        type: "member",
        style: "reaction",
        username: "박철수",
        mainText: "홍길동님의 투두에 반응을 남겼어요!",
        reactionType: "최고!",
        hasReaction: false,
      },
      {
        id: "2",
        type: "me",
        style: "reaction",
        username: "나",
        mainText: "김민수님의 투두에 반응을 남겼어요!",
        reactionType: "좋아!",
        hasReaction: true,
        reactionCount: 1,
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
        id: "1",
        type: "member",
        style: "todo",
        username: "이름(닉네임)",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        hasReaction: false,
      },
      {
        id: "2",
        type: "me",
        style: "todo",
        username: "이름(닉네임)",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        hasReaction: false,
      },
      {
        id: "3",
        type: "member",
        style: "todo",
        username: "이름(닉네임)",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        hasReaction: true,
        reactionCount: 2,
      },
      {
        id: "4",
        type: "me",
        style: "todo",
        username: "이름(닉네임)",
        mainText: "투두를 완료했어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        hasReaction: true,
        reactionCount: 2,
      },
      // Photo messages
      {
        id: "5",
        type: "member",
        style: "photo",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: false,
      },
      {
        id: "6",
        type: "me",
        style: "photo",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: false,
      },
      {
        id: "7",
        type: "member",
        style: "photo",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: true,
        reactionCount: 2,
      },
      {
        id: "8",
        type: "me",
        style: "photo",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        photoUrl: "https://via.placeholder.com/116",
        hasReaction: true,
        reactionCount: 2,
      },
      // Diary messages
      {
        id: "9",
        type: "member",
        style: "diary",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        diaryText: "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
        hasReaction: false,
      },
      {
        id: "10",
        type: "me",
        style: "diary",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        diaryText: "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
        hasReaction: false,
      },
      {
        id: "11",
        type: "member",
        style: "diary",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        diaryText: "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
        hasReaction: true,
        reactionCount: 2,
      },
      {
        id: "12",
        type: "me",
        style: "diary",
        username: "이름(닉네임)",
        mainText: "투두 기록을 남겼어요!",
        checkboxLabel: "프레이머 공부하기",
        isChecked: true,
        diaryText: "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
        hasReaction: true,
        reactionCount: 2,
      },
      // Reaction messages
      {
        id: "13",
        type: "member",
        style: "reaction",
        username: "이름(닉네임)",
        mainText: "홍길동님의 투두에 반응을 남겼어요!",
        reactionType: "최고!",
        hasReaction: false,
      },
      {
        id: "14",
        type: "me",
        style: "reaction",
        username: "이름(닉네임)",
        mainText: "홍길동님의 투두에 반응을 남겼어요!",
        reactionType: "최고!",
        hasReaction: false,
      },
      {
        id: "15",
        type: "member",
        style: "reaction",
        username: "이름(닉네임)",
        mainText: "홍길동님의 투두에 반응을 남겼어요!",
        reactionType: "최고!",
        hasReaction: true,
        reactionCount: 2,
      },
      {
        id: "16",
        type: "me",
        style: "reaction",
        username: "이름(닉네임)",
        mainText: "홍길동님의 투두에 반응을 남겼어요!",
        reactionType: "최고!",
        hasReaction: true,
        reactionCount: 2,
      },
    ],
    onReactionClick: action("reactionClicked"),
  },
};

export const Interactive = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "member",
      style: "todo",
      username: "김민수",
      mainText: "투두를 완료했어요!",
      checkboxLabel: "프레이머 공부하기",
      isChecked: true,
      hasReaction: false,
      reactionCount: 0,
    },
    {
      id: "2",
      type: "me",
      style: "photo",
      username: "나",
      mainText: "투두 기록을 남겼어요!",
      checkboxLabel: "요리하기",
      isChecked: true,
      photoUrl: "https://via.placeholder.com/116",
      hasReaction: true,
      reactionCount: 2,
    },
  ]);

  const handleReactionClick = (messageId: string) => {
    setMessages(prev => prev.map(message => {
      if (message.id === messageId) {
        const hasReaction = message.hasReaction;
        const currentCount = message.reactionCount || 0;
        
        if (hasReaction) {
          // 반응 제거
          const newCount = Math.max(0, currentCount - 1);
          return {
            ...message,
            hasReaction: newCount > 0,
            reactionCount: newCount,
          };
        } else {
          // 반응 추가
          return {
            ...message,
            hasReaction: true,
            reactionCount: currentCount + 1,
          };
        }
      }
      return message;
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h3 className="mb-4 font-bold">💡 하트 아이콘을 클릭해보세요!</h3>
      <GroupChat 
        messages={messages} 
        onReactionClick={handleReactionClick}
      />
    </div>
  );
};

export const Empty: Story = {
  args: {
    messages: [],
    onReactionClick: action("reactionClicked"),
  },
}; 