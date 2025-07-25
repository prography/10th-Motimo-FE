"use client";

import { Button } from "@/components/shared/Button/Button";
import { UserIcon } from "@/components/icons/UserIcon";
import { useSafeRouter } from "../../hooks/useSafeRouter";
import { EditIcon } from "../icons";

interface UserProfileProps {
  name: string;
  profileImage?: string;
  onAddInterests: () => void;
  className?: string;
}

export function UserProfile({
  name,
  profileImage,
  onAddInterests,
  className = "",
}: UserProfileProps) {
  const router = useSafeRouter();

  const handleEdit = () => {
    router.push("/mypage/edit");
  };

  return (
    <div
      className={`flex flex-col items-center gap-4 bg-Color-gray-5 py-5 ${className} w-full`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-2 relative">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={profileImage || "/profile-default.png"}
              alt={name}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </div>

          {/* Edit Button */}
          <button
            className="absolute bottom-0 right-0 w-6 h-6 bg-Color-white border border-Color-gray-30 rounded-full flex items-center justify-center hover:opacity-70"
            aria-label="프로필 이미지 편집"
            onClick={handleEdit}
          >
            <EditIcon />
          </button>
        </div>

        {/* User Name */}
        <h2 className="text-xl font-bold text-Color-gray-90 text-center">
          {name}
        </h2>
      </div>

      {/* Add Interests Button */}
      <Button
        variant="outlined"
        size="s"
        onClick={onAddInterests}
        className="border border-Color-gray-20 text-black"
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
