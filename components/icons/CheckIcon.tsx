import React from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const CheckIcon = ({
  color = "#FFFFFF",
  className,
  width = 13,
  height = 13,
  ...props
}: CheckIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M10.75 3.25L5 9L2.25 6.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon; 