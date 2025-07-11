import Image from "next/image";

interface GroupEmptyStateProps {
  className?: string;
}

export function GroupEmptyState({ className = "" }: GroupEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 pt-[88px] pb-8 ${className}`}
    >
      {/* Empty State Image */}
      <div className="w-[100px] h-[115px] mb-8 relative">
        <Image
          src="/images/group-empty-state.png"
          alt="그룹 없음"
          fill
          className="object-contain"
        />
      </div>

      {/* Empty State Text */}
      <p className="text-Color-gray-70 text-center text-base leading-[22px] font-SUIT_Variable">
        현재 참여 중인 그룹이 없어요!{"\n"}
        그룹에 참여해 동기부여를 얻고{"\n"}
        목표 달성에 더 다가가보세요!
      </p>
    </div>
  );
}
