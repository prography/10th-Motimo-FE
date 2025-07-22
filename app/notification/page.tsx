"use client";

import { useState } from "react";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useNotifications } from "@/api/hooks";

const NOTIFICATION_TYPE_MESSAGES = {
  REACTION: "님이 리액션을 남겼습니다.",
  POKE: "님이 찔렀어요!",
  TODO_DUE_DAY: "투두가 1일 남았어요!",
  GROUP_TODO_COMPLETED: "님이 투두를 완료했어요!",
  GROUP_TODO_RESULT_COMPLETED: "님이 기록을 남겼어요!",
} as const;

export default function NotificationPage() {
  const router = useSafeRouter();
  const [page, setPage] = useState(0);
  const pageSize = 20;
  
  const { data: notificationData, mutate } = useNotifications(page, pageSize);
  const notifications = notificationData?.content ?? [];
  const totalCount = notificationData?.totalCount ?? 0;

  const handleBackClick = () => {
    router.back();
  };

  const handleMarkAllRead = () => {
    console.log("모든 알림을 읽음 처리");
    // TODO: Implement mark all as read API call
  };

  const renderNotificationContent = (notification: any) => {
    const type = notification.type;
    const content = notification.content || "";

    // Extract nickname from content if possible
    const nicknameMatch = content.match(/^([^님]+)님/);
    const nickname = nicknameMatch ? nicknameMatch[1] : "닉네임";

    switch (type) {
      case "REACTION":
        return (
          <>
            <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
              {nickname}
            </span>
            <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
              님이 리액션을 남겼습니다.
            </span>
          </>
        );
      case "POKE":
        return (
          <>
            <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
              {nickname}
            </span>
            <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
              님이 찔렀어요!
            </span>
          </>
        );
      case "TODO_DUE_DAY":
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content || "\"투두 내용이 여기에\" 투두가 1일 남았어요!"}
          </span>
        );
      case "GROUP_TODO_COMPLETED":
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content || `${nickname}님이 투두를 완료했어요!`}
          </span>
        );
      case "GROUP_TODO_RESULT_COMPLETED":
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content || `${nickname}님이 기록을 남겼어요!`}
          </span>
        );
      default:
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Status Bar Placeholder */}

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

        <h1 className="flex-1 ml-5 font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.01em] text-black">
          알림
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {totalCount === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center gap-1 px-4 py-4">
              <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                0
              </span>
              <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                개의 알림
              </span>
            </div>
            <p className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-[#33363D] text-center">
              알림이 없습니다.
            </p>
          </div>
        ) : (
          <>
            {/* Header with count and mark all read button */}
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-1">
                <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                  {totalCount}
                </span>
                <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
                  개의 알림
                </span>
              </div>
              <button
                onClick={handleMarkAllRead}
                className="bg-[#E6E8EA] text-[#1E2124] px-3 py-1 rounded-lg text-sm font-Pretendard font-semibold"
              >
                모두 읽음
              </button>
            </div>

            {/* Notification List */}
            <div className="px-4 space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-2 bg-[#F7F7F8] rounded-lg p-3"
                >
                  {/* Icon */}
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.isRead ? 'bg-[#CDD1D5]' : 'bg-[#5D5FEF]'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2.66666 6.00001C2.66666 6.00001 4.31866 10.6667 7.99999 10.6667C11.6813 10.6667 13.3333 6.00001 13.3333 6.00001C13.3333 6.00001 11.6813 1.33334 7.99999 1.33334C4.31866 1.33334 2.66666 6.00001 2.66666 6.00001Z"
                        stroke="white"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                        stroke="white"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-wrap items-center">
                    {renderNotificationContent(notification)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Gesture Bar Placeholder */}
    </div>
  );
}