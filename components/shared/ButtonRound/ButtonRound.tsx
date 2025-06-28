import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonRoundProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary";
  size?: "default";
  className?: string;
}

export const ButtonRound = forwardRef<HTMLButtonElement, ButtonRoundProps>(
  ({ children, variant = "primary", size = "default", className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          "w-full flex items-center justify-center rounded-full font-bold text-xl transition-all duration-200",
          // Size variants
          {
            "h-14 px-6": size === "default",
          },
          // Variant styles
          {
            // Primary variant
            "bg-label-normal text-background-alternative hover:bg-label-normal/90": 
              variant === "primary" && !disabled,
            "bg-background-disabled text-label-disabled cursor-not-allowed": 
              variant === "primary" && disabled,
          },
          className
        )}
        {...props}
      >
        <span className="text-center font-SUIT_Variable font-bold text-xl leading-[1.2] tracking-[-0.01em]">
          {children}
        </span>
      </button>
    );
  }
);

ButtonRound.displayName = "ButtonRound"; 