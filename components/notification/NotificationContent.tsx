"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { CustomPageNotificationItemRs } from "@/api/generated/motimo/Api";

const NOTIFICATION_TYPE_MESSAGES = {
  REACTION: "님이 리액션을 남겼습니다.",
  POKE: "님이 찔렀어요!",
  TODO_DUE_DAY: "투두가 1일 남았어요!",
  GROUP_TODO_COMPLETED: "님이 투두를 완료했어요!",
  GROUP_TODO_RESULT_COMPLETED: "님이 기록을 남겼어요!",
} as const;

interface Notification {
  id: string;
  type: keyof typeof NOTIFICATION_TYPE_MESSAGES;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationContentProps {
  onBackClick: () => void;
  onMarkAllRead: () => void;
  onLoadMore: (page: number) => void;
  notificationData?: CustomPageNotificationItemRs;
  isLoading: boolean;
  allNotifications: Notification[];
  totalCount: number;
}

export const NotificationContent = ({
  onBackClick,
  onMarkAllRead,
  onLoadMore,
  notificationData,
  isLoading,
  allNotifications,
  totalCount,
}: NotificationContentProps) => {
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageSize = notificationData?.size || 20;

  // Load next page function
  const loadNextPage = useCallback(() => {
    if (!isLoading && hasMore && notificationData) {
      const currentPage = notificationData.page ?? 0;
      const totalPages = Math.ceil(totalCount / pageSize);
      if (currentPage < totalPages - 1) {
        onLoadMore(currentPage + 1);
      }
    }
  }, [isLoading, hasMore, notificationData, totalCount, pageSize, onLoadMore]);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const threshold = 100; // Load more when 100px from bottom

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadNextPage();
    }
  }, [loadNextPage]);

  // Set up scroll listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Update hasMore when data changes
  useEffect(() => {
    if (notificationData) {
      const totalPages = Math.ceil(totalCount / pageSize);
      setHasMore((notificationData.page ?? 0) < totalPages - 1);
    }
  }, [notificationData, totalCount, pageSize]);

  const renderNotificationContent = (notification: Notification) => {
    const type = notification.type;
    const content = notification.content || "";

    switch (type) {
      case "REACTION":
      case "POKE":
      case "GROUP_TODO_COMPLETED":
      case "GROUP_TODO_RESULT_COMPLETED":
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content}
          </span>
        );
      case "TODO_DUE_DAY":
        return (
          <span className="font-SUIT_Variable font-normal text-base leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
            {content || '"투두 내용이 여기에" 투두가 1일 남았어요!'}
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
          onClick={onBackClick}
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
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        {/* Header with count and conditional mark all read button */}
        <div
          className={`flex items-center ${totalCount > 0 && "justify-between"} px-4 py-4`}
        >
          <div className="flex items-center gap-1">
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
              {totalCount}
            </span>
            <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
              개의 알림
            </span>
          </div>
          {totalCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="bg-[#E6E8EA] text-[#1E2124] px-3 py-1 rounded-lg text-sm font-Pretendard font-semibold"
            >
              모두 읽음
            </button>
          )}
        </div>

        {totalCount === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full">
            <p className="font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em] text-[#33363D] text-center">
              알림이 없습니다.
            </p>
          </div>
        ) : (
          /* Notification List */
          <div className="px-4 space-y-2">
            {allNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-2 bg-[#F7F7F8] rounded-lg p-3"
              >
                {/* Icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.isRead ? "bg-[#CDD1D5]" : "bg-[#5D5FEF]"
                  }`}
                >
                  <NotificationIcon color="white" width={16} height={16} />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-wrap items-center">
                  {renderNotificationContent(notification)}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#5D5FEF]"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Gesture Bar Placeholder */}
    </div>
  );
};

