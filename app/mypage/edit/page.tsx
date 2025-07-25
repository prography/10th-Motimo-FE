"use client";

import {
  UserUpdateRq,
  UserUpdateRqInterestsEnum,
} from "@/api/generated/motimo/Api";
import { userApi } from "@/api/service";
import { EditProfile } from "@/components/mypage";
import useToast from "@/hooks/useToast";
import useAuthStore from "@/stores/useAuthStore";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EditProfileContent() {
  const searchParams = useSearchParams();
  const openInterests = searchParams.get("openInterests") === "true";
  const handleSave = (request: UserUpdateRq, file?: File) => {
    userApi.updateMyProfile({
      request,
      file,
    });
  };

  const { toastInfo, setToast } = useToast();
  const { logout } = useAuthStore();

  const handleDeleteAccount = () => {
    userApi.deleteUser().then(() => {
      setToast("User 가 삭제 되었습니다");
      // wait 2 sec and redirect to home
      setTimeout(() => {
        logout();
        window.location.href = "/";
      }, 2000);
    });
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

export default function EditProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProfileContent />
    </Suspense>
  );
}
