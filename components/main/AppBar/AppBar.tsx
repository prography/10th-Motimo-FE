import BellSvg from "@/public/images/Bell.svg";
import Image from "next/image";

interface AppBarProps {
  points: number;
  /** 이건 미정인 듯. 알람 개수에 따라 ui달라질 듯*/
  alarmNum?: number;
}
const AppBar = ({ points }: AppBarProps) => {
  return (
    <div
      data-icon="false"
      data-type="main"
      className="flex items-center  h-14 relative bg-white gap-1"
    >
      <div className="px-2 py-1 inline-flex flex-col justify-center items-center ">
        <div className="self-stretch h-6 p-2 bg-violet-100 rounded-[999px] inline-flex justify-center items-center gap-2">
          <div className="justify-center text-indigo-500 text-xs font-bold font-['SUIT_Variable'] leading-none">
            {`${points}P`}
          </div>
        </div>
      </div>
      <div className="w-10 h-10 flex justify-center items-center">
        <div className="w-6 h-6 flex justify-center items-center">
          <BellSvg />
        </div>
      </div>
    </div>
  );
};
export default AppBar;
