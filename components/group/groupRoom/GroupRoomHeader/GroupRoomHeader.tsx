"use client";

import PeopleSvg from "@/public/images/People.svg";
import { AppBar } from "@/components/shared";
import { useRouter } from "next/navigation";

interface GroupRoomHeaderProps {
  groupRoomName: string;
}

const GroupRoomHeader = ({ groupRoomName }: GroupRoomHeaderProps) => {
  const router = useRouter();
  return (
    <>
      <header className="flex items-center  gap-5">
        <AppBar
          type="back"
          title={groupRoomName}
          onBackClick={() => {
            router.back();
          }}
        />
        <button type="button" className="w-10 h-10 text-label-alternative">
          <PeopleSvg />
        </button>
      </header>
    </>
  );
};
export default GroupRoomHeader;
