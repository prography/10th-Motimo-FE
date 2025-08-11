import { cn } from "@/lib/utils";
import React from "react";

interface EditIconProps {
  className?: string;
}

export const EditIcon: React.FC<EditIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "hover:cursor-pointer")}
    >
      <path
        d="M9.94 2.19L3.7 8.78C3.49 9.01 3.29 9.45 3.25 9.76L2.98 12.25C2.89 13.04 3.45 13.58 4.24 13.46L6.71 13.1C7.02 13.05 7.45 12.83 7.67 12.61L13.91 6.02C14.85 5.02 15.28 3.87 13.81 2.49C12.35 1.12 11.23 1.58 10.29 2.58L9.94 2.19Z"
        stroke="#8A949E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.17 2.98C9.63 4.81 11.09 6.16 12.95 6.52"
        stroke="#8A949E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

