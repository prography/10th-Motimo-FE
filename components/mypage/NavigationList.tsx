"use client";

import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";

interface NavigationItem {
  label: string;
  hasIcon: boolean;
  onClick: () => void;
}

interface NavigationListProps {
  items: NavigationItem[];
  className?: string;
}

export function NavigationList({ items, className = "" }: NavigationListProps) {
  return (
    <div className={`${className}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-Color-gray-5 hover:cursor-pointer transition-colors"
        >
          <span className="text-sm font-medium text-Color-gray-80 text-left">
            {item.label}
          </span>

          {item.hasIcon && (
            <ChevronRightIcon className="w-5 h-5 text-Color-gray-40" />
          )}
        </button>
      ))}
    </div>
  );
}

