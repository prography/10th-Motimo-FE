"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "../shared/AppBar/AppBar";
import { Button } from "../shared/Button/Button";
import TextField from "../shared/TextField/TextField";
import { EditIcon } from "../icons/EditIcon";
import { PlusIcon } from "../icons/PlusIcon";

interface EditProfileProps {
    initialName?: string;
    initialBio?: string;
    profileImageUrl?: string;
    onSave?: (data: { name: string; bio: string }) => void;
    onDeleteAccount?: () => void;
    onAddInterests?: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({
    initialName = "",
    initialBio = "",
    profileImageUrl = "/profile-default.png",
    onSave,
    onDeleteAccount,
    onAddInterests,
}) => {
    const router = useRouter();
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);

    const handleBack = () => {
        router.back();
    };

    const handleSave = () => {
        if (onSave) {
            onSave({ name, bio });
        }
        router.back();
    };

    const handleDeleteAccount = () => {
        if (onDeleteAccount) {
            onDeleteAccount();
        }
    };

    const handleAddInterests = () => {
        if (onAddInterests) {
            onAddInterests();
        }
    };

    return (
        <div className="flex flex-col bg-Color-white w-[360px] h-[800px] relative">
            {/* Status bar */}
            <div className="flex justify-between items-end px-6 py-2.5 h-[52px]">
                <span className="text-sm font-medium text-Color-black">9:30</span>
                <div className="flex items-center gap-4">
                    {/* Wifi, Signal, Battery icons would go here */}
                </div>
            </div>

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
                            src={profileImageUrl}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="홍길동"
                        isError={false}
                        className="w-full"
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
                        className="w-full"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-2 bg-Color-gray-5 mt-12 mb-6"></div>

            {/* Interests Section */}
            <div className="px-4 flex items-center justify-between">
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

            {/* Account Delete Button */}
            <div className="mt-auto mb-6 px-4">
                <button
                    className="w-full h-10 flex items-center justify-center text-sm font-medium text-Color-gray-60 hover:text-Color-status-negative transition-colors"
                    onClick={handleDeleteAccount}
                >
                    계정삭제
                </button>
            </div>

            {/* Gesture bar */}
            <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center">
                <div className="w-[108px] h-1 bg-Color-black rounded-full opacity-30"></div>
            </div>
        </div>
    );
}; 