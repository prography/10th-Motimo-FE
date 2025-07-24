"use client";

import { useParams } from "next/navigation";
import GroupChatRoom from "@/components/group/groupRoom/GroupChatRoom/GroupChatRoom";
import GroupRoomHeader from "@/components/group/groupRoom/GroupRoomHeader/GroupRoomHeader";
import { useGroupDetail } from "@/api/hooks";
export default function GroupRoom() {
  const { id: groupId } = useParams<{ id: string }>();
  const { data } = useGroupDetail(groupId);

  return (
    <main className="flex flex-col gap-4 bg-background-alternative min-h-screen pb-4 relative">
      <GroupRoomHeader groupRoomName={data?.name ?? ""} groupId={groupId} />
      <GroupChatRoom groupId={groupId} />
    </main>
  );
}
