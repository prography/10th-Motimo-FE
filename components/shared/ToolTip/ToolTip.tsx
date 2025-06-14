import Moti from "../public/Moti_shared.svg";
import SpeechTail from "../public/Speech_Tail.svg";

interface ToolTipProps {
  content: string;
}

const ToolTip = ({ content }: ToolTipProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-['-8px']">
        <div className="absolute mb-15">
          <SpeechTail />
        </div>
        <section className="w-72 h-14 p-3 flex justify-start items-center gap-2 bg-indigo-500 rounded-lg">
          <div className="w-9 h-6">
            <Moti />
          </div>
          <p
            className="flex items-center h-full min-w-0 flex-1 whitespace-pre justify-center text-label-inverse text-xs font-medium font-['SUIT_Variable'] leading-none"
            style={{ lineHeight: "1.05rem" }}
          >
            {`${content}`}
          </p>
        </section>
      </div>
    </>
  );
};
export default ToolTip;
