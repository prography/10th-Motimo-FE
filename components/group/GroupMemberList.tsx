"use client";

import { useState, useRef, useEffect } from "react";
import { groupApi } from "@/api/service";
import formatDate from "@/lib/date";
import { Toast } from "@/components/shared/Toast/Toast";

interface Member {
  userId: string;
  nickname: string;
  lastOnlineDate: string;
}

interface GroupMemberListProps {
  members: Member[];
  myNickname: string;
  groupId: string;
}

export default function GroupMemberList({ members, myNickname, groupId }: GroupMemberListProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePokeUser = async (userId: string, nickname: string) => {
    try {
      await groupApi.sendPokeNotification(groupId, userId);
      setToastMessage(`${nickname}님에게 찌르기를 보냈어요!`);
      setToastVisible(true);
      
      timeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    } catch (error) {
      console.error("찌르기 전송 실패:", error);
      setToastMessage("찌르기 전송에 실패했습니다.");
      setToastVisible(true);
      
      timeoutRef.current = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    }
  };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Members List */}
      <div className="space-y-4">
        {members.map((member) => {
          const isMe = member.nickname === myNickname;

          return (
            <div
              key={member.userId}
              className="flex items-center justify-between bg-[#F7F7F8] rounded-lg p-3"
            >
              <div className="flex-1">
                <div className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-[#1E2124]">
                  {member.nickname}
                  {isMe ? " (나)" : ""}
                </div>
                <div className="flex items-center text-sm leading-[1.4] tracking-[-0.01em] text-[#464C53]">
                  <span className="font-SUIT_Variable font-medium">
                    최근 접속일 :{" "}
                  </span>
                  <span className="font-SUIT_Variable font-medium">
                    {formatDate(member.lastOnlineDate)}
                  </span>
                </div>
              </div>

              {!isMe && 
                new Date().getTime() - new Date(member.lastOnlineDate).getTime() > 7 * 24 * 60 * 60 * 1000 && (
                <button
                  onClick={() =>
                    handlePokeUser(member.userId, member.nickname)
                  }
                  className="bg-[#33363D] text-white px-3 py-1 rounded-lg text-sm font-Pretendard font-semibold"
                >
                  찌르기
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast text={toastMessage} />
        </div>
      )}
    </>
  );
}