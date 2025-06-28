"use client";

import { useState, useEffect } from "react";
import { AppBar } from "@/components/shared/AppBar/AppBar";
import { BottomTabBar } from "@/components/shared/BottomTabBar/BottomTabBar";
import { UserProfile } from "./UserProfile";
import { PointsDisplay } from "./PointsDisplay";
import { NavigationList } from "./NavigationList";
import { GuestLoginSection } from "./GuestLoginSection";

interface MyPageProps {
    className?: string;
}

export function MyPage({ className = "" }: MyPageProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        name: "몰입한 곰돌이",
        profileImage: "/placeholder-profile.jpg",
        points: 1000
    });

    useEffect(() => {
        // Check if user is logged in
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const navigationItems = isLoggedIn ? [
        {
            label: "완료한 목표/투두 보기",
            hasIcon: true,
            onClick: () => console.log("Navigate to completed goals")
        },
        {
            label: "알림 설정",
            hasIcon: true,
            onClick: () => console.log("Navigate to notifications")
        },
        {
            label: "서비스 이용약관",
            hasIcon: true,
            onClick: () => console.log("Navigate to terms")
        },
        {
            label: "버전 정보 v1.0",
            hasIcon: false,
            onClick: () => { }
        }
    ] : [
        {
            label: "서비스 이용약관",
            hasIcon: true,
            onClick: () => console.log("Navigate to terms")
        },
        {
            label: "버전 정보 v1.0",
            hasIcon: false,
            onClick: () => { }
        }
    ];

    return (
        <div className={`min-h-screen bg-Color-gray-5 flex flex-col ${className}`}>
            {/* Status Bar */}
            <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
                <div className="text-sm font-medium text-Color-gray-90">9:30</div>
                <div className="flex items-center gap-4">
                    <div className="w-[46px] h-[17px]"></div>
                </div>
            </div>

            {/* App Bar */}
            <AppBar
                type="main"
                points={isLoggedIn ? `${user.points.toLocaleString()}P` : "0P"}
                hasNotification={false}
                onNotificationClick={() => console.log("Notification clicked")}
            />

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {isLoggedIn ? (
                    <>
                        {/* User Information Section */}
                        <div className="bg-Color-white px-4 py-5">
                            <UserProfile
                                name={user.name}
                                profileImage={user.profileImage}
                                onEdit={() => console.log("Edit profile")}
                                onAddInterests={() => console.log("Add interests")}
                            />
                        </div>

                        {/* Points Display */}
                        <PointsDisplay points={user.points} />

                        {/* Navigation List */}
                        <NavigationList items={navigationItems} />
                    </>
                ) : (
                    <>
                        {/* Guest Login Section */}
                        <GuestLoginSection onLogin={handleLogin} />

                        {/* Limited Navigation List */}
                        <NavigationList items={navigationItems} />
                    </>
                )}
            </div>

            {/* Bottom Tab Bar */}
            <BottomTabBar type="4" />

            {/* Gesture Bar */}
            <div className="h-6 flex justify-center items-center">
                <div className="w-[108px] h-1 bg-Color-gray-90 rounded-full"></div>
            </div>
        </div>
    );
} 