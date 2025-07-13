import React from "react";

interface UsersGroupIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export const UsersGroupIcon = ({
  color = "#464C53",
  className,
  width = 24,
  height = 24,
  ...props
}: UsersGroupIconProps) => {
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
        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M21 21V19C20.9986 17.1754 19.9831 15.4733 18.4 14.57M15 1.29C16.5831 2.19266 17.5986 3.89465 17.6 5.71938C17.5986 7.54411 16.5831 9.2461 15 10.1488M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UsersGroupIcon;
