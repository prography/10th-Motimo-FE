"use client";

import { useParams } from "next/navigation";
import GroupChatRoom from "@/components/group/groupRoom/GroupChatRoom/GroupChatRoom";
import GroupRoomHeader from "@/components/group/groupRoom/GroupRoomHeader/GroupRoomHeader";
import { useGroupDetail } from "@/api/hooks";
export default function GroupRoom() {
  const { group_id: groupId } = useParams<{ group_id: string }>();
  const { data } = useGroupDetail(groupId);

  return (
    <main className="flex flex-col gap-4 bg-background-alternative min-h-screen">
      <GroupRoomHeader groupRoomName={data?.name ?? ""} />
      <GroupChatRoom groupId={groupId} />
    </main>
  );
}
