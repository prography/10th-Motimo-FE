"use client";

import { NotificationSetup } from "@/components/mypage";
import { useRouter } from "next/navigation";

export default function NotificationSetupPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return <NotificationSetup onBack={handleBack} />;
} 