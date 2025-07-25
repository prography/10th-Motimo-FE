"use client";

import { use, useState, useRef, useEffect } from "react";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useGroupMembers, useGroupDetail, useMyProfile } from "@/api/hooks";
import { groupApi } from "@/api/service";
import { Toast } from "@/components/shared/Toast/Toast";
import Modal from "@/components/shared/Modal/_compound/Modal";
import GroupMemberList from "@/components/group/GroupMemberList";
import useToast from "@/hooks/useToast";

interface GroupMemberPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GroupMemberPage({ params }: GroupMemberPageProps) {
  const { id } = use(params);
  const router = useSafeRouter();
  const { data: { name: title } = {} } = useGroupDetail(id);
  const { data: members = [] } = useGroupMembers(id);
  const { data: { nickname: myNickname } = {} } = useMyProfile();
  // const [toastVisible, setToastVisible] = useState(false);
  // const [toastMessage, setToastMessage] = useState("");
  const { setToast } = useToast();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBackClick = () => {
    router.push(`/group/${id}`);
  };

  const handleLeaveGroup = () => {
    setShowLeaveModal(true);
  };

  const handleLeaveConfirm = async () => {
    setShowLeaveModal(false);

    try {
      await groupApi.exitGroup(id);
      // setToastMessage("그룹을 나갔습니다.");
      // setToastVisible(true);
      setToast("그룹에서 나왔습니다.");

      // timeoutRef.current = setTimeout(() => {
      //   setToastVisible(false);
      //   router.push("/group");
      // }, 2000);
    } catch (error) {
      console.error("그룹 나가기 실패:", error);
      // setToastMessage("그룹 나가기에 실패했습니다.");
      // setToastVisible(true);
      setToast("그룹 나가기에 실패했습니다.");

      // timeoutRef.current = setTimeout(() => {
      //   setToastVisible(false);
      // }, 2000); // Consistent timeout duration
    }
  };

  const handleLeaveCancel = () => {
    setShowLeaveModal(false);
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
    <div className="flex flex-col h-screen bg-white">
      {/* Status Bar Placeholder */}

      {/* AppBar */}
      <div className="flex items-center justify-between px-3 py-2 h-14 bg-white">
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center w-6 h-6"
          aria-label="뒤로 가기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#33363D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 className="flex-1 ml-5 font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.01em] text-black">
          멤버
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <GroupMemberList
          members={members}
          myNickname={myNickname || ""}
          groupId={id}
        />
      </div>

      {/* Leave Group Button */}
      <div className="p-4 pb-8">
        <button
          onClick={handleLeaveGroup}
          className="w-full border border-[#EA3429] bg-white text-[#EA3429] py-2.5 rounded-lg font-Pretendard font-semibold text-base flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11V16M14 11V16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6"
              stroke="#EA3429"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          그룹 나가기
        </button>
      </div>

      {/* Toast */}
      {/* {toastVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast text={toastMessage} />
        </div>
      )} */}

      {/* Leave Group Modal */}
      {showLeaveModal && (
        <Modal
          backdropProps={{ onClick: handleLeaveCancel }}
          bodyNode={
            <div className="px-6 py-6 text-center">
              <p className="font-SUIT_Variable font-medium text-base leading-[1.5] tracking-[-0.01em] text-[#1E2124]">
                정말로 그룹을 나가시겠습니까?
              </p>
            </div>
          }
          footerNode={[
            <Modal.Button
              key="cancel"
              color="alternative"
              text="취소"
              onClick={handleLeaveCancel}
            />,
            <Modal.Button
              key="confirm"
              color="negative"
              text="나가기"
              onClick={handleLeaveConfirm}
            />,
          ]}
        />
      )}

      {/* Bottom Gesture Bar Placeholder */}
    </div>
  );
}
