import React from "react";

interface WarningIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const WarningIcon = ({
  color = "#EA3429",
  className,
  width = 20,
  height = 20,
  ...props
}: WarningIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        fill={color}
      />
      <path
        d="M10 6V10"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="10"
        cy="13"
        r="1"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export default WarningIcon; 