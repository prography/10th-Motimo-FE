"use client";

import { AppBar } from "@/components/shared/AppBar/AppBar";
import { BellIcon } from "@/components/icons/BellIcon";
import Image from "next/image";

interface FeedPageProps {
  onNotificationClick?: () => void;
}

export const FeedPage = ({ onNotificationClick }: FeedPageProps) => {
  return (
    <div className="h-[calc(100vh-56px)] bg-white flex flex-col">
      {/* App Bar */}
      <AppBar title="피드" type="main" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Image */}
          <div className="w-[100px] h-[115px] relative">
            <Image
              src="/images/feed-image-4e12a7.png"
              alt="Feed coming soon"
              fill
              className="object-cover"
            />
          </div>

          {/* Message Container */}
          <div className="bg-[#F7F7F8] rounded px-2 py-4 w-full">
            <p className="text-[#33363D] text-center font-SUIT_Variable font-bold text-base leading-[1.2] tracking-[-0.01em]">
              피드는 아직 준비 중입니다.
              <br />
              나중에 만나요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

