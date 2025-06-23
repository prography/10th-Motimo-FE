import React from "react";

interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const ChevronLeftIcon = ({
  color = "#33363D",
  className,
  width = 24,
  height = 24,
  ...props
}: ChevronLeftIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronLeftIcon; 