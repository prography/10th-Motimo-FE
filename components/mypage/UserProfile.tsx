"use client";

import { Button } from "@/components/shared/Button/Button";
import { UserIcon } from "@/components/icons/UserIcon";

interface UserProfileProps {
    name: string;
    profileImage?: string;
    onEdit: () => void;
    onAddInterests: () => void;
    className?: string;
}

export function UserProfile({
    name,
    profileImage,
    onEdit,
    onAddInterests,
    className = ""
}: UserProfileProps) {
    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            {/* Profile Section */}
            <div className="flex flex-col items-center gap-2 relative">
                {/* Profile Picture */}
                <div className="relative">
                    <div className="w-[100px] h-[100px] bg-Color-gray-10 rounded-full border border-Color-gray-20 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt={name}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <UserIcon className="w-12 h-12 text-Color-gray-70" />
                        )}
                    </div>

                    {/* Edit Button */}
                    <button
                        onClick={onEdit}
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-Color-white border border-Color-gray-20 rounded-full flex items-center justify-center"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M2.67 13.33h1.39l8.22-8.22-1.39-1.39-8.22 8.22v1.39z M13.28 3.72c.39-.39.39-1.02 0-1.41l-.98-.98c-.39-.39-1.02-.39-1.41 0l-1.05 1.05 1.39 1.39 1.05-1.05z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                fill="none"
                            />
                        </svg>
                    </button>
                </div>

                {/* User Name */}
                <h2 className="text-xl font-bold text-Color-gray-90 text-center">
                    {name}
                </h2>
            </div>

            {/* Add Interests Button */}
            <Button
                variant="filled"
                size="s"
                onClick={onAddInterests}
                className="bg-Color-gray-10 border border-Color-gray-20 text-black"
                icon={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M10 5v10M5 10h10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                }
            >
                내 관심사 추가
            </Button>
        </div>
    );
} 