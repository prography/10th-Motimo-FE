import React from "react";

interface BellIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  width?: number;
  height?: number;
  isNotificationActive?: boolean;
  hasNewMessages?: boolean;
}

export const BellIcon = ({
  color = "#1E2124",
  className,
  width = 24,
  height = 24,
  isNotificationActive = true,
  hasNewMessages = false,
  ...props
}: BellIconProps) => {
  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
      >
        <path
          d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isNotificationActive && hasNewMessages && (
        <div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"
          style={{
            backgroundColor: "#EA3429",
            width: "10px",
            height: "10px",
            top: "1px",
            right: "1px",
          }}
        />
      )}
    </div>
  );
};

export default BellIcon;
