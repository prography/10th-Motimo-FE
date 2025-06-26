"use client";

interface LoginScreenProps {
  onNext: () => void;
}

export default function LoginScreen({ onNext }: LoginScreenProps) {
  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    onNext();
  };

  const handleKakaoLogin = () => {
    // TODO: Implement Kakao login
    onNext();
  };

  const handleBrowse = () => {
    // TODO: Handle browse without login
    onNext();
  };

  return (
    <div className="min-h-screen bg-background-alternative flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-end gap-[286px] px-6 py-[10px] h-[52px]">
        <div className="text-sm font-medium text-label-normal">9:30</div>
        <div className="flex items-center gap-4">
          {/* Wifi, Signal, Battery icons would go here */}
          <div className="w-[46px] h-[17px]"></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-6">
        {/* Image/Illustration Area */}
        <div className="h-[400px] bg-black/10 flex flex-col justify-center items-center mb-[52px]">
          <div className="text-center mb-[208px]">
            <h1 className="text-xl font-medium text-label-normal leading-[1.4] mb-14">
              MOTIMO는{"\n"}~~ 서비스입니다.
            </h1>
          </div>
          <div className="text-center">
            <p className="text-xl font-medium text-label-normal leading-[1.4]">
              지금 같은 목표를 가진 사람들과{"\n"}함께 시작해보세요.
            </p>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-col gap-2 px-4">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-background-alternative border border-line-normal rounded-lg"
          >
            <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
              G
            </div>
            <span className="text-sm font-semibold text-label-normal">Google로 시작하기</span>
          </button>

          {/* Kakao Login */}
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center gap-2 py-[15px] px-4 bg-[#FEE500] rounded-lg"
          >
            <div className="w-6 h-6 bg-label-normal rounded flex items-center justify-center text-background-alternative text-xs">
              K
            </div>
            <span className="text-sm font-semibold text-label-normal">카카오로 시작하기</span>
          </button>

          {/* Browse Button */}
          <button
            onClick={handleBrowse}
            className="w-full flex items-center justify-center gap-2 py-2 px-2"
          >
            <span className="text-base font-semibold text-label-alternative">일단 둘러볼게요!</span>
          </button>
        </div>
      </div>

      {/* Gesture Bar */}
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-label-normal rounded-xl"></div>
      </div>
    </div>
  );
} 