import { ButtonHTMLAttributes } from "react";

export interface ModalButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "alternative" | "negative";
  text: string;
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

const ModalButton = ({ color, text, ...props }: ModalButtonProps) => {
  return (
    <>
      <button
        {...props}
        type={props.type ?? `button`}
        className={`bg-white w-80 px-2 py-3 relative rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow-hidden ${props.className ?? ""}`}
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
      </button>
    </>
  );
};
export default ModalButton;
