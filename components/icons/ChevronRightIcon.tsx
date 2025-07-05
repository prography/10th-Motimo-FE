interface ChevronRightIconProps {
    className?: string;
    size?: number;
}

export function ChevronRightIcon({
    className = "w-6 h-6",
    size = 24
}: ChevronRightIconProps) {
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
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
} 