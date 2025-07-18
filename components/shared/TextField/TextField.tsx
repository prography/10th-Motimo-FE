"use client";

import { ChangeEvent, InputHTMLAttributes, Ref, useState } from "react";
import CloseCircleSvg from "../public/close_circle.svg";
import WarningCircleSvg from "../public/warning_circle.svg";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  isError: boolean;
  /** 부가 설명 및 에러 메시지 */
  description?: string;
  ref?: Ref<HTMLInputElement>;
}

const TextField = ({
  onReset,
  isError,
  description,
  value,
  onChange,
  ref,
  ...props
}: TextFieldProps) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <div className="w-full inline-flex flex-col justify-start items-start gap-1 relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`appearance-none self-stretch pr-10 h-12 px-3 py-2 relative bg-background-alternative rounded-lg 
            inline-flex justify-center items-center gap-2 overflow-hidden
            
            ${
              isError
                ? `outline-1  outline-offset-[-1px] outline-status-negative
                    focus:outline-[1.50px] focus:outline-offset-[-1.50px]
                `
                : `outline-1 outline-offset-[-1px] outline-line-normal
                    focus:outline-[1.50px] focus:outline-offset-[-1.50px] focus:outline-Color-gray-90 
                disabled:bg-background-normal disabled:outline-line-disabled `
            }
            
            
            text-label-strong text-base font-normal font-['SUIT_Variable'] leading-snug
             placeholder:text-label-alternative
             disabled:text-label-disabled disabled:placeholder:text-label-disabled
            

             
             ${props.className ?? ""}`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          ref={ref}
          {...props}
        />
        {isError && !(isFocus && value) && (
          <div className="w-6 h-12 absolute right-3 flex items-center">
            <WarningCircleSvg />
          </div>
        )}
        {onReset && isFocus && value && (
          <button
            type="button"
            className="w-6 h-12 absolute right-3 text-label-assistive"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              onReset();
            }}
          >
            <div className="w-6 h-6">
              <CloseCircleSvg />
            </div>
          </button>
        )}
        {description && (
          <p
            className={`self-stretch h-4 justify-start ${isError ? "text-status-negative" : "text-label-assistive"} text-sm font-medium font-['SUIT_Variable'] leading-tight`}
          >
            {description}
          </p>
        )}
      </div>
    </>
  );
};
export default TextField;
