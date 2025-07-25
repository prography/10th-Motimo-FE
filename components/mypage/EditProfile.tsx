"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSafeRouter } from "../../hooks/useSafeRouter";
import { AppBar } from "../shared/AppBar/AppBar";
import { Button } from "../shared/Button/Button";
import TextField from "../shared/TextField/TextField";
import { EditIcon } from "../icons/EditIcon";
import { PlusIcon } from "../icons/PlusIcon";
import ModalDeletingAccount from "../shared/Modal/ModalDeletingAccount/ModalDeletingAccount";
import useToast from "@/hooks/useToast";
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
  openInterests?: boolean;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  onSave,
  onDeleteAccount,
  onAddInterests,
  openInterests = false,
}) => {
  const { data: me } = useMyProfile();
  const router = useSafeRouter();
  const [userName, setUserName] = useState(me?.nickname ?? "");
  const [bio, setBio] = useState(me?.bio ?? "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setToast } = useToast();
  const [showInterestBottomSheet, setShowInterestBottomSheet] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<
    UserUpdateRqInterestsEnum[]
  >((me?.interestTypes as unknown as UserUpdateRqInterestsEnum[]) ?? []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    router.back();
  };


  const handleSave = () => {
    if (onSave) {
      onSave(
        {
          userName,
          bio,
          interests: selectedInterests,
        },
        selectedFile || undefined,
      );
      setToast("저장 되었습니다");
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (openInterests) {
      setShowInterestBottomSheet(true);
    }
  }, [openInterests]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col bg-Color-white w-[360px] h-screen relative">
      {/* AppBar */}
      <div className="relative">
        <AppBar type="back" title="계정 설정" onBackClick={handleBack} />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Button
            variant="filled"
            size="s"
            className="bg-Color-primary-50 text-Color-white rounded-lg px-3 py-1 text-sm font-semibold"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>

      {/* Profile Image Section */}
      {/* <div className="flex flex-col items-center mt-5 mb-8"> */}
      <div className="bg-Color-white py-5">
        <div className={`flex flex-col items-center gap-4 py-5 w-full`}>
          <div className="relative">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
              <img
                src={
                  previewUrl || me?.profileImageUrl || "/profile-default.png"
                }
                alt="프로필 이미지"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-6 h-6 bg-Color-white border border-Color-gray-30 rounded-full flex items-center justify-center hover:opacity-70"
              aria-label="프로필 이미지 편집"
              onClick={handleEditImage}
            >
              <EditIcon />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="프로필 이미지 파일 선택"
            />
          </div>
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
