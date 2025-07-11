import { cn } from "@/lib/utils";

interface SystemMessageProps {
  message: string;
  className?: string;
}

export const SystemMessage = ({ message, className }: SystemMessageProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center px-3 py-2 mx-auto",
        "bg-[#E6E8EA] rounded-[4px]",
        "w-fit",
        className,
      )}
    >
      <span className="font-SUIT_Variable font-medium text-sm leading-[1.4] tracking-[-0.01em] text-[#33363D]">
        {message}
      </span>
    </div>
  );
};
