"use client";

import { AppBar } from "@/components/shared/AppBar/AppBar";
import { GroupChat, SystemMessage } from "@/components/group";
import { UsersGroupIcon } from "@/components/icons";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { ChatMessage } from "@/components/group/GroupChat";

// Mock data for demonstration
const mockMessages: ChatMessage[] = [
  {
    id: "1",
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
    id: "2",
    type: "member",
    style: "diary",
    username: "이름(닉네임)",
    mainText: "투두 기록을 남겼어요!",
    checkboxLabel: "프레이머 공부하기",
    isChecked: true,
    diaryText:
      "다양한 툴을 익히기 위해 어쩌구저쩌구 짧은 기록이 여기에 다 보이게 됩니다.",
    hasReaction: false,
  },
  {
    id: "3",
    type: "member",
    style: "photo",
    username: "이름(닉네임)",
    mainText: "투두 기록을 남겼어요!",
    checkboxLabel: "프레이머 공부하기",
    isChecked: true,
    photoUrl: "/profile-default.png",
    hasReaction: false,
  },
];

interface GroupDetailPageProps {
  params: {
    id: string;
  };
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const router = useSafeRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleReactionClick = (messageId: string) => {
    console.log("Reaction clicked for message:", messageId);
    // TODO: Implement reaction functionality
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Status Bar Placeholder - 무시 */}

      {/* AppBar */}
      <div className="flex items-center justify-between px-3 py-2 h-14 bg-white">
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center w-6 h-6"
          aria-label="뒤로 가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#33363D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 className="flex-1 ml-5 font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.01em] text-black truncate">
          "내 목표명"의 그룹 (길면...처리)
        </h1>

        <div className="flex items-center justify-center w-10 h-10 rounded-full">
          <UsersGroupIcon width={24} height={24} color="#464C53" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* System Message */}
        <div className="px-4 py-4">
          <SystemMessage message="000님이 그룹에 입장했습니다." />
        </div>

        {/* Chat Messages */}
        <div className="px-4 pb-4">
          <GroupChat
            messages={mockMessages}
            onReactionClick={handleReactionClick}
          />
        </div>
      </div>

      {/* Bottom Gesture Bar Placeholder - 무시 */}
    </div>
  );
}
