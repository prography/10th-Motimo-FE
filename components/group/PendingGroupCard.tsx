interface PendingGroupCardProps {
  id: number;
  goalName: string;
  memberCount?: number;
  onJoin: (id: number) => void;
  className?: string;
}

export function PendingGroupCard({
  id,
  goalName,
  memberCount,
  onJoin,
  className = "",
}: PendingGroupCardProps) {
  return (
    <div
      className={`bg-Color-white rounded border border-Color-gray-20 p-4 flex flex-col gap-3 ${className}`}
    >
      <h3 className="text-base font-bold text-Color-gray-90 font-SUIT">
        {goalName}
      </h3>

      <div className="flex justify-end">
        <button
          onClick={() => onJoin(id)}
          className="bg-Color-primary-normal text-Color-white px-3 py-1 rounded-lg text-sm font-semibold h-8 flex items-center justify-center hover:bg-Color-primary-strong transition-colors font-Pretendard"
        >
          그룹 참여하기
        </button>
      </div>
    </div>
  );
}
