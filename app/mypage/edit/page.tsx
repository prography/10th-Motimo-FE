"use client";

import { EditProfile } from "@/components/mypage";

export default function EditProfilePage() {
    const handleSave = (data: { name: string; bio: string }) => {
        console.log("Saving profile data:", data);
        // TODO: Implement actual save logic
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
            initialName="홍길동"
            initialBio=""
            profileImageUrl="/profile-default.png"
            onSave={handleSave}
            onDeleteAccount={handleDeleteAccount}
            onAddInterests={handleAddInterests}
        />
    );
} 