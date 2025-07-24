import React from "react";
import Lottie from "lottie-react";
import { cn } from "../utils/utils";
import loadingAnimation from "./loading.json";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showText?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", className, text = "로딩 중...", showText = true }, ref) => {
    const sizeClasses = {
      sm: "w-16 h-16",
      md: "w-32 h-32",
      lg: "w-48 h-48",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2 h-screen",
          className,
        )}
      >
        <div className={cn(sizeClasses[size])}>
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
        {showText && (
          <p className="text-center text-[var(--label-normal,#33363D)] font-['SUIT_Variable'] text-base font-normal leading-[140%] tracking-[-0.16px]">
            {text}
          </p>
        )}
      </div>
    );
  },
);

Loading.displayName = "Loading";

export { Loading };
