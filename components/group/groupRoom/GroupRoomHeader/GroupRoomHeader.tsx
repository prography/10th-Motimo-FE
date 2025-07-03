"use client";

import ChatIcon from "@/components/icons/ChatIcon";
import { AppBar } from "@/components/shared";

interface GroupRoomHeaderProps {
  groupRoomName: string;
}

const GroupRoomHeader = ({ groupRoomName }: GroupRoomHeaderProps) => {
  return (
    <>
      <header className="flex items-center  gap-5">
        <AppBar type="back" title={groupRoomName} />
        <button type="button" className="w-10 h-10">
          <ChatIcon color="#464C53" />
        </button>
      </header>
    </>
  );
};
export default GroupRoomHeader;
