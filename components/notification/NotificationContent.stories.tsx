import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { NotificationContent } from "./NotificationContent";
import { NotificationItemRsTypeEnum } from "@/api/generated/motimo/Api";

// Mock data generator
const generateMockNotifications = (page: number, size: number) => {
  const startIndex = page * size;
  const notifications = [];
  
  const types = [
    NotificationItemRsTypeEnum.REACTION,
    NotificationItemRsTypeEnum.POKE,
    NotificationItemRsTypeEnum.TODO_DUE_DAY,
    NotificationItemRsTypeEnum.GROUP_TODO_COMPLETED,
    NotificationItemRsTypeEnum.GROUP_TODO_RESULT_COMPLETED
  ];
  const nicknames = ["김철수", "이영희", "박민수", "최지은", "정다은", "강호준", "서윤아", "조현우"];
  
  for (let i = 0; i < size; i++) {
    const index = startIndex + i;
    const type = types[index % types.length];
    const nickname = nicknames[index % nicknames.length];
    
    let content = "";
    switch (type) {
      case NotificationItemRsTypeEnum.REACTION:
        content = `${nickname}님이 리액션을 남겼습니다.`;
        break;
      case NotificationItemRsTypeEnum.POKE:
        content = `${nickname}님이 찔렀어요!`;
        break;
      case NotificationItemRsTypeEnum.TODO_DUE_DAY:
        content = `"${nickname}의 투두 ${index + 1}" 투두가 1일 남았어요!`;
        break;
      case NotificationItemRsTypeEnum.GROUP_TODO_COMPLETED:
        content = `${nickname}님이 투두를 완료했어요!`;
        break;
      case NotificationItemRsTypeEnum.GROUP_TODO_RESULT_COMPLETED:
        content = `${nickname}님이 기록을 남겼어요!`;
        break;
    }
    
    notifications.push({
      id: `mock-${index}`,
      type,
      content,
      isRead: Math.random() > 0.3, // 70% chance of being read
      createdAt: new Date(Date.now() - index * 3600000).toISOString(), // 1 hour apart
    });
  }
  
  return notifications;
};

// Story wrapper component for infinite scroll testing
const NotificationContentWithMockData = ({ totalCount }: { totalCount: number }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allNotifications, setAllNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 20;

  // Initialize with first page
  React.useEffect(() => {
    if (totalCount > 0) {
      const firstPageData = generateMockNotifications(0, pageSize);
      setAllNotifications(firstPageData);
    } else {
      setAllNotifications([]);
    }
  }, [totalCount, pageSize]);

  const handleLoadMore = (nextPage: number) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newNotifications = generateMockNotifications(nextPage, pageSize);
      setAllNotifications(prev => [...prev, ...newNotifications]);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 500);
  };

  const notificationData = totalCount > 0 ? {
    content: generateMockNotifications(currentPage, pageSize),
    totalCount,
    page: currentPage,
    size: pageSize,
  } : undefined;

  return (
    <NotificationContent
      onBackClick={() => console.log("Back clicked")}
      onMarkAllRead={() => console.log("Mark all read clicked")}
      onLoadMore={handleLoadMore}
      notificationData={notificationData}
      isLoading={isLoading}
      allNotifications={allNotifications}
      totalCount={totalCount}
    />
  );
};

const meta: Meta<typeof NotificationContentWithMockData> = {
  title: "Components/Notification/NotificationContent",
  component: NotificationContentWithMockData,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  argTypes: {
    totalCount: {
      control: { type: "number", min: 0, max: 500, step: 1 },
      description: "Total number of notifications for testing infinite scroll",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationContentWithMockData>;

export const Primary: Story = {
  args: {
    totalCount: 25,
  },
  parameters: {
    docs: {
      description: {
        story: "Default notification list with a moderate number of notifications showing typical usage.",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    totalCount: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Empty state when there are no notifications.",
      },
    },
  },
};

export const FewNotifications: Story = {
  args: {
    totalCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story: "A small number of notifications that fit on one page.",
      },
    },
  },
};

export const OnePageExact: Story = {
  args: {
    totalCount: 20,
  },
  parameters: {
    docs: {
      description: {
        story: "Exactly one page worth of notifications (20 items).",
      },
    },
  },
};

export const InfiniteScrollTest: Story = {
  args: {
    totalCount: 156,
  },
  parameters: {
    docs: {
      description: {
        story: "Many notifications for testing infinite scroll. Scroll down to see more pages load automatically. This simulates 156 total notifications across ~8 pages.",
      },
    },
  },
};

export const VariedNotificationTypes: Story = {
  args: {
    totalCount: 50,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows all different notification types (REACTION, POKE, TODO_DUE_DAY, GROUP_TODO_COMPLETED, GROUP_TODO_RESULT_COMPLETED) with varied read/unread states.",
      },
    },
  },
};