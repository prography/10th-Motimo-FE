"use client";

import {
  UserUpdateRq,
  UserUpdateRqInterestsEnum,
} from "@/api/generated/motimo/Api";
import { userApi } from "@/api/service";
import { EditProfile } from "@/components/mypage";
import { useSearchParams } from "next/navigation";

export default function EditProfilePage() {
  const searchParams = useSearchParams();
  const openInterests = searchParams.get("openInterests") === "true";
  const handleSave = (request: UserUpdateRq, file?: File) => {
    userApi.updateMyProfile({
      request,
      file,
    });
  };

  const handleDeleteAccount = () => {
    alert("삭제는 미구현입니다.");
  };

  const handleAddInterests = () => {
    console.log("Add interests requested");
    // TODO: Navigate to interests selection page
  };

  return (
    <EditProfile
      onSave={handleSave}
      onDeleteAccount={handleDeleteAccount}
      onAddInterests={handleAddInterests}
      openInterests={openInterests}
    />
  );
}
