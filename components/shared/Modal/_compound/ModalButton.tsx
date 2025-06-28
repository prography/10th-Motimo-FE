import { ButtonHTMLAttributes } from "react";
import { Button, ButtonProps } from "../../Button/Button";

export interface ModalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "alternative" | "negative";
  text: string;
  disabled?: boolean;
}

const chooseTextColor = (color: ModalButtonProps["color"]) => {
  switch (color) {
    case "primary":
      return "text-background-primary";
    case "alternative":
      return "text-label-alternative";
    case "negative":
      return "text-status-negative";
    default:
      return "";
  }
};

const ModalButton = ({
  color,
  text,
  disabled = false,
  ...props
}: ModalButtonProps) => {
  return (
    <>
      <Button
        className={`${chooseTextColor(color)} bg-white w-full justify-center focus:z-10 relative focus:ring-0 focus:ring-offset-0`}
        disabled={disabled}
        style={{
          borderRadius: 0,
        }}
        variant="text"
        size="l"
        {...props}
      >
        {text}
      </Button>
      {/* <button
        {...props}
        type={props.type ?? `button`}
        className={`bg-white w-full px-2 py-3 relative  inline-flex flex-col justify-center items-start gap-2 overflow-hidden ${props.className ?? ""}`}
      >
        <div className="self-stretch inline-flex justify-center items-center gap-2">
          <div
            className={`justify-start ${chooseTextColor(color)} text-base font-semibold font-['Pretendard'] leading-normal`}
          >
            {text}
          </div>
        </div>
        <div
          data-type="normal"
          className="w-80 h-12 left-0 top-0 absolute"
        ></div>
      </button> */}
    </>
  );
};
export default ModalButton;
