import { AppBar } from "@/components/shared";

interface GoalDataProps {
  goalName: string;
  dDay: number;
  progress: number;
}
const GoalData = ({ goalName, dDay, progress }: GoalDataProps) => {
  return (
    <>
      <section className="w-full px-4 pt-3 pb-4 bg-background-alternative inline-flex flex-col justify-start items-start gap-4">
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-1">
          <div className="px-2 py-1 bg-background-alternative rounded-[999px] outline-1 outline-offset-[-1px] outline-Color-primary-50 inline-flex justify-start items-center gap-0.5">
            <p className="justify-center text-label-primary text-sm font-semibold font-['SUIT_Variable'] leading-tight">
              {`D-${dDay}`}
            </p>
          </div>
          <p className="w-72 h-6 justify-center text-label-strong text-base font-bold font-['SUIT_Variable'] leading-normal">
            {goalName}
          </p>
        </div>
        <AppBar type="progress" progress={progress} />
      </section>
    </>
  );
};
export default GoalData;
