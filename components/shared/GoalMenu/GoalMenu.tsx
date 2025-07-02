"use client";

interface GoalMenuProps {
  goal: string;
  percentage: number;
  /** 선택되면, 해당 Goal에 대한 세부 목표 등을 외부에서 불러와야 함
   *  또한, 이 때 색도 달라짐.
   *
   *  선택될 수 있는 GoalMenu는 1개 뿐임.
   */
  selected: boolean;
  onSelected: (prevSelected: boolean) => void;
}

const GoalMenu = ({
  goal,
  percentage,
  selected,
  onSelected,
}: GoalMenuProps) => {
  const backgroundColor = selected
    ? "bg-background-strong"
    : "bg-background-alternative";
  const goalColor = selected ? "text-Color-white" : "text-Color-gray-90";
  const percentColor = selected ? "text-Color-white" : "text-Color-gray-70";
  const barColor = selected ? "bg-Color-white" : "bg-neutral-700";
  const barContainerColor = selected ? "bg-white/20" : "bg-background-normal";
  return (
    <>
      <div
        onClick={() => onSelected(selected)}
        className={` w-36 p-3 ${backgroundColor} rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.10)] inline-flex flex-col justify-start items-start gap-3`}
      >
        <p
          className={`truncate self-stretch justify-center ${goalColor}  text-sm font-bold font-['SUIT_Variable'] leading-tight`}
        >
          {goal}
        </p>
        <div
          className={`self-stretch h-1 relative ${barContainerColor} rounded-[999px] overflow-hidden`}
        >
          <div
            className={`h-1 left-0 top-0 absolute ${barColor}  rounded-[999px]`}
            // 혹시 100% 넘어갈까봐
            style={{
              width: `${percentage > 100 ? 100 : percentage < 0 ? 0 : percentage}%`,
            }}
          ></div>
        </div>
        <div className="inline-flex justify-start items-center">
          <p
            className={`justify-center ${percentColor}  text-xs font-medium font-['SUIT_Variable'] leading-none`}
          >{`${percentage > 100 || percentage < 0 ? "숫자 범위를 넘김" : percentage}`}</p>
          <p
            className={`justify-center ${percentColor}  text-[10px] font-medium font-['SUIT_Variable'] leading-3`}
          >
            {"%"}
          </p>
        </div>
      </div>
    </>
  );
};
export default GoalMenu;
export type { GoalMenuProps };
