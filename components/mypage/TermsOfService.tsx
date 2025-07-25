"use client";

import { AppBar } from "@/components/shared/AppBar/AppBar";

interface TermsOfServiceProps {
  onBack?: () => void;
  className?: string;
}

export function TermsOfService({
  onBack,
  className = "",
}: TermsOfServiceProps) {
  // Sample terms content - in a real app, this would come from an API or CMS
  const termsContent = `모티모 서비스 이용약관

제1조 (목적)
이 약관은 모티모(이하 "회사")가 제공하는 모티모 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.
2. "이용자"라 함은 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
3. "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

제3조 (약관의 효력 및 변경)
1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.
2. 회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.

제4조 (서비스의 제공 및 변경)
1. 회사는 다음과 같은 업무를 수행합니다.
   - 목표 설정 및 관리 서비스 제공
   - 그룹 기반 목표 달성 지원 서비스
   - 기타 회사가 정하는 업무
2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 변경할 수 있습니다.

제5조 (서비스의 중단)
1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 않습니다.

제6조 (회원가입)
1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.

제7조 (개인정보보호)
회사는 관련법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련법령 및 회사의 개인정보처리방침이 적용됩니다.

제8조 (이용자의 의무)
1. 이용자는 다음 행위를 하여서는 안 됩니다.
   - 신청 또는 변경시 허위내용의 등록
   - 타인의 정보도용
   - 회사가 게시한 정보의 변경
   - 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시
   - 회사 기타 제3자의 저작권 등 지적재산권에 대한 침해
   - 회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
   - 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위

본 약관은 2024년 1월 1일부터 시행됩니다.`;

  return (
    <div className={`min-h-screen bg-Color-white flex flex-col ${className}`}>
      {/* App Bar */}
      <AppBar type="back" title="서비스 이용약관" onBackClick={onBack} />

      {/* Terms Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          <div className="text-sm font-medium text-Color-gray-70 leading-relaxed whitespace-pre-line">
            {termsContent}
          </div>
        </div>
      </div>

      {/* Gesture Bar */}
      <div className="h-6 flex justify-center items-center">
        <div className="w-[108px] h-1 bg-Color-gray-90 rounded-full"></div>
      </div>
    </div>
  );
}

