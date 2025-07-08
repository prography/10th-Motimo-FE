import { WarningIcon } from "@/components/icons";

interface EditInfoProps {
  type: "goal" | "subGoal";
}

const goalEditInfoText = "목표명과 기간을 변경할 수 있습니다.";
const subGoalEditInfoText = "세부목표의 순서와 텍스트를 수정할 수 있습니다.";

const EditInfo = ({ type }: EditInfoProps) => {
  return (
    <>
      <div className="w-96 p-4 bg-background-normal inline-flex justify-start items-start gap-2">
        <div className="w-5 h-5 relative overflow-hidden ">
          <WarningIcon color="#464c53" />
          {/* <div className="w-3.5 h-3.5 left-[2.50px] top-[2.50px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-label-alternative"></div> */}
        </div>
        <p className="justify-center text-label-strong text-sm font-medium font-['SUIT_Variable'] leading-tight">
          {type === "goal" ? `${goalEditInfoText}` : `${subGoalEditInfoText}`}
        </p>
      </div>
    </>
  );
};
export default EditInfo;
