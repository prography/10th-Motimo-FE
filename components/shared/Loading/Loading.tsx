import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { cn } from "../utils/utils";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showText?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", className, text = "로딩 중...", showText = true }, ref) => {
    const [animationData, setAnimationData] = useState(null);

    const sizeClasses = {
      sm: "w-16 h-16",
      md: "w-32 h-32",
      lg: "w-48 h-48",
    };

    useEffect(() => {
      fetch("/animations/loading.json")
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => console.error("Failed to load animation:", error));
    }, []);

    if (!animationData) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center justify-center gap-2",
            className,
          )}
        >
          <div className={cn(sizeClasses[size], "animate-spin")}>
            <div className="w-full h-full border-2 border-Color-primary-50 border-t-transparent rounded-full"></div>
          </div>
          {showText && (
            <p className="text-center text-[var(--label-normal,#33363D)] font-['SUIT_Variable'] text-base font-normal leading-[140%] tracking-[-0.16px]">
              {text}
            </p>
          )}
        </div>
      );
    }

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
            animationData={animationData}
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
