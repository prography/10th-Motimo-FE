import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text";
  size?: "s" | "m" | "l";
  icon?: React.ReactNode;
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
          // Base styles
          "inline-flex items-center gap-3 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

          // Size variants
          {
            "px-4 py-2 text-sm h-8": size === "s", // 32px height
            "px-4 py-3 text-sm h-10": size === "m", // 40px height
            "px-6 py-3 text-base h-12": size === "l", // 48px height
          },

          // Variant styles
          {
            // Filled variant
            "bg-[var(--color-background-primary)] text-white hover:bg-[color-mix(in_srgb,var(--color-background-primary)_90%,black)] focus-visible:ring-[var(--color-background-primary)] active:bg-[color-mix(in_srgb,var(--color-background-primary)_80%,black)] disabled:bg-[#8a949e] disabled:cursor-not-allowed disabled:hover:bg-[#8a949e]":
              variant === "filled",

            // Outlined variant
            "border-2 border-[var(--color-background-primary)] text-[var(--color-background-primary)] bg-transparent hover:bg-[color-mix(in_srgb,var(--color-background-primary)_10%,transparent)] focus-visible:ring-[var(--color-background-primary)] active:bg-[color-mix(in_srgb,var(--color-background-primary)_20%,transparent)] disabled:border-[#8a949e] disabled:text-[#8a949e] disabled:cursor-not-allowed disabled:hover:bg-transparent":
              variant === "outlined",

            // Text variant
            "text-[var(--color-background-primary)] bg-transparent hover:bg-[color-mix(in_srgb,var(--color-background-primary)_10%,transparent)] focus-visible:ring-[var(--color-background-primary)] active:bg-[color-mix(in_srgb,var(--color-background-primary)_20%,transparent)] disabled:text-[#8a949e] disabled:cursor-not-allowed disabled:hover:bg-transparent":
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
            {React.cloneElement(icon as React.ReactElement, {
              className: cn(
                size === "s" ? "w-4 h-4" : size === "m" ? "w-4 h-4" : "w-5 h-5",
                (icon as React.ReactElement).props?.className,
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
