import { AppBar } from "@/components/shared";
import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import { UserIcon } from "@/components/icons";
import Link from "next/link";
interface GoalDataProps {
  goalId: string;
  groupId?: string;
}
const GoalData = ({ goalId, groupId }: GoalDataProps) => {
  const dDay = 180;
  const goalName = "";
  const progress = 30;
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
        {groupId && (
          <>
            <div className="self-stretch h-10 px-2 py-0.5 bg-Color-primary-5 rounded-lg inline-flex justify-start items-center gap-1">
              <div
                data-property-1="Users_Group"
                className="w-5 h-5 relative overflow-hidden"
              >
                <>
                  <UserIcon color="#5d5fef " />
                </>
              </div>
              <div className="flex-1 flex justify-start items-center gap-0.5">
                <p className="justify-center text-label-normal text-xs font-semibold font-['SUIT_Variable'] leading-none">
                  그룹으로 이동
                </p>
              </div>
              <button
                type="button"
                className="w-6 h-6 relative overflow-hidden text-label-assistive"
              >
                <Link href={`/group/${groupId}`}>
                  <RightArrowSvg />
                </Link>
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default GoalData;
