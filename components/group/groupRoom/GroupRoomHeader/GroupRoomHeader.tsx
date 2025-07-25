"use client";

import PeopleSvg from "@/public/images/People.svg";
import { AppBar } from "@/components/shared";
import { useRouter } from "next/navigation";

interface GroupRoomHeaderProps {
  groupRoomName: string;
  routeToMember: () => void;
  onBackClick: () => void;
}

const GroupRoomHeader = ({
  groupRoomName,
  routeToMember,
  onBackClick,
}: GroupRoomHeaderProps) => {
  return (
    <>
      <header className="flex items-center  gap-5 fixed top-0 w-[360px] bg-white">
        <AppBar
          type="back"
          title={groupRoomName}
          onBackClick={() => {
            onBackClick();
          }}
        />
        <button
          onClick={() => {
            routeToMember();
          }}
          type="button"
          className="w-10 h-10 text-label-alternative"
        >
          <PeopleSvg />
        </button>
      </header>
    </>
  );
};
export default GroupRoomHeader;
