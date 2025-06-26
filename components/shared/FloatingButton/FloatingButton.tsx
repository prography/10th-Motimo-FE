"use client";

import { ButtonHTMLAttributes } from "react";
import PlusSvg from "../public/Add_Plus.svg";

type FLoatingButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const FloatingButton = ({ ...props }: FLoatingButtonProps) => {
  return (
    <>
      <button
        {...props}
        className="w-12 h-12 p-2 bg-background-strong rounded-[999px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10)] inline-flex justify-center items-center gap-2"
      >
        <div className="w-6 h-6 relative overflow-hidden text-white">
          <PlusSvg width={24} height={24} />
        </div>
      </button>
    </>
  );
};

export default FloatingButton;
