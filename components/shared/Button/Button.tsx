import React from "react";
import { cn } from "../utils/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text";
  size?: "s" | "m" | "l";
  icon?: React.ReactElement<{ className?: string }>;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "filled",
      size = "m",
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          // Base styles with correct focus ring from Figma - 1.5px thickness
          "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 outline-none focus:ring-[1.5px] focus:ring-Color-gray-90 focus:ring-offset-[3px]",

          // Size variants with correct padding and font sizes from Figma
          {
            "px-3 py-1 text-sm h-8": size === "s", // 4px 12px, 14px font, 32px height
            "px-4 py-2 text-base h-10": size === "m", // 8px 16px, 16px font, 40px height
            "px-4 py-3 text-base h-12": size === "l", // 12px 16px, 16px font, 48px height
          },

          // Variant styles using design tokens
          {
            // Filled variant
            "bg-Color-primary-50 text-Color-white hover:opacity-90 active:opacity-80 disabled:bg-Color-gray-20 disabled:text-Color-gray-50 disabled:cursor-not-allowed disabled:hover:opacity-100":
              variant === "filled",

            // Outlined variant
            "border-[1.5px] border-Color-primary-50 text-Color-primary-50 bg-transparent hover:bg-Color-primary-50/5 active:bg-Color-primary-50/10 disabled:border-Color-gray-40 disabled:text-Color-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent":
              variant === "outlined",

            // Text variant
            "text-Color-primary-50 bg-transparent hover:bg-Color-primary-50/5 active:bg-Color-primary-50/10 disabled:text-Color-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent":
              variant === "text",
          },

          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0">
            {React.cloneElement(icon, {
              className: cn(
                size === "s" ? "w-4 h-4" : size === "m" ? "w-5 h-5" : "w-5 h-5",
                icon.props.className,
              ),
            })}
          </span>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
