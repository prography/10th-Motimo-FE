"use client";

import { use } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { GroupChat, SystemMessage } from "@/components/group";
import { UsersGroupIcon } from "@/components/icons";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import {
  useGroupChat,
  useGroupDetail,
  useJoinedGroups,
  useMyProfile,
} from "@/api/hooks";
import { GetGroupChatParamsDirectionEnum } from "@/api/generated/motimo/Api";
interface GroupDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id } = use(params);
  const { data: { name: title } = {}, error } = useGroupDetail(id);

  const { data: groupChat } = useGroupChat(
    id,
    "0",
    "0",
    GetGroupChatParamsDirectionEnum.AFTER,
  );
  const router = useSafeRouter();

  const handleBackClick = () => {
    router.push("/group");
  };

  const handleReactionClick = (messageId: string) => {
    console.log("Reaction clicked for message:", messageId);
    // TODO: Implement reaction functionality
  };

  const handleMemberClick = () => {
    router.push(`/group/${id}/member`);
  };

  const { data: { nickname } = {} } = useMyProfile();

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
          {title}
        </h1>

        <button
          onClick={handleMemberClick}
          className="flex items-center justify-center w-10 h-10 rounded-full"
          aria-label="그룹 멤버 보기"
        >
          <UsersGroupIcon width={24} height={24} color="#464C53" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* System Message */}
        <div className="px-4 py-4">
          <SystemMessage message={`${nickname}님이 그룹에 입장했습니다.`} />
        </div>

        {/* Chat Messages */}
        <div className="px-4 pb-4">
          <GroupChat
            messages={groupChat?.messages ?? []}
            onReactionClick={handleReactionClick}
          />
        </div>
      </div>

      {/* Bottom Gesture Bar Placeholder - 무시 */}
    </div>
  );
}
