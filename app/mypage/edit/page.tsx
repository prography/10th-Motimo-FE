"use client";

import {
  UserUpdateRq,
  UserUpdateRqInterestsEnum,
} from "@/api/generated/motimo/Api";
import { userApi } from "@/api/service";
import { EditProfile } from "@/components/mypage";

export default function EditProfilePage() {
  const handleSave = (request: UserUpdateRq, file?: File) => {
    userApi.updateMyProfile({
      request,
      file,
    });
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
    // TODO: Implement account deletion logic
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
    />
  );
}

