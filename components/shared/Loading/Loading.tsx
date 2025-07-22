import React from "react";
import Lottie from "lottie-react";
import { cn } from "../utils/utils";
import loadingAnimation from "/animations/loading.json";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  showText?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = "md", className, text = "로딩 중...", showText = true }, ref) => {
    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-12 h-12", 
      lg: "w-16 h-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2",
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
          <p className="text-Color-gray-80 font-SUIT_Variable font-normal text-sm">
            {text}
          </p>
        )}
      </div>
    );
  },
);

Loading.displayName = "Loading";

export { Loading };