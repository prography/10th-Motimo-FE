interface KakaoIconProps {
  className?: string;
  size?: number;
}

export default function KakaoIcon({ className = "", size = 24 }: KakaoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3C7.03 3 3 6.14 3 10.1C3 12.83 4.87 15.15 7.55 16.5L6.55 20.05C6.48 20.28 6.74 20.46 6.95 20.32L11.19 17.5C11.46 17.51 11.73 17.51 12 17.51C16.97 17.51 21 14.37 21 10.37C21 6.37 16.97 3.23 12 3.23"
        fill="#000000"
      />
    </svg>
  );
} 