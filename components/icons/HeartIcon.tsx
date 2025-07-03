import React from "react";

interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  filled?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

export const HeartIcon = ({
  color = "#33363D",
  filled = false,
  className,
  width = 16,
  height = 16,
  ...props
}: HeartIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M13.35 3.03C12.67 2.35 11.77 1.97 10.82 1.97C9.87 1.97 8.97 2.35 8.29 3.03L8 3.32L7.71 3.03C7.03 2.35 6.13 1.97 5.18 1.97C4.23 1.97 3.33 2.35 2.65 3.03C1.25 4.43 1.25 6.71 2.65 8.11L8 13.46L13.35 8.11C14.75 6.71 14.75 4.43 13.35 3.03Z"
        stroke={filled ? "none" : color}
        fill={filled ? color : "none"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon; 