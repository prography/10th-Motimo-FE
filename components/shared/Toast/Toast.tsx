import { cn } from "@/lib/utils";

interface ToastProps {
  text: string;
  className?: string;
}

export const Toast = ({
  text,
  className,
}: ToastProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center h-10 bg-Color-gray-80 rounded-lg px-4 py-2 gap-2 w-fit min-w-[200px]",
      className
    )}>
      <div className="font-SUIT_Variable font-bold text-sm leading-[1.4] tracking-[-0.01em] text-Color-white text-center whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}; 