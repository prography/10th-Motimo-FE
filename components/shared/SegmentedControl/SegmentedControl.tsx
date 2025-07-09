import { cn } from "../utils/utils";

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl = ({
  options,
  selectedValue,
  onChange,
  className,
}: SegmentedControlProps) => {
  return (
    <div
      className={cn(
        "flex w-[312px] bg-Color-gray-5 rounded-full p-1 gap-1",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          className={cn(
            "flex flex-1 justify-center items-center h-10 rounded-full border-none cursor-pointer px-4 py-2 transition-all duration-200",
            "focus:outline-2 focus:outline-Color-primary-50 focus:outline-offset-2 focus-visible:outline-2 focus-visible:outline-Color-primary-50 focus-visible:outline-offset-2",
            selectedValue === option.value
              ? "bg-Color-primary-50 hover:opacity-90"
              : "bg-transparent hover:bg-black/5",
          )}
          onClick={() => onChange(option.value)}
        >
          <span
            className={cn(
              "font-SUIT_Variable text-sm leading-[1.4] tracking-[-0.01em] text-center transition-all duration-200",
              selectedValue === option.value
                ? "font-bold text-Color-white"
                : "font-medium text-Color-gray-70",
            )}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};
