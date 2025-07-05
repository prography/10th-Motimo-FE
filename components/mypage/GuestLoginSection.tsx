"use client";

interface GuestLoginSectionProps {
    onLogin: () => void;
    className?: string;
}

export function GuestLoginSection({ onLogin, className = "" }: GuestLoginSectionProps) {
    const handleGoogleLogin = () => {
        // TODO: Implement Google OAuth
        onLogin();
    };

    const handleKakaoLogin = () => {
        // TODO: Implement Kakao OAuth
        onLogin();
    };

    return (
        <div className={`bg-Color-white px-4 py-5 ${className}`}>
            <div className="flex flex-col items-center gap-4">
                {/* Placeholder Image */}
                <div className="w-20 h-22 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>

                {/* Description Text */}
                <p className="text-sm font-medium text-Color-black text-center leading-relaxed">
                    현재 게스트 모드로 보고 계세요.{"\n"}
                    로그인 후 모티모에서 목표달성을 시작해보세요!
                </p>

                {/* Login Buttons */}
                <div className="flex flex-col gap-2 w-full max-w-[328px]">
                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-Color-white border border-Color-gray-10 rounded-lg hover:bg-Color-gray-5 transition-colors"
                    >
                        <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
                            G
                        </div>
                        <span className="text-sm font-semibold text-Color-gray-90">
                            Google로 시작
                        </span>
                    </button>

                    {/* Kakao Login */}
                    <button
                        onClick={handleKakaoLogin}
                        className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-[#FEE500] rounded-lg hover:bg-[#FDD503] transition-colors"
                    >
                        <div className="w-6 h-6 bg-Color-gray-90 rounded flex items-center justify-center text-Color-white text-xs">
                            K
                        </div>
                        <span className="text-sm font-semibold text-Color-gray-90">
                            카카오로 시작
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
} 