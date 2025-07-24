"use client";

import { useState, useEffect } from "react";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useNotifications } from "@/api/hooks";
import { NotificationContent } from "@/components/notification/NotificationContent";

export default function NotificationPage() {
  const router = useSafeRouter();
  const [page, setPage] = useState(0);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 20;

  const { data: notificationData, mutate } = useNotifications(page, pageSize);
  const totalCount = notificationData?.totalCount ?? 0;

  // Update allNotifications when new data arrives
  useEffect(() => {
    if (notificationData?.content) {
      if (page === 0) {
        // First page - replace all notifications
        setAllNotifications(notificationData.content);
      } else {
        // Additional page - append to existing notifications
        setAllNotifications((prev) => {
          const existingIds = new Set(prev.map((n) => n.id));
          const newNotifications = (notificationData.content ?? []).filter(
            (n) => !existingIds.has(n.id),
          );
          return [...prev, ...newNotifications];
        });
      }
      setIsLoading(false);
    }
  }, [notificationData, page]);

  const handleBackClick = () => {
    router.back();
  };

  const handleMarkAllRead = () => {
    console.log("모든 알림을 읽음 처리");
    // TODO: Implement mark all as read API call
  };

  const handleLoadMore = (nextPage: number) => {
    setIsLoading(true);
    setPage(nextPage);
  };

  return (
    <NotificationContent
      onBackClick={handleBackClick}
      onMarkAllRead={handleMarkAllRead}
      onLoadMore={handleLoadMore}
      notificationData={notificationData}
      isLoading={isLoading}
      allNotifications={allNotifications}
      totalCount={totalCount}
    />
  );
}
