"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import GroupChatRoom from "@/components/group/groupRoom/GroupChatRoom/GroupChatRoom";
import GroupRoomHeader from "@/components/group/groupRoom/GroupRoomHeader/GroupRoomHeader";
import { useGroupDetail } from "@/api/hooks";

export default function GroupRoom() {
  const { id: groupId } = useParams<{ id: string }>();
  const { data } = useGroupDetail(groupId);
  const router = useRouter();
  const fromPath = useSearchParams().get("from");

  return (
    <main className="flex flex-col gap-4 bg-background-alternative min-h-screen pb-4 relative">
      <GroupRoomHeader
        groupRoomName={data?.name ?? ""}
        onBackClick={() => {
          if (fromPath && fromPath === "details") {
            router.back();
          }
          router.push("/group");
        }}
        routeToMember={() => router.push(`/group/${groupId}/member`)}
      />
      <GroupChatRoom groupId={groupId} />
    </main>
  );
}
