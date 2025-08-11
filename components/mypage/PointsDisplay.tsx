"use client";

interface PointsDisplayProps {
  points: number;
  className?: string;
}

export function PointsDisplay({ points, className = "" }: PointsDisplayProps) {
  return (
    <div className={`bg-[#FFF7E5] mx-4 my-4 rounded-lg ${className}`}>
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left side - Image and text */}
        <div className="flex items-center gap-2">
          <img src="/images/money.png" alt="포인트" className="w-7 h-6" />
          <span className="text-base font-bold text-Color-gray-90">포인트</span>
        </div>

        {/* Right side - Points */}
        <div className="flex items-center gap-1">
          <span className="text-base font-bold text-Color-gray-90">
            {points.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-Color-gray-70">P</span>
        </div>
      </div>
    </div>
  );
}

