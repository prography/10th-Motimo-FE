import MotiSvg from "../public/Moti_shared.svg";
interface BannerProps {
  title: string;
  tag: string;
}
const Banner = ({ title, tag }: BannerProps) => {
  return (
    <>
      <div className="w-full px-6 py-4 bg-indigo-500 inline-flex justify-start items-center gap-3">
        <div className="min-w-0 flex-1 inline-flex flex-col justify-center items-start gap-2">
          <p className="overflow-hidden self-stretch justify-center text-Color-white text-base font-bold font-['SUIT_Variable'] leading-tight">
            {title}
          </p>
          <div className="min-w-0  p-2 bg-white/10 rounded-[999px] inline-flex justify-center items-center gap-2">
            <p className="max-w-60 overflow-hidden justify-center text-white text-xs font-medium font-['SUIT_Variable'] leading-none">
              {tag}
            </p>
          </div>
        </div>
        <div className="w-14 h-10">
          <MotiSvg width={56} height={40} />
        </div>
      </div>
    </>
  );
};
export default Banner;
