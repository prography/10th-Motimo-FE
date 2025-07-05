"use client";

import { TermsOfService } from "@/components/mypage";
import { useRouter } from "next/navigation";

export default function TermsOfServicePage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return <TermsOfService onBack={handleBack} />;
} 