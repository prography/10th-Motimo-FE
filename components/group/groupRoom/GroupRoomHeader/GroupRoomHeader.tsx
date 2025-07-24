"use client";

import PeopleSvg from "@/public/images/People.svg";
import { AppBar } from "@/components/shared";
import { useRouter } from "next/navigation";

interface GroupRoomHeaderProps {
  groupRoomName: string;
  groupId: string;
}

const GroupRoomHeader = ({ groupRoomName, groupId }: GroupRoomHeaderProps) => {
  const router = useRouter();
  return (
    <>
      <header className="flex items-center  gap-5 fixed top-0 w-[360px] bg-white">
        <AppBar
          type="back"
          title={groupRoomName}
          onBackClick={() => {
            router.back();
          }}
        />
        <button
          onClick={() => {
            router.push(`/group/${groupId}/member`);
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
