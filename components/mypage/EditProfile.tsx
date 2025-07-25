"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSafeRouter } from "../../hooks/useSafeRouter";
import { AppBar } from "../shared/AppBar/AppBar";
import { Button } from "../shared/Button/Button";
import TextField from "../shared/TextField/TextField";
import { EditIcon } from "../icons/EditIcon";
import { PlusIcon } from "../icons/PlusIcon";
import ModalDeletingAccount from "../shared/Modal/ModalDeletingAccount/ModalDeletingAccount";
import { Toast } from "../shared/Toast/Toast";
import { InterestSelectionBottomSheet } from "../shared/BottomSheets/InterestSelectionBottomSheet";
import {
  UserUpdateRq,
  UserUpdateRqInterestsEnum,
} from "@/api/generated/motimo/Api";
import { UserUpdateRqInterestsEnumToKr } from "@/lib/display";
import { useMyProfile } from "@/api/hooks";

interface EditProfileProps {
  onSave?: (request: UserUpdateRq, file?: File) => void;
  onDeleteAccount?: () => void;
  onAddInterests?: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  onSave,
  onDeleteAccount,
  onAddInterests,
}) => {
  const { data: me } = useMyProfile();
  const router = useSafeRouter();
  const [userName, setUserName] = useState(me?.nickname ?? "");
  const [bio, setBio] = useState(me?.bio ?? "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showInterestBottomSheet, setShowInterestBottomSheet] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<
    UserUpdateRqInterestsEnum[]
  >([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBack = () => {
    router.back();
  };

  const showToast = (message: string, duration = 2000) => {
    setToastMessage(message);
    setToastVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, duration);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        userName,
        bio,
        interests: selectedInterests,
      });
      showToast("저장 되었습니다");
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDeleteAccount = () => {
    if (onDeleteAccount) {
      onDeleteAccount();
    }
    setShowDeleteModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleAddInterests = () => {
    setShowInterestBottomSheet(true);
  };

  const handleSaveInterests = (interests: UserUpdateRqInterestsEnum[]) => {
    setSelectedInterests(interests);
  };

  const handleCloseInterestBottomSheet = () => {
    setShowInterestBottomSheet(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-Color-white w-[360px] h-screen relative">
      {/* AppBar */}
      <div className="flex items-center px-3 h-14 bg-Color-white relative">
        <button
          className="flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer p-0 flex-shrink-0 hover:opacity-70"
          onClick={handleBack}
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

        <div className="flex-1 ml-5">
          <h1 className="font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.02em] text-Color-black m-0">
            계정 설정
          </h1>
        </div>

        <Button
          variant="filled"
          size="s"
          className="bg-Color-primary-50 text-Color-white rounded-lg px-3 py-1 text-sm font-semibold"
          onClick={handleSave}
        >
          저장
        </Button>
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mt-16 mb-8">
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full bg-Color-gray-5 p-2.5 overflow-hidden">
            <img
              src={me?.profileImageUrl || "/profile-default.png"}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <button
            className="absolute bottom-0 right-0 w-6 h-6 bg-Color-white border border-Color-gray-30 rounded-full flex items-center justify-center hover:opacity-70"
            aria-label="프로필 이미지 편집"
          >
            <EditIcon />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="px-4 space-y-6">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-Color-black">
            이름
          </label>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="유저명을 입력해 주세요"
            isError={false}
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-1">
          <label className="block text-sm font-bold text-Color-black">
            한줄소개
          </label>
          <TextField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="본인을 소개하는 문구를 작성해주세요."
            isError={false}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-2 bg-Color-gray-5 mt-12 mb-6"></div>

      {/* Interests Section */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-Color-black">관심사</span>
          <Button
            variant="filled"
            size="m"
            icon={<PlusIcon />}
            className="bg-Color-gray-5 text-Color-black rounded-lg"
            onClick={handleAddInterests}
          >
            추가
          </Button>
        </div>

        {/* Selected Interests Display */}
        {selectedInterests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-2 bg-Color-primary-50 text-Color-white text-sm font-medium rounded-full"
              >
                {UserUpdateRqInterestsEnumToKr(interest)}
              </span>
            ))}
          </div>
        )}

        {selectedInterests.length === 0 && (
          <p className="text-Color-gray-60 text-sm">관심사를 추가해보세요!</p>
        )}
      </div>

      {/* Account Delete Button */}
      <div className="mt-auto mb-4 px-4">
        <button
          className="w-full h-10 flex items-center justify-center text-sm font-medium text-Color-gray-60 hover:text-Color-status-negative transition-colors"
          onClick={handleDeleteAccount}
        >
          계정삭제
        </button>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <ModalDeletingAccount
          onClose={handleCloseDeleteModal}
          onDeleteAccount={handleConfirmDeleteAccount}
        />
      )}

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast text={toastMessage} />
        </div>
      )}

      {/* Interest Selection Bottom Sheet */}
      <InterestSelectionBottomSheet
        isOpen={showInterestBottomSheet}
        onClose={handleCloseInterestBottomSheet}
        onSave={handleSaveInterests}
        initialInterests={selectedInterests}
      />
    </div>
  );
};
