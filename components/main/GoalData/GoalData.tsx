import CompletionSvg from "@/public/images/Completion.svg";
interface GoalDataProps {
  goalName: string;
  dDay: number;
  progress: number;
  isCompleted: boolean;
}
const GoalData = ({ goalName, dDay, progress, isCompleted }: GoalDataProps) => {
  return (
    <>
      <section className="w-full px-4 pt-3 pb-4 bg-background-alternative inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch inline-flex  justify-between items-center gap-1 overflow-visible">
          <div className="flex flex-col gap-1">
            <div className="w-fit px-2 py-1 bg-background-alternative rounded-[999px] outline-1 outline-offset-[-1px] outline-Color-primary-50 inline-flex justify-start items-center gap-0.5">
              <p className="justify-center text-label-primary text-sm font-semibold font-['SUIT_Variable'] leading-tight">
                {`D${dDay >= 0 ? "-" : "+"}${dDay !== 0 ? Math.abs(dDay) : "Day"}`}
              </p>
            </div>
            <p className="w-full h-6 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-normal">
              {goalName}
            </p>
          </div>
          {isCompleted && (
            <div className="w-16 h-16 relative overflow-hidden">
              <CompletionSvg />
            </div>
          )}
        </div>
        <div className="w-full self-stretch inline-flex justify-start items-center gap-2">
          <div className="flex-1 h-2 relative bg-background-normal rounded-[999px] overflow-hidden">
            <div
              className={` h-2 left-0 top-[0.50px] absolute bg-background-primary rounded-[999px]`}
              style={{ width: `${progress.toFixed(2)}%` }}
            ></div>
          </div>
          <p className="flex justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-none">
            {`${progress > 0 && progress < 100 ? progress.toFixed(2) : progress}%`}
          </p>
        </div>
      </section>
    </>
  );
};
export default GoalData;
